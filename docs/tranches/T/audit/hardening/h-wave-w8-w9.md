# T hardening · lane h-wave-w8-w9 — the E-7 hardening wave (W8) + the CLOSE (W9)

**Lane charge**: adversarial hardening of `waves/T.W8.md` + `waves/T.W9.md`. Three questions:
(a) is W8's E-7 protocol EXECUTABLE — surface list enumerable, bracket format specified,
remediation loop bounded, owner-certification package defined? (b) is W9's zero-drop walk COMPLETE
vs the S.W9 precedent — ledger/books/sweeps/budgets/π/FINAL/ceremony incl. the now-fixed CI chain +
the O-25 guard? (c) is X1's never-silent-3rd-carry rule WELL-FORMED?
**Method**: read both wave docs against their spec-of-record sections (`MANDATE §0.2`+E-7,
`SYNTHESIS §3/§6.1/§6.2/§7`, `T.md §7/§12`, `t-prompts-recap F2`, `t-plan-audit-2 F18/F19`,
`t-ci-lighthouse-record`), against the S.W9 doc + `S/FINAL.md §5/§7/§8`, and against the live tree
(`playwright.config.ts`, `CLAUDE.md`). ZERO product-code / corpus edits — this file is the only write.
**Verdict in one line**: the zero-drop walk is a genuine SUPERSET of S.W9 and the E-7 pre-filter
law is faithfully carried (F18/F19), BUT two MUSTFIX corpus defects landed in the close+harden
gates — a wrong `§7` pointer for the X1/X2 verbatim source, and the known-stale `e2e 5-project`
count copied forward into BOTH wave gates (the very drift W0-4 is chartered to cure). Plus 3
SHOULDFIX (X2 un-bound by the never-silent rule; E-5 closure can't "ride" a taste-only index; the 3
package viewports unnamed) and 4 NOTE.

---

## MUSTFIX

### HW-1 — X1/X2 verbatim firing-ops source mis-cited as `S/FINAL.md §7`; it is `§8` (+`§5`)
**Severity**: MUSTFIX · **Where**: `T.W9.md:9` (spec-of-record), `:64` (item 6), `:187` (evidence
packets consumed).
**Evidence**: T.W9 obliges the close to restate X1/X2 "VERBATIM with their firing ops" and pins the
source three times to `S/FINAL.md §7`:
- `:9` — "`S/FINAL.md §7` (the X1/X2 residuals, restated verbatim)"
- `:64` — "X1/X2 restated VERBATIM with their firing ops (from `S/FINAL.md §7`)"
- `:187` — "`S/FINAL.md §5/§7` (the inherited books + the X1/X2 verbatim source)"

But `S/FINAL.md §7` is **Process lessons** (six numbered lessons; grep-confirmed header at
`S/FINAL.md:164`). The X1/X2 **verbatim firing ops** live in `S/FINAL.md §8` — "Residuals for the
maintainer (verbatim-carried; nothing here is agent-executable)" (header `:198`), the numbered
`Op:` instructions at `:200` (X1: register the hook on-host, push master) and `:205` (X2: on the
NCSU VPN, remove the `/colors/` proxy block `api/apache-vhost.conf:19-27`). The **book-state** rows
are `S/FINAL.md §5` (`:114`/`:115`). So the load-bearing verbatim source is **§8** (firing ops) +
**§5** (state), never §7. A close agent following the pointer opens Process lessons and does not
find the firing ops. The miscite propagated from `SYNTHESIS.md:14`'s ambiguous evidence-base
"`S/FINAL.md §5/§7`" and hardened into an explicit (wrong) "§7 = the X1/X2 residuals" in the wave doc.
**Proposed amendment**: in T.W9 `:9`/`:64`/`:187` replace `S/FINAL.md §7` with **`S/FINAL.md §8`**
(the maintainer residuals = the verbatim firing ops), keeping `§5` for the inherited book-state
(so `:187` reads `§5/§8`). Optionally fold the SYNTHESIS §14 evidence-base line the same way.

