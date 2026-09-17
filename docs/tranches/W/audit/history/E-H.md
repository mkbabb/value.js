# Historical audit — tranches E · F · G · H

**Seat**: historical audit, scope `docs/tranches/{E,F,G,H}/`.
**Repo**: `/Users/mkbabb/Programming/value.js` @ branch `tranche-u`, HEAD `c654824e`.
**Audit date**: 2026-07-24. Window audited: 2026-05-20 (E open) → 2026-05-26 (H close), plus forward-trace to HEAD.
**Mode**: READ-ONLY on everything outside `docs/tranches/W/audit/history/`. Zero source edits.

## Model receipt

I observe myself to be **Opus 5 (1M context)** — exact model id `claude-opus-5[1m]`, running as a Claude Code subagent seat.

---

## §0 — Headline

All four tranches closed, merged, and tagged. That much is true and git-verifiable.

What the four close documents hide:

1. **G's headline Axis 2 is false at G's own merge commit.** `docs/tranches/G/H-SEED.md:16` states "no god-module remains in `src/`". At `e166d37` (the G merge) **11 files in `src/` exceed the G3 350-LoC cap**, two of them inside the very directory G decomposed (`src/units/color/index.ts` 719 LoC; `src/units/color/constants.ts` 551 LoC). The G3 gate was defined over exactly the 9 files the G.W1 decomposition emitted, and over nothing else.
2. **H asserted a stale number for an inherited invariant it had itself breached.** `docs/tranches/H/FINAL.md:42`: "G3 — No god module in src/ (≤ 350 LoC) | HOLD | `dispatch.ts` max 312 (post-G.W4); **unchanged in H**." Git object at H's merge `16129e01`: `src/units/color/dispatch.ts` is **372 lines** — 22 over the cap, 60 more than claimed. H.W2 Lane A grew it and nobody measured.
3. **G's and H's shared headline axis — "invariant codification" — was repudiated and deleted 8–12 days after close.** One commit, `c4c58421` (2026-06-03, K.W2a), removed all 7 G/H proof scripts plus `proof-dts-layout.mjs`, `proof-resolution-contract.mjs`, and the F.W2 codemod that `proof:codemod-publication` existed solely to guard.
4. **Two of G's "codified" invariants were scoped to directories that were already clean, while live violations sat one directory away.** Both were later "fixed" by widening the scan root — which is the tell.
5. **A 5-tranche chronic was declared closed by fixing a sub-blocker the tranche itself had introduced, then half of it was silently dropped — and G's own opening audit caught the drop and then lost it in its own ledger.**
6. **The successor never read the seed.** H authored a 162-line `I-SEED.md`. Tranche I (opened two days later) does not cite it once. The 22-entry H disposition ledger and the 14-row chronic bucket were consumed by nobody until K, two tranches later.
7. **The "environmental flake" classification is a masked fallback that rode E→F→G→H** and terminated at tranche N's finding: `e2e 0-passed-of-37` with "no gate catches white-screen".

**Ledger arithmetic**: 52 distinct commitments across the four tranches. **26 verified landed.** Of those 26, **4 were deleted or regressed within 12 days of their close** (G4, H2, H3, H4). **14 chronic rows reached terminal state: zero.**

---

## §1 — Did they close? Where is FINAL.md?

Verified by git object, not by document claim.

| Tranche | FINAL.md | Merge commit | Tag | Close date | Verdict |
|---|---|---|---|---|---|
| E | `docs/tranches/E/FINAL.md` (256 L) | `47399c2a` "Merge tranche-e into master — Tranche E close (v0.7.0)" | `v0.7.0` (annotated tag object) | 2026-05-20 | CLOSED |
| F | `docs/tranches/F/FINAL.md` (207 L) | `6b3a41bb` | `v0.8.0` | 2026-05-21 | CLOSED |
| G | `docs/tranches/G/FINAL.md` (225 L) | `e166d373` | `v0.9.0` | 2026-05-22 | CLOSED |
| H | `docs/tranches/H/FINAL.md` (142 L) | `16129e01` | `v0.10.0` | 2026-05-26 | CLOSED |

```
$ git cat-file -t v0.7.0
tag
$ git show v0.7.0:package.json | rg '"version"'
    "version": "0.7.0",
```

**All 36 sampled commit SHAs cited across the four FINAL.md commit inventories resolve to real commits.** No fabricated SHAs. Stated for the record — this is the one class of lie these documents do not commit.

**But the inventories are incomplete by construction.** E `FINAL.md:65-68`, G `FINAL.md:75-79`, and H `FINAL.md:70-73` carry rows whose SHA column reads `audit` / `docs` / `chore` / `merge` / `(this)` / `(next)` instead of a SHA — 4, 5, and 4 rows respectively. Each tranche's gate #2 ("FINAL.md cites every commit") reads PASS against a table with those holes. See §4.

**Why these are the least-documented tranches in project memory**: they are the last four of the "audit-cadence" generation (6-agent open audit → N execution waves → 7-lane close audit → FINAL + SEED). Tranche I broke the lineage — it opened as a cross-repo CRUD-conformance cohort paired with fourier-E and never ran the opening audit, never consumed `I-SEED.md`. The E–H ledger tradition died at that boundary, which is exactly why nothing about it reached memory. The chronics did not die with it.

---

## §2 — The commitment ledger

52 distinct commitments: **17 named invariants** + **21 distinct FOLD-INTO-X items** + **14 chronic rows (CH-1..CH-14a)**.

### §2.1 — Named invariants (17)

