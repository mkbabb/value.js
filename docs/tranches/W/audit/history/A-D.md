# Historical audit — tranche scope A · B · C · D

**Seat**: historical audit, scope A–D. **Written**: 2026-07-24. **Repo HEAD**: `c654824e` (branch `tranche-u`).
**Product**: input to the next value.js mega-tranche (W). **Posture**: hostile. Every close in scope
declared success; this document is what those closes are hiding.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, as reported in
this session's environment block. No tier probe was run; this is the served-tier declaration, not a
measurement. If the next seat needs a measured tier, that is a separate probe.

---

## §0 — Scope, method, and the honesty of the numbers

**Corpus audited** (`ls -R docs/tranches/{A,B,C,D}`):

| Tranche | Close doc | Waves | Audit lanes | Research | Captures on disk |
|---|---|---|---|---|---|
| A | `A/FINAL.md` (72 L) | W0–W7 | 39 files | Aa–Ae + challenge | 6 PNG dirs, 21 PNG |
| B | `B/FINAL.md` (68 L) | B.W0–B.W4 | 21 files | Ba–Bz (8) | 4 PNG dirs, 30 PNG |
| C | `C/FINAL.md` (153 L) | W1–W3 (never executed) | 0 | README only | none |
| D | `D/FINAL.md` (229 L) | D.W0–D.W6 | 39 files | Da–Dn (18) | 3 PNG dirs, 6 PNG + 3 bench txt |

**Commitment ledger — 120 distinct promised rows**, counted as: A 13 mandates + 4 named keystone
runtime faults (A-key-1..4) = 17; B `findings.md §2` rows A–N = 14; C's 10 named scope items across
its 3 axes = 10; D `findings.md §2` = 79 rows (Da-1..2, Db-1..9, Dc-1..3, Dd-1..4, De-1..7, Df-1..6,
Dg-1..3, Dh-1..7, HARDEN-1/3a–3f/4a–4f/5a–5d/6a–6d = 21, LIB-L1/L3/L4/L5/L6/L7/L9/L10/C1/C2/RX = 11,
RA-1/RA-2/RB-1/RB-2/RB-3/REL-1 = 6). Deferrals, carries and successor destinations are counted
separately in §4 and are not in the 120.

**On the "landed" count — read this before using it.** This seat positively verified **14** rows as
actually landed against the tree or git history. It positively verified **12** rows as
partial / false-premise / silently dropped / re-booked. The remaining **94 rows are UNVERIFIED by
this seat**. UNVERIFIED is not "landed" — the close documents' own claims are not evidence, and
`FINAL.md`'s own disposition column is precisely the artifact under suspicion. A full 120-row
verification is a follow-on lane, and it is worth running: the 26-row sample returned a **46 %
defect rate** (12 of 26 rows did not hold as written).

**Structural fact that limits historical verification**: the pre-v4 `src/` tree was retired wholesale
at `164343c1` (`feat(v4)!: value 4.0 producer surface + packed-surface gate; retire pre-v4 src
trees`). `ValueUnit`, `ColorChannel<T>`, `src/units/`, `src/parsing/` and their tests no longer
exist. Historical verification of D-era library claims must therefore be done against the D-close
tree object `7ac4ecc9`, not against HEAD. Every D-era claim below is verified against `7ac4ecc9`
where the current tree cannot answer.

---

## §1 — THE HEADLINE: a full backend architecture rewrite shipped behind `tsc --noEmit`

This is the single largest green-over-broken in scope, and it is the one the next tranche should
carry forward as a standing law.

**D.W2** was D's largest wave: 4 lanes, `626b107` + `491a5d8` + `b7d7c63` + `ee8bfa4`.

- 20 NEW files / 1502 LoC of rails (`db/collections.ts`, 9 repositories, `errors/` hierarchy + 7
  subclasses, `events/auditLog.ts`, `middleware/inject-services.ts` DI, `middleware/require-ownership.ts`,
  4 zod schema modules, `format/palette.ts`).
- `routes/palettes.ts` 845 LoC → 5 concerns + 7 services.
- `routes/admin.ts` 750 LoC → 8 concerns + 9 services.
- A named **concurrency fix**: "F3 vote-toggle race resolved via `VoteRepository.upsertIdempotent`
  + gated `$inc`" (`D/FINAL.md §2`).
- 17 audit-emit invocations rewired.

**Gate for all of it** — `D/FINAL.md §6` row 6, verbatim:

| 6 | api tsc | clean | clean | GREEN |

That is the entire gate. Verified:

```
$ git ls-tree -r --name-only 7ac4ecc9 -- api/ | rg -i "test|spec"
(no output)

$ git show 7ac4ecc9:api/package.json | rg -n '"scripts"' -A 4
6:    "scripts": {
7-        "dev": "tsx watch src/index.ts",
8-        "build": "tsc",
9-        "start": "node dist/index.js"
```

**Zero test files. No `test` script.** The first backend test in this repo's history arrived two
tranches later at `1e1b2487` — `test(api/w2): first backend integration tests via vitest +
mongodb-memory-server (97 tests across 19 files) (E.W2 Lane F)`.

**Name the RED input.** What input makes `tsc --noEmit` fail on a vote-toggle race, a lost
cross-collection write, a mis-ordered service call, a zod schema that validates the wrong field, or
an ownership check wired to the wrong actor? There is none. The gate is **vacuous with respect to
every defect class the wave could introduce.** It is a spelling check on a rewrite.

**Aggravating**: D's own invariant D3 is "fail-explicit across the whole codebase" and the user's
D-opening mandate reads "NO workarounds, NO fallbacks, fail-explicit". `D/FINAL.md §5` records that
clause as "**enforced**". Enforced by a typecheck.

