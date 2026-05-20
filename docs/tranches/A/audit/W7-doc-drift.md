# W7 close audit — doc-drift inventory

**Lane**: W7 read-only close audit, lane 3 (doc-drift). Run by tranche B.W0 Lane C for A's close ceremony.
**Method**: A's docs (`A.md`, `findings.md`, `coordination/Q.md`, `dispatch/AGENT.md`, `PROGRESS.md`, `waves/W0..W7.md`) and root `CLAUDE.md` read against the shipped tree (`test/`, `git log`, the registered `docs/precepts` SHA). PROGRESS.md is the recorded reality for the vitest count per the audit brief; vitest was not re-run.
**Verdict**: 14 drift items across 6 files. All are doc fixes for B.W4; this lane only inventories. The largest cluster is the stale `research/Aa..Ae` shorthand (omits `Ag`) and the un-recorded precepts-SHA advance from `3310a8c` to `3c32fae`. No structural defect; A's wave work and commits are sound.

This lane inventories drift. It does not fix it; B.W4 owns the corrections (`research/Ag→Ac` rename included).

---

## `CLAUDE.md` (repo root)

| Claim | Reality | Fix needed |
|---|---|---|
| `npm test` "1372 tests, 24 files" (line 16) | `PROGRESS.md` records 1409 tests / 26 files at every wave close (W0 line 78, W5 line 206). `ls test/*.test.ts` → 26 files. | Update to `1409 tests, 26 files`. The `1372`/`24` figures predate the tranche; A.W0–W5 added test files and never refreshed `CLAUDE.md`. |
| `test/` block comment "playwright E2E tests (14 specs)" (line 61) | A.W5 Lane C's 16-spec e2e migration was killed and not committed; `PROGRESS.md` (line 202) records tranche B.W3 abrogating "the entire 16-spec Playwright suite". The "14 specs" count is itself contested — PROGRESS calls it 16. | Reconcile the spec count (14 vs 16) against `e2e/` and note B.W3's abrogation, or leave for B.W3 to correct. Flagged as drift; precise count out of this lane's read scope. |
| `test/` block comment "vitest unit tests (24 files)" (line 60) | 26 `.test.ts` files on disk. | Update to `26 files` (same drift as the line-16 count). |

`CLAUDE.md` was not on any A wave's file-bounds table (`A.md §5` scopes A to the demo, not repo-root docs), so this drift is unsurprising — but the close audit must record it.

---

## `A.md`

| Claim | Reality | Fix needed |
|---|---|---|
| §1, §3, §4, §5, §8, §10 repeatedly write `research/Aa..Ae` as the research-set range | `research/` holds 5 files including `Ag-design-tokens-hierarchy.md`. `Aa..Ae` excludes `Ag` and its 13 findings. `HARDEN-6 §6` defect 7 already flagged this exact slip ("`research/Aa..Ae` shorthand omits Ag") and prescribed `Aa..Ag`. The fix was never applied. | Change every `Aa..Ae` to `Aa..Ag` (or the contiguous range after the B.W4 `Ag→Ac` rename). 6 sites in `A.md` alone. |
| §10 "Research-file legend ... transliterated `a b g d e` ... There is no `Ac`/`Af`; the sequence is contiguous in Greek." | The Greek sequence is contiguous; the **Latin filenames are not** — `Aa, Ab, Ad, Ae, Ag` has visible gaps at `Ac`/`Af`. `HARDEN-6 §4` calls the lettering "genuinely sloppy" with "three competing schemes". `A.md §10` defends the gap as intentional; HARDEN-6 contradicts that. B.W4 renames `Ag→Ac`. | After B.W4's rename the legend is stale; the §10 defense of non-contiguous filenames should be struck. Inventory only. |
| §8 "the 6-wave plan left unassigned — Ab-1 through Ab-7, Ab-16 through Ab-19, and Ag-6 ... the assignment is complete" | `HARDEN-6 §6` named **four** un-routed findings against A.md's "None": `Ag-6`, `Ab-16`, `Ad-20`, `Ae-12`. `A.md §8` routes `Ag-6` and the `Ab` block but is silent on `Ad-20` and `Ae-12`. The audit brief flags `Ad-20`/`Ae-12`/`Ab-16` as "never formally recorded". | `Ab-16` is in fact recorded — `PROGRESS.md` line 122 ("Ab-16 recorded-deferred (dev-only)") and `W2-lane-ca.md`. `Ad-20` and `Ae-12` have **no** retire-with-rationale line in `A.md §8` or any wave spec. `A.md §8` needs an explicit retire-with-rationale entry for `Ad-20` (SelectContent widths) and `Ae-12` (Aurora cursor seam), citing each research finding's own deferral note, per `HARDEN-6 §6` defect 1. |
| §8 "`research/Ag` holds 13 findings (Ag-1..Ag-13), not 14" | `HARDEN-6 §6` cross-checks Ag at "14 findings" in two places (§6 routing spot-check, §6 honesty para). `A.md §8` and `W3.md` line 10 assert 13. The two hardening docs disagree internally. | Not A.md's drift to fix unilaterally — flag the `HARDEN-6` vs `A.md`/`W3.md` count disagreement (13 vs 14) for B.W4 to settle against the actual `research/Ag` file. |
| §2 "The precept submodule is registered at A.W0" / §10 plan-substrate list omits the precepts SHA | `A.W0` registered `3310a8c`; the working tree now pins `3c32fae` (`git ls-files -s docs/precepts`), advanced by commit `de8c573` ("advance shared submodule to 3c32fae"). `A.md` never names a precepts SHA, so it is not stale per se — but the close record (`W7.md §close ceremony` item 3) requires the acknowledged SHA pinned, and it is `3c32fae` not the `3310a8c` the docs assume. | See `PROGRESS.md` and `coordination/Q.md` rows below — the SHA drift is recorded there; `A.md` itself needs no SHA edit. |

