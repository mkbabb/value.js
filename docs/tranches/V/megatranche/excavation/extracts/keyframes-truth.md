# keyframes.js truth table — tranches A..V (22)

**Seat**: B:keyframes-tranches (Opus banausic band, M-14 excavation swarm).
**Model observed**: `claude-opus-5[1m]` (system-declared; `ANTHROPIC_MODEL` env unset — verified `echo "${ANTHROPIC_MODEL:-<unset>}"` → `<unset>`, so no override in force).
**Date**: 2026-07-27. **Corpus repo**: `/Users/mkbabb/Programming/keyframes.js` @ `a59d3a22` (branch `master`, dirty working tree carrying the K6/Glass-7 transaction).
**Corpus read**: `docs/tranches/{A..V}` — all 22. Every `FINAL.md`/`FINAL-U.md` where present (16), every FINAL-less tranche's `PROGRESS.md` header + tail (6), plus `V/DISPOSITIONS.md`, charters and wave inventories where a claim needed grounding.

**Evidence rule honored**: every LANDED / DELETED / ABSENT cell carries either a quote with `file:line`-or-section, or a pasted command output run against the live tree (`git tag`, `git log --diff-filter=D`, `node -p require('./package.json')`, `ls`, `grep`). Memory recall was used for navigation only — no memory-sourced claim survives into this file unre-derived.

**Depth note**: per the seat brief, per-tranche depth is lighter than the value.js extract at this count. Every tranche gets a row; every FINAL-less tranche is flagged; the five structural findings that recur across the corpus are pulled up into §0.5 rather than repeated 22 times.

---

## §0 — Corpus census (the first finding)

| Tranche | Close record | Waves (files) | Version cut | Close form |
|---|---|---|---|---|
| A | ✅ `FINAL.md` (250 ln) | 6 | `3.0.0` | self-closed |
| B | ✅ (156 ln) | 8 | `3.1.0` changeset (cut, **unpublished**) | self-closed |
| C | ✅ (144 ln) | 6 | `major` changeset (cut, **unpublished**) | self-closed |
| D | ✅ (270 ln) | 7 | `major` changeset (cut, **unpublished**) | **written retroactively FROM TRANCHE G** |
| E | ✅ (131 ln) | 12 | `minor` changeset (cut, **unpublished**) | self-closed |
| F | ✅ (124 ln) | 18 | **`4.0.0` — the B+C+D+E+F stack published at once** | self-closed |
| G | ✅ (228 ln) | 21 | `4.1.0` | self-closed |
| H | ✅ (188 ln) | 13 | `4.1.1` PATCH (**never published — see I/J**) | self-closed — **and the close was false** |
| I | ✅ (290 ln) | 10 | none (version frozen at `4.1.0`) | self-closed |
| J | ✅ (618 ln) | 21 | `4.2.0` | self-closed |
| K | ✅ (111 ln) | 15 | `4.3.0` | self-closed |
| L | ✅ (401 ln) | 14 | `4.3.0` (no own cut) | self-closed |
| **M** | ❌ **ABSENT** | 18 | — (rode `4.3.0`) | **NEVER CLOSED** — 5 of 16 waves implemented, rest superseded by O |
| **N** | ❌ **ABSENT** | 9 | — | **NEVER IMPLEMENTED** — dev-phase only; formally KILLED at R |
| **O** | ❌ **ABSENT** | 18 | subset in `4.4.0` | **NEVER CLOSED** — breaking remainder routed to Q |
| **P** | ❌ **ABSENT** | 14 | subset in `4.4.0` | **NEVER CLOSED** — remainder routed to Q |
| Q | ✅ (49 ln) | 23 | `5.0.0` | self-closed |
| R | ✅ (195 ln) | 9 | `5.1.0` | self-closed |
| **S** | ❌ **ABSENT** | 9 | **none** | **NEVER CLOSED** — drive terminated by owner rejection mid-flight |
| T | ✅ (167 ln) — **status line still reads `DRAFT — Close NOT yet fired`** | 10 | `5.2.0` (tag exists) | **close fired; the FINAL was never un-drafted** |
| U | ✅ `FINAL-U.md` (199 ln) | 10 | `5.3.4` / `5.3.5` | self-closed |
| **V** | ❌ **ABSENT** | 8 | `6.0.0` in tree | **FORMATION ONLY — execution dispatched, open today** |

> **Finding KF-0 — six of twenty-two tranches (27%) never reached a close record under their own letter.** `ls docs/tranches/{M,N,O,P,S,V}/FINAL*.md` → no matches. M, O and P were each *partially* implemented and had their remainders absorbed by a successor; N was authored and never run; S was terminated by owner rejection mid-drive; V is open. The FINAL-less rate here is materially worse than value.js's A..M (3-of-13, 23%) and the failure mode differs: value.js's unclosed tranches were *abandoned plans*; keyframes' are *partially-shipped plans whose ledger obligations transferred sideways*.

> **Finding KF-0b — the "one publish for five tranches" pattern.** B, C, D and E each cut a changeset and each recorded its version leg as "USER-DOMAIN, confirm-first". None published. All five shipped at once as `4.0.0` — `git log -1 --format=%s v4.0.0` → *"chore(release): @mkbabb/keyframes.js 4.0.0 — the B+C+D+E+F stack"* (2026-06-06). Four consecutive FINALs therefore recorded a release leg that did not exist at the time of writing.

---

## §0.5 — The five structural findings that recur across the corpus

These are the load-bearing patterns. They are stated once here and cross-referenced from the per-tranche tables.

### KF-α — the overclaim chain: every close from B to L found its predecessor's close false

This is the single most striking property of the keyframes corpus. It is not one bad tranche; it is a **six-link chain**, each link discovered by the *next* tranche:

| Discoverer | What it found in its predecessor |
|---|---|
| **B** | Three A drifts, incl. the lockfile: A's FINAL asserted the lockfile was *"regenerated glass-ui-absent"*; `B/FINAL.md:74-76` — *"it was glass-ui-PRESENT (optional) … a clean runner LINKS a dangling `node_modules/@mkbabb/glass-ui` (target missing) which npm TOLERATES non-fatally — NOT a 'clean skip.'"* |
| **C** | **Seven** B gates recorded MET whose own committed artefacts recorded them FAILING. `C/FINAL.md:11-12` — *"The seven gates B's FINAL asserted MET that its committed artefacts recorded FAILING are each made true here."* Includes B marking `landmark-one-main` MET while `display:contents` stripped the landmark role on every page. |
| **G** | D never committed its close doc at all (see KF-γ). |
| **I** | H's entire certification. `I/FINAL.md:22-24` — *"Tranche H shipped with **ALL ~97 `proof:*` gates GREEN** … and its `FINAL.md` declared every request resolved and the four chronics CLOSED. **The certification is false of the product.**"* |
| **J** | I's own close carried two latent overclaims. `J/FINAL.md` §1 — *"INVE-1 — the deploy claim was structurally impossible when written. The I FINAL wrote 'merge → green CI → CF auto-deploys' while `ci.yml` had been YAML-invalid since H.W12 (`f93e731`, discovered only POST-close); the 06-09 deploy was a MANUAL `wrangler` bypass using a SIBLING repo's `.env` creds."* |
| **K** | J's close was honest at every boundary it certified — and blind at the one it never crossed. `K/FINAL.md:5` — *"**Hours after the J close the user drove the live product and crossed the one boundary no J gate had ever crossed — the first click — and the hero rainbow-play did not start the engine.**"* |
| **L** | K's honestly-scoped "defined subset" was in fact *"a family of **replay-equality breaches in the SHIPPED surface**, a **gate-corpus blind-spot**, a **publish/dogfood gap** … none of which K's gates caught"* (`L/FINAL.md` §preamble). |