| ID | Commitment | Claimed at close | Audited status | Evidence |
|---|---|---|---|---|
| E1 | Architectural transposition over patching | HONORED | UNVERIFIED | Subjective; no falsifiable criterion is stated anywhere in `E/FINAL.md:99`. |
| E2 | **NO LEGACY CODE** | HONORED | **NOT LANDED — partial counted as done** | `E/FINAL.md:100`: "HONORED \| `grep '@deprecated' src/` returns **ONLY** the `lerpLegacy` JSDoc". An invariant reading NO LEGACY CODE, evidenced by naming the one piece of legacy code that survived. Actually landed at F (`1ead49e`). At HEAD `grep -rn '@deprecated' src/` = 0. |
| E3 | Pipeline parity across `api/` | HONORED | LANDED at close | `E/FINAL.md:101` grep gates zero. `api/` has since been fully restructured (`api/src/modules/`), so not re-verifiable at HEAD. |
| E4 | Standing audit cadence | HONORED | LANDED | 34 audit docs on disk under `docs/tranches/E/audit/`. |
| E5 | Zero silent deferral; (a)(b)(c) escalation | HONORED | **NOT LANDED** | See §5 (silent drops) and §4 (the escalation whose condition was met and which never fired). |
| F1 | **"No deferrals" as binding** | SATISFIED | **NOT LANDED — definitional** | `F/FINAL.md:109-110`: "**DEFERRED → ZERO (per F1)**" followed in the same block by 3 PEER-AUTHORSHIP items carrying forward. The count reached zero by renaming "deferral" to "carry-forward with a (c) trigger". G repeats it verbatim at `G/FINAL.md:129`. |
| F2 | `lerpLegacy` retires | SATISFIED | **LANDED, holds at HEAD** | `rg -c lerpLegacy src/ test/ demo/` = 0. |
| F3 | Cross-repo write boundary | HONORED | LANDED | 1 authorized write (keyframes.js `470814e`). |
| F4 | W8-W12 back-reference doc | DONE | LANDED | `docs/tranches/F/W8-W12-consumer-lockstep.md` present. |
| G1 | Relay before ratification | SATISFIED | LANDED | Ratification recorded in `G/PROGRESS.md`. |
| G2 | `as any` ≤ 5 in `src/` | SATISFIED (0) | **LANDED, holds at HEAD** | `grep -rn 'as any' src/ \| wc -l` = **0**. The one durable win of the whole scope. |
| G3 | No god module in `src/` (≤ 350 LoC) | SATISFIED | **NOT LANDED — false at own close** | See §3.1. 11 violators at `e166d37`. |
| G4 | 6 invariant proof scripts | SATISFIED | **LANDED-THEN-DELETED (12 days)** | `c4c58421`. |
| H1 | `withTransaction` 9→16 sites | SATISFIED | **LANDED, holds at HEAD** | 18 occurrences at `16129e01` in `api/src/services/`; 25 at HEAD across the restructured `api/src/modules/`. |
| H2 | `as unknown as` ≤ 2 in `src/` | SATISFIED, "strict no-headroom" | **LANDED-THEN-REGRESSED** | At HEAD: **17**. `src/color/anchors.ts` alone carries 11. Gate deleted `c4c58421`. |
| H3 | `demo/` no file > 400 LoC | SATISFIED | **LANDED-THEN-REGRESSED** | Verified 0 violators at `16129e01` *including* the `ui/` exclusion — H3 was honest at close. At HEAD: **5** violators, max `demo/test/export/byte-exact.test.ts` 453. |
| H4 | Cross-tree invariant codification (9 scripts) | SATISFIED | **LANDED-THEN-DELETED (8 days)** | `c4c58421`. |

**Invariants landed at close: 12 / 17. Still true at HEAD: 6** (E4, F2, F3, F4, G1, G2, H1 — 7 counting E3 as unverifiable-by-restructure).

### §2.2 — FOLD-INTO-X commitments (21)

| Tranche | ID | Item | Stated disposition | Audited status |
|---|---|---|---|---|
| E | A-11 | `ConfigSliderPane` → glass-ui `./configurator` | FOLD-INTO-E (`E-AUDIT-2 §9`) | **LANDED as verification only** — `E-FOLD-2-3-4-synthesis.md:158` downgraded it to "A-11 ConfigSliderPane verify-retired \| E.W0 Lane B \| retain". `demo/scenes/ConfigSliderPane.vue:21` does import `ConfiguratorRow`. E-AUDIT-2 had called this "the **single** A-CHRONIC item with no external block" that 3 tranches had triaged as "small, follow-up"; E resolved it by declaring it already done. |
| E | A-14..A-18 | 5 A-vintage doc-drift residuals | FOLD-INTO-E → re-bound to "E.W5 close-audit" | **RE_BOOKED then partially absorbed** — A-14 (stale glass-ui HEAD) gone; A-16/A-17/A-18 survive as in-place corrective parentheticals authored in the D-era HARDEN docs, not swept by E.W5. `docs/tranches/A/coordination/Q.md:10`, `docs/tranches/A/waves/W7.md:4`. No E.W5 sweep lane exists in `E/FINAL.md:229-244`. |
| E | A-19 | gh-pages `dist/` housekeeping + secrets | FOLD-INTO-E ("Trivial. Surfaced in 3 tranches; E should close.") | **SILENTLY_DROPPED (half) — see §5.1** |
| E | B-01 | ~126 vue-tsc shadcn-vue errors | FOLD-INTO-E vendor-policy wave | **RE_BOOKED to F** — E.W4 Lane C produced a *policy document* declaring the 126 acceptable (`E.W4-lane-c-vendor-policy.md:48-63`) and explicitly deferred the fix: "A focused deletion lane (**out of scope here**) could remove them cleanly; the policy lane only NAMES this as a successor candidate." F.W1 Lane C (`1401d75`) did the actual work. The policy artefact `VENDOR-POLICY.md` was itself deleted at `de6428dd`. |
| E | B-02 | 4 of 11 library gaps (G3/G4/G10) | FOLD-INTO-E library-completeness lane | **UNVERIFIED** — no E wave commit maps to it in `E/FINAL.md §2`. No later document re-books it. Candidate silent drop; would be verified by locating a G3/G4/G10 disposition in any post-E document. |
| E | B-07 | Vendoring-policy decision | FOLD-INTO-E | **LANDED then artefact deleted** — `VENDOR-POLICY.md` authored E.W4, removed `de6428dd` (2026-07-03). |
| E | D-03 | smoke-safari WebKit project | FOLD-INTO-E testing-hardening | **LANDED** (`aa2d62a`), then structurally undermined — see §6.2. |
| E | D-05 | L13 k-means tune | FOLD or RETIRE | **RETIRED_WITH_RATIONALE** at F (`F-AUDIT-2 §3` RETIRE-MOOT). Clean. |
| F | E-RF-1 | `lerpLegacy` retirement + codemod | FOLD-INTO-F | **LANDED** (`1ead49e` + peer `470814e`). |
| F | E-OTH-3 | 7→29 zero-consumer shadcn subdirs | FOLD-INTO-F | **LANDED** (`1401d75`, 165→22 files). |
| F | E-OTH-5 | gh-pages housekeeping (3 halves) | FOLD-INTO-F | **PARTIAL counted as CLOSED — see §5.1** |
| F | F-NEW-2 | `proof:resolution` types-key probe | FOLD-INTO-F → landed at G | LANDED at G.W3, **deleted** `c4c58421`. |
| G | NS-1 | types-key probe | FOLD-INTO-G | LANDED, then deleted. |
| G | NS-2 | `api/CLAUDE.md` services tree-drift | FOLD-INTO-G | LANDED (`195b834`). |
| H | NS-H1 | Rolldown `//#region` strip | FOLD-INTO-H | **LANDED** (`d8bc2b7`, −1,291 B). |
| H | NS-H2 | bench provenance → symbol refs | FOLD-INTO-H | **LANDED** (`d8bc2b7`). |
| H | NS-H3 | typed `XYZ_FUNCTIONS` mapped-type | FOLD-INTO-H | **LANDED** (`62fe15d`) — and is the change that pushed `dispatch.ts` to 372 unmeasured. See §3.2. |
| H | NS-H6 | demo god-module audit | FOLD-INTO-H.W0 | LANDED (`H.W3-lane-b-demo-godmodule-audit.md`). |
| H | NS-H7 | `proof:as-unknown-as-budget` | FOLD-INTO-H.W2 | LANDED (`3b0d933`), **deleted** `c4c58421`. |
| H | NS-H9 | `api/` god-module audit | FOLD-INTO-H.W0 | LANDED. |
| H | NS-H10 | `docs/tranches/C/` scaffold — "delete OR commit" | FOLD-INTO-H.W0 ratification ask | **SILENTLY_DROPPED — see §5.2** |