---

## `findings.md`

| Claim | Reality | Fix needed |
|---|---|---|
| Header line 5 "glass-ui peer tranche: Q (in flight; glass-ui HEAD `d244dd5`)" | `A.md` line 5 says glass-ui HEAD `95098d1`; `coordination/Q.md` line 6 says `95098d1`; `PROGRESS.md` line 215 records glass-ui's **post-close** HEAD `e2e5303` and Q's close commit `4b16de7`. `findings.md`'s `d244dd5` matches none of the other three docs. | Update `findings.md` header to the glass-ui HEAD the rest of A's docs use, or note Q has since closed at `4b16de7`. Three-way SHA disagreement across A.md / findings.md / Q.md. |
| §intro "Mode: tranche development only. No source edits this session" / "No source edits this session per user directive" | `PROGRESS.md` line 60 records the user directive "lifted the planning-only constraint and authorized tranche execution in totality". W0–W6 all shipped commits. `findings.md` still presents A as planning-only. | Update `findings.md §intro` Mode line — A executed all 8 waves; the planning-only framing is stale. `A.md §1` has the same stale "Mode: planning-only at this open" but qualifies it "at this open", so A.md is defensible; `findings.md` is not. |
| `findings.md` carries no per-finding wave-assignment table | The audit brief expects "every A finding's wave assignment" in `findings.md`; `findings.md` is directive/attribution prose only. The per-finding routing lives in `A.md §8`, `HARDEN-3 §7`, `HARDEN-6 §6`, and `waves/W2.md`/`W3.md`. | Not drift — `findings.md` was never the routing ledger. Recorded so the brief's expectation is dispositioned: the wave-assignment audit was done against `A.md §8` + `HARDEN-6 §6` (see the `A.md §8` rows above). |

---

## `coordination/Q.md`

