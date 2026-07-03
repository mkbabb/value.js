# CRIT-SPEC-V2 — Pass-2 critique of SYNTHESIS-v2 (Tranche R specification)

**Critic**: Fable (pass-2 critic mandate) · **Date**: 2026-07-02 · **Target**: `docs/tranches/R/audit/pass2/SYNTHESIS-v2.md` (391 lines, read in full)
**Ancestor**: pass-1 SPEC scored 88%; loop minimum 84% (proto-gamut-policy). Charter: judge whether the pass-2 amendment CLOSED the gap.
**Method**: every load-bearing file:line citation spot-checked against the live trees (value.js `tranche-q` @ `e80b359`, glass-ui 4.2.0, keyframes.js 5.1.0); all 20 PASS1-VERDICT §5 rows re-audited against the discharge table; both §6 dissents traced; the three worktree lane reports read at their in-worktree paths.

---

## Verdict summary

**Convergence 91% — AMEND, small.** The amendment genuinely discharged all 20 §5 mustFix rows and both §6 dissents — I verified the substantive ones independently, and every one holds. The document is self-contained, the wave DAG is sound, the ratification table is honest (no manufactured OPENs; the taste calls really are taste calls), and the pass-2 lanes moved four answers with real measurement rather than paraphrase. **But the spec carries one refuted load-bearing factual claim** — the `extractFunctions` "absent from source" finding is a worktree-staleness artifact, false against the tranche head — elevated across five sections including an R.W1 gate clause, and the staleness that produced it is unrecorded (the §13 process lesson names only the boot-blast worktree, which *did* self-correct; the two lanes that stayed stale did not). The remediation is text-only; no structural change to any wave, gate shape, or disposition is needed.

---

## §A — The one CONFIRMED defect: KF-1b rests on a staleness artifact