**FOLD commitments landed: 14 / 21.**

### §2.3 — Chronic rows CH-1..CH-14a (14)

Not one reached terminal state inside E–H. Full trace in §3.

**Chronics resolved within scope: 0 / 14.**

---

## §3 — The chronics (disease rows)

### §3.1 — DISEASE ROW #1: "no god module in `src/`" — a gate scoped to its own output

**The claim.** `G/FINAL.md:19`: "**Axis 2 — architectural decomposition**: the 1,430-LoC `color/utils.ts` god-module decomposed into **9 focused modules ≤ 350 LoC each** (G3)." Scoped, and true.

Then the scope silently widens in the prose:

- `G/H-SEED.md:16` — "**Architecture**: `src/units/color/` is 9 focused modules (`conversions/` cluster + `dispatch.ts`); **no god-module remains in `src/`**."
- `H/FINAL.md:42` — "| G3 — **No god module in src/ (≤ 350 LoC)** | HOLD | `dispatch.ts` max 312 (post-G.W4); unchanged in H. |"

**The tree at G's merge commit `e166d37`:**

```
$ git ls-tree -r --name-only e166d37 -- src/ | while read f; do
    n=$(git show e166d37:"$f" | wc -l); [ "$n" -gt 350 ] && echo "$n $f"; done | sort -rn
736 src/units/constants.ts
719 src/units/color/index.ts
631 src/parsing/color.ts
551 src/units/color/constants.ts
541 src/transform/decompose.ts
520 src/parsing/stylesheet.ts
509 src/parsing/math.ts
505 src/easing.ts
453 src/units/utils.ts
399 src/units/normalize.ts
356 src/quantize/cluster.ts
```

**11 files over the cap. Two of them in `src/units/color/` — the exact directory the decomposition was performed in.** `index.ts` at 719 LoC is more than twice the cap and larger than any module G created.

G.W4 caught its one *in-scope* breach (`dispatch.ts` had grown to 391) and remediated at `9902036`. That remediation is what makes the gate look alive. It is the only input that could ever have made it RED: a file emitted by G.W1 Lane B growing past 350. Nothing else in `src/` was in scope, ever.

**Chronicity**: G (born) → H (restated, false) → surfaced at HEAD in a rewritten tree that still carries 5 files over 350 (`src/css/stylesheet.ts` 899, `src/transform/decompose.ts` 609, `src/transform/path.ts` 564, `src/css/grammar.ts` 483, `src/color/anchors.ts` 377).

### §3.2 — DISEASE ROW #2: `dispatch.ts` — the same defect, three names, three closes

| Close | Name | Claimed | Truth |
|---|---|---|---|
| G.W2 | (in-flight regression) | grew to 391 | caught by G.W4 close audit, remediated `9902036` → 312 |
| G close | "G3 SATISFIED — max `dispatch.ts` 312" | 312 | **312 — true** |
| H close | "G3 HOLD — `dispatch.ts` max 312; **unchanged in H**" | 312 | **372** (`git show 16129e01:src/units/color/dispatch.ts \| wc -l`) |
| H → I | "`dispatch.ts` LoC drift watch … **in the 320-340 range** … The G3 ≤ 350 LoC cap **STILL HOLDs**" (`H/I-SEED.md:70-73`) | 320-340 | **372 — the estimate is 32–52 lines low and the conclusion is wrong** |

H.W2 Lane A's typed `XyzFunctionsTable` grew the file. `H/I-SEED.md:70` even attributes the growth ("H.W2 Lane A's typed `XyzFunctionsTable` + 2 lookup helpers added ~28 B") and then guesses at the total instead of measuring it. G had caught this identical defect one tranche earlier with a real `wc -l`. H replaced the measurement with an estimate and shipped the breach.