The corpus invented an invariant specifically for this — **inv ε, "the close cannot overclaim"**, established at C (`C/FINAL.md:93-94`) — and inv ε did not stop the chain. It was re-asserted verbatim by D, E, K, L and R and the chain continued through all of them. **An invariant against overclaiming, enforced only by the next tranche's audit, is a detector, not a preventer.**

### KF-β — the gate apparatus grew ~100× and was then deleted whole

| Point in corpus | Gate count | Source |
|---|---|---|
| A close | 2 named invariants (α, β), 1 gate script | `A/FINAL.md:92-118` |
| C close | 10 gates | `C/FINAL.md` §gate table |
| E close | 13 gates + 460 tests | `E/FINAL.md:85-93` |
| G close | 35 gates, 637 tests | `G/FINAL.md:8-9` |
| H close | **102 `proof:*` scripts** (100 leaves + 2 aggregators) | `H/FINAL.md:110-114` |
| U authoring | **227 `proof:*` package keys**; 193 flat `scripts/proof-*.mjs` | `U/FINAL-U.md` §apparatus dissolution |
| **Live tree today** | **2** | measured below |

Measured on the live tree 2026-07-27:

```
$ node -p "Object.keys(require('./package.json').scripts).filter(k=>k.startsWith('proof')).join(' ')"
proof:publish proof:owner-golden

$ ls scripts/proof-*.mjs | wc -l
zsh: no matches found: scripts/proof-*.mjs
0

$ node -p "Object.keys(require('./package.json').scripts).length"
19
```

`U/FINAL-U.md` states the delta plainly: *"`proof:*` package keys | 227 at U authoring; 204 at the terminal owner audit | **2**"* and *"flat proof files deleted in the terminal cut | — | **182**"*, alongside *"`scripts/` text lines | 66,706 before the terminal cut | **10,776 across 77 files**"*.

**The apparatus that H used to certify a broken product green, that I rebuilt as an "actuating regime", that J/K/L/Q/R/S/T each extended, was dissolved in one commit at U** — `git log --oneline --diff-filter=D -1 -- scripts/proof-boundary.mjs` → `70b32501 refactor(tranche-u): dissolve the proof apparatus around direct product checks`.

Honest correction to a tempting reading: **inv α was not lost.** `scripts/gates/surface/boundary.mjs` exists today and is chained by `proof:publish` (`node scripts/gates/surface/index.mjs`). The founding A invariant survived the dissolution; the *ceremony* around it did not.

### KF-γ — the "close" is repeatedly not the close

Three distinct instances, each verified:

1. **D never wrote its FINAL.** `D/FINAL.md:14-17`, verbatim: *"**A retrospective close.** This FINAL is written from the G vantage. D.W6 authored the close (`waves/D.W6.md`) and the impl ran the content, but the `FINAL.md` doc was the one residual the D close never committed — verified ABSENT at G-open (`a-deferred-ledger DP-2`) … G.WZ writes it now."* A close report authored one tranche and three months of work later, by a successor.
2. **T's FINAL is still a draft.** `T/FINAL.md:3` reads *"**Status: DRAFT — assembled at batch ⑪ close-prep (2026-07-06). Close NOT yet fired.**"* and its §6 checklist still carries three unchecked boxes including `- [ ] Version tag **5.2.0** (release.yml publishes)`. But the tag exists: `git log -1 --format="%h %ad" --date=short v5.2.0` → `cf9b268e 2026-07-09`. **The close fired three days after the draft and the document was never reconciled.**
3. **The chronic-ledger re-point was skipped three tranches running.** `R/FINAL.md:53-56` — *"per the no-skip discipline the M.WZ/O.WZ/P.WZ re-points violated (those re-points were ALL skipped, leaving the live pin 3-tranche-stale at L before Q re-pointed L→Q directly)."* The meta-gate that policed deferral honesty was itself pointed at a stale substrate for three tranches.

### KF-δ — three times the instruments were all-green and the owner said no

The corpus's deepest recurrence. Same shape, three times, on three different apparatus generations:

| Event | Instrument state | Owner reality |
|---|---|---|
| **H → I** (2026-06-08) | ~97 `proof:*` gates GREEN, `tsc` 0, `proof:browser` 35/35, `proof:visual-lock`, `proof:chronic-closure` all green | *"the user drove the live demo and found **nine user-visible breakages** … The very first gesture a human performs — press the rainbow group-play — threw an uncaught error"* (`I/FINAL.md:26-28`) |
| **J → K** (2026-06-16) | J closed honest at every boundary it certified; `4.2.0` published; auto-deploy round-trip observed twice | *"Hours after the J close the user drove the live product … the hero rainbow-play did not start the engine"* (`K/FINAL.md:5`) |
| **S → T** (2026-07-04) | *"the S instruments were ALL-GREEN when the verdict landed"* | *"the owner live-reviewed the demo (`:5180`) and **REJECTED it wholesale** — Tranche T DEVELOPMENT opened, the 22-defect VERDICT recorded"* (`S/PROGRESS.md`, final entry, commit `f2d05c7`) |

S's own board names the lesson in one clause: **"the META-FINDING: the instruments' bar ≠ the owner's bar."** That sentence is the most valuable line in the entire 22-tranche corpus and it was written *after* two prior tranches had already learned it.

Note the escalation of the diagnosis each time. I blamed the *oracle* (proxies instead of the running product). K blamed the *axis* (no gate crossed the first click; and taste is not gateable — `K/FINAL.md:31`: *"an agent's 'designer-eye PASS' is corroboration, never the verdict"*). U blamed the *apparatus itself* and deleted it.

### KF-ε — the deferral ledger: a formal machine that laundered items for up to nine carries

The corpus ran an increasingly elaborate anti-deferral regime — "P-invariant-28: no perpetual punts" (D), the chronic-closure meta-gate (H), the runtime-gate-that-BIT contract (I/K), the "≥4-tranche EXIT-ONLY mandate" (K), the "no 9th carry" hard stop (R). Its own records show what it was fighting:

- `H/FINAL.md:51-54` — *"four user-visible chronics 'exited' the A→G ledger NOT by being solved but by being re-classified (M1 issue-level close masquerading as system close; M2 scope-narrowing; M3 column-migration to HANDOFF). **The P-invariant policed the COLUMN, not the PRODUCT.**"*
- H's own answer was itself a proxy — `I/FINAL.md:38-40`: *"The durability keystone, `proof:chronic-closure`, was itself a source-shape gate that parsed a markdown table: **a paperwork auditor auditing other gates' paperwork.**"*
- R records carries of **8** (DM-1 dock click-strand), **6** (DM-5 aria-orientation), **6** (DM-7 keyframes-vue) tranches. Q records DM-2 exiting on its **NINTH** carry (`Q/FINAL.md:26-28`).
- The two longest-lived were finally killed not by being solved but by **[B] CONTINGENCY KILL** — `R/FINAL.md` §2: glass-ui shipped neither `dockStrandKeepalive` nor `ariaGuard`, so the band-aids were excised and replaced with kf-internal implementations. **The sibling dependency the items had waited eight and six tranches for was simply abandoned.**

---

## §1..§22 — the per-tranche truth tables

### §1 — Tranche A (2026-06-02, `3.0.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| inv α — the light/heavy value.js boundary is *gated*, not asserted | ✅ `scripts/proof-boundary.mjs`, bite-proven (*"injecting `import { lerp } from "@mkbabb/value.js"` into the light `spring.ts` turned it red … reverting returned it to PASS"*, `A/FINAL.md:102-105`) | — | — | Script **deleted at U** (`70b32501`) — but the *invariant* survives re-homed at `scripts/gates/surface/boundary.mjs`. Not a drop; a relocation. |
| inv β — the library build is glass-ui-free, *"lockfile regenerated glass-ui-absent"* | partially | **The claim was false.** B corrected it to disposition (b): the lockfile is glass-ui-PRESENT-optional and `npm ci` links a **dangling** symlink npm tolerates (`B/FINAL.md:74-83`). inv β survives only because the library graph never dereferences the link. | — | — |
| `EasingResolvable` — close the silent-linear window, retire 3 hand-rolled `.ready()` copies | ✅ net deletion, 11 tests | — | — | **Module deleted at B.W2** — `B/FINAL.md:97-99` lists `easing-resolvable.ts` among *"−3 modules … no alias"*. A's headline artefact survived exactly one tranche. |
| `reduced-motion.ts` one SSR-safe gate, 3 copies deleted | ✅ | — | — | Superseded at B by `withReducedMotion` (*"the seven hand-written reduced-motion snap bodies → one `withReducedMotion` gate"*, `B/FINAL.md:99-102`). |
| WAAPI spring `linear()` via `css-easing.ts` | ✅ LAND | — | — | `internal/css-easing.ts` also deleted at B.W2 (same `−3 modules` line); the capability was re-expressed as the typed `Easing {fn,css?}`. |
| Dev-only LoAF observer | — | NAMED-FORWARD at A (*"no wired CI/demo consumer"*, `A/FINAL.md:205-209`) → shipped at B **with a stub second consumer** → C had to fix it: *"B shipped it claiming a 2nd consumer that was a stub"* (`C/FINAL.md:47-51`). Two tranches to get one observer honest. | — | — |
| Playwright >50ms-trace gate | — | named-forward; *"the browser-bench trace was not run in this tranche"* (`A/FINAL.md:210-212`) | — | — |
| `Worker`/`OffscreenCanvas`/`Atomics` engine path | — | — | **KILL — substrate-without-consumer.** Held permanently: `grep -rln "OffscreenCanvas" src/` → empty on the live tree. Re-affirmed as permanent-KILL at `V/DISPOSITIONS.md` §B. **The corpus's cleanest kill.** | — |
| VAL-9 `--spring-*` token regen (glass-ui-owned ASK) | kf enabler landed + kept byte-stable A→K | — | — | **SILENT DROP by attrition — confirmed by V.** `V/DISPOSITIONS.md` §B: *"A/B/C `--spring-*` token regen (VAL-9) + bucket-glassui label ASK … A/B/C → **absent S/T/U** … **RETIRE-DISCHARGED** … Constellation-absorbed; absent from the last three tranches. Discard (FAM-11 residue)."* The kf half survives: `grep -rn "springTimingFunction" src/` → `src/animation/index.ts:54`. The ask itself evaporated. |

### §2 — Tranche B (`3.1.0` changeset, unpublished)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Widen `proof:boundary` to every light barrel export, self-enforcing entry set | ✅ both negative-bite forms demonstrated (`B/FINAL.md:23-30`) | — | — | — |
| inv γ — the demo cannot ship blank (`demo-smoke.mjs`) | ✅ CI-wired | — | — | Deleted at U `70b32501`; the capability lives on as `scripts/observe/demo/smoke.mjs` (verified present). |
| inv δ — no page occludes on any viewport (`occlusion-gate.mjs`) | ✅ | **Shipped downgraded.** `C/FINAL.md:28-33`: *"B's spec demanded 'zero dock-over-content overlap'; the shipped gate downgraded it to a console NOTE and never ran the controls-open state."* C had to promote it to a HARD assertion. | — | Deleted at U `70b32501`; survives as `scripts/observe/demo/occlusion.mjs`. |
| A-record reconciliation (3 drifts) | ✅ all three named and corrected (`B/FINAL.md:58-90`) | — | Cosmetic A-doc drifts *"recorded-as-reconciled per the audit's KILL→record disposition, not re-waved"* | — |
| W5 hard gate: A11y=100 + SEO | recorded done | **`C/FINAL.md:60-66`: "B left it deferred while marking W5 done."** | — | — |
| π ("binds at full") | recorded MET | **`C/FINAL.md:36-40`: "B recorded π 'binds at full' but shipped only screenshots + a jsdom unit substitution."** | — | — |
| The before/after capture harness | authored | **`C/FINAL.md:42-45`: "B authored the before/after edict but the harness lived in `/tmp` — 're-runs identically' was unsatisfiable."** C checked it in. `scripts/capture.mjs` is **still present today** — one of the few A/B-era instruments that survived U. | — | — |
| ScrollTimeline native | — | — | **KILL with rationale, permanent** (`B/FINAL.md:135-140`). Held A→V; re-affirmed `V/DISPOSITIONS.md` §B. E later added a native ScrollTimeline **bridge additively** — *"the JS-sampler kill HOLDS"* (`E/FINAL.md:36`). Correct handling of a kill that later gets a non-replacing sibling. | — |

### §3 — Tranche C (`major` changeset, unpublished)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| **inv ε — every MET gate resolves to a checked-in, re-runnable instrument shown to PASS, not a narration** | ✅ established (`C/FINAL.md:6-8, 93-94`) | **The corpus's central invariant — and it did not hold.** Re-asserted by D, E, K, L, R; the overclaim chain (KF-α) ran straight through it to L. | — | — |
| inv ζ — dogfood: the demo carries no hand-rolled rAF the engine already is | ✅ 7 loops transposed; `proof:dogfood.mjs` standing | — | — | Gate deleted at U. |
| Reconcile B's seven false-MET gates | ✅ all seven, itemized | — | — | — |
| φ-ladder leaf-tail F6 (~128 body sites) | — | BOOKED to a "mechanical follow-on"; **carried A→B→C, named CHRONIC** | — | Landed at D.W2 (`D/FINAL.md:186`) — a 4-tranche chronic, closed. |
| square-scene mobile occlusion | — | NAMED allowance with self-cleaning stale-check | — | Became a glass-ui HANDOFF at D/G; part of the CH-3 "mobile" chronic that survived to K (5 carries). |
| `dev.sh`/`deploy.sh` library-shaped scripts | — | — | **KILLed-with-rationale (W4 S7, "the terminal call")** (`C/FINAL.md:121-122`) | — |