**Consequence for W**: any wave that rewrites a runtime layer must carry a behavioral gate authored
*in the same wave*. "Types compile" is not a gate; it is a precondition.

---

## §2 — Vacuous gates (each with the RED input named, or declared unnameable)

### V-1 — `api tsc clean` as the sole gate on the D.W2 rewrite
`D/FINAL.md:176` (§6 row 6). **Unnameable RED input** for any behavioral defect. See §1.

### V-2 — "zero `as any` across new rails"
`D/FINAL.md §2` D.W2 Lane C: "Every file ≤ 250 lines. **Zero `as any` across new rails.**"
The gate is scoped to files the wave itself authored. A lane that writes files without `as any`
cannot fail a gate that counts `as any` in the files it wrote. **Unnameable RED input.**

The finding it claims to discharge — `Db-4 (31 as any casts)` — is marked **LANDED** in
`D/FINAL.md §4`. Measured at the D-close tree:

```
$ git grep -n "as any" 7ac4ecc9 -- api/src | wc -l
11
```

Eleven survive, in `middleware.ts:141,153`, `routes/colors.ts:55`, `routes/sessions.ts:23,30,59,75,85,99,111`,
`slugWords.ts:95` — files D.W2 never touched. 31 → 11 is a 65 % reduction declared LANDED. The
corpus actually reached zero two tranches later at `ef8a80b2` (`G.W2 Lanes C+D … as-any corpus → 0`).

### V-3 — the admin half of "21/21 playwright green"
`D/FINAL.md §6` row 3: "playwright across 3 projects | 21 green | 21 passed (9.2s) | GREEN".

Six of the 21 (5 admin view specs + `admin-walk.spec.ts`) run against a total network stub.
`e2e/smoke/admin/fixtures/admin-auth.ts` at `7ac4ecc9`, verbatim:

```
const PAGINATED = JSON.stringify({ data: [], total: 0, limit: 50, offset: 0 });
const RAW_ARRAY = JSON.stringify([]);
…
await page.route("**/admin/**", (route) => { … })   // "No XHR ever hits the network."
await page.addInitScript(…[STORAGE_KEY, FAKE_TOKEN])  // "No login UI ever runs."
```

**RED inputs these six specs can produce**: a crash on empty data, or a missing DOM node.
**RED inputs they cannot produce**: wrong data rendering, pagination, auth enforcement, ownership
checks, the F3 vote-toggle race, any of the 17 audit-emit paths, any zod validation error, any
repository query. The wave that rewrote the admin backend is gated by specs that mock the admin
backend away. This is textbook **per-mechanism green over gestalt broken** — and the six mocked
specs are counted 1:1 with real specs to reach the headline "21".

### V-4 — `vue-tsc errors | Target 126 | Actual 126 | GREEN`
`D/FINAL.md:171`. This gate certifies **126 TypeScript errors as the pass condition**. It was
carried verbatim through five consecutive wave-gate lines (`D/FINAL.md:34,45,56,65,74,81`) and
inherited unchanged from B (`B/FINAL.md:19` — "vue-tsc 126").

The RED input is "a 127th error", so it is a ratchet, not strictly vacuous — but it is a ratchet
pinned at a **broken** baseline, and it is green-over-broken in the precise sense: the demo did not
typecheck, and two consecutive closes declared that GREEN.

The disposition of the errors is the tell. B.W3 named them (`~104`/126 generated shadcn-vue cluster)
and routed them to "a generator-update / vendoring-policy effort" (`B/FINAL.md §3`). D re-routed the
same cluster as successor destination #3 (`D/FINAL.md §9`). The actual fix, two tranches later:

```
F/FINAL.md:58 | 6 | `1401d75` | chore | F.W1 Lane C | 29 zero-consumer shadcn-vue subdirs swept
              (165 → 22 files, -588 KiB; vue-tsc 118 → 0) |
```

**The 126 errors were in files with zero consumers.** The "generator-update / vendoring-policy
effort" that B and D routed to was, in the event, `rm -rf` — available at B.W3, at D.W1, at D.W6, and
at every point in between. Two closes shipped a broken typecheck rather than delete unconsumed
vendored code. **This is the pattern W must not repeat: routing a deletion to a hypothetical future
effort and calling the resulting red baseline GREEN.**

### V-5 — A.W7 "visual-runtime audit passes" on a probe that never interacted
`docs/tranches/A/audit/W7-visual-runtime.md`. The lane's stated purpose: "run one supplementary
interaction probe". Its own recorded result:

```json
{ "consoleErrorCount": 0, "consoleErrors": [], "navCount": 1,
  "navLabel": "Application navigation", "mainCount": 1, "clickedSelector": null }
```

`"clickedSelector": null` — the probe failed to click anything. The document's own §2:
"none of the candidate selectors … matched a clickable element at probe time … **Per the probe spec,
this is a non-fatal fallback: the probe screenshotted the loaded page instead of failing.**"

And §"Verdict": "**Interaction console errors: 0.**" — zero because no interaction occurred. The
captured `interaction.png` is described in the same document as rendering "identically to
`w5-1280x800-light.png`", i.e. it is the boot capture again.

**RED input**: none. A probe whose failure mode is "screenshot the page and pass" cannot go red.
This is simultaneously a **vacuous gate** and a **masked fallback** — the fallback is written into
the probe spec.

### V-6 — D.W4's 0 % pixel-drift gate, discharged by prose
`D/FINAL.md §2` D.W4: "Pixel-diff substituted by byte-isomorphism analysis
(`audit/D.W4-pixel-diff/README.md`) — preserves 120-min cap".

`docs/tranches/D/audit/D.W4-pixel-diff/README.md` line 3, verbatim:

> **Status**: NOT EXECUTED as automated screenshot diff. Verdict: pixel-isomorphic by construction

HARDEN-5a had *tightened* this gate from 1 % to 0 % with an enumerated drift list
(`D/findings.md §2` HARDEN-5a). The tightened gate was then not run, and the substitute is an
argument — one that itself concedes a specificity change (`0,0,1 → 0,1,1` on the `featured-badge`
SVG) and a cascade source-order shift, both waved through as "byte-equivalent" and "structurally
isomorphic". The document names the successor: "add a spec under `e2e/visual/` capturing 6
viewports … Not authored here to preserve the 120-min hard cap."

**Verified today**: `e2e/visual` does not exist; `rg "toHaveScreenshot|toMatchSnapshot" e2e/` returns
zero across all 71 spec files. **The named successor never fired.** value.js has, as of HEAD, no
visual-regression gate of any kind — 14 tranches after the wave that promised one.

### V-7 — count-equality gates on test totals
`D/FINAL.md §6` row 2: "vitest pass count | 1582+ across 34 files | 1582 / 34 files
(**parser-snapshot rename preserves count**) | GREEN". A gate whose satisfaction is managed by
choosing a rename over a rewrite (see §3, C-4) is measuring bookkeeping, not truth.

---

## §3 — Close-class lies found

### C-1 — Declared captures that were never on disk (D and A both)
`docs/tranches/D/audit/D.W0-state-at-open.md`, verbatim:

- line 38: evidence path `/tmp/d-w0-vuetsc.log`
- line 46: "probe script at `/tmp/d-w0-probe.mjs`"
- line 59: "the JSON envelope is **preserved at `/tmp/d-w0-probe.json` for the orchestrator**"

`docs/tranches/A/audit/W7-visual-runtime.md`:
- "Probe script: `/tmp/w7-probe.mjs`"
- §"Constraints honored": "Writes limited to this file, `/tmp/w7-probe.mjs`, and … `interaction.png`"

```
$ ls /tmp/d-w0-probe.json /tmp/d-w0-vuetsc.log /tmp/w7-probe.mjs /tmp/d-w0-probe.mjs
ls: /tmp/d-w0-probe.json: No such file or directory
ls: /tmp/d-w0-vuetsc.log: No such file or directory
ls: /tmp/w7-probe.mjs: No such file or directory
ls: /tmp/d-w0-probe.mjs: No such file or directory
```

Four declared evidence artifacts, including one explicitly "preserved … for the orchestrator", are
gone and were never committed. The *committed* PNGs in A/B/D all exist and were spot-verified
(`ls` on all 6 A dirs, 4 B dirs, 3 D dirs — 57 PNGs present). The defect is narrower and worse than
"missing screenshots": the load-bearing *machine-readable* evidence (the vue-tsc error log, the probe
JSON envelope) was written to a volatile path by design.

### C-2 — Unfilled authority fields in a tag-bearing close document
`docs/tranches/D/FINAL.md §10`, on disk at HEAD today:

```
219: **Close-ceremony commit SHA**: `<this commit>` (to be filled by orchestrator at commit time).
221: **Merge commit SHA**: TBD (orchestrator owns the merge per `D-RELEASE-PLAN.md §3` sequence).
```

The facts exist — `git rev-list -n1 v0.6.0` → `eae8afc2`, `eae8afc2 Merge tranche-b into master —
Tranche D close (v0.6.0)` — and the annotated tag body carries them. But the FINAL that declares
itself "the authority" carries a template placeholder in its authority section, unreconciled for 14
tranches. Every downstream reader of `D/FINAL.md §10` gets `<this commit>`.

### C-3 — Alias smuggling, on the record, against a standing user edict
`D/FINAL.md §2` D.W3 Lane C: "**L11** interpolation arg-order canonical `lerp(a,b,t)` with
`lerpLegacy` **aliased deprecated**".

`docs/tranches/D/audit/D.W6-performance.md`, in the bundle-delta accounting, verbatim:

> - L11 lerp arg-order canonicalisation (lerpLegacy alias added with `@deprecated` JSDoc —
>   **preserves backward-source-compat**)

The repo's standing user feedback (`feedback_no_backwards_compat`) is "Never add legacy-compat shims;
migrate the consumer to the new API at the root." D shipped the shim, named it in the close, and the
close counted the row LANDED. It survived D and E and was killed at F: `1ead49e8 feat(library/w3)!:
delete lerpLegacy — F2 invariant satisfied + v0.8.0 BREAKING`. Two closes carried a compat alias
that the project's own precept forbids.

### C-4 — Rename instead of fix, on a documented lie
`docs/tranches/D/audit/D.W6-doc-drift.md:57–59`, verbatim:

> **Verified**: `head -10 test/bbnf-equivalence.test.ts` shows zero BBNF runtime imports. … Per
> CHALLENGE-Dm: this is a "**documentation lie**" — the file labels its snapshots "BBNF Equivalence"
> but does no BBNF execution.
>
> **Decision (KISS default per spec)**: rename to `test/parser-snapshot.test.ts`. … Wiring the
> grammars to a runtime equivalence check is a larger engineering effort that belongs in a successor
> effort.

D found a test that lied about what it verified and **renamed the test**. The rename was then used
to hold a count gate (V-7: "parser-snapshot rename preserves count").

The successor effort fired 14 months of tranche-time later, as the V·π parser proof gate. Its
verdict, `docs/tranches/V/apotheosis/parser-proof/GATE-VERDICT.md`:

> ## COMPOSITE: 🔴 RED …
> **F-2 — The LIVE v4 parser has 5 recorded defects; R1 is a shipping crash.**
> `parseCssColor("oklch()")` (and `rgb()`, `hsl()`, `lab()`, `color()`, `rgba()`) throws `TypeError`
> from `parseFunctionalColor` … the frozen public contract says clean `ok:false`.