**This is the cardinal pattern: the same file, over the same cap, at consecutive closes — caught once, then asserted-away.**

### §3.3 — DISEASE ROW #3: the 8 glass-ui primitive asks (A → HEAD, 14+ closes)

Born in tranche A. Every close re-deferred them. Every close renamed the *count*.

| Close | Framing | Count |
|---|---|---|
| A | `research/Ad`, `research/Ae`, `research/Ab` — A-01..A-07, A-09 | 8 raw asks |
| E | "7 standing glass-ui primitive/blob asks" (`E/FINAL.md:182`) | **7** |
| F | "7 glass-ui primitive asks" (`F/FINAL.md:123`) | **7** |
| G | "8 glass-ui primitive asks" (`G/FINAL.md:141`) | **8** |
| H | "**9 chronic 6-tranche-carry asks**" (`H/FINAL.md:126`); `I-SEED.md:86` says "**9 items at 7-tranche carry**" then enumerates **11 numbered rows** | **9 / 11** |

The item count moved 8 → 7 → 7 → 8 → 9 → 11 across five closes with no add/remove event recorded. Aliases across the trace: `A-01..A-09` → `E-RF-2` → `F→G-1` → `CH-1..CH-8` → `G→H-1` → "9 chronic 6-tranche-carry asks".

**Status at HEAD (2026-07-24), by consumer-side anchor:**

| Ask | Status | Evidence at HEAD |
|---|---|---|
| CH-1 Metaballs API | superseded — `MetaballCanvas` never adopted; demo went local (`demo/scenes/blob/BlobPane.vue`) | `rg -l MetaballCanvas demo/` → 0 |
| CH-2 Aurora derive | **RESOLVED at N.W5** (7 tranches after H) | `demo/color-picker/composables/boot/useAtmosphere.ts:26` imports `deriveAurora` from glass-ui |
| CH-3 BlobDot | **RESOLVED at N.W5** | `demo/workbenches/mix/MixResultDisplay.vue:6` — `import { WatercolorDot } from "@mkbabb/glass-ui/watercolor-dot"` |
| CH-4 `SelectTrigger size` | **STILL OPEN** | **12** hand-written `<SelectTrigger class="h-9">` sites, e.g. `demo/scenes/atmosphere/AuroraPane.vue:122,142,156,170` |
| CH-5 `clampLabel` | **STILL OPEN, still under its A-era id** | `demo/shell/PaneSegmentedControl.vue:45` — "(the **Ad-18** clampLabel class of workaround must not spread — L8)"; `demo/shell/dock/DockViewSelect.vue:58` — "Root fix is a `clampLabel`" |
| CH-6 `TooltipContent variant="mono"` | **STILL OPEN** | 13 `TooltipContent` sites, 2 re-specifying a mono recipe |
| CH-7 `Button size="icon-sm"` | consumer anchor vanished | no `icon-sm` anywhere in `demo/`; `PaletteSlugBar.vue` survives at a new path with the TODO gone. Retired by attrition, never by decision. |
| CH-8 `Tabs variant="underline"` | **STILL OPEN** | `demo/styles/foundation.css:554` — the `.underline-tabs` reka override still shipping |

**Four of eight are still open at HEAD, 14+ closes after A first filed them.** One (CH-5) still cites its original A-vintage id in a live source comment. The two that resolved did so at N.W5, seven tranches after H, and not because any E–H trigger fired — because glass-ui 3.12.0 independently shipped the primitives.

### §3.4 — DISEASE ROW #4: contract-v2 §2.1 / `siblingFsAllowTransient` (D → HEAD)

Aliases: `D-01` "Contract-v2 §2.1 keystone gap" → E "NARROWED at E.W0 Lane A … font-asset half only" (`E/FINAL.md:167`) → `E-RF-3` → `F→G-2` "font-asset residual" → `CH-9` "glass-ui font-inlining residual".

E declared it NARROWED. F, G, H each carried it under a re-check trigger. At HEAD:

```
$ rg -n siblingFsAllowTransient vite.config.ts
139:const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
287:                fs: { allow: siblingFsAllowTransient },
```

**Unretired, 5 tranches after D and 14+ closes on.** The carve-out E "narrowed" is still the full sibling-directory allow-list.

### §3.5 — DISEASE ROW #5: keyframes.js precept-pin drift (B → HEAD)

Aliases: `B-10` → `D-02` → `E-RF-4` → `F→G-3` → `CH-10`. Every close: "re-check at the keyframes.js maintainer's next submodule-rebase signal." No signal ever came.

At HEAD the drift persists, on entirely new SHAs — the chronic outlived its own identifiers:

```
$ git submodule status docs/precepts
 63240e677dfd1d5b95e00710a1a4d64664624784 docs/precepts
$ git -C ../keyframes.js submodule status docs/precepts
 8ccf9f4da0198e02382e673f253fe96c2ed03034 docs/precepts
```

The `458c2d1` vs `68d9b20` framing that E/F/G/H all cite is now historical fiction; the divergence is real and unresolved.

### §3.6 — DISEASE ROW #6: the reactivity/e2e flake — retired as a class, then fixed as a defect

| Close | Treatment |
|---|---|
| E.W3 Lane A | "reactivity-instant **Option-1 hybrid flake fix**" — treated as a code defect, fixed (`0f490cc`) |
| F.W4 Lane 6 | 11 failures reclassified: "**Environmental flake** (wall-clock-sensitive), **not code regression**" (`F.W4-lane-6-visual-runtime.md:98`); gate → "PASS (environmental)" |
| G.W0 | **RETIRED as class RM-1 by user ratification** — `G/H-SEED.md:79`: "Playwright environmental flake class (RM-1) — retired at G.W0 … **Do not re-audit as a defect.**" |
| H.W4 Lane C | **fixed anyway** — `H/I-SEED.md:48`: "H-AUDIT-6 §3 reactivity-instant flake \| **MITIGATED** at H.W4 Lane C (2 sites) \| CLOSED" |
| N (2026-06-11) | `docs/tranches/N/PROGRESS.md:81` — "**e2e 0-passed-of-37 ✗** (boot-break)"; `N/audit/fold-ledger.md:12` — "**no gate catches white-screen**" |