### HW-2 — the stale `e2e 5-project` count re-asserted in BOTH gate docs; the tree has 6, and W0-4 is chartered to fix it
**Severity**: MUSTFIX · **Where**: `T.W8.md:109` (§Hard gate 5), `T.W9.md:135` (§Hard gate 8).
**Evidence**: both docs gate on "`npm test` green · **e2e 5-project green**". The live tree has
**six** Playwright projects — `playwright.config.ts` names `smoke` (`:129`), `smoke-admin` (`:151`),
`smoke-mobile` (`:163`), `smoke-reactivity` (`:181`), **`smoke-perf` (`:212`)**, `smoke-safari`
(`:239`). This is not a fresh discovery: the T corpus TRACKS it as a known drift folded to W0 —
`SYNTHESIS.md:272` / `T.W0.md:43` W0-4 charter "**5→6 e2e ×2**"; `SYNTHESIS.md:116`/`:561` DOC set;
`t-docs-truth.md:439` F13 "5→6 e2e projects, confirmed uncured, at two sites"; and most tellingly
`t-deferred-census.md:130` S2 which explicitly cites "`S/waves/S.W9.md:87` says 'e2e 5-project'" as
part of the SAME drift being folded. The T authors saw the S.W9 gate's stale wording, flagged it,
then **copied "e2e 5-project" verbatim into the T close+harden gates** — while W0-4 is
simultaneously chartered to correct that exact "5" to "6" in CLAUDE.md's two sites (`:28`/`:89`).
Compounding: the same T.W9 hard-gate-8 line invokes "the wave-gate doc carries the authoritative
numbers — CLAUDE.md's standing law" — i.e. it asserts authority over counts while stating a wrong one.
(The suite still RUNS all six — playwright doesn't filter on a doc string — so this is a doc-truth /
PP-16 defect, not a broken gate; but it is a self-contradiction inside the corpus whose W9 job is
doc-truth.)
**Proposed amendment**: `T.W8.md:109` + `T.W9.md:135` → "**e2e 6-project green**" (or "e2e all-project
green"), matching W0-4's `5→6` fix and the live config. This must land at the same time as W0-4's
CLAUDE.md `:28`/`:89` correction so the tree, CLAUDE.md, and the wave gates agree.

---

## SHOULDFIX

### HW-3 — the never-silent-3rd-carry naming obligation binds X1 only; X2 (the OLDER order) is un-bound at the gate
**Severity**: SHOULDFIX · **Where**: `T.W9.md:65-66` (item 6), `:124` (§Hard gate 2).
**Evidence**: item 6 names the rule for X1 alone — "X1 … is on its 2nd carry: **never a silent 3rd
re-book** — a T close that still carries X1 names it in FINAL.md §misses." Hard-gate-2 likewise:
"X1/X2 restated verbatim with firing ops (**X1's carry state NAMED, never silent**)". The RESTATEMENT
is X1/X2 (both), but the never-silent-NAMING obligation is X1-only in both places. Yet X2 is "the
OLDEST owner order" (`T.md:379`, `SYNTHESIS.md:553`) and `t-prompts-recap.md:57` (the E-5 recap of
record) explicitly binds X2 with the identical rule: "T carries it as a named residual with a firing
plan, **never a silent third re-book**". X2 is at least as old a carry as X1 (both R.W7-era; S/FINAL
§5 calls BOTH "second carry"), so the gate should name X2's carry too — otherwise a T close could
silently re-book the oldest owner order while the gate only guards X1.
**Proposed amendment**: generalize item 6 + hard-gate-2 to "**X1's AND X2's carry state NAMED, never
silent** — a T close that still carries X1 or X2 names each in FINAL.md §misses", matching
`t-prompts-recap.md:57`.