The equivalence check D declined to wire in 2026-05 is the check that, when finally wired, found a
**live shipping crash** in the parser. The rename bought 14 months.

### C-5 — A false premise used to retire a finding
`docs/tranches/D/audit/D.W6-doc-drift.md:85`, verbatim decision on the K4 Prettier gap:

> **Decision**: … Prettier … is not an enforced project-wide formatter at the library level. The
> "gap" is documentation-only — **there's no `.prettierrc` actively binding the library codebase.**
> **Recording as named-destination**: if a future library-doc tranche unifies a formatting policy,
> that effort folds it. No D.W6 action required beyond this record.

Measured at the D-close tree:

```
$ git ls-tree 7ac4ecc9 -- .prettierrc.json
100644 blob 080122e3889cf73e9748302c898ce549f3262028	.prettierrc.json

$ git show 7ac4ecc9:.prettierrc.json
{ "printWidth": 88, "tabWidth": 4 }

$ git show 7ac4ecc9:package.json | rg prettier
92:        "prettier": "^3.6.2",
```

`.prettierrc.json` has existed since the repo's initial commit `35cd9d5d`, and `prettier ^3.6.2` was
a declared devDependency at D close. The finding was retired to a conditional future tranche on a
premise that is **false against the tree at the moment of writing**. The conditional never fired.

### C-6 — "Zero findings silently deferred" over six undisclosed deferrals
`D/FINAL.md §4` closes with, verbatim: "**Zero findings silently deferred. D5 invariant satisfied.**"

D's own close-audit lane contradicts it. `docs/tranches/D/audit/D.W6-plan-vs-actual.md:24`:

> | L6 library barrel … | `14d35fa` — full L6 landed … | **G3/G4/G6/G8/G9/G10 deferred with named
> destinations (documented)** |

Six barrel gaps deferred at D.W1. `D/FINAL.md` mentions none of them — its LIB row reads
"LIB-L1, L3, L4, L5, L6, L7, L9, L10, C1, C2 | LANDED". The destinations were *inside D*
(`docs/tranches/D/audit/D.W1-library-barrel.md:22`: G10 "REVISED to DEFER in this lane — … Routing to
**D.W3 Lane C**"). Verified whether G10 ever landed:

```
$ git log --oneline -S "QUANTIZE_DEFAULTS" --all
d90af08b docs(tranche-e/open): open Tranche E …
14d35fae feat(library/w1): close library barrel … (D.W1 L6)
7b6b4738 audit(tranche-b/w3): value.js library gap audit (Mandate 12 AND)
```

Three hits, **all in documentation**. `QUANTIZE_DEFAULTS` never entered `src/`. G10 was routed to
D.W3 Lane C, D.W3 Lane C did not do it, and `FINAL.md` declared zero silent deferrals. **That is the
definition of a silent drop, asserted away in the same document.**

### C-7 — "every mandate FULL" written directly beneath a table containing OPEN and PARTIAL
`docs/tranches/D/findings.md §4`:

| 8 root-level restyling (4 glass-ui-side root fixes) | **OPEN** — glass-ui successor |
| 9 glass-ui for all | **PARTIAL** — … blob/aurora glass-ui-blocked |
| 13 Playwright … blob/aurora | … blob/aurora **glass-ui-blocked** |

Closing line of the same section, verbatim:

> After D closes: **every mandate FULL**, the cross-repo asks named-routed, the backend surgically
> modernized.

Partial counted as done, in writing, in the same table. A carried through the identical move — its
`FINAL.md §3` marks mandates 8, 9, 12, 13 PARTIAL and §7 declares "the 13 mandates are FULL or routed
to a named destination". "FULL **or routed**" is the load-bearing disjunction that lets a partial
graduate to a close.

### C-8 — Scope-narrowing hedges that convert a partial into a LANDED
`D/FINAL.md §4`: "Db-3 (157 direct `db.collection` + 123 inline Mongo ops) | LANDED D.W2 Lane C —
repository layer; **D.W2-scoped routes** call repos only".

The finding was corpus-wide ("157 direct `db.collection`"); the disposition is scoped to the routes
D.W2 chose to touch. Measured at close:

```
$ git grep -c "db.collection(" 7ac4ecc9 -- api/src
api/src/db.ts:27            api/src/db/collections.ts:2      api/src/middleware.ts:1
api/src/middleware/inject-services.ts:1                      api/src/migrations/check.ts:1
api/src/models.ts:1         api/src/repositories/palette.ts:1
api/src/routes/colors.ts:8  api/src/routes/sessions.ts:7     api/src/slugWords.ts:1
TOTAL: 50
```

`db.ts` (27) and `db/collections.ts` (2) are the legitimate factory. But **17 direct calls survive in
route and middleware code** (`routes/colors.ts` 8, `routes/sessions.ts` 7, `middleware.ts` 1,
`slugWords.ts` 1). D's stated invariant was "routes call repositories, **never** `db` directly"
(`D/findings.md §2` Db-3). It is false at close for three files, and the falsity is hidden behind
four words of scoping in the disposition column.

### C-9 — A disclosed fallback recorded as "enforced NO fallbacks"
`api/src/events/auditLog.ts` at `7ac4ecc9` — the audit-emit path swallows failures:

```js
} catch (err) {
    // Befitting graceful per D3 + D-HARDEN-3 §3 W3 carve-out: audit-log writes do
    // NOT fail the originating request … Explicit logger.error with structured
    // context — NOT a silent swallow.
    console.error("[audit-log] emit failed", { action, actorSlug, … });
}
```

This one is **honestly disclosed** and I do not call it a masked fallback — the rationale is written
at the call site and the failure is operator-visible. But `D/FINAL.md §5` records the user clause
"NO workarounds, NO fallbacks, fail-explicit" as "**enforced (D3 invariant; D.W2 Lane D
dispositions)**" with no mention that D3 shipped a named carve-out class ("befitting graceful") that
covers at least two sites — this one and `vite.config.ts:siblingFsAllowTransient`
(`D/FINAL.md §2` D.W1: "documented **transient** under D3's 'befitting graceful' carve-out"). A
mandate is not "enforced" when the close simultaneously invents an exception category for it. The
next tranche should demand that carve-out categories be enumerated and expiry-dated at the point they
are created — see §4 D-06 for what happened to this particular "transient".

