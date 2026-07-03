# CRIT-boot-blast-radius — Pass-2 critique

**Critic**: Pass-2 · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/boot-blast-radius.md`
**Ancestor**: proto-boot-cascade (88%) · **Binds**: PASS1-VERDICT §5 P0-#3, §5 P1-#12
**Verdict**: RATIFY · **Convergence**: 98% · **mustFix**: none

---

## Method

Read the target in full; spot-checked every load-bearing `file:line` against the live worktree
(`.claude/worktrees/wf_d9a4e4d9-899-2`, now at `e80b359`/1.2.0 — the stale-worktree reset in §0 is
confirmed by `git log -1`). Independently reproduced the cure's alias generation, verified byte-parity
from the saved shas, and read the baseline/cured boot logs. Nothing was taken on faith.

## Spot-checks — every load-bearing claim VERIFIED

| Claim (report §) | Verification | Result |
|---|---|---|
| Sole tracked change is `vite.config.ts` | `git status --short` → `M vite.config.ts` + untracked `node_modules`/`docs/tranches/R` | PASS |
| Exports-map has 8 entries; alias generated from `conditions.import` | dumped `package.json#exports` = `.`+7 subpaths, each with `import` | PASS |
| Generation → 8 anchored `^…$` regexes at the exports paths | re-implemented the gen loop; output = `dist/value.js` + `dist/subpaths/*.js` exactly | PASS |
| Anchored bare `.` regex cannot swallow `/math` | `new RegExp('^@mkbabb/value\\.js$').test('@mkbabb/value.js/math')` → **false** | PASS — the bug class is provably gone |
| Self-dep `^1.0.2` at `package.json:113` | `grep -n` → line 113 | PASS |
| `node_modules/@mkbabb/value.js` is a REAL DIR @ 1.0.2 (not symlink) — proto's "nothing to resolve to" is FALSE | `-d` true, `-L` false, its `package.json.version` = 1.0.2 | PASS — proto correction stands |
| Byte-parity: 71 dist files identical baseline↔cured | `diff q-baseline.sha q-cured.sha` → identical, 71 files | PASS — §3 exact |
| Precondition: nothing in `src/` imports `@mkbabb/value.js` | `grep "from '@mkbabb/value.js"` src/ → NONE (only doc-comment mentions) | PASS — byte-parity is structural |
| dev cured PASS / baseline FAIL | `boot-q.log` = `[boot-smoke] PASS`; `boot-baseline.log` = `[UNLOADABLE_DEPENDENCY] Could not load dist/value.js/math … Not a directory (os error 20)` on a keyframes `/math` import | PASS — R-era bug reproduced + cured, cold-cache |
| `boot-smoke` wired at `package.json:83` | `grep -n` → line 83 | PASS |
| Tabs shim `demo/@/components/ui/tabs/index.ts:1` dead-imports 4 symbols | file = `export { Tabs, TabsList, TabsTrigger, TabsContent } from "@mkbabb/glass-ui";` | PASS — verbatim |
| glass-ui 4.2.0 barrel exports 0 `Tabs*`; `dist/tabs.js` exports only `SegmentedTabs` | `grep -c 'Tabs' dist/glass-ui.js` = 0; `dist/tabs.js` tail = `export { V as SegmentedTabs }`; version = 4.2.0 | PASS — §4 drift real + current |
| 10 demo files consume `ui/tabs` | `grep -rl 'ui/tabs' demo/ \| wc -l` = 10 | PASS |
| abrogation-sweep half-1 checks specifier→exports-key, NOT named-export existence | read `scripts/abrogation-sweep.mjs:60-110`: tests `key` liveness against `exactKeys`/`wildcardPrefixes`; bare `@mkbabb/glass-ui` → live `.` key → passes despite `Tabs` gone | PASS — §6 blind-spot genuine |

## MustFix discharge (PASS1-VERDICT §5)

- **P0-#3 (verify cure across all four modes)** — **DISCHARGED, not paraphrased.** The verification target is
  *does value.js resolve clean* in each mode. Proven: `build` byte-identical (the alias never fires for the
  `src/`-only lib graph — structurally, no self-import); `dev` cold-boot PASS with baseline FAIL on the exact
  `/math` error; `gh-pages`/`hero-lab` advance **past** the LOAD phase (where the bug lived) to a LINK-phase
  error on an unrelated glass-ui symbol. The precedence argument (UNLOADABLE_DEPENDENCY at LOAD outranks
  MISSING_EXPORT at LINK — as baseline demonstrated) is architecturally sound: a residual value.js failure
  would resurface at higher precedence. The report is **honest** that gh-pages/hero-lab do not reach full
  green, and correctly attributes that to an **independent, pre-existing** blocker (§4 Tabs drift) it routes
  out of lane rather than absorbing. Legitimate discharge with a truthful caveat.
- **P1-#12 (regex↔exports coupling / dev-config-only)** — **DISCHARGED and strengthened.** The report took
  the stronger fork: resolve through `package.json#exports` (§5) rather than merely documenting the regex
  coupling. This collapses Axis-A drift to zero *by construction* (§6). `dev-config-only` is stated and
  proven (§3/§7): no `dist/` change, no version bump, decoupled from every publish gate.

## Precept + scope audit — CLEAN

- **No over-scoping.** Code change confined to `vite.config.ts` alias generation. The three new findings
  (Tabs drift, stale worktree, sweep blind-spot) are surfaced-and-routed; diagnostic stubs reverted
  (`git status` confirms only `vite.config.ts` tracked). No reach into `scripts/` or `demo/`.
- **No contrivance / KISS.** Exports-map generation is *less* duplicated knowledge than the proto's
  hard-coded `dist/subpaths/$1.js`, and mirrors the established `abrogation-sweep.mjs` exports-read idiom
  (verified at `scripts/abrogation-sweep.mjs:67-72`). The one unguarded case (missing `import` condition)
  fails loud at config-eval — the report explicitly declines speculative generality. Correct call.
- **No legacy / no workaround.** The cure removes a prefix-rewrite hazard at its root; no shim.
- **Current vs glass-ui 4.2.0 / kf 5.1.0.** Tested against glass-ui 4.2.0 (confirmed in `node_modules`) and
  the keyframes `/math` consumer. No staleness.

## Residual (not mustFix)

The gh-pages/hero-lab *full-green* claims rest on the (sound) precedence argument plus a reverted Tabs stub
rather than a committed build log — re-running both with the stub and saving the `✓ built` transcripts would
seal the last inch. I decline to make this a mustFix: I independently verified every component the argument
depends on (byte-parity, dev pass/fail, glass-ui Tabs absence, the 1.0.2 self-install, the sweep blind-spot),
and the conclusion follows. The §4 Tabs blocker is a **real** tranche-R gate item (the deployed demo is
unbuildable against glass-ui 4.2.0) — correctly out of this lane, but the orchestrator must ensure the
demo↔glass-ui consumption track (adjacent to proto-glassui-consume) actually lands the `SegmentedTabs`
migration. A routing note, not a defect in this deliverable.

## Verdict

The amendment closes the 88% ancestor gap fully. Both bound mustFix rows are discharged with independent
proof, the proto's factual error is corrected (and I re-verified the correction), the regex-vs-exports
decision is made and is the better one, and the coupling is analyzed on both axes with a correct guard
recommendation. No precept violations, no over-scoping. I would co-sign ratification.

**Convergence: 98%. mustFix: none.**