### HW-4 — E-5 closure "rides the W8 package's owner-line index", but that index covers only TASTE axes
**Severity**: SHOULDFIX · **Where**: `T.W9.md:46-47` (item 1).
**Evidence**: item 1 closes the E-5 recap by "every mandate-§0 verbatim line addressed-or-booked,
**riding the W8 package's owner-line index**." But the W8 package's owner-line index maps *taste
axes* → owner lines (`T.W8.md:64` "each axis indexed to the owner-verbatim line it answers"). Mandate
§0 carries ~40 verbatim lines, many of which are **structural, not taste** — E-1 colocation ("wildly
re-structured … COLOCATED"), "NO legacy code", "batches of three", the backend-colocation clause,
"Recap ALL of our prompts". None of those appear in a taste-certification index. The E-5 discharge of
record is `t-prompts-recap.md` (its §7 "this file is the drop-guarantee of record"), not the W8
package. So E-5 closure "riding the W8 package" is under-scoped by construction — it would certify the
taste-axis lines while leaving the structural-edict lines uncovered by the cited vehicle.
**Proposed amendment**: item 1 → E-5 closure rides **`t-prompts-recap` (the E-5 drop-guarantee) +
the structural-edict completion records (E-1..E-7)**, WITH the W8 package's owner-line index covering
the taste-axis subset. The W8 index is necessary, not sufficient.

### HW-5 — the certification package names "3 viewports" but never says which three
**Severity**: SHOULDFIX · **Where**: `T.W8.md:38`, `:62`, `:102` (all say "3 viewports").
**Evidence**: the package (assembled by a NON-authoring agent) must carry "annotated frames per
surface, both schemes, **3 viewports** + the boot screencast" — but the three widths are never named,
here or in `SYNTHESIS §3 T.W8`. Two assemblers pick different viewports → non-comparable packages
across surfaces, which defeats the whole-frontend certification. The corpus already fixes a canonical
trio elsewhere: **390** (the mobile-lane band, `SYNTHESIS.md:77/:80/:134`), **1024×1366** (the MOB-1
witness split, `SYNTHESIS.md:109`), **1440** (the desktop reference, `SYNTHESIS.md:53/:86`).
**Proposed amendment**: name the three — "3 viewports (**390 · 1024 · 1440**)" — at `:38`/`:62`/`:102`,
so the package is reproducible and comparable across surfaces and schemes.

---

## NOTE

### HW-6 — the W8 default surface census omits the markdown/katex reference doc pages
**Severity**: NOTE · **Where**: `T.W8.md:52-56` (the census).
The default census (11 surfaces: picker · About · palettes/browse+dialog · extract · mix · generate
· gradient · easing · dock+nav+menus · boot/atmosphere/blob · admin) covers **every T-1..T-29
owner-finding surface** (verified by mapping each finding to a census entry — clean). It omits the
color-space **reference doc pages** (`assets/docs`, 11 Vue+KaTeX pages incl. kelvin.md; the
`markdown/` + `katex/` component trees, `SYNTHESIS §5.1`) — owner-visible frontend surfaces with no
owner finding. The mandate §0.2 scopes E-7 to "our frontend" (whole). The census is enumerable (it is
"re-derived at wave-open from the §1.2 map + the live tree"), so the wave-open pass *may* catch them,
but the DEFAULT list should either name them or exclude-with-reason (as `SYNTHESIS §5.4` does for
`assets/docs` under the colocation edict — that exemption is colocation-scoped, not critique-scoped).

### HW-7 — the census includes "admin" but no fixture precondition is named for driving it live
**Severity**: NOTE · **Where**: `T.W8.md:56` (census "admin"), `:88-90` (§File-bounds "drive … live").
The census lists `admin`, and §Scope-1 requires each pass "drive the owner-visible surface live". But
admin is auth-gated — the live suite reaches it only via the `smoke-admin` `addInitScript` mock
fixture (CLAUDE.md e2e note). The W8 doc's probe-only file-bounds don't name that precondition, so a
pass told to "drive admin live" has no stated route in. Add a one-line note: the admin critique pass
uses the `smoke-admin` fixture pattern.

### HW-8 — "the five-layer peel `be0a703`→…→`0441aba`" conflates 5 layers with 5 commits
**Severity**: NOTE · **Where**: `T.W9.md:82-84` (item 10).
The five SHAs match the lane's chain-of-record EXACTLY (`t-ci-lighthouse-record.md:109`
`be0a703`→`29ea8ac`→`fcd4273`→`80c5888`→`0441aba`) — that part is sound. But the doc labels this
5-**commit** chain "the five-**layer** peel", whereas the lane's peel (`:10-75`) has **layer 4**
(smoke-safari hang) with **NO commit** ("NOT fixed here — a T finding") and **layer 3** with **TWO**
commits (`fcd4273` + coda `0441aba`), and layer 5 (`80c5888`) lands in commit-order BEFORE layer-3's
coda. So the layer↔commit mapping is not the 1:1 the arrow-chain implies. Minor, but a reader
reconciling "five layers = these five commits" will mis-map. Suggest: "the five-commit CI/deploy fix
chain (`be0a703`…`0441aba`; the five-layer peel of `t-ci-lighthouse-record`, whose layer 4 =
smoke-safari is a routed T finding with no commit)."