---

## §4 — Deferral ledger (every carry, with its audited status)

Exact wording preserved. `auditedStatus` is measured, not quoted.

| ID | Tranche | What | Stated disposition (verbatim) | Audited status | Evidence |
|---|---|---|---|---|---|
| **A-01** | A.W6 | glass-ui metaballs `positionSource` + pointer + per-blob opacity + HSV perturbation | "**glass-ui successor tranche** — the API additions are glass-ui's to ship" (`A/audit/W6-deferred.md`) | **RE_BOOKED ×6+** | `H-AUDIT-2:104` "**6-tranche** (A→B→D→E→F→G→H)"; then `V/audit/REFORMATION-2026-07-16.md` RF-26 |
| **A-02** | A.W6 | Aurora `deriveAuroraPalette(baseColor, opts)` | "glass-ui successor tranche; **value.js demo-abstraction post-ship**" | **RE_BOOKED ×8+** → still execution-gated at V.W54 | `V/reformation/waves/W53-W54.md:95` |
| **A-03** | A.W6 | `BlobDot` organic-dot primitive (11 → 16 → 10 `WatercolorDot` consumer sites) | "glass-ui primitive-ship successor; value.js extirpation tranche post-ship" | **RE_BOOKED ×8+** | same chain; landed mechanically at `e32111c7` (N.W5) |
| **A-04** | A.W6 | `ConfigSliderPane` → glass-ui `./configurator` — explicitly "**NOT glass-ui-blocked** … the one independently-actionable residual" | routed to "the same demo-abstraction tranche" | **LANDED** at D.W3 Lane A `3359a979` — but **uncredited**: `D/FINAL.md §2` Lane A does not name it | `git show 7ac4ecc9:…/ConfigSliderPane.vue` line 21 `import { ConfiguratorRow } from "@mkbabb/glass-ui/configurator"` |
| **A-05** | A.W7 | `useMetaballRenderer.ts:174` `cssColorToRgb` 2D-canvas round-trip **every frame** | "routed with `audit/W6-deferred.md` (the demo-abstraction follow-up)" | **LANDED** D.W3 Lane C `cea5e3fc` (256-entry memo cap) | `D/FINAL.md §2` D.W3 Lane C |
| **A-06** | A/B | `~104`/126 generated shadcn-vue typecheck cluster | "a generator-update / **vendoring-policy effort**" (`B/FINAL.md §3`); re-routed `D/FINAL.md §9` #3 | **RE_BOOKED ×2, then killed by deletion** at `1401d75` (F.W1 Lane C, "29 zero-consumer subdirs swept; vue-tsc 118 → 0") | see V-4 |
| **A-07** | A→B | `<Tabs variant="underline">` provider family | "RE-FILED — glass-ui shipped the wrong shape (header-only)" (`B/FINAL.md §3` row F) | **RE_BOOKED ×6** (G8 in the 8-ask block) | `H-AUDIT-2:86` |
| **B-01** | B.W3 | 11 value.js `src/` library gaps + invariant-30 contract-v2 question + `viewSchema.ts` | "a value.js **library-maintenance effort**" | **PARTIALLY LANDED** — `viewSchema.ts` at D.W3 Lane D `4d439bf3`; contract-v2 at D.W1; barrel gaps → see C-6 | `D/FINAL.md §2` |
| **C-01** | C | library `Palette` domain at `src/palette/` + `colorScale` + `sampleToSVGPath` | "**CONDITIONAL FUTURE-TRANCHE** (post-H, post-user-re-mandate) … the residue is *parked*, not *deferred*" | **STILL_OPEN / never re-mandated** | `ls src/` → `color css easing.ts foundation quantize.ts subpaths transform value.ts`; `rg "sampleToSVGPath\|export function colorScale" src/` → 0 |
| **C-02** | C | `slugWords.ts` → shared `coordination/SLUG-WORDS.md` precepts data | "CONDITIONAL FUTURE-TRANCHE (paired with the fourier-side consumer)" | **STILL_OPEN** — still inline 2 months later | `api/src/modules/session/slugWords.ts:4` `const ADJECTIVES = [`, `:23` `const VERBS = [` |
| **C-03** | C | `CRUD-CONTRACT.md` cross-repo ratification | "**DISSOLVED-NOT-DEFERRED** … No future value.js tranche owns this" | **RETIRED_WITH_RATIONALE** — clean | `C/FINAL.md §6` |
| **D-01** | D.W1 L6 | barrel gaps **G3, G4, G6, G8, G9, G10** | "deferred with named destinations (documented)" (plan-vs-actual only) | **SILENTLY_DROPPED from FINAL** — G10 verified never shipped | see C-6 |
| **D-02** | D.W6 | BBNF↔hand-parser runtime equivalence wiring | "belongs in a **successor effort** (named-routed via `D-LIB-OPTIMIZATION-SYNTHESIS.md §3 L15` if pursued)" | **RE_BOOKED to V·π; verdict RED with a live shipping crash** | `V/apotheosis/parser-proof/GATE-VERDICT.md` F-2 |
| **D-03** | D.W4 | screenshot-diff regression check at `e2e/visual/` | "Not authored here to preserve the 120-min hard cap" | **SILENTLY_DROPPED** — never authored, 14 tranches on | `ls e2e/visual` → no such dir; `rg toHaveScreenshot e2e/` → 0 of 71 specs |
| **D-04** | D.W6 | K4 Prettier doc gap | "if a future library-doc tranche unifies formatting policy, fold there" | **SILENTLY_DROPPED on a false premise** | see C-5 |
| **D-05** | D.W5 | `smoke-safari` WebKit project (Pixel-7 runs Chromium, not WebKit) | "Routes to a value.js **testing-hardening tranche** post-D" (`D/FINAL.md §7`) | **LANDED** at E.W3 `aa2d62a5` — commit subject literally "closes D.W6 named-destination follow-up" | `git log --grep "D.W"` |
| **D-06** | D.W1 | contract-v2 §2.1 keystone gap; `vite.config.ts:siblingFsAllowTransient` as the consumer-side reciprocal | "**retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution**" (`D/FINAL.md §8`) | **STILL_OPEN at HEAD** — glass-ui is now `^7.0.0`; the "transient" is 14 tranches old | `vite.config.ts:139` `const siblingFsAllowTransient = …`; `:287` `fs: { allow: siblingFsAllowTransient }` |
| **D-07** | D.W6 | keyframes.js post-v0.6.0 consumption update (pin, `CSSAnimationOptions`, `Color.L` migration) | "keyframes.js follows on its own schedule" | **RE_BOOKED** — "CH-10 keyframes.js precept-pin — **6-tranche from B**" | `H-AUDIT-2:122` |
| **D-08** | D.W5 | `useEffectCensus` DEV leak probe | "deferred (REACTIVITY-B already verified topology)" | **SILENTLY_DROPPED** — appears in no later doc; never in tree | `rg useEffectCensus` → 0 |
| **D-09** | D.W5 | hex-input reactivity assertion | "re-targeted to slider-keyboard (`visibility:hidden` at desktop breakpoint)" | **SILENTLY_DROPPED** — the merge-blocking gate measures a substitute interaction | `D.W6-plan-vs-actual.md:65` |
| **D-10** | D.W3 | PaletteDialog shell target ~200 LoC | "**A-1 PARTIAL** (shell 340 vs aspirational ~200; template-coordination tier irreducible — documented)" | **PARTIAL counted as done** — `FINAL.md §2` reports "shell at 340 LoC" without the word PARTIAL | `D.W6-plan-vs-actual.md:45` |
| **D-11** | D.W1 | RA-2 hardening primitives — `ColorChannel<T>` brand, DEV `_assertChannel`, `test/recursion-guard.test.ts`, `clone()` depth-16 | LANDED (D gates #8, #9) | **RETIRED WITHOUT SUCCESSOR GATE** — all four deleted with the pre-v4 tree; no equivalent guard in the v4 surface | `git log --diff-filter=D --name-only -- '*recursion-guard*'` → `7334c793`, `164343c1`; `rg "ColorChannel\|_assertChannel\|unwrapDeep" src/` → 0 |

**D-11 deserves emphasis.** `recursion-guard.test.ts` was the codified regression guard for **RA-1**,
a *real shipped production crash*: `colorUnit2()` nesting, latent 19 months from `35cd9d5` (Jul 2024)
to `80cdd59` (Mar 2026), which overflowed the iOS Safari stack after ~294 frames. D codified it as
invariant **D7** and made the 5-test replay a merge gate. Both the test and the `bench/` acceptance
gate were deleted at the v4 cut (`164343c1` / `7334c793`) and **no successor guard was authored**.
The substrate changed, so the specific test may legitimately not apply — but the *invariant* (no
self-nesting value wrappers) was retired silently along with its apparatus. W should decide
explicitly: does the v4 producer surface admit the same nesting class, and if so where is its guard?

---

## §5 — Chronics (the disease rows)

### CHR-1 — Aurora derive-from-color. **8+ closes. Origin misdated by the current register.**

| Close | Name it wore | Verbatim disposition |
|---|---|---|
| **A** (2026-05-19) | mandate 13 / `Ae-11` / A-02 | "PARTIAL — … the full flow suite + blob/aurora abstraction → B.W3 (e2e) and a glass-ui successor" (`A/FINAL.md §3`) |
| **B** (2026-05-19) | "the blob/aurora demo-side abstraction" | "→ a value.js demo-abstraction tranche, **opened once glass-ui ships** the metaballs/aurora APIs" (`B/FINAL.md §3`) |
| **D** (2026-05-20) | `Dc-1/Dc-2/Dc-3` | "ROUTED — precept-§10 blocked; glass-ui successor tranche … value.js demo-abstraction tranche post-glass-ui-ship" (`D/FINAL.md §4`) |
| **E** | `E-RF-2` (G2) / `E-RFV-2` / `E-OTH-1` | "CARRY-FORWARD-WITH-SHARPER-TRIGGER" (`E-AUDIT-2:47`) |
| **F** | `E-RF-2` carry | "**PEER-AUTHORSHIP-REQUIRED OR FOLD-INTO-F** … **Recommend (B)** — … remain PEER-AUTHORSHIP-REQUIRED" (`F-AUDIT-2:37`) |
| **G** | `CH-2` + `CH-11` | "**5-tranche** (A→B→D→E→F→G)" (`G-AUDIT-2:83`) |
| **H** | `CH-2` + `CH-11` + `G→H-1` | "**6-tranche** (A→B→D→E→F→G→H)" (`H-AUDIT-2:105`) |
| **K** | `K.W4-aurora-derive-visual-refinement.md` | dedicated design wave |
| **N** | N.W5 A/B/C/E | mechanically LANDED — `e32111c7` "deriveAurora wired picker→atmosphere + AuroraPane rebuilt" |
| **T · U · V** | `D-1` | "**derive-from-color RUNS or V′ does not close**" (`V/reformation/waves/W53-W54.md:95`) |

**Aliases across the ride**: mandate 13 → `Ae-11` → `A-02` → `Dc-1/2/3` → `E-RF-2` (G2) → `E-RFV-2` →
`E-OTH-1` → `CH-2` → `CH-11` → `G→H-1` → `K.W4` → `N.W5` → `D-1`. **Thirteen names.**

**The mutation is the tell.** The row changed *category* three times to survive: first "glass-ui must
ship the API" (A→H, un-actionable by value.js), then "wire it" (N, actionable and mechanically done),
then "prove it visibly runs" (T/U/V). Each re-framing reset the carry clock. F's own audit named the
escape hatch and declined it in writing — `F-AUDIT-2:37` recommends option (B), "remain
PEER-AUTHORSHIP-REQUIRED", i.e. **re-affirm the block**. That is the mechanism by which a row rides
six closes: an upstream blocker whose only resolution is upstream action, re-verified and re-affirmed
each close, with the re-verification itself counted as diligence.

**Correction W must apply**: `V/audit/REFORMATION-2026-07-16.md` RF-26 registers this as
"D-1 aurora-derive (**Tranche D**→K→N→T→U→V)". **The origin is A.W6, `065c6fe`, 2026-05-19** —
`docs/tranches/A/audit/W6-deferred.md`, "Named successors" table. G and H's own ledgers get this
right ("A `research/Ae` Ae-11"). V's register **under-counts the ride by three closes (A, B, and the
E/F/G/H segment)**. A disease register that misdates its own oldest row will mis-price it.