### §4 — Tranche D (`major` changeset, unpublished) — **the retroactive close**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| D.W4 the engine transposed to its gestalt `[major]` — `FrameCompiler` split, zero-alloc compositor, `tick`→`advanceTo`, `pause/resume/toggle` | ✅ `a0303fe` | — | — | — |
| D.W6 the close | content ran | **The FINAL doc was never committed.** Written from the G vantage, ~2 weeks later (`D/FINAL.md:14-17`). See KF-γ. | — | — |
| D.W5 dock rename + occlusion mask removal | — | **The ONE legitimately-blocked carry** — gated on glass-ui *publishing* 3.3.0; closed at **G.W12** `1b9b05f` | — | — |
| D-3 computed-unit changed-keys write | — | — | **MEASURED + WITHHELD** — *"the keyframes-local benefit is ~0 on the interpolation hot path … The measurement is recorded (`test/d3-changed-keys.measure.test.ts`) rather than a speculative optimization shipped"* (`D/FINAL.md:73-79`). Model discipline; the real win landed in value.js at F.W6. `bench/d3-changed-keys.measure.test.ts` **still present today.** | — |
| *"D is the terminal home for every keyframes-owned deferral … P-invariant-28 satisfied"* (`D/FINAL.md:177-203`) | ✅ for A..D debt | **The claim held for exactly two tranches** (E and F each opened with a clean ledger, as D predicted) **and then failed structurally**: H found four chronics that had "exited" A→G by re-classification; K exited ten ≥4-tranche riders; Q exited a NINTH-carry item; R hard-stopped an 8th and a 6th. | — | — |

### §5 — Tranche E (`minor` changeset, unpublished)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 11 waves: demo elevation, 5 engine correctness bugs test-locked, orchestration tier as new public API, platform-adoption seam | ✅ 6 commits; 13 gates; 460 tests | — | — | The orchestration tier E shipped **was never published for five more tranches** — `J/FINAL.md` §1: *"`src/animation/index.ts` shipped a 16-export orchestration tier accreted E→I and never published"* (npm frozen at `4.1.0` through I). |
| W7 Strand B micro-perf, W8 S1/S2/S3 SoA + incremental compiler, W5 `tryParseCache` eviction, W4 lighthouse-mobile | — | — | **Recorded-WITHHELD, measure-first** — *"the small flatVars dict + monomorphic access are unmeasured costs; no speculative machinery"*; *"an LRU would be speculative complexity"*; *"the §Mandate forbids asserting an unmeasured win"* (`E/FINAL.md:39-54`). The corpus's best-behaved refusal band. | — |
| W9 S4/S6 native CSS Color L4 + `currentColor`/`light-dark()` | — | RECORDED as value.js handoff (inv-16: *"keyframes proposes, never writes value.js"*) | — | Part of the VJ-F* next-slice family that V later found **absent from S/T/U** and retired: *"H VJ-F1/F2/F3 + PT-4 packrat re-key next-slice … H → absent S/T/U … **RETIRE-DISCHARGED** … Discard"* (`V/DISPOSITIONS.md` §B). |

### §6 — Tranche F (`4.0.0` — the B+C+D+E+F stack)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 16 narrow waves; *"~90% of the post-E stack ALREADY-SOTA and left untouched"* | ✅ | — | — | — |
| F.W4 interp fast-properties — *"~3.0× (K=2) / 3.0× (K=5) / 2.8× (K=12) faster"*, pixel-identical | ✅ `proof:interp-fastprops` | — | — | — |
| F.W5 sync-step: the `Animation`/group half | light-engine half ✅ | **HELD behind the event-ordering lock** (*"the §Mandate's no-ship-on-assertion"*) — a deliberate partial | — | Rode as a BOOK to I (`I/FINAL.md` §6 lists *"async sync-step half"* among engine BOOKs). |
| F.W6 computed-unit endpoint cache | ✅ **but in value.js, not kf** — *"a kf-side wrapper would duplicate value.js's resolver … so per the §Mandate (no boundary breach) the win **landed in value.js** (C1/C2/C4/C7 — −94% measured)"* | **The architecture was load-bearing on "kf consumes it on re-pin" — and the re-pin never happened in F.** `G/FINAL.md:38-40`: *"The whole F.W6 architecture was load-bearing on 'kf consumes it on re-pin'; **the re-pin never happened.**"* One full tranche of a shipped-but-unconsumed win. | — | — |
| Cross-repo hand-offs driven directly into value.js + parse-that | ✅ 1607 + 266 tests green | — | inv-16 (*"kf never writes a sibling"*) **explicitly relaxed by the user for this drive** — a rare recorded owner override | Both siblings' work **NOT published** at F close — consumed only at G. |
| GitHub Pages deploy | — | — | **RETIRED** — *"the legacy GitHub Pages `deploy.yml` + the gh-pages-branch path are **RETIRED** and the GitHub Pages site disabled (it served a parallel site the DNS never pointed at)"* (`F/FINAL.md:120-124`). CF Pages becomes deploy-of-record. | — |

### §7 — Tranche G (`4.1.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| **The re-pin spine** — finally consume the published F sibling-wins | ✅ **ZERO library source edit** through the single `lerpValue → iv._lerp` seam (`engine.ts:731`) | — | — | — |
| G.W5 library line-ceiling | ✅ **DECIDED, not re-deferred** — ceilings + RECORDED gated exceptions; *"NOT a reflexive split"* (`G/FINAL.md:78-84`) | — | — | — |
| G.W17 the dead `add`/`weighted` blend leaf | ✅ *"the guard tested a bare `ValueUnit` but the leaf is a `ValueUnit[]`, so **both UI-exposed blend modes silently collapsed to `replace`**"* — the ONE real net-new bug | — | — | — |
| Write D's missing FINAL (DP-2) | ✅ `docs/tranches/D/FINAL.md` | — | — | — |
| The demo's `@mkbabb/keyframes.js → src` self-alias | shipped as a one-line fold | **A knowing supersede of a standing rule** — *"supersedes the contract-v2 no-self-alias rule that presupposed the `file:` symlink the registry pin removed"* (`G/FINAL.md:62-64`); *"STAYS until"* glass-ui widens both peers | — | — |
| Adversarial 5-lane review | ✅ 1 HIGH, 1 MED, 2 LOW all fixed `bbc0212` | The MED is instructive: *"`proof:demo-usability` ignored `KF_REQUIRE_BROWSER`: its two browser-only clauses **skipped silently while reporting PASS**"* — a gate lying green, one tranche before H did it at scale | — | — |
| G's own honest headline correction | — | *"Honest delta: the render leg is the simplification — the SFC net change is small … **NOT 'net-negative lines' as the charter headline first projected**"* (`G/FINAL.md:144-146`) — a rare in-close self-correction | — | — |