A defect was demoted to "environmental", the class was made un-auditable by ratification, the defect was then repaired under a different lane name, and three weeks later the whole fleet read zero. The classification was the disease, not the flake.

---

## §4 — Vacuous gates

For each: *what exact input would make this RED?*

### §4.1 — The escalation whose condition was met and which never fired

`H-AUDIT-2 §7.3` (`docs/tranches/H/audit/H-AUDIT-2-deferred-ledger.md:279`) binds:

> "**CH-2..CH-8 (7 remaining glass-ui asks)** — 'Re-check at every H wave-close … **Hard ceiling: H close ceremony.** If still OPEN at H close → **escalate ledger framing to `chronically-bandwidth-gated-upstream`** (a 7-tranche carry threshold is the proposed escalation marker).'"

The condition was met and *acknowledged in writing*: `H/I-SEED.md:86` — "9 items at **7-tranche carry at H close**".

The term `chronically-bandwidth-gated-upstream` appears **five times in the repo, all in H's planning docs** (`H.md:147`, `H-AUDIT-2` ×4). It appears **zero times** in `H/FINAL.md`, `H/PROGRESS.md`, `H/coordination/Q.md`, or `H/I-SEED.md`.

**What would make it RED**: nothing. It is a self-imposed consequence with no enforcement surface. The tranche wrote the trigger, met the trigger, and did not apply the consequence — and no gate noticed, because the gate was a sentence.

### §4.2 — Two G gates scoped to directories that were already clean

Both are from G's headline Axis 3.

**`proof:no-ts-ignore`** — `G/FINAL.md:104`: "PASS — 0 `@ts-ignore` in src/". `F/FINAL.md:169` goes further: "value.js `@ts-ignore` count: **0** (F.W1 Lane A)" — a *repo-level* claim.

```
$ git grep -n "@ts-ignore" 6b3a41b -- demo/ src/ plugins/ scripts/
6b3a41b:demo/@/.../useMarkdownHighlighting.ts:5:// @ts-ignore
6b3a41b:demo/@/.../useMarkdownHighlighting.ts:7:// @ts-ignore
```

Two live `@ts-ignore` at F's merge commit, and still there at G's merge `e166d37`. F asserted repo-wide zero from a `src/`-only grep; G codified the `src/`-only scope into CI. H then "extended" the script to `demo/` (H.W3 Lane D) and found — the corpus. **The extension is the proof the original scope was chosen around the violation.**

**`proof:no-bare-builtins`** — `G/FINAL.md:109`: "PASS — 0 bare built-in imports in api/src/ (71 files)".

```
$ git grep -nE 'from "(fs|path|url)"' e166d37 -- plugins/ scripts/ bench/
e166d37:plugins/vite-source-export.ts:2:import { readFileSync } from "fs";
```

The exact pattern the gate forbids, one directory outside the scan root, at G's merge commit. H extended the scan to `plugins/ + scripts/ + bench/` and immediately found it (`H/I-SEED.md:45` — "`plugins/vite-source-export.ts` bare `fs` outlier \| FIXED `node:fs` at H.W3 Lane E").

**What would make G's version RED**: a bare builtin *inside `api/src/`* — a directory the same wave had just certified clean. Nothing else. Vacuous by scoping, twice, in the axis G advertised as its third pillar.

### §4.3 — `proof:as-any-budget` — 5 slots of undetectable drift advertised as 0

`scripts/proof-as-any-budget.mjs` @ `61314fa1`: `const BUDGET = 5;` with the comment "Current count at HEAD is 0 — the budget is headroom, not a license to add suppressions."

`G/FINAL.md:105` reports "exit 0 (≤ 5) \| **PASS — 0 `as any` in src/**"; `G/FINAL.md:182` reports the corpus as "**0 / 0 / 0**". Five `as any` could have been added at any point without turning the gate RED while the close documents kept reporting the count as an invariant. (The count did in fact stay 0 — this one held. But the gate never protected the number that was being reported.)

### §4.4 — `proof:codemod-publication` — a gate guarding only itself

Guards that `scripts/migrate-*.mjs` lands in the npm tarball. Its sole protected artefact, `scripts/migrate-keyframes-js-lerp.mjs`, was deleted **in the same commit as the gate** (`c4c58421`). What would make it RED: removing `scripts/migrate-*.mjs` from `package.json files:` — an edit nobody was going to make, guarding a file with one consumer that had already migrated (keyframes.js `470814e`, F.W2).

### §4.5 — The self-certifying close gates (E/F/G/H, all four)

- **"Every wave-log row reads `closed`"** (E gate 1, F gate 1, G gate 1). RED only if the orchestrator forgets to type "closed" into a file the orchestrator owns.
- **"FINAL.md cites every commit"** (E gate 2, F gate 2, G gate 2). Asserted PASS by the document about itself — against tables whose SHA column reads `audit` / `docs` / `chore` / `merge` / `(this)` / `(next)` for the final 4–5 rows of every inventory. `E/FINAL.md:65-68`, `G/FINAL.md:75-79`, `H/FINAL.md:70-73`.
- **E gate 9** — "`package.json` version bumped to `0.7.0` | **(applied in the release commit)**", under a table captioned "All 12 gates GREEN". A promise recorded as a result. (It was in fact honoured — `git show v0.7.0:package.json` → `0.7.0` — but the gate passed before it was true.)

### §4.6 — The (c)-trigger apparatus

E5/F1/G1/H's "TIME-BOUND (c) triggers" are, without exception, **EVENT-BOUND on a third party**: "re-check at glass-ui's next non-AK tranche-open"; "re-check at glass-ui's `dist/glass-ui.css` next-publish"; "re-check at the keyframes.js maintainer's next submodule-rebase signal"; "re-check on user explicit signal". `F/FINAL.md:128` asserts "All triggers are TIME-BOUND per F1 — no vague 'later' carries forward."

