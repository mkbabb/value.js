# V · pass-1 research — Family 6 BIG-BANG CODEMOD (atomic per-surface transposition)

**Pass 1 · 2026-07-13 · researcher f6 (Family 6).** Charter §0.1/§0.2/§1/§2 + portfolio survey
tables + Family-6 section. Every claim carries its command / file:line / measured count.

> **Orchestration note (load-bearing for the synthesizer):** my spawn prompt shipped the
> `${x.id}/${x.family}/${x.focus}` template variables UN-substituted. I first targeted the lowest
> uncovered gap (Family 3) and a PARALLEL agent had already written `f3-feature-capsule.md` in the
> same second (identical race, identical reasoning) — I did NOT clobber it. I re-scanned disk:
> Families 1/2/3/4 were then covered; **5 and 6 remained ZERO.** I claimed **Family 6** (the
> higher gap, least likely to be double-picked by a lowest-first pivoter aiming at 5). **Family 5
> (STRANGLER-BY-GATE) is still uncovered after this file.**

**Method**: `madge@8.0.0` present; dep-cruiser is an aikido placeholder. Blast measured by regex over
import specifiers (`.ts`+`.vue`+`.css`); glass-ui referent read READ-ONLY from
`../glass-ui/docs/tranches/BH/`. Scratchpad scripts retained.

---

## §1 · Q-a — the tooling: ts-morph is the WRONG substrate; glass-ui's REGEX codemod is the proven one

The portfolio frames Q-a as "can `ts-morph` reliably rewrite the graph." Measured answer: **ts-morph is
not the reliable substrate for THIS tree, and the constellation already proved a better one.**

| tool | present? | `.vue` `<script setup>` | verdict |
|---|---|---|---|
| **ts-morph** | **NOT installed** (`node -e "require('ts-morph/package.json')"` → fails) | CANNOT parse SFCs (TS AST only) | wrong tool |
| **jscodeshift** | **17.3.0 installed** (babel 7.29.7 / recast 0.23.12) | CANNOT parse SFCs natively (needs `@vue/compiler-sfc` extract) | partial |
| **glass-ui regex codemod** | proven prototype in BH | handles `.vue` as **text** + fail-closed audit | **the mechanism to reuse** |

**Why the AST tools fail here — the 67% fact.** The `@`-abrogation blast is **351 import specifiers**
(per-alias: `@components` 162, `@lib` 87, `@composables` 95, `@utils` 7, `@styles`/`@assets` 0-in-imports).
Split by file type:

- **`.vue`: 236 sites (67%)** · **`.ts`: 115 sites (33%)** (`grep -rEc "from ['\"]@…" demo --include=*.vue|*.ts`).

**Two-thirds of the rewrite lives inside `.vue` `<script setup>`, which neither ts-morph nor jscodeshift
parses without an SFC extract/re-inject wrapper.** An AST codemod would silently skip 236 of 351 sites.

**glass-ui's PROVEN mechanism** (`../glass-ui/docs/tranches/BH/research/proto/codemod-glass-alias.mjs`):
a plain `.mjs` that regex-rewrites the quoted **specifier position** (`SPECIFIER_RE` matches
`from|import(|import|export * from|require(` + quoted body) over `CODE_EXT = {.ts,.vue,.js,.mts,.cts,.tsx,.jsx}`
— treating `.vue` as **text**, so all extensions are handled uniformly. Its dryrun
(`codemod-dryrun-report.json`): **492 rewrites · 166 files touched · `unmatchedREVIEW_unsafeIfNonzero: 0`
· `SAFE: true`.** The reliability is NOT "regex is safe" — it is that the regex rewrite is **paired with
an exhaustive audit scan** (`ANY_SRC_RE` finds every alias occurrence anywhere; any not covered by a
specifier-rewrite is classified comment/prose/dynamic/CSS and must reduce to 0 unsafe). **The audit,
fail-closed, is the correctness proof; the regex is just the edit.**

---

## §2 · Q-a cont. — the value.js blast surface + the divergence from glass-ui's alias-only drop

value.js's codemod is a HEAVIER class than glass-ui's demo drop, because value.js's `@` is a **physical
directory**, not just an alias:

