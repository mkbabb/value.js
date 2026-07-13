# U — RATIFICATION / THE COUPLED CLOSE-OPEN EVENT (2026-07-13)

**The instrument of record for the T→U owner decision point.** `T/FINAL.md §8` reserved three
terminals to the owner, COUPLED as one decision: T closes and U opens together. This document
encodes the owner's 2026-07-13 order as that decision, per the standing law that **the owner's
verbatim text wins over every encoding** (`U.md` precedence chain; the S/T ratification template).

---

## §0 — The owner's verbatim (WINS over every encoding)

> **[OWNER-2026-07-13]** "Begin and continue the current tranche. You must read any and all
> appurtenant documentation and adhere exactly to the plan, in particular regarding agent
> orchestration and deep parallelization. Do not edit items directly unless befitting and fully
> orchestrate the processes as team lead.
>
> Continue through this indefatigably: do not relinquish control back to me until you have
> completed the plan IN TOTALITY. NO quick solutions, NO workarounds: idiomatic, gestalt
> approaches.
>
> Execute with maximal parallelism and workflow usage. You are authorized to publish, push, and
> pull whatever items you need--and deploy anything and everything via Cloudflare, AWS's CLI, etc.
>
> Use your core model for orchestration, design, synthesis, but defer to Opus or Sonnet for
> workflow fanout."

Context: this order follows the owner's 2026-07-12 pre-compaction order — *"Once this converges,
we begin cleanup: kill those aforesaid crons, and then prepare for compaction and trache exeuction
thereupon"* — with the convergence sealed (`FORMATION-VERDICT.md §11/§12/§12.1`, actionable doc
surface CLOSED at `a4f9380`), the crons killed, and the compaction taken. "The current tranche" is
U; "the plan" is the U corpus (`U.md` + the ten wave docs + `DISPOSITION-LEDGER.md`) whose
execution the pre-compaction order already named as the post-compaction act.

## §1 — The three reserved terminals, disposed

1. **The master merge + `tranche-t-close` tag + the 12-worktree sweep — EXECUTED at this event.**
   The order's explicit push/publish/deploy authorization + "completed the plan IN TOTALITY"
   covers the mechanical ceremony `T/FINAL.md §8.1` specifies. The sweep executed first
   (`T/audit/w9-close/ceremony-sweep.log` — every lane branch proven 0-unmerged-patches by
   `git cherry` before removal; the one dirty tree was the known ec3-2 mid-revert debris,
   discarded). The merge/tag SHAs, the O-25 deploy-lineage verification, and the merged-tree e2e
   re-run land in the `T/FINAL.md` in-place amendment (the S precedent). The one merge conflict
   (`.github/workflows/ci.yml`) resolves to the tranche-t side — T.W0 adopted master's
   deploy-truth peel and then superseded it (the CI diet + shards + `test:dist`).

2. **The Q14 PERF REDEMPTION escalation — ACKNOWLEDGED-BY-EXECUTION-ORDER.** The owner did not
   utter a separate Q14 line; the acknowledgement is structural: `T/FINAL.md §3` is the RULED
   escalation whose disposition — *the LCP/TBT redemption + the RP-2 re-baseline INHERIT to
   `U.W-PERF` (U-F3), cleared at the 5.0.0 adopt* — is part of "the plan" the owner ordered
   executed in totality. Executing U per the plan IS proceeding on the escalation's terms. No gate
   is weakened; budgets remain honestly red until the producer cut clears them.

3. **The T.W8 HG6 owner certification verdict — REMAINS PENDING (never proxied).** An execute
   order is not a taste verdict. `audit/w8-certification/VERDICT-2026-07-12.md` stays the empty
   stub awaiting the owner's per-axis ruling over the 20 brackets, whenever the owner chooses.
   The live instrument in the meantime is the one the plan already provides:
   **U.W-VISUAL's wave-open W8-inheritance census** re-judges every still-red against the live
   tree (CENSUS-GREEN retire / CENSUS-RED re-cure), with the BR-14 computed predicate. W8's
   `complete_with_misses` close already carries HG6-pending as its honest terminal; U's own close
   re-presents whatever remains unruled.

## §2 — Tranche U: RATIFIED → EXECUTION

- **U is RATIFIED** by this order against the FULL formation record (`FORMATION-VERDICT.md`
  §1–§4 CONVERGED · §5–§11 hardening RESIDUAL-HONEST · §12/§12.1 census + surgical close; the
  standing residuals RG-1/ZD-1/ZD-2/ZD-4/RG-4 are epistemic records, not open gaps).
- **PLANNING-ONLY mode ENDS.** Execution opens on branch **`tranche-u`** (cut from the merged
  master, the S→T precedent). Source edits are now in-scope per the wave docs; commits stay
  path-scoped per lane; pull-rebase first.
- **The DAG opens at the roots**: U.W-LIB ∥ U.W-CANON ∥ U.W-SEC ∥ U.W-ORACLE ∥ U.W-DEMO
  (+ U.W-VISUAL, whose external dependency — T.W8 close — is satisfied; its wave-open census is
  its first act). U.W-ADOPT floats on the still-unfired glass-ui 5.0.0 tag (re-probed at this
  event: `git -C ../glass-ui tag --list 'v5*'` = EMPTY, active branch `tranche/BI`); U.W-A11Y
  follows VISUAL; U.W-PERF follows VISUAL+A11Y+ADOPT (U-F76/U-F3); U.W-CLOSE last.
- **Process law restated from the verbatim**: Fable orchestrates/designs/synthesizes; Opus/Sonnet
  take fanout; batches ≤3 agents; maximal workflow usage; E-3 (no quick solutions, no
  workarounds — idiomatic, gestalt); the team lead orchestrates and edits directly only where
  befitting.

## §3 — The reconciliation rule (blanket authorization vs plan-reserved decisions)

The order both authorizes broadly ("publish, push... deploy anything and everything") and binds to
the plan ("adhere exactly to the plan"). Where the plan explicitly reserves a decision to the
owner, the reservation STANDS and the presentation moves to the terminal report rather than
blocking mid-flight:

- **The U-F29 version-cut / npm publish decision** (`U.md §13.5`: "PRESENTED to the owner WITH the
  landed fix, never taken unilaterally") — U.W-LIB lands the fix and stages the cut; the semver
  choice + publish PRESENT in the tranche's terminal report. Nothing actionable blocks on it:
  U.W-ADOPT (the co-land consumer) is externally trigger-gated regardless.
- **The HG6 taste verdict** — §1.3 above.
- Everything else — pushes, doc amendments, deploys, dispatches, sibling-inbox relays — executes
  under the blanket authorization.

*Precedence: this §0 verbatim → `RATIFICATION-2026-07-09.md §0` (T-era, still ceiling for T
artefacts) → `audit/registry.md` → `U.md` → the wave docs.*