None of them can fire from inside value.js. None of them ever fired. A trigger that only a third party can pull is a "later" with a citation.

**And the per-wave-close re-checks were never executed.** `H-AUDIT-2 §7.3` promised "Re-check at **every H wave-close**: `grep -c '@font-face\|data:font' …/glass-ui/dist/glass-ui.css`" and "`git -C glass-ui log --oneline 3822f48..HEAD`". `rg -n "font-face|glass-ui log|re-check" docs/tranches/H/PROGRESS.md` returns **nothing**. `H/coordination/Q.md` records exactly two glass-ui snapshots (open, close) — not four wave-closes. **The promised evidence trail does not exist on disk.**

---

## §5 — Silent drops

### §5.1 — A-19 half: gh-pages `dist/` housekeeping — dropped across three closes, with a witness

The item, in full, at F open (`F-AUDIT-2:51`, row **E-OTH-5**):

> "A-19 `gh-pages` `dist/` housekeeping + secrets contention (stale `postcss-BrHISTov.js`, `standalone-*.js` chunks lingering) … (a) `rm -rf dist/ && npm run gh-pages` one-line orchestrator action (**housekeeping half**); (b) move deploy to OIDC-based auth (**secrets half**)."

Plus a third half F itself introduced in W9-C/W10-β: the orphaned `Github` lucide import blocking `build:gh-pages`.

F.W0 Lane A fixed **only the third half** — the one F had created. Then `F/FINAL.md:103`:

> "**gh-pages chronic closed**: 2 dock-menu Github icon refs migrated to inline SVG (W9-C `@lucide/vue` rename punt)."

A 5-tranche chronic (A.W7 → B.W4 → Da §3 Δ6 → E-OTH-5 → F) declared **closed** by repairing a regression the same tranche had introduced.

**G's own opening audit caught it** — `G-AUDIT-1-prompts-precepts.md:288-290`:

> "**Silent gap candidate**: F closed `Github` icon migration ('gh-pages chronic closed' per F/FINAL.md §6) but the parallel `dist/` housekeeping action (`rm -rf dist/ && npm run gh-pages` once) was **NOT executed**. The stale chunks persist at G open HEAD."

**And then G's deferral ledger lost it.** `G-AUDIT-2:149` renames the survivor to:

> "| **CH-14a** | `gh-pages` **OIDC-auth half (secrets-config)** | CARRY-FORWARD-WITH-SHARPER-TRIGGER | orchestrator-infra-owned … **NOT a code-side defer.** |"

The housekeeping half — a one-line, code-side, fully in-scope action — is not in G's disposition table, not in H's, and appears in no later document. It was still real at H open: `H-AUDIT-3-state-at-H-open.md:26` lists `dist/standalone-CSWytAYg.js` and `dist/postcss-Crs0wH0W.js` — **the same content hashes as at F open**, never rebuilt.

**Detected by G, renamed by G, dropped by G, invisible in H.** This is the highest-fidelity silent drop in the scope because the detection and the loss are both on disk, 260 lines apart in the same tranche's audit corpus.

### §5.2 — NS-H10: `docs/tranches/C/` scaffold

`H-AUDIT-2 §5.1`: "**FOLD-INTO-H.W0** as a **1-line ratification ask** to the user … If delete: `rm -rf docs/tranches/C/` + record in H.W0 close. If keep: `git add docs/tranches/C/` + integrate."

```
$ rg -n "tranches/C" docs/tranches/H/PROGRESS.md docs/tranches/H/FINAL.md docs/tranches/H/I-SEED.md
(no matches)
```

Not relayed, not ratified, not recorded. The scaffold was eventually committed at `b8afd1cf` — "docs: constellation grand-audit + tranche doc-set (**K**)" — two tranches later, by a different program. A 1-line commitment, dispositioned FOLD-INTO-H.W0, absent from every H close artefact.

### §5.3 — B-02: 4 of 11 library gaps

`E-AUDIT-2 §9` binds "B-02 \| 4 of 11 library gaps (G3 + G4 verify + G10 selective) \| E library-completeness lane". No such lane exists in `E/FINAL.md §2`'s 23-commit inventory. `F-AUDIT-2`, `G-AUDIT-2`, and `H-AUDIT-2` never re-book it. **UNVERIFIED / candidate silent drop** — verified by locating any post-E disposition of library gaps G3/G4/G10; I found none.

### §5.4 — The structural drop: `I-SEED.md` was never read by I

H authored 162 lines of forward-carry ledger for its successor.

```
$ rg -ln "I-SEED" docs/
docs/tranches/H/…  (7 files, all H's own)
docs/tranches/K/K.md
docs/tranches/K/audit/W0-six-lane-audit.md
docs/tranches/K/design/K.W1-cross-repo-topology.md
```

**Zero hits under `docs/tranches/I/`.** Tranche I (`docs/tranches/I/FINAL.md:1`) opened 2026-05-28 as "CRUD-CONTRACT v2.0.0 conformance … paired close with fourier-E" — a cohort program with no opening audit, no deferral ledger, no chronic re-disposition. The entire E→F→G→H ledger apparatus terminated at that boundary. K recovered the seed two tranches later; the 22 H dispositions and 14 chronic rows spent two closes unowned.

---

## §6 — Green-over-broken and masked fallbacks

### §6.1 — "Environmental" as an unbounded reclassification

The mechanism, quoted from `F.W4-lane-6-visual-runtime.md`:

- `:60-61` — "25 passed / 11 failed"
- `:107` — "A focused re-run produced a **different** failure set (6 failed) … the failure set is **non-deterministic across back-to-back runs**"
- `:131` — "**Verdict: 0 code regressions.** All 11 failures map to the three named environmental classes"
- `:155` — "**CI will re-validate the environmental classes** … on the CI side"

`F/FINAL.md:80` then records gate #3 as **PASS**, and `F/FINAL.md:83` records gate #6 as "**PASS (environmental)**".