| surface | count | command |
|---|---|---|
| import specifiers to rewrite | **351** | `grep -rE "from ['\"]@(components\|lib\|composables\|utils)/" demo` |
| physical files to `git mv` (`demo/@/**`, non-vendored) | **221** (242 total − 21 vendored `ui/`) | `find demo/@ -type f \| grep -v /components/ui/` |
| — of which `.vue` / `.ts` / `.css` | 90 / 145 / 7 | `find demo/@ -type f -name '*.vue'` etc |
| alias DEFINITIONS to remove | **2 files** | `tsconfig.demo.json` (`paths`) + `vite.config.ts:87–91` (5 `find:` entries) |
| test-mirror files referencing `@` | **4** (~7 sites) | `test/{aurora-bracket,value-domain-clamp,ink,session-single-source}.test.ts` |
| CSS `@import` alias sites | **0** | `grep -rEn "@import[^;]*@(styles\|assets)/" demo` → 0 (value.js CSS is simpler than glass-ui's 10 `cssRefs`) |

**The load-bearing divergence from glass-ui**: glass-ui's `@glass` was a SINGLE alias prefix over `src/`,
and its demo "needs no move-map … rides the alias" (CODEMOD-SPEC §5). value.js abrogates **6 physical
alias prefixes rooted at `demo/@/`**, so value.js's D1 = glass-ui's **`src` resolve-and-recompute +
physical-move class**, not its demo segment-drop class. Concretely the codemod is: (1) 6 `PREFIX_RE`s
`@components/…`→relative (or the `elide()` segment-drop `demo/@/`→`demo/`), (2) a **physical move-map**
`demo/@/**` → `demo/**` (221 files), (3) the same fail-closed audit. glass-ui carried a LARGER version of
exactly this (§6: ~568 internal files + 218 scripts + ~91 dir moves, ATOMIC, gate-verified) — so the
mechanism **scales DOWN comfortably** to value.js's 351/221.

---

## §3 · Q-b — the fence check: blast-vs-U.W-CLOSE is EMPIRICALLY tiny

The portfolio's severest-failure-mode for F6 is "a 214-file move is a merge-conflict BOMB against the
concurrent U.W-CLOSE." Measured against the actual close activity:

- **1** distinct `demo/` product file touched across the **last 30 `tranche-u` commits**
  (`git log -30 … | grep '^demo/@/' | grep -v '\.md$' | sort -u | wc -l` = 1). That one file:
  `demo/@/components/custom/color-picker/controls/SpectrumCanvas/SpectrumPlateCaption.vue`.
- U.W-CLOSE is **docs-scoped** — its commits are the tranche-close ceremony (audit/manifest/FINAL), not
  demo source. **The blast-vs-close conflict surface is ~1 file, not 214.**

So the "conflict bomb" hazard is **refuted empirically**. And it is moot *now* regardless: charter §2
fences the campaign to docs+prototype scope during the close — the codemod EXECUTES in the eventual
tranche wave, not mid-close. F6's real fence answer: the hazard the portfolio feared does not exist in the
measured close, and the charter's deferral removes even the residual.

---

## §4 · Q-c — is the atomic per-surface commit reviewable? YES, via oracle not eyeball

glass-ui proved the atomic commit is **machine-verifiable**, which is what "reviewable" means for a
mechanical mass-rewrite:

- **Correctness oracle**: `vue-tsc --noEmit` **exit 0, 0 errors** after the flatten (CODEMOD-SPEC §4) —
  every rewritten specifier resolving IS the proof the rewrite was complete + correct. For value.js the
  same oracle exists (`npm run typecheck` = `vue-tsc --noEmit` over library+demo).
- **The human reviews the SCRIPT + the audit report, not the 568-file diff.** The dryrun JSON
  (`totalRewrites`, `filesTouched`, `unmatchedREVIEW_unsafeIfNonzero: 0`) is the reviewable artifact; the
  file diff is mechanical noise verified by the typecheck.
- **Git rename-detection is preserved** by glass-ui's Phase-1-rewrite-in-place / Phase-2-physical-move
  ordering (CODEMOD-SPEC §2.2): content-preserving moves show as renames, so `git log --follow` survives.
- **Per-feature decomposition is NOT required for correctness** — glass-ui flattened `{src, tests}` mirror
  trees in ONE pass. Per-surface atomicity (one commit for demo, one for a src god-carve) is viable; the
  only reason to sub-split is diff-review ergonomics, and the oracle removes that need.

---

## §5 · Q-d — glass-ui's CODEMOD-SPEC is DIRECTLY reusable (+ its 3 execution bugs pre-warn value.js)

`../glass-ui/docs/tranches/BH/spec-structure/CODEMOD-SPEC.md` + the working `codemod-glass-alias.mjs` +
`codemod-tests-glass-alias.mjs` are an adaptable, battle-tested kit. What transfers and what value.js
must change:

- **REUSE directly**: the `SPECIFIER_RE` + `ANY_SRC_RE` fail-closed audit pair; the dryrun-report shape;
  the `elide()` "one segment-drop, tail preserved, NO module resolver needed" insight (§1) — `demo/@/`→`demo/`
  is exactly a segment elision.
- **ADAPT**: swap glass-ui's single `@glass/` `PREFIX_RE` for value.js's **6 alias prefixes → relative**;
  add the **physical move-map** (glass-ui's demo needed none; value.js's physical `@` dir does).
- **The 3 §5 bugs, pre-mapped to value.js**:
  1. **Mirror-tree corruption** — glass-ui corrupted 3 `tests/` files whose paths contained the moved
     segments. **value.js has the analog: 4 `test/*.ts` files import demo composables via `@`-alias
     (~7 sites).** They MUST flatten atomically in the same pass, or they break. (e2e/ is clean: 0 `@`-refs.)
  2. **No-dist TS2307 noise** — glass-ui's proof hit false TS2307 on a `dist`-mapped subpath in a fresh
     worktree. **value.js's demo imports `@mkbabb/value.js[/subpath]` from `dist/*.d.ts` (8-key map)** — the
     flatten proof MUST build/symlink `dist` first or scope pass/fail to `@components|@lib|…` specifiers,
     else `npm run typecheck` shows phantom errors unrelated to the move.
  3. **Meta-gate self-reference** — minor; any `@`-ban gate exempts its own file.

**Q-d verdict: strongly YES** — value.js inherits a proven codemod + a pre-written bug list, turning F6
from "author a risky codemod" into "adapt the constellation's proven one."

---

## §6 · severest-failure-mode verdict + the residual risk

F6's named failure mode is "blast radius vs concurrent close + unreviewable atomic commits." Both legs
**refuted by measurement**:

- **blast-vs-close**: 1 demo file in 30 close commits (§3) — the close is docs-scoped; no bomb.
- **unreviewable-atomic**: `vue-tsc exit 0` + the 0-unsafe audit report are the review artifacts (§4);
  glass-ui shipped 568 files atomically this way.

**The residual risk that SURVIVES**: "if the paper target tree is wrong, the whole leap is wrong." F6's
correctness is only as good as the target-tree SPEC — the codemod faithfully executes a design, it does
not validate it. **Mitigation** (from glass-ui's practice): gate the commit on the **dryrun report**
(`unmatchedREVIEW_unsafeIfNonzero == 0` + expected `totalRewrites`/`filesTouched`) BEFORE the real run, so
a wrong pass fails loud in dryrun, not in the landed tree. This makes F6 the natural **execution vehicle**
for whichever *shape* thesis wins (F1/F2/F3/F4): F6 answers HOW, not WHAT.

**BH/BI relationship**: F6 aligns on MECHANISM — it literally reuses glass-ui's `CODEMOD-SPEC.md` +
`codemod-glass-alias.mjs`. It is the canonical big-bang pole of the charter's "big-bang vs strangler"
axis (F6 vs F5). Composition: **one shape thesis × F6 execution × a minimal F5 born-RED gate to hold the
line after the leap** is the expected convergence.

---

## §7 · the 6 load-bearing findings

1. **ts-morph is the wrong substrate**: NOT installed AND cannot parse `.vue`, where **236/351 (67%)** of
   the `@`-blast lives. An AST codemod silently skips two-thirds of the rewrite.
2. **The proven substrate is glass-ui's REGEX codemod** (`codemod-glass-alias.mjs`): regex specifier-rewrite
   over `.vue`-as-text + a **fail-closed audit** (`ANY_SRC_RE` → 0 unsafe). Dryrun: 492 rewrites / 166 files
   / `SAFE:true`. Reliability = the audit, not the regex.
3. **value.js blast = 351 import sites + 221 physical file moves + 2 config files + 4 test-mirror files**;
   CSS is clean (0 alias `@import`). It is glass-ui's *resolve-and-recompute + move* class (physical `@`),
   heavier than glass-ui's demo *segment-drop* (alias-only) — but a strict SUBSET of what glass-ui already
   shipped atomically (568 files + 91 moves).
4. **Blast-vs-close is empirically tiny**: **1** `demo/@/` file touched in 30 `tranche-u` commits; U.W-CLOSE
   is docs-scoped. The "merge-conflict bomb" fear is refuted; the charter defers execution regardless.
5. **The atomic commit IS reviewable via oracle**: `vue-tsc --noEmit exit 0` proves completeness; the human
   reviews the codemod script + dryrun report, not the 568-file diff; Phase1-rewrite/Phase2-move preserves
   git rename detection.
6. **glass-ui's CODEMOD-SPEC + 3 execution bugs transfer directly**: reuse the audit pair + `elide()`;
   adapt to 6 prefixes + a move-map; pre-handle the tests-mirror (4 value.js `test/*.ts`), the no-dist
   TS2307 (build/symlink `dist`), and gate-self-reference.

**Net F6 verdict**: the strongest EXECUTION-axis answer for D1 (the 351-site `@` abrogation) — proven
mechanism, machine-verifiable, small measured conflict surface. Its residual risk (a wrong target spec) is
inherited from whatever SHAPE thesis it executes; F6 is HOW, not WHAT, and its dryrun-report gate makes a
wrong leap fail loud before it lands.