**Current state (measured)**: the mechanism exists — `demo/color-picker/composables/boot/useAtmosphere.ts:26`
imports `deriveAurora` from glass-ui and `:142` calls `deriveAurora(atmosphereColor.value)`;
`demo/scenes/atmosphere/AuroraPane.vue` is 201 LoC and its line 4 reads "The W0 'under rework' stub is
gone." So the A-era *deliverable* is present. What is still open at V.W54 is the *proof* that it runs
visibly end-to-end. **This is the most important thing W can learn from CHR-1: the row survived
its own completion**, because no close ever defined what "runs" meant in falsifiable terms until
W54 did (7+ closes late).

### CHR-2 — Blob extirpation. Same ride, same origin, same misdating.
`A/audit/W6-deferred.md` → `B/FINAL.md §3` → `Dd-1..4` → `E-RF-2` (G1/G3) → `CH-1`/`CH-3`/`CH-11` →
`G→H-1` → N.W5 `e32111c7` (fork 1270 LoC → glass-ui goo-blob; `WatercolorDot` + global
`#watercolor-filter` extirpated) → `D-2` at V.W54. Consumer count drifted 11 → 16 → 10 across the
ride (`Dd-3`; `D/research/Dd-blob.md §6`; `G-AUDIT-5 §5`) — an item whose *size* was re-measured
three times and never resolved. Aliases: mandate 13 → `Ae-10`/`Ae-13` → `A-01`/`A-03` → `Dd-1..4` →
`E-RF-2` G1/G3 → `CH-1`/`CH-3`/`CH-11` → `NS-H5` → `D-2`.