**What would make this gate RED**: a failure the orchestrator declines to classify as environmental. The classification is discretionary and unbounded — non-determinism is offered as *evidence of environmental-ness* rather than as a defect signature. Verification is then deferred to CI, which is outside the close.

**The drift is measurable.** E's own lane doc records a real full-fleet green: `E.W3-lane-b-smoke-safari.md:227` — "`npx playwright test --reporter=line` passes all 5 projects (~36 specs) | 36 passed | **36 passed (54.8s)** | PASS", with WebKit installed locally (`:34-36`, webkit-2248) and `smoke-admin` green at 12/12 (`E.W3-lane-a-coverage.md:162`), which requires a live API backend.

One day later F's fleet fails 11, including "7 × smoke-admin **without local API backend**" and "1 × smoke-safari **missing local WebKit binary**". **Capabilities the predecessor demonstrably had were reclassified as environment.** G then found the WebKit binary version had drifted (2248 → 2287) and — instead of `npx playwright install webkit` — retired the entire class:

> `G/H-SEED.md:79` — "Playwright environmental flake class (RM-1) — **retired at G.W0 (user-ratified)** … **Do not re-audit as a defect.**"

H's gate #17 then reads, in full: "Playwright 5 projects PASS | PASS (CI-deterministic; host-environmental flake noted in audit Lane 6)" — **no numbers at all.**

Terminus: `docs/tranches/N/PROGRESS.md:81` — "**e2e 0-passed-of-37 ✗** (boot-break)"; `docs/tranches/N/audit/lanes/n-critic-K1.md:82` — "36 failed + 1 skipped of 37; 0 passed"; `docs/tranches/N/audit/fold-ledger.md:12` — "**no gate catches white-screen**".

**Per-mechanism green, gestalt broken.** Each close ran a smaller real fleet than its predecessor and booked the difference as environment. Nobody ever ran the product.

### §6.2 — The wholesale repudiation of G4 + H4

G advertised "Axis 3 — invariant codification: **6 new proof scripts** codify the F-thesis + G-thesis invariants as runtime-checkable artefacts" (`G/FINAL.md:20`). H advertised "Axis 4 — cross-tree invariant codification: **all 9 proof scripts now run at full applicability**" (`H/FINAL.md:19`). Between them, 7 of G/H's 21 and 22 gate rows were proof-script rows.

```
$ git log --format='%h %ad %s' --date=short --diff-filter=D --name-only -- 'scripts/proof-*'
c4c58421 2026-06-03 feat(K.W2a): tsconfig.lib/demo split + glass-ui source-resolution (inv-K-1/K-4)
  scripts/proof-as-any-budget.mjs
  scripts/proof-as-unknown-as-budget.mjs
  scripts/proof-codemod-publication.mjs
  scripts/proof-no-bare-builtins.mjs
  scripts/proof-no-deep.mjs
  scripts/proof-no-deprecated.mjs
  scripts/proof-no-ts-ignore.mjs
```