| Claim | Reality | Fix needed |
|---|---|---|
| §6 / §2 "value.js does not yet pin it; A.W0 registers it" and "`docs/precepts` advance — glass-ui / Q (Q close) — Q.W5 — A acknowledges new SHA in `PROGRESS.md` before A close" | The submodule is registered and **advanced**: index pins `3c32fae` (`de8c573`). `Q.md §6` item 2 says "Q.W5 advances precepts ... A acknowledges the new SHA in `PROGRESS.md`". `PROGRESS.md` has **no** entry acknowledging `3c32fae`; the only precepts-SHA mention (line 242) still says A registered `3310a8c` and "acknowledges Q's W5 precepts advance before A close" as a future action. | The acknowledgment Q.md §6 mandates was performed as a commit (`de8c573`) but never recorded in `PROGRESS.md` prose. B.W4 must add the `PROGRESS.md` acknowledgment line (SHA `3c32fae`, advanced by glass-ui Q.W6 per `de8c573`'s message — not Q.W5 as Q.md §6 assumes). |
| §6 "glass-ui pins `docs/precepts` at `3310a8c` (`heads/main`)" | `docs/precepts` log shows `3c32fae` on top of `3310a8c`. The `3310a8c` baseline is stale. | Update §6's baseline SHA or note the advance to `3c32fae`. |
| §intro "When ≥2 repos run tranches concurrently ... both publish a coordination artefact (precept `SPEC §"Document Set"`)" | `HARDEN-6 §1` proved this citation false: "SPEC §'Document Set' lists no coordination artefact and contains no concurrent-repo clause ... A.md and Q.md both cite a precept rule that does not exist." Phantom citation. | Replace with "value.js A adopts glass-ui's constellation-coordination practice" — no false SPEC reference (`HARDEN-6 §6` defect 4). Still unfixed in the shipped tree. |
| §0/§8 "the contested boundary ... resolved when Q deletes Q.W1 Lane C and Q.W2 Lane B" | `PROGRESS.md` line 241 still lists the boundary as "contested until glass-ui Q deletes..."; `PROGRESS.md` line 215 records Q has **closed** (`4b16de7`). Q closed without the recorded deletion. `W7.md §close ceremony` item 4 requires this confirmed-or-recorded-open. | B.W4 / A's `FINAL.md` must disposition the contested boundary against Q's actual close — either Q deleted the lanes or it is an open cross-repo item with a named owner. Currently the docs leave it dangling. |

---

## `dispatch/AGENT.md`

| Claim | Reality | Fix needed |
|---|---|---|
| §"Zero deferral" "Every `research/Aa..Ae` finding lands in a wave..." | Same `Aa..Ae` omits-`Ag` drift as `A.md`. `HARDEN-6 §6` defect 7 named `dispatch/AGENT.md` explicitly among the sites to fix. Unfixed. | Change `Aa..Ae` → `Aa..Ag` (or post-rename contiguous range). |
| §"Prose" "Agent-authored docs follow the precept `STYLE.md`" | `HARDEN-6 §9` confirmed by grep: "There is no `STYLE.md` in `docs/precepts/instructions/` ... AGENT.md cites a precept file that does not exist." Phantom citation. | Replace the `STYLE.md` reference with the inline prose rules or the actual governing source (`HARDEN-6 §6` defect 4). Unfixed. |

---

## `waves/W7.md`

| Claim | Reality | Fix needed |
|---|---|---|
| Header "up to 7 lanes per the precept dual ceiling (implementation 6 / read-only audit 7)" | `HARDEN-6 §8` proved there is no "dual ceiling" in the precept spec: "The orchestration ceiling in the precept spec is one number: 10 agents ... There is no 'dual ceiling.'" `HARDEN-6 §6` defect 5 prescribed deleting or defining the phrase. `W7.md` ships it as fact. | Mark the 7-lane close audit as a value.js adoption of glass-ui's close practice, not a precept requirement; drop "dual ceiling" (`HARDEN-6 §6` defect 5). |
| §"Hard gate" / line 5 "every `research/Aa..Ae` finding dispositioned" (twice) | Same `Aa..Ae`-omits-`Ag` drift. | Change `Aa..Ae` → `Aa..Ag`. |
| Header "value.js inherits the close ceremony from the precepts registered at A.W0 (`3310a8c`)" | The registered SHA is now `3c32fae` (advanced by `de8c573`). `W7.md §close ceremony` item 3 says "Pin the `docs/precepts` SHA A acknowledged" — the SHA to pin is `3c32fae`, not the `3310a8c` the header names. | Update the W7 header SHA to `3c32fae` (or whatever A's `FINAL.md` formally acknowledges). |

---

## `PROGRESS.md`

| Claim | Reality | Fix needed |
|---|---|---|
| Line 242 "A.W0 registers `docs/precepts` at `3310a8c`; A acknowledges Q's W5 precepts advance before A close" | The advance to `3c32fae` already landed (`de8c573`, message attributes it to "glass-ui Q.W6", not Q.W5). No `PROGRESS.md` wave-log entry records the acknowledgment. The line is written as a still-pending future action. | Add a dated `PROGRESS.md` entry recording the `3c32fae` acknowledgment; correct "Q.W5" → "Q.W6" to match `de8c573`'s own message and `coordination/Q.md`'s ledger. |
| Wave log line 232 — W5 "Closed 2026-05-19" — and §"A.W5 close" dated 2026-05-19 | Consistent with `git log` (`7088da4`, `5247313`, `36a4ad0` close-docs commit). No drift. Recorded as a verified-clean check. | None. |
| §"A.W6 disposition" line 221 "Commit: `2e... docs(tranche-a/w6)` (see wave log)" — and wave-log line 233 "see W6 disposition commit" | The actual W6 commit is `065c6fe` ("docs(tranche-a/w6): formal re-scope"). PROGRESS.md cites a placeholder `2e...` prefix that matches no commit, and the wave-log cell is an empty "see..." cross-reference. | Replace the `2e...` placeholder and the wave-log "see W6 disposition commit" cell with the real hash `065c6fe`. |
| Line 215 "B.W0 Lane B re-verified against glass-ui's current HEAD `e2e5303`" vs `findings.md` `d244dd5` vs `A.md`/`Q.md` `95098d1` | Three different glass-ui SHAs across A's docs (`d244dd5`, `95098d1`, `e2e5303`) plus Q's close `4b16de7`. The spread is partly legitimate (different docs pin glass-ui at different points in time) but no doc states which is current-at-A-close. | A's `FINAL.md` should pin the glass-ui HEAD current at A close; `findings.md`'s `d244dd5` is the clearest stale outlier (see `findings.md` row above). |

---

## Inventory: `Ag-*` citation sites (for B.W4's `Ag→Ac` rename)

B.W4 renames `research/Ag-design-tokens-hierarchy.md` → `Ac-*` and the finding IDs `Ag-N` → `Ac-N`. This lane only inventories the citation sites; it does not rename. Sites carrying `Ag` references:

- `A.md` — §8 (`Ag-6`, `Ag-1..Ag-13`), §10 (`research/Ag-design-tokens-hierarchy.md`, "`Ag`=γ tokens"), §3/§4 (`research/Ag` row references).
- `PROGRESS.md` — line 15 (`research/Ag-design-tokens-hierarchy.md`, "13 findings"), line 48 (`Ag-6`), lines 139–144 (`Ag-6, Ag-1, Ag-8, Ag-9/Ag-10, Ag-13, Ag-11/Ag-12`).
- `waves/W1.md` — lines 25–28 (`research/Ag` Ag-2, Ag-3, Ag-4, Ag-8).
- `waves/W3.md` — line 10 (`research/Ag`, "Ag-1..Ag-13"), line 12 (`Ag-5, Ag-7, Ag-8, Ag-6`), line 18 (`Ag-6`), line 21 (`Ag-1, Ag-9, Ag-10`), line 27 (`Ag-11, Ag-12`), line 32 (`Ag-13`).
- `audit/HARDEN-3-design-waves.md`, `audit/HARDEN-6-methodology.md` — both carry per-finding `Ag-*` tables (HARDEN-6 §4/§6). Audit docs are historical record; B.W4 should decide whether to rewrite history or leave the hardening docs as-is with a note.
- `audit/W3-*.md` lane docs — the six W3 lane audits cite their slice of `research/Ag`.
- `coordination/Q.md` — §3 gap table cites `research/Ab` Ab-10 etc.; no `Ag` row, but `HARDEN-6 §6` defect 6 names `coordination/Q.md §3` among the cross-reference sites to update.
- The research file itself: `research/Ag-design-tokens-hierarchy.md` (filename + `# A.R<x>` header) and `research/A-challenge.md` (cites the angles).

---

## Summary of drift items

14 drift items, 6 files:

1. `CLAUDE.md` — stale test count (1372→1409) and file count (24→26) in two places; e2e spec count (14 vs PROGRESS's 16) unreconciled.
2. `A.md` — `Aa..Ae` omits `Ag` (6 sites, HARDEN-6 already flagged, unfixed); §8 missing retire-rationale for `Ad-20` and `Ae-12`; §10 defends non-contiguous filenames B.W4 will rename; Ag finding-count 13-vs-14 disagrees with HARDEN-6.
3. `findings.md` — glass-ui HEAD `d244dd5` matches no other doc; stale "planning-only" Mode line.
4. `coordination/Q.md` — precepts baseline `3310a8c` stale (now `3c32fae`); phantom `SPEC §"Document Set"` citation; contested-boundary disposition left dangling after Q's close.
5. `dispatch/AGENT.md` — `Aa..Ae` omits `Ag`; phantom `STYLE.md` citation.
6. `waves/W7.md` + `PROGRESS.md` — phantom "dual ceiling"; W6 commit cited as placeholder `2e...` instead of `065c6fe`; precepts SHA `3c32fae` advance never acknowledged in `PROGRESS.md` prose, and mis-attributed to Q.W5 vs Q.W6.

All are doc fixes for B.W4. The `Ag→Ac` rename touches every site inventoried above.