### CHR-3 — The broken typecheck baseline. 2 closes green over red, killed by `rm`.
B.W3 → D (all five wave gates + gate matrix row 1) → F.W1 Lane C deletion. See V-4. **This is the
cheapest lesson in the corpus: two closes declared 126 type errors GREEN while the fix was deleting
29 unconsumed directories.**

### CHR-4 — No visual-regression gate. 14 tranches, promised once, never authored.
D.W4 substituted the pixel gate with prose and named `e2e/visual/` as successor (V-6, D-03). Zero
screenshot assertions exist across 71 spec files at HEAD. The demo's entire visual surface — which
is what A, B and D were *about* — has never had an automated regression gate.

### CHR-5 — The "transient" contract-v2 carve-out. 14 tranches.
`vite.config.ts:139` `siblingFsAllowTransient`, introduced D.W1 with an explicit retirement trigger
("retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution"). glass-ui is at
`^7.0.0` (`package.json:83`). The trigger has never been re-evaluated in any close after D. A
carve-out named "transient" with a named trigger, and no owner ever re-checked the trigger.

---

## §6 — What A–D actually got right (so W does not over-correct)

Hostility is not nihilism. These are verified-good and should be preserved as pattern:

1. **The deferred-ledger apparatus itself.** `E/F/G/H-AUDIT-2-deferred-ledger.md` are genuinely
   excellent: they carry per-row origin citations, carry-length counts ("6-tranche (A→B→D→E→F→G→H)"),
   and explicit trigger conditions. They are why CHR-1 and CHR-2 are traceable at all. **The failure
   was never detection — it was that detection had no consequence.** W's contribution should be a
   *consequence* mechanism, not another register. V.W54's L1 ("neither rider may be re-chartered … a
   further 'BUILD W##' row for either is the forbidden re-booking") is the first such mechanism in
   this repo's history. Keep it.
2. **C's retirement close is the most honest document in scope.** It splits its thesis into three
   axes with three different verdicts, names invariant 15 as "the load-bearing miss", and refuses to
   claim credit ("the work happened under D / E attribution"). It even supplies deletion-proof shapes
   for absences. Its residuals are still open (C-01, C-02), but it never claimed otherwise.