**The claim** (SYNTHESIS-v2 §0.2, §3 R.W1 item 3, §9 KF-1b, §10 ledger row, §11 P0#1 discharge note): *"`extractFunctions` — kf's consumed symbol — exists only in the shipped dist, **absent from source**; a fresh build would drop it. Restoring it is now a named R.W1 sub-item"* — specced as KF-1b "**blocking the KF-1 letter**", with an R.W1 gate clause ("`extractFunctions` present in a **fresh-build** `.d.ts`").

**The live tree refutes it.** At `tranche-q` @ `e80b359`:
- `src/parsing/extract.ts:99` — banner `── extractFunctions (VJ-CSS1) ──`; `:124` — `export const extractFunctions = (`.
- `src/index.ts:291` — barrel re-export. `src/subpaths/parsing.ts:47` — subpath re-export.
- `git log -- src/parsing/extract.ts` → the symbol landed at **`23d1a91` (Tranche P, 1.1.0)**; `git show HEAD:src/parsing/extract.ts` confirms it committed, not a worktree edit.

A fresh build from current source **keeps** the symbol. The kf re-pin does not break on a missing export. KF-1b as written is a no-op "restore" of code that exists.

**Root cause, proven**: the kf1-grammar lane's worktree (`.claude/worktrees/wf_d9a4e4d9-899-3`) sits at **`15b0382` (v1.0.2)** — 3 commits before the tranche head, *predating* `23d1a91`. Its §6 evidence (`git grep extractFunctions HEAD -- 'src/*'` empty; "`src/index.ts:271-275` re-exports the same four") was all gathered against the stale HEAD. The contradiction was **already inside the synthesis's own inputs**: boot-blast-radius §1.2 (worktree-2, which discovered its own identical staleness, `git reset --hard tranche-q`, and flagged it to the orchestrator) states verbatim that *"the stale src predates the P/Q barrel exports (`parseCSSSubValue`, `extractFunctions`)"* — i.e., a sibling pass-2 report names `extractFunctions` as a **P/Q-era source export**. The synthesis did not reconcile the two lanes.

**Blast radius of the error** (why this is the mustFix and not a nit):
1. §0.2's "load-bearing side-finding" headline is false.
2. §3 R.W1 item 3 + the R.W1 gate clause spec dead work (the gate would pass trivially — no implementation harm, but a ratification document asserting a false fact about its own tree fails the spec-truth bar this loop exists to enforce).
3. §9 KF-1b's "without it the kf re-pin breaks on a missing export" is a false dependency labeled *blocking*.
4. §11 P0#1's discharge note cites the false find as a bonus ("Plus the load-bearing side-find").
5. **Derived, unstated caveat**: the "prototyped green, 1877/1877" figure for the KF-1 diff was measured **on the stale 1.0.2 base**. This is survivable — `git diff 15b0382..e80b359 -- src/parsing/stylesheet.ts src/parsing/serialize.ts` is **empty** (both files byte-identical to head, so the source fix carries verbatim) — but the diff's test-file half (`test/grammar-2026-atrules.test.ts` +84) must re-apply/re-run against `e80b359`'s larger Q-era suite, and the spec should say so instead of citing the stale-base count as if measured at head.
6. Same staleness class, benign instance: worktree-1 (gamut-bound) is **also** at `15b0382` — but `git diff 15b0382..e80b359 -- src/units/color/gamut.ts` shows only an **appended** `oklchToXYZTuple` (P-era `color2Into` support); `GAMUT_ALPHA` (`:242`), the doc lines (`:5`, `:246`), and the entire `gamutMapOKLab` core are untouched, so the 164-color measurements and the 0.083 bound stand against head. Record it; nothing re-runs.

**Fix shape** (text-only): correct §0.2/§3-R.W1.3/§9-KF-1b/§10/§11-P0#1 to "present in source since 1.1.0 (`23d1a91`; `extract.ts:124`, barrel `index.ts:291`, subpath `parsing.ts:47`)"; demote KF-1b to a one-line fresh-build `.d.ts` assertion (cheap, keep it) or strike; add the kf1-grammar + gamut-bound worktree staleness to the §13 process lesson (currently it names only boot-blast, the lane that *self-corrected*); annotate the 1877/1877 figure with its base + the byte-identical-source carry argument.

---

## §B — Spot-check ledger (everything else verified TRUE)

| # | SYNTHESIS-v2 claim | Live-tree check | Verdict |
|---|---|---|---|
| 1 | `gamut.ts:242` `GAMUT_ALPHA = 0.05`; doc strings `:5-6`, `:246` | exact — `:242` constant, `:5` "alpha=0.05" strategy line, `:246` docstring | TRUE |
| 2 | KF-1 bug: `stylesheet.ts:637-706` colon-splits; `CustomFunctionParameter` `{type, defaultValue}` at `:44-48`; serializer `serialize.ts:132-140` emits `name: type: default` | exact — `parseFunctionParameters` at `:642`, `colonIdx = segment.indexOf(":")`, type fields at `:44-48`, serializer `s += \`: ${p.type}\`` at `:136-138` | TRUE |
| 3 | Tabs drift: `demo/@/components/ui/tabs/index.ts:1` dead-imports 4 symbols; glass-ui 4.2.0 barrel exports none; `./tabs` = `SegmentedTabs` only; 10 demo consumers | exact — index.ts:1 verbatim; `dist/glass-ui.js` grep "Tabs" = **0**; `dist/tabs.js` tail = `export { V as SegmentedTabs }`; `grep -rl 'ui/tabs' demo` = **10** files | TRUE |
| 4 | Boot: `vite.config.ts:50` object-form self-alias; the false "never installs itself" comment; four modes spread `defaultOptions` (~125/204/232/273) | exact — `:50` `"@mkbabb/value.js": path.resolve(…, "dist/value.js")`; comment at `:42-44`; production/hero-lab/gh-pages/dev spreads confirmed at the cited lines | TRUE |
| 5 | Retro-tags: 10 publish commits pinned; v1.1.0/v1.1.1/v1.2.0 minted but unmerged; master 3 commits behind | 5 of 10 spot-checked (`0cb5dd2`=0.11.2, `9fce504`=0.13.0, `dd9beb5`=1.0.0, `f1d9bab`=1.0.1, `15b0382`=1.0.2 — all match); `git merge-base --is-ancestor e80b359 master` → NOT merged; `pre-modernization` tag exists | TRUE |
| 6 | W0-6 CONTRIBUTING/VENDOR-POLICY **unstaged** deletions; W0-7 precepts ` m`; W0-11 P/Q dirs "do not exist" | `git status` → ` D` ` D` ` m` exactly; `docs/tranches/` = A..O + R, **no P, no Q** | TRUE |
| 7 | `bezierPresets` = 23 rows, no `smooth-step-3` row (fn exists analytically at `easing.ts:128/:493`); catalogue IS the picker's (glass-ui `useEasingPicker.ts:22` imports it); kf imports it **nowhere** | all confirmed — presets end at `ease-in-out-back`; glass-ui imports at `:22`; kf src grep = 0 | TRUE |
| 8 | `GRADIENT_EASING_NAMES` = **24** incl. `smooth-step-3` (`useGradientModel.ts:57-82`) | exact — 24 quoted names, `smooth-step-3` last | TRUE |
| 9 | `dispatch.ts:371` `gamutMapToRgbSpace`, no `deltaEOK` in the loop | exact — function signature at `:371`; docstring self-describes the bisection | TRUE |
| 10 | O.W7 fuse needs zero new exports: `deltaEOK`/`gamutMapOKLab`/`DELTA_E_OK_JND` public at `src/subpaths/color.ts:120-134` | exact — the export block spans `:120-134` | TRUE |
| 11 | Luma flip 0.5 via shared `spectrumDotStyle` (`SpectrumCanvas.vue:231-233`) | exact — computed at `:226`, `luma > 0.5` ink flip at `:231-233` (file lives at `controls/`, not pass-1's `visual/` — spec cites no path, so no error) | TRUE |
| 12 | D8-1 producer sites: build-emitted `@import "./components.css"` **unlayered**, `vite.style-assets.ts:307/:366` (not `src/styles/index.css:258`) | confirmed — `compImport = '@import "./components.css";'` at ~`:307` (no `layer()`); `foldImports` at ~`:366` | TRUE |
| 13 | kf shim: `VJS_PARAM_BUG_MAX = "1.2.0"` + `normalizeParam` in `resolve-function.ts`; `adapter.ts:3` imports `extractFunctions` | exact — `:35` and `:69`; adapter `:3` | TRUE |
| 14 | Q9 decisive fact: api conformance suite zero cross-repo reads, doc cited in docstrings only | confirmed — `api/test/conformance/diff.test.ts:5` names `J-diff-shape.md` in a comment; no `readFile`/relative sibling import | TRUE |
| 15 | mix-RAF: 5 ungated rAF in `useMixingAnimation.ts` | exact — 5 `requestAnimationFrame`, 0 PRM guards | TRUE |
| 16 | `App.vue:115` imports `/goo-blob` (`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`) | exact | TRUE |
| 17 | Treatments untracked: color-picker.md 25 KB, hero-lab.md 32 KB | 25,113 / 32,228 bytes, untracked | TRUE |
| 18 | `ColorSpaceSelector.vue`: ghost at `:15`, font override `:16-17` | exact (`variant="ghost"` `:15`; `fontFamily` style `:16`) | TRUE |
| 19 | W0-14 hoisting need: 3 lane reports live only in worktrees | confirmed — `gamut-bound.md`/`boot-blast-radius.md`/`kf1-grammar.md` in `wf_d9a4e4d9-899-{1,2,3}`, absent from the main-tree pass2 dir | TRUE |
| 20 | kf1 worktree diff "4 files, +141/−30" | exact (`git diff --stat` in worktree-3) | TRUE |
| 21 | `conversions/index.ts` named-export form (residual-risk 2's precondition) | confirmed — all named re-exports, no `export *` | TRUE (risk already discharged; could be noted) |
| 22 | glass-ui peer `keyframes.js ^5.0.0`; value.js deps `file:../glass-ui`/`file:../keyframes.js`; self-dep `@mkbabb/value.js ^1.0.2` (the stale self-install the alias overrides) | all exact from both package.json files | TRUE |
| 23 | `boot-smoke` + `abrogation-sweep.mjs` exist as named | `package.json:83` + `scripts/abrogation-sweep.mjs` | TRUE |

**PASS1-VERDICT §5 accountability**: all 20 rows genuinely discharged — none paraphrased away. The three that *moved answers* (P0#2 gate-fail → tiered bound + Q7 two-option; P0#5 premise overturned → zero-drop; P1#11 → early dispatch + gate split) are the honest kind of discharge: the lane reports carry the measurements (gamut-bound §2.2 tiered bound verbatim; easing-disposition catalogue identity; dispatch-homes A.0 decisive fact), and §11's strike-list correctly retires the superseded pass-1 numbers including the verdict's own §6.2 estimate. The §6 dissents are argued to conclusion, not buried — §11's treatment of the gamut dissent (the posture vindicated *because* the bound moved the disposition) is exemplary process honesty.

**Precept scan**: no legacy (the KF-1 record-as-canonical fallback stays struck; interims stay dead; Tabs cure is consume-the-producer, not a demo shim); no contrivance (boundary API lands engine-side with the demo owning paint; Parse-Lab fused not paned; §2.4 rejection list holds); no design-system bypass (SegmentedTabs migration honors glass-ui-first; watercolor-swatch is consume-or-delete); no over-scoping (R.W5 slippable; books never gate; W7 gates on nothing external). Staleness vs glass-ui 4.2.0/BG and kf 5.1.0: none found — the spec is *ahead* of pass-1 here (it caught the 4.2.0 Tabs removal pass-1 missed, corrected the D8-1 site to the build-emission layer, and routes BG/BH correctly).

---

## §C — Minor notes (should-fix; none blocks ratification)

1. **GAP-3 specifier enumeration** (§8.3): `/styles/animations` appears in the demo only as a **comment** (`demo/@/styles/animations.css:3` — "are provided by…"), while the real import set includes `@mkbabb/glass-ui/styles.css` (`demo/@/styles/style.css:53`) which the 16-specifier list omits. Net count may still be 16, but the by-name table ask should ship the *verified* enumeration — the GAP-3 precedent (the unlisted Tabs removal) is precisely about by-name accuracy. Verify at letter-drafting.
2. **§8.6 peer-floor phrasing**: glass-ui's *live* peer floor is `@mkbabb/value.js ^1.0.0`; the parenthetical "`^1.1.1`, planned at BH B2.1-swap" reads as if `^1.1.1` were current. The ask (ride to `^2.0.0`) is right either way; one word ("currently `^1.0.0`; `^1.1.1` planned…") disambiguates.
3. **Residual-risk 2 is already dischargeable**: `conversions/index.ts` uses named exports today (verified) — the implementer-verifies note could simply record the verification.

---

## §D — Convergence

The pass-2 amendment closed the pass-1 gap: every §5 row discharged with evidence, both dissents resolved on their own stated grounds, four answers moved by measurement, the ratification table reduced to genuine owner-taste calls with costed defaults, and no proto orders outstanding. Of ~40 load-bearing citations spot-checked, **39 are exact against the live trees**. The single confirmed defect — the `extractFunctions` staleness artifact and its unstated provenance — is a text-only fix touching five sections and one gate clause, with zero effect on the wave DAG, the Q-table, or any disposition. **91%.** With mustFix #1–#2 applied (and ideally the §C notes), this critic would co-sign ratification.

### mustFix
1. **Correct the `extractFunctions` claim everywhere it appears** (§0.2, §3 R.W1 item 3 + gate clause, §9 KF-1b, §10 ledger, §11 P0#1): the symbol is in source since 1.1.0 (`23d1a91`) at `src/parsing/extract.ts:124`, exported via `src/index.ts:291` + `src/subpaths/parsing.ts:47`; a fresh build keeps it. Demote KF-1b to a trivial fresh-build `.d.ts` assertion (or strike); remove "blocking the KF-1 letter".
2. **Record the worktree staleness honestly** (§13 process lesson + §3 R.W1 item 2): worktrees 1 (gamut-bound) and 3 (kf1-grammar) sit at `15b0382`, 3 commits stale, and did **not** self-correct as boot-blast did; state that the KF-1 "1877/1877" was measured on the stale base and carries because `stylesheet.ts`/`serialize.ts` are byte-identical to head (verified), with the diff's test-file half to be re-applied/re-run against `e80b359` at R.W1; note gamut-bound's base is measurement-equivalent (`gamut.ts` delta is one appended P-era function, core untouched).