### §8 — Tranche H (`4.1.1` PATCH, **never published**) — **the false close**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 13 waves, demo-quality band; **102 `proof:*` scripts**; *"`proof:all` green, `proof:browser` 35/35, `proof:chronic-closure` green"* | claimed ✅ | **THE CERTIFICATION WAS FALSE OF THE PRODUCT** (KF-δ). `I/FINAL.md:34-40`: *"~54 of ~98 nominal correctness gates could not, by construction, see a runtime defect; the ~34 that opened a browser rested on load … **and not one drove PLAY-then-SWITCH and asserted a clean console.** … 97 green gates certified a broken demo because every oracle was a proxy."* | — | — |
| Four chronics CLOSED via SYSTEM-property gates; `proof:chronic-closure` meta-gate makes H *"the LAST tranche these four chronics can be re-papered"* | claimed ✅ | **All four re-opened at I** as CH-1..CH-4 and re-closed against runtime gates. CH-2 (φ-hero) was closed at H, RE-AFFIRMED at I, and then found *mis*-RE-AFFIRMED at K: *"DL-K10 (4-tranche typography root; **CH-2 mis-RE-AFFIRMED**) EXITED via born-RED→green"* (`K/FINAL.md:26`). **A chronic that was declared closed three times before it was actually closed.** | — | — |
| `proof:specular-handoff` — born-RED HANDOFF gate paired to glass-ui 3.8.0 | authored | **Vaporware.** `I/FINAL.md:113-114`: *"The vaporware IOU `proof:specular-handoff` was **DELETED**."* I's §5 names the failure mode generally: *"a born-RED HANDOFF parked against vaporware never bites."* | — | — |
| Five H gates | ✅ shipped | — | — | **RETIRED at I.W7** as un-seeing proxies: `proof-demo-console-clean`, `proof-dock-morph-settled`, `proof-no-orphan-specular`, `proof-scene-icons`, `proof-dragscrub-single` (`I/FINAL.md:111-113`). |
| `4.1.1` PATCH publish | — | — | — | **Never happened.** `git tag` shows no `v4.1.1`; the next tag is `v4.2.0` (2026-06-11, J). The changeset sat *"PENDING/unconsumed in `.changeset/tranche-h.md`"* (`I/FINAL.md:238-239`). |
| — | — | — | — | **`ci.yml` was YAML-invalid from H.W12 (`f93e731`) and nobody noticed until after I closed** (`J/FINAL.md` §1 INVE-1). H's CI-green claims for its final waves were unverifiable. |

### §9 — Tranche I (no version cut) — **the correction**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Nine live breakages B1–B9 + K recovered, each behind an ACTUATING runtime gate witnessed born-RED on the `b934a08` defect tree | ✅ 8 waves, `107236d`…`1a708cf` | — | — | — |
| The gate-regime overhaul: two-tier `proof:correctness` (10 actuating gates) / `proof:hygiene` (strictly corroborating, *"may NEVER substitute for a red runtime clause"*) | ✅ + the meta-gate `proof:gate-is-runtime` enforcing it from t=0 | **J found the regime's remaining blind axis**: *"`proof:live-session` was desktop-1440-only: mobile, touch, `prefers-reduced-motion`, dark mode, keyboard/focus … all un-exercised. The CH-3 'mobile' chronic was certified by desktop mouse gates. *The un-exercised axis is where the next lie lives*"* (`J/FINAL.md` §1 INVE-2). | — | — |
| The engine un-fenced (*"`src/animation` is the kf PRODUCT"*) | ✅ — a permanent rule change carried by J onward | — | Reverses H's inv-ζ fencing | — |
| B3 amiga GPU-stall leg | ✅ honestly split | — | **Root-caused as instrument artifact, not product**: *"the 4 stalls are a one-time cold-GPU-process init burst … flagged a 'stall' ONLY under headless SwiftShader; a WARMED second load emits ZERO … the harness `page.screenshot` is the measurement INSTRUMENT, not the product, so it does not charge"* (`I/FINAL.md:138-152`). Model handling of a false positive. | — |
| The `d469e69` damage-control revert | — | — | **SUPERSEDED-BY-FIX-SHIP — "recorded, not executed"** (`I/FINAL.md:246-249`) | — |
| §9 — *"This FINAL asserts no gate green that the wave notes + `PROGRESS.md` do not. It may not — and does not — overclaim."* | — | **It did.** J's `audit/final-vs-tree-inv-epsilon.md` found INVE-1 and INVE-2 in this exact document. The strongest anti-overclaim statement in the corpus, falsified by the next tranche. | — | — |

### §10 — Tranche J (`4.2.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Extend the gate-ORACLE precept to every boundary: deploy, publish, docs, axes | ✅ 10 waves | — | — | — |
| The deploy boundary — an OBSERVED green-CI → auto-deploy round-trip | ✅ born-RED on CI run `27228309606`; observed twice | — | — | — |
| The published surface — publish the E→I orchestration tier npm never saw | ✅ `4.2.0` via `release.yml`'s first-ever run `27378331075` | — | — | — |
| The doc boundary — `CLAUDE.md` documented *"a DELETED barrel architecture, ghost demo dirs, and '15 test files / 261 tests' against a tree of 77 test files"* | ✅ purged | **Recurs.** S.A5 (2026-07-03) again fixes *"the actively wrong lines"* in CLAUDE.md and defers the full regen to S.B8; S never closed, so the regen rode to T/U. Doc-rot is the corpus's most reliably-recurring debt. | — | — |
| J.W3 estate industrialization | ✅ **measured net deletion**: *"estate LoC 35,191 → 31,775 measured strictly DOWN"*; bite-preservation 9/9 sampled gates RED-on-plant → GREEN-on-restore | — | — | — |
| FB-6 `Mod+K` command palette | — | — | **owner-decision BOOK** at H, then permanent KILL — confirmed held at `V/DISPOSITIONS.md` §B (*"`Mod+K` palette FB-6 (J) … stayed KILLed A→U"*) | — |