3. **D's HARDEN round found real errors before execution.** HARDEN-3a caught a hallucinated
   repository list (`color_names`/`color_proposals` do not exist; `votes` was omitted); HARDEN-3b
   caught a lane-ordering dependency inversion; HARDEN-3e caught a *wrong* fail-explicit disposition
   (F3 as 409 "breaks toggle"); HARDEN-4b/4c/4d corrected three research miscounts; HARDEN-3f
   retracted a false research claim (`api/dist/` was already gitignored). A 6-lane adversarial pass
   over the plan, folded before execution, is a pattern worth keeping.
4. **Named-destination discipline did sometimes work.** D-05 (smoke-safari) landed at E.W3 with a
   commit subject that cites the D filing verbatim. A-04 and A-05 landed at D.W3. The discipline is
   not inert — it works when the destination is *in-repo and unblocked*. Every failure in §4 is a
   destination that was either out-of-repo (A-01..A-03, D-07) or conditional-on-a-hypothetical-tranche
   (C-01, C-02, D-03, D-04).

**That last sentence is the actionable law for W**: a deferral to a destination outside this repo's
write authority, or to a tranche that does not yet exist, has a ~0 % historical landing rate in this
corpus. Deferrals should be admitted only to a *named, already-scheduled wave in this repo*.

---

## §7 — Recommendations for W (ranked)

1. **Ban the type-only gate.** No wave that changes runtime behavior closes on `tsc`/`vue-tsc` alone.
   Every such wave authors at least one behavioral assertion *in the same wave*. (§1)
2. **Gate-liveness proof.** For every acceptance gate, the wave spec must state the exact input that
   turns it RED. A gate with no nameable RED input is not a gate and must not appear in a gate
   matrix. (§2 — six vacuous gates found)
3. **Ban count-equality gates** on test totals and error totals. Replace with direction gates
   ("errors ≤ previous, and 0 by wave N") and never pin a target at a broken baseline. (V-4, V-7)
4. **Mocked specs are counted separately.** A gate matrix row of "21 green" that includes 6
   fully-stubbed specs is a category error. Report `real / mocked` split. (V-3)
5. **Evidence must be committed, not `/tmp`.** Any document citing a path outside the repo fails its
   own close-honesty checklist. (C-1)
6. **A carve-out must carry an expiry.** "Befitting graceful", "transient", "documented exception" —
   each gets an owner, a trigger, and a re-check line in every subsequent close until retired.
   (C-9, CHR-5)
7. **Fix the disease register's provenance before using it.** RF-26's `D-1`/`D-2` origin is wrong;
   the correct origin is `A/audit/W6-deferred.md` (2026-05-19). Re-price both rows at 8+ closes.
   (§5 CHR-1)
8. **Define "done" falsifiably at *filing* time, not at close 8.** CHR-1 survived its own mechanical
   completion because no close before W54 stated a falsifiable running condition. Every rider gets
   its RUNS-condition written the day it is filed.
9. **Run the remaining 94-row verification.** The 26-row sample returned 12 defects (46 %). The
   unverified remainder is the largest single unknown this audit leaves behind. Specifically
   un-run and worth running: every `LANDED` row in `D/FINAL.md §4` against `7ac4ecc9`, and every
   A/B mandate marked FULL against `625322e`.

---

## §8 — Verification appendix (commands run, for re-execution)

```
git rev-list -n1 v0.6.0                                     # eae8afc2…  (D merge; FINAL says TBD)
git ls-tree -r --name-only 7ac4ecc9 -- api/ | rg -i "test"  # (empty) — no backend tests at D close
git grep -n "as any" 7ac4ecc9 -- api/src | wc -l            # 11  (finding said 31, disposition LANDED)
git grep -c "db.collection(" 7ac4ecc9 -- api/src            # 50 total; 17 in route/middleware code
git ls-tree 7ac4ecc9 -- .prettierrc.json                    # present (D.W6 claimed absent)
git show 7ac4ecc9:package.json | rg prettier                # "prettier": "^3.6.2"
git log --oneline -S "QUANTIZE_DEFAULTS" --all              # 3 hits, all docs — G10 never shipped
git log --oneline -S "lerpLegacy" --all                     # added D.W3 cea5e3fc, deleted F.W3 1ead49e8
git log --diff-filter=D --name-only -- '*recursion-guard*'  # 7334c793 / 164343c1
ls e2e/visual                                               # No such file or directory
rg "toHaveScreenshot|toMatchSnapshot" e2e/                  # 0 hits across 71 specs
rg -n "siblingFsAllowTransient" vite.config.ts              # :139 decl, :287 use — still live
rg -n "ADJECTIVES|VERBS" api/src/modules/session/slugWords.ts  # :4, :23 — still inline
ls /tmp/d-w0-probe.json /tmp/d-w0-vuetsc.log /tmp/w7-probe.mjs # all: No such file or directory
```

**Unverified, and what would verify it**:
- The 94 un-sampled ledger rows — verify each `LANDED` claim against tree object `7ac4ecc9` (D) or
  `625322e` (B), not against HEAD.
- D's L8 microbench "10.09× median" — `bench/color-channel-access.mjs` is deleted; the three raw
  outputs survive at `docs/tranches/D/audit/D.W6-bench/run-{1,2,3}.txt` but the harness cannot be
  re-run. Re-verification requires checking out `7ac4ecc9` and running it there.
- D's "0 `import.meta.env.DEV` in dist" claim — requires a build at `7ac4ecc9`.
- Whether the v4 producer surface admits the RA-1 self-nesting class at all (D-11). Requires reading
  `src/value.ts` + `src/color/` for wrapper-in-wrapper construction paths.