### HW-9 — the Q6 two-stage hedge references an undefined "reduced surface set" with no DAG slot
**Severity**: NOTE · **Where**: `T.W8.md:8-10` (spec-of-record hedge).
The header hedges the Q6 alternative: "if the owner rules the two-stage alternative, the mid-tranche
checkpoint after W4 reuses this doc's pass grammar on a **reduced surface set**". "Reduced surface
set" is undefined (which surfaces are testable/settled after W4 but before {W5·W6}?), and the DAG
(`SYNTHESIS.md:235` W4 → {W5·W6}) has no W4.5 slot. Since the corpus encodes the Q6 DEFAULT (one late
wave), this forward-reference is a reasonable hedge, but if the owner picks the alternative the
encode-pass has no spec for the reduced set. Low priority (non-default path); if kept, name the
after-W4-settled surfaces (picker/About/materials/boot — the waves closed by then) so the alternative
is authorable.

---

## CLEAN BILL (what hardened SOUND — evidence, not absence of alarm)

- **The E-7 protocol is EXECUTABLE.** Surface list enumerable (`T.W8.md:52-56` default census +
  wave-open re-derivation; covers every T-# finding surface). Bracket format specified and
  verbatim-faithful — the T-26 template "too muted ← target → too strong" is lifted exactly from
  `SYNTHESIS.md:55` (R6) + `t-prompts-recap F2`, "never a point value" (`:64`/`:118-119`).
  Remediation loop BOUNDED — the third critique↔remediation iteration halts and routes, "the residual
  becomes a package bracket for the owner, not a fourth lane pass" (`T.W8.md:82-83`). Owner-certification
  package DEFINED — assembled by a NON-authoring agent, both schemes, boot screencast, bracket table,
  owner-line index, Q14 material; the owner's verdict IS the gate; "a package delivered but unruled
  leaves the wave OPEN, honestly" (`:110-112`). The F18 pre-filter law (owner terminal, never proxy;
  taste-by-ratification vs taste-by-proxy) is carried faithfully (`:31`, §No-workaround `:116-117`).
- **The W9 zero-drop walk is a SUPERSET of S.W9**, not a subset: it inherits all 9 S.W9 scope items
  and ADDS item 8 (demo/api/root CLAUDE.md + DESIGN.md rewrites) + item 11 (the T books table) +
  elaborates item 10 (the now-fixed CI chain). Nothing from S.W9 is dropped — the "π matrix" became
  "visual/oracle evidence + the W8 package" (`:50-52`), a rename not a loss. F19's "inherit the close
  machinery unchanged, bolt the taste reform beside it" is honored.
- **The O-25 guard is WELL-FORMED**: born at W0 (`SYNTHESIS §6.1 O-25` wave = W0; W0-6 mint), re-run
  at W8 (`T.W8.md:70`), and at W9 wired into both the ceremony halt ("O-25 red = a stale-prod event,
  halt the tag", `T.W9.md:101`) and the hard gate ("O-25 green against the LIVE deployment", `:130`).
- **X1's never-silent-3rd-carry rule is WELL-FORMED for X1** (the 2nd-carry state → the 3rd carry
  must be named in FINAL.md §misses; `:65-66`). Its ONE defect is scope, not form (HW-3: X2 un-bound).
- **The Q14/budget/RP-2 disposition is complete**: W8 prepares, W9 encodes either way, red rows
  carried honestly if unadjudicated, the manual `workflow_dispatch` lane ships if CI stays red — no
  gate weakened (`T.W9.md:53-57`/`:85-88`/`:145-146`).