### §11 — Tranche K (`4.3.0`) — **the first-click tranche**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Band I — the cold-entry P0; the product true from the first gesture | ✅ `239da4a`; `proof:cold-entry` 605 LOC born-RED→green | — | — | — |
| The liveness oracle **de-vacuoused** — *"`proof:live-session` B1 now reads the engine's own write channel (**the `.idle-hover` CSS bob that fooled it excluded**)"* | ✅ | **I's headline gate had been passing on a decorative CSS animation.** The gate-of-gates was itself vacuous for a full tranche. | — | — |
| Band II — the CSS-@keyframes round-trip TOTAL (ingest / scroll / compile / physics / externalize) | ✅ W7–W11; W12 **STAGED, not committed** — *"the close claims only what landed (inv ε)"* | — | **CC-3's four refusals** — weighted blend / custom renderers / perceptual oklab / computed-unit drift *"REFUSED with a named reason, never silently approximated"* | — |
| Design totality closed on **the owner's verdict, not an agent's** | ✅ *"Meets the bar — close Band I" (Mike Babb, 2026-06-16, `TASTE-VERDICT.md`, `ace40ee`)*; **P-TASTE: "an agent's 'designer-eye PASS' is corroboration, never the verdict"** | — | — | The protocol worked here and was **not enough** — S (2026-07-04) got a wholesale rejection anyway. |
| All ten ≥4-tranche `‡` riders EXITED; `proof:chronic-closure` GREEN on a 44-row substrate | ✅ | **L then found the K "subset" was a family of shipped replay-equality breaches K's gates never caught.** | — | — |
| `@mkbabb/keyframes-vue` (ED-2, the thin Vue adapter) | authored, staged | — | — | **KILLED at R** — *"RETRACTED in totality R.W0 (`23a6867`): npm-unpublished + `packages/keyframes-vue/` deleted"*. Verified: `ls packages/` → empty; `git log --diff-filter=D -1 -- packages/keyframes-vue/package.json` → `23a68677 chore(R.W0): remove keyframes-vue completely — overfit adapter retracted`. Published once (Q, `0.1.0`) then unpublished. |
| KF-OSCILLATOR (glass-ui BB ask) | BOOKED at K | — | — | Actually landed — `src/animation/physics/oscillator.ts` present today. |

### §12 — Tranche L (`4.3.0`, no own cut)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Band A — replay-equality TOTAL over a device-honest gate corpus on a dogfooded published barrel | ✅ each wave on a re-run green born-RED oracle | — | — | — |
| `proof:all` green | **NO — three roster reds, found only at close** | *"the per-wave incremental checks had **masked these via piped exit codes**"* (`L/FINAL.md` §0.2). Three blocking members had grown un-reconciled through the whole Band-A run: a mis-tiered gate, an un-regenerated llms index, and four files past their ceilings. Cured at `d7c7f3d`. **The aggregator that certified every wave had been reporting success through a broken pipe.** | — | — |
| The `!important` keyframe round-trip | — | — | **CORRECTED to the spec-faithful verdict**: *"per CSS Animations §3 a property with `!important` inside a keyframe is invalid and ignored — value.js drops it, kf mirrors the drop, and the test LOCKS `not.toContain("!important")`"* (`L/FINAL.md` §S1). A fixture assertion reversed on spec grounds mid-tranche. | — |
| The deploy round-trip | — | **HANDOFF, explicitly NOT claimed observed** — *"the deploy round-trip is HANDOFF, NOT claimed observed; the version string is RECOMMENDED, NOT asserted cut"* (`L/FINAL.md` header). The most disciplined header in the corpus. | — | — |
| Band B un-consumed edges (value 0.13, glass BB, parse-that 0.9, keyframes-vue) | — | NAMED with tripwires | — | Resolved: *"Consumed by the M/O/Q constellation drives; keyframes-vue KILLED (R). Discard"* (`V/DISPOSITIONS.md` §B). |

### §13 — Tranche M — ❌ **NO FINAL**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 16 waves across two bands, from a 32-lane deep audit; three M-born invariants (inv-M-one-runner, **inv-M-observable-truth**, inv-M-two-axis); a `5.0.0` cut with FOUR breaking changes | **5 of 16 waves.** `O/PROGRESS.md` §0: *"Tranche M was developed as a 16-wave plan and **partially implemented**: M.W1 (parallel runner), M.W8-Phase-1 (lockfile), M.W9/S7 (linear-stops delete), M.W10 (packrat-sound/FOLD-FIX), and M.W11 (css-parity gate) are GREEN on `master`. The remaining twelve waves … "* | The `5.0.0` cut M proposed was fired by **Q** three tranches later. | — | **The M.WZ chronic-ledger re-point was SKIPPED** (`R/FINAL.md:53-56`) — M inherited the parse-substrate obligation from L and never discharged it, leaving the live meta-gate pin stale. |
| `M/PROGRESS.md` §"Open deferrals" to become *"the NEXT chronic-closure parse substrate"* | ❌ | — | — | **Never became it.** The pin stayed at L until Q re-pointed L→Q directly, skipping M, O and P. Three tranches of deferral-honesty enforcement pointed at a three-tranche-stale table. |

> **M is the corpus's clearest case of a plan absorbed sideways.** No FINAL, no close ceremony, no P-inv-28 discharge — its content was re-audited by O nine days later and its remainder re-planned rather than reconciled.

### §14 — Tranche N — ❌ **NO FINAL, NEVER IMPLEMENTED**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| A 9-wave "Stage scene-switcher" tranche from a 3-lane research triumvirate + a locked design synthesis (`audit/design-synthesis.md`, *"READ THIS FIRST before authoring any wave spec"*); seven locked decisions; ⚠N1–⚠N8 precept reckoning | **Zero waves implemented.** All nine `N/waves/N.W*.md` exist; `N/PROGRESS.md` header: *"**DEVELOPMENT PHASE** … all nine waves DEVELOPED"* | Substrate parked on a branch — `git rev-parse n-stage-impl` → `e2375b82` (exists, unmerged, *"behind master — do NOT rebase before BC cut"*, `O/PROGRESS.md`) | **KILLED at R** — `R/FINAL.md:42`: *"**DM-24 N-Stage unshelf** | 3→4 | **KILL — redundant** | The mobile shelf-driver already shipped at Q.WC3 … the `n-stage-impl` branch unshelf is REDUNDANT. Formally KILLED, not rebased."* | — |

> **N is a fully-designed tranche that never ran and was retired as redundant by a capability a later tranche shipped independently.** The research + synthesis + 9 wave specs are sunk cost, honestly retired.

### §15 — Tranche O — ❌ **NO FINAL**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 18 wave files across an eight-band DAG from a 32-lane constellation re-audit; two P-inv-28 **ABSOLUTE** chronics (DM-2, DM-3) given BUILD-IN homes; a `5.0.0` cut | **A subset in `4.4.0`** — `git log -1 --format=%s v4.4.0` → *"release(O+P impl): @mkbabb/keyframes.js 4.4.0"*. `O/PROGRESS.md`: *"the 4.4.0 cut shipped the O subset fromMorphSVG + the S8 WeakMap + the S9 parse-that-dep removal"* | *"the breaking O.W7 split / O.W5 DemoControlPoint / O.W9 alias-drop are **Tranche Q terminals**"* | — | **O.WZ re-point SKIPPED** (`R/FINAL.md:53-56`). |
| DM-2 (the control-point chronic) BUILD-IN | — | — | — | Rode to **Q**, where it exited on its **ninth carry**: *"**DemoControlPoint** — the DM-2 NINTH-carry chronic GENUINELY EXITS (browser-verified pointer-drag re-shapes the bezier + re-times the subject)"* (`Q/FINAL.md:26-28`). |