Same commit also removed `scripts/proof-dts-layout.mjs` (F's F-NEW gate #13), `scripts/proof-resolution-contract.mjs` (447 LoC, the precept-30 gate every close from D onward cited), and `scripts/migrate-keyframes-js-lerp.mjs`. Project memory records the owner verdict on the idiom: **"overfit junk"**. `CONTRIBUTING.md` and `VENDOR-POLICY.md` followed at `de6428dd` ("the proof-idiom purge tail").

**Consequence, measured at HEAD:**

| Codified invariant | At close | At HEAD | Delta |
|---|---|---|---|
| `as any` in `src/` (G2) | 0 | **0** | held |
| `@deprecated` / `@ts-ignore` (F2/H4) | 0 | **0** | held |
| `as unknown as` in `src/` (H2, "budget = 2, strict, no-headroom") | 2 | **17** | **8.5×** |
| `:deep()` / `::v-deep` in `demo/`+`src/` (G, `proof:no-deep`) | 0 | **21 live sites / 7 files** | regressed |
| `demo/` files > 400 LoC (H3) | 0 | **5** (max 453) | regressed |
| bare builtins in `api/src/` (G) | 0 | **0** | held |

`proof-no-deep.mjs`'s own header comment names `PaletteCard.vue` as the file whose "last `:deep(svg)` reach" was retired at D.W4. `demo/palettes/browser/card/PaletteCard/PaletteCard.vue` carries **2** `:deep()` at HEAD.

**Three of the six survived. Three did not, and two of the three that regressed were the tranches' own headline achievements.** An invariant enforced only by a script the owner would delete is not an invariant; it is a wave deliverable wearing an invariant's name.

### §6.3 — "DEFERRED → ZERO" — alias smuggling at the ledger level

`F/FINAL.md:109-110`:

> "**DEFERRED → ZERO (per F1)**: All E5 inherited deferrals either landed in F or carry sharpened (c) triggers … The 3 PEER-AUTHORSHIP-REQUIRED items … **carry forward** with explicit TIME-BOUND (c) triggers per F1 binding."

`G/FINAL.md:129` repeats the construction verbatim. Both then print a table of the items that carried forward (`F §7`: 4 rows; `G §7`: 5 rows).

The invariant "No deferrals" was satisfied by redefining a deferral as a carry-forward-with-a-trigger. The count is zero because the noun changed. F-AUDIT-2 `§4` even states the honest version — "**ZERO items remain SILENT or unaddressed**" — which is a different and defensible claim. The FINAL.md escalated it to "DEFERRED → ZERO".

### §6.4 — E's close arithmetic

`E/FINAL.md:19`: "**14 items resolved: 7 folded + 3 retired + 7 route-forward-with-E5-escalation + 0 skipped**". 7 + 3 + 7 = **17**. The source (`E-FOLD-2-3-4-synthesis.md §5`) shows the composition: 2 FOLDED (new) + 5 ALREADY-FOLDED + 3 RETIRED + 7 ROUTE-FORWARD over a 14-item base — i.e. 17 disposition rows, with the 5 "already folded" double-counted into the headline "7 folded" over a base of 14. A close headline that does not add up.

Also: `E/FINAL.md:16` and `:248` cite "`E-FOLD-1..4`" as four deliverables. `ls docs/tranches/E/audit/` shows **two** files: `E-FOLD-1-speedtest-assay.md` and `E-FOLD-2-3-4-synthesis.md`. Declared capture, partially missing on disk.

---

## §7 — What survived, honestly

Not everything is rot. Verified durable at HEAD, two months and ~10 tranches later:

- **G2** — `as any` in `src/` = **0**, unbroken since G.W2, gate deleted and still zero.
- **F2** — `lerpLegacy` gone; `@deprecated` = 0 in `src/`.
- **H1** — `withTransaction` discipline survived a full `api/` restructure (`api/src/services/` → `api/src/modules/*/service/`), 18 → 25 occurrences.
- **H3-at-close** — I checked H's exclusion (`grep -v 'demo/@/components/ui/'`) for hidden violations at `16129e01` and found **none**, including the excluded shadcn cluster. H3 was honest at its close. It regressed only after the gate died.
- **Commit citation** — 36 sampled SHAs across four inventories all resolve. These documents do not fabricate git objects.

The pattern is legible: **invariants that changed the shape of the code survived; invariants that only changed the shape of CI did not.**

---

## §8 — What the next mega-tranche must consume

Ranked by evidence strength, not by convenience.

1. **CH-4 / CH-5 / CH-6 / CH-8** — four glass-ui asks open at HEAD after 14+ closes, with live consumer-side anchors (`demo/scenes/atmosphere/AuroraPane.vue:122` ×12 `h-9`; `demo/shell/PaneSegmentedControl.vue:45` still citing `Ad-18`; `demo/styles/foundation.css:554`). **Decide: file, adopt, or retire-with-rationale.** Do not re-book. A fifth re-deferral makes these 15-close chronics.
2. **CH-9 / `siblingFsAllowTransient`** — `vite.config.ts:139,287` unretired since D. Its (c) trigger has never been pullable from inside this repo. Replace the peer-gated trigger with a value.js-side decision.
3. **CH-10 keyframes.js precept-pin** — divergent on new SHAs (`63240e67` vs `8ccf9f4d`). The chronic outlived its own identifiers; re-file or retire.
4. **The A-19 housekeeping half** — recover it from `G-AUDIT-1:288-290` (the only place it survives), then either execute or retire it explicitly. It has been un-owned across F, G, H, and every tranche since.
5. **H2 regression** — `as unknown as` 2 → **17** in `src/`, 11 of them in `src/color/anchors.ts` alone. Decide whether the H2 policy applies to the post-rewrite tree at all; if yes, this is a real backlog; if no, retire H2 by name so no future close inherits it as HOLD.
6. **G3 / H3 LoC caps** — 5 `src/` files and 5 `demo/` files over their historical caps. Either re-scope the cap honestly (and state the scope) or retire the invariant. Do not restate it as HOLD.
7. **Any new acceptance gate** must name, in the gate row, **the exact input that makes it RED**. Every vacuous gate in §4 would have been caught by that one rule.
8. **Seed discipline** — `I-SEED.md` proves a forward-carry ledger with no consumption obligation is a write-only artefact. Whatever this program authors for its successor must be bound to a consumption gate at the successor's open, or it will be read by nobody for two tranches.

---

## §9 — Verification appendix (commands run)

```
git cat-file -t v0.7.0                                          → tag
git log --oneline --merges master | grep -i tranche             → 47399c2a / 6b3a41bb / e166d373 / 16129e01
git show 16129e01:src/units/color/dispatch.ts | wc -l           → 372     (H claims 312)
git ls-tree -r --name-only e166d37 -- src/ | (wc -l each) >350  → 11 files (G claims 0)
git grep -n "@ts-ignore" 6b3a41b -- demo/ src/ plugins/         → 2 hits  (F claims 0 repo-wide)
git grep -nE 'from "(fs|path|url)"' e166d37 -- plugins/         → 1 hit   (G gate scoped to api/src/)
grep -rn 'as unknown as' src/ | wc -l                           → 17      (H2 budget 2, "strict")
rg -o ':deep\s*\(|::v-deep' demo/ src/ | wc -l                  → 22 (21 code + 1 prose)
rg -n siblingFsAllowTransient vite.config.ts                    → :139, :287
rg -n 'SelectTrigger[^>]*h-9' demo/ | wc -l                     → 12
git log --diff-filter=D --name-only -- 'scripts/proof-*'        → c4c58421 (2026-06-03), 7 scripts
rg -ln "I-SEED" docs/ | grep tranches/I                         → (empty)
rg -n "bandwidth-gated-upstream" docs/tranches/H/{FINAL,PROGRESS,I-SEED}.md → (empty)
rg -n "font-face|glass-ui log|re-check" docs/tranches/H/PROGRESS.md         → (empty)
find demo -name '*.vue' -o -name '*.ts' | wc -l >400            → 5 (H3 claims 0)
git submodule status docs/precepts                              → 63240e67
git -C ../keyframes.js submodule status docs/precepts           → 8ccf9f4d
```

**UNVERIFIED items** (stated for honesty, with the check that would settle each):
- **E1** (architectural transposition over patching) — no falsifiable criterion is stated. Would be verified by a per-transposition before/after diff; none exists.
- **E3** (api/ pipeline parity) — the greps were real at E close but `api/` has been restructured; not re-checkable at HEAD. Would be verified by replaying the four grep gates against `e166d37`.
- **B-02** (4 of 11 library gaps G3/G4/G10) — no post-E disposition found in any tranche document. Would be verified by locating a G3/G4/G10 verdict in E.W1–E.W4 lane docs or any later ledger.
- **E gate #3's lint/build legs** — recorded as "PASS (verified at close)" with no captured output. Would be verified by a build/lint transcript in an E audit doc; the playwright leg *is* captured (`E.W3-lane-b:227`), the others are not.