### §16 — Tranche P — ❌ **NO FINAL**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 14 waves, an 8-band optimization DAG, a shared `CONSTELLATION-OPTIMIZATION-CAMPAIGN.md` constitution across three sibling sessions; a `5.1.x` cut riding after O's `5.0.0` | **A subset in `4.4.0`** (shared cut with O) — *"the 4.4.0 MINOR cut shipped the additive/internal SUBSET of P's waves — the breaking + deferred remainder is the Tranche Q terminal roster"* | The measured verdicts are unusually good: *"**P.W6 spring-heatmap ADOPT** (closed-form **272×** settle-time / **507×** overshoot faster than 400 live `SpringProgress`)"*; *"**PT-B2 RE-SCOPE / PT-B4 KILL** (the `*Span` tier has ZERO consumers)"* (`P/PROGRESS.md` FULL-LOOP-LEDGER summary) | `§4 codegen spine is RETIRED` — a whole band of the shared constitution killed; confirmed permanent at `V/DISPOSITIONS.md` §B (*"P.W4 codegen tombstone … stayed KILLed A→U"*) | **P.WZ re-point SKIPPED** (`R/FINAL.md:53-56`). |

> **M, O and P together are the corpus's "three skipped closes."** Each ran a 32-lane audit, authored 14–18 waves, shipped a partial subset, and transferred its remainder to a successor without a close record or a ledger discharge. R names the pattern and repairs it in one atomic commit (`f01fa9a`).

### §17 — Tranche Q (`5.0.0`) — the no-deferral terminal

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Absorb the O + P breaking remainders; terminate the P-inv-28 ledger; a four-repo coordinated publish | ✅ merged `186acec`, tag `v5.0.0`. parse-that `0.13.0`, value.js `1.2.0`, keyframes `5.0.0`, keyframes-vue `0.1.0` all published | — | — | — |
| DM-2 ninth-carry chronic | ✅ **GENUINELY EXITS** via browser-verified BUILD-IN | The word *"GENUINELY"* is doing real work — the corpus had learned to distrust the word "exits" | — | — |
| DM-7 keyframes-vue published (*"P-inv-28 belt EXITS, no 6th carry"*) | ✅ published, *"write-confirmed E403-on-republish"* | **Retracted 24 hours later.** R.W0 `23a6867` unpublished it and deleted the package. The item that exited the belt by *shipping* was then killed by *retraction* — the same tranche pair. | — | — |
| `proof:chronic-closure` re-pointed L→Q + NON-VACUOUS (3 plants → RED → GREEN) | ✅ | — | — | — |
| glass-ui BC consume (kf S1/S2 deletes + N-Stage unshelf) | — | — | **GATED-PENDING, "correctly, per plan"** — *"USER-DOMAIN — owner WIP on `prototype/liquid-dock`"* | — |

### §18 — Tranche R (`5.1.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| The surgical refactor — 7-zone directory partition, two god-class carves, no-legacy excision, demo scene-fusion | ✅ merged, green | — | — | — |
| The chronic re-point done **atomically**, repairing the M/O/P skip | ✅ `f01fa9a`, with the exact gate-code co-edits cited by line so the successor need not grep — `scripts/proof-chronic-closure.mjs:117`, `:493`, `:550`, `:102` | **The most considerate close artefact in the corpus** — and it was deleted two tranches later at U (`4bd469ed refactor(U.A5): dissolve stale self-policing gate ledgers`). | — | — |
| DM-1 (8th carry) + DM-5 (6th carry) | ✅ EXITED | — | **via [B] CONTINGENCY KILL** — *"glass-ui 4.0.1 lacked the BC `dockStrandKeepalive`; band-aid EXCISED, replaced with a kf-internal disjoint `pointerup`+`keydown` handler"*. **Eight tranches of waiting on a sibling, resolved by giving up on the sibling.** | — |
| `animate()` + granular `loadEngine`/`loadCompiler`/`loadIngest` | — | — | **REMOVED at 0/32 and 0 adoption** — owner-directed *"remove animate() in favor of our more idiomatic solutions"*; *"recorded as removals in the `## 5.1.0` CHANGELOG entry, not used to force a 6.0.0"* (owner: *"5.0 is fine"*) | — |
| DQ-3 `contrast-color()` consume | — | — | **KILL — reasoned**: *"value.js 1.2.0 published the parser … kf has NO demo use-case … KILLED with that reason rather than gating an unused capability"* | — |

### §19 — Tranche S — ❌ **NO FINAL, NO VERSION TAG**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| The honesty-then-altitude tranche: *"make the repo's own instruments tell the truth again (**master CI red on every push since K; the deploy-of-record dead; the authoritative library map documenting a tree that no longer exists**)"*, then deep structural work + platform uplift | Bands A–H largely CLOSED per the board (S.A0 keystone, S.A2, S.A4, S.B1, S.G3, S.C4/S2 consume-edge fired at `74ee9d2`) | **The whole drive terminated by owner rejection.** `S/PROGRESS.md` final entry: *"**THE T-PIVOT — S drive TERMINUS.** `f2d05c7`: the owner live-reviewed the demo (`:5180`) and **REJECTED it wholesale** — Tranche T DEVELOPMENT opened, the 22-defect VERDICT recorded (18 shots preserved) … the S close (Z1-Z3) BLOCKED pending T dispositioning; **the S instruments were ALL-GREEN when the verdict landed (the META-FINDING: the instruments' bar ≠ the owner's bar).**"* | — | — |
| The gate-roster diet 190→~138→~120 | ✅ *"tiers landed LC 38 · DC 23 · hygiene 118; keys 192→188, FROZEN 51 declared"* | The diet reduced the roster by 4 keys against a target of ~70. **U later deleted all of it** (KF-β). | — | — |
| S.A3 deploy-of-record revived | PENDING-IMPL at terminus | — | — | Rode to T.S6 (`b13dd65`, mechanism LANDED). |
| S.A5 doc-authority restoration | hot-fix only | *"full regen deferred to S.B8"* — and S never reached B8 | — | Rode to T/U. |
| Row 67 "drag-gesture discharged" | ❌ | **A ledger row that was FALSE and self-corrected**: *"the S.G3 `354bab8` discharge was incomplete (one surface; reproduced serially), so **row 67's table cell claiming discharge is FALSE** (the ledger-vs-script disagreement lane 27 F3 names; corrected at T.S2)"* | — | — |
| A version cut | — | — | — | **Never happened.** `git tag` gap: `v5.1.0` (2026-06-24, R) → `v5.2.0` (2026-07-09, T). S's drive ran 07-02→07-04 entirely between them and cut nothing. |

### §20 — Tranche T (`5.2.0`)

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| Cure all 28 owner verdict items from the wholesale rejection | ✅ 25 LANDED; residue EXTERNAL-BLOCKED on glass-ui BG-5/GU-1/GU-2/BG-11 + value.js `PropertyDescriptor` | — | — | — |
| The seven owner decisions (OD-1..OD-7) FILLED before authoring — *"every born-OWNER oracle carries its OD token before authoring (`proof:owner-verdict-recorded`); the register is machine-bound, not prose"* | ✅ register CLOSED | — | **OD-1 PRUNE (FINAL)** — morph + motion-path + compose demo scenes **deleted**, library factories survive. Owner verdicts quoted verbatim in the cure map: *"remove this crap"* (×2), *"broken mess, doesn't interleave"*, *"performance god awful — from the ground up"*, *"superfluous nonsense"*. | — |
| T.F — THE GRAND COLOCATION EDICT (demo restructured from first principles, 23 waves) | ✅ `proof:colocation` KEYSTONE | — | — | — |
| The close checklist | 4 of 7 boxes checked | **The FINAL was never un-drafted.** `T/FINAL.md:3` still reads *"Status: DRAFT — … Close NOT yet fired"*; §6 still shows `- [ ] Version tag **5.2.0**`. But `git log -1 --format="%h %ad" --date=short v5.2.0` → `cf9b268e 2026-07-09`. **The close fired; the record didn't move.** See KF-γ. | — | — |
| The four dock-crispness tripwires (`subject-legible` / `blur-not-resampled` / `dock-rest-crisp` / `dock-morph-continuity`) | born-RED, awaiting glass-ui | — | — | **SILENT DROP, caught by V and marked DISEASE.** `V/DISPOSITIONS.md` §A: *"CH2-02 T's four dock-crispness tripwires **DE-TRIPWIRED** … T close → U close (2), **ungated** … **DISEASE: Yes** (T→U un-gated) … **FOLD W2 — killed here** … Re-instate one dock-crispness live check on the Glass-7 consume, OR retire the four with a one-line rationale. **No silent ungated hope.**"* The apparatus deletion at U silently voided T's tripwires. |

### §21 — Tranche U (`5.3.4` / `5.3.5`) — **the dissolution**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| *"U dissolved the repository's enforcement bureaucracy and completed the product work it had obscured."* 227 proof keys → **2**; 193 flat scripts → **0**; 182 files deleted; `scripts/` 66,706 → 10,776 lines; `vite.config.ts` 747 → 392 | ✅ **verified live** (see KF-β measurements) | — | *"No expected-red class, backlog ledger, recap-policing gate, or capability registry survives."* — the explicit repudiation of nine tranches of apparatus | The T tripwires (§20) went with it, un-decided. |
| Correctness re-homed to Vitest; live truth to six direct browser observations | ✅ `ls scripts/observe/demo/` → `live-session-mobile.mjs live-session.mjs occlusion.mjs smoke.mjs subject-animates.mjs usability.mjs` — six, exactly as claimed | — | — | — |
| All nine bands CLOSED | ✅ incl. *"U.A — **CLOSED LAST BY AMENDMENT.** The residual apparatus was reduced from 204 package proof keys to two."* | **U.F is honest about a gap**: *"CLOSED FOR U. Published Glass/value edges are coherent; unshipped sibling work has named release producers and **no local tripwire**."* — the deliberate removal of the tripwire mechanism, stated plainly. | — | — |
| U.R — the recap gate | — | — | *"**CLOSED AS A RECORD.** The vacuous recap gate was deleted"* — a gate killed for vacuity by its own tranche | — |
| *"FINAL-U: terminal 5.3.4 / no V backlog"* | — | **Superseded within a day.** `V/DISPOSITIONS.md` §A CH-01: *"FINAL-U 'terminal 5.3.4 / no V backlog' superseded within a day … npm `latest=6.0.0` … **BUILD W2** … Handoff — not FINAL-U — is the real V inherit."* Live tree is `6.0.0`, tagged 2026-07-16, one day after U's `5.3.4`. | — | — |

### §22 — Tranche V — ❌ **NO FINAL — OPEN TODAY**

| PROMISED | LANDED | HALF-BAKED | REJECTED-EXPLICITLY | SILENTLY DROPPED |
|---|---|---|---|---|
| 13 waves (W1 Render Truth … W13 Close) from a **32-agent, 3-round audit** ending in *"two consecutive family-clean passes; **THE REGISTRY IS STABLE**"* | **Formation only.** `V/PROGRESS.md`: *"**State: EXECUTION DISPATCHED 2026-07-17** — entry anchor = `EXECUTION-HANDOFF.md`"* | — | — | — |
| `DISPOSITIONS.md` — *"Every chronic, deferred, banked, partial, or refuted item carries **exactly one** terminal state: BUILD / FOLD / RETIRE / BANKED. **Re-booking is forbidden.** A row that rode ≥2 closes un-decided is marked **DISEASE** and its terminal decision cites the wave that kills it."* | ✅ authored | **The corpus finally names the disease and builds a machine for it — at tranche 22 of 22.** Three rows carry DISEASE or Watch marks (CH2-02 the de-tripwired dock quartet; CH-06 *"'K.WZ does the K-tranche republish' inside a 'COMPLETE' doc"*, un-updated K→U; CH-02 *"re-word-not-decide behavior"*). | — | — |
| The live-broken inherit | — | **The prepared transaction was broken on arrival**: FAM-02, *"blank-on-all-7-routes crash: `EditorShell.vue:30` `<Tooltip>` without root `<TooltipProvider>`"*, and PR-2, *"the demo consumes an undeclared, unpublished, registry-absent Glass 7 (43 files import it)"* — the `master` working tree is dirty with exactly this transaction today. | — | — |
| Retirement of five inherited ask-families | — | — | **`V/DISPOSITIONS.md` §B retires four families as RETIRE-DISCHARGED on the grounds of absence**: A/B/C's VAL-9 `--spring-*` regen (*"absent from the last three tranches. Discard (FAM-11 residue)"*), H's VJ-F1/F2/F3 + PT-4 (*"absent S/T/U. Discard"*), K's engine-seam split, L's Band-B edges. **This is the corpus formally reading its own silent drops and closing them by admission.** | — |

---

## §23 — What the mega-tranche should take from this corpus

1. **An anti-overclaim invariant enforced by the *next* tranche is a detector, not a preventer** (KF-α). inv ε was established at C and the overclaim chain ran through six more closes. If value.js's V-next wants closes that don't lie, the check must run *before* the FINAL is written, against the running product, by someone who did not do the work.
2. **Gate count is anti-correlated with product truth in this corpus.** The peak apparatus (H, 102 gates) produced the worst product state; the two-gate terminal state (U) was reached by deleting 182 files. `U/FINAL-U.md` is the receipt. Before adding a gate, ask which of the six `scripts/observe/demo/` observations it beats.
3. **"The instruments' bar ≠ the owner's bar" (S) is the corpus's one-line thesis.** It happened three times on three apparatus generations (KF-δ). K's P-TASTE protocol — hand the owner a review packet, close on the owner's verdict, treat agent design opinion as corroboration only — is the only mechanism that ever worked, and it worked once.
4. **Unclosed tranches transfer obligations sideways and the transfer is where things die.** M/O/P skipped their `WZ` re-points for three consecutive tranches (KF-γ.3); T's tripwires died in U's apparatus deletion (§20) and were caught only by V's DISEASE audit. **Every close-less handoff needs an explicit "what did the predecessor owe" reconciliation, not an inherit.**
5. **The corpus's cleanest dispositions are its refusals, not its ships.** D-3's measured withhold, E's four recorded-WITHHELDs, K's CC-3 four refusals, P's `*Span` KILL at zero consumers, R's `contrast-color()` KILL for want of a use case, and the A→V permanent Worker/OffscreenCanvas kill (verified `grep` empty today). **Every one of these is still correct. Almost none of the elaborate deferral machinery is.**
