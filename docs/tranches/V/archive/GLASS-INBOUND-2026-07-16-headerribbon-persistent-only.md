> ARCHIVED 2026-07-17 — historical; superseded by W40-S5 + W44 (content inlined). Read-only.

# Glass inbound — HeaderRibbon goes persistent-only (V-A92 supersession mark)

**Date:** 2026-07-16
**From:** the glass-ui BI/P/Q execution session (team lead)
**Kind:** consumer-update addendum mark — fold into ADDENDA.md as the next V-A### at your
boundary; this file is the inbound record, not the row itself.
**Authority:** user ruling, glass session, 2026-07-16 ("if a consumer depends on an API that is
decidedly obsolete and has shifted, that API is deleted or shifted and the CONSUMER updates —
in generality"), applied through the mandated twice-critique.

## What changed in Glass 7 (pre-publish, no released surface affected)

HeaderRibbon's `mode="collapsible"` arm is CUT. The component flattens to persistent-only:
props `{ placement?, ariaLabel?, class }` + the `#items` slot. Deleted with it: the anchor
button/slot, `anchorLabel`, the reveal/pin/Escape/focus-presence machinery, `HeaderRibbonMode`,
`HeaderRibbonAnchorSlotProps`, and the `--header-ribbon-actions-width` knob.

## Why (the twice-critique evidence)

- Zero code consumers of collapsible anywhere in the constellation (keyframes, value, atlas,
  sci-report, slides, speedtest, muster, words — swept 2026-07-16). The only real consumer is
  keyframes `EditorShell.vue:16`, persistent/right/`#items` — untouched, zero behavior change.
- The collapsible machinery half-duplicated the disclosure family (hand-rolled `aria-controls`
  vs `_shared/disclosure-context.ts`), carried a dead width knob and magic 30/32rem widths,
  and was exercised only by its own demo story.
- Evidence reports: glass `bi-addenda/reports/challenges/P114-f2-gestalt.md` (the gestalt
  fault) and the Lane-B harden sweep (this file's trigger).

## What this supersedes in your tranche

V-A92 prescribed the discriminated persistent/collapsible contract as the fix for the old
VNode-inference (V-A90/V-A91). **Its core intent is fully preserved**: VNode inference stays
dead, keyframes' action-only composition stays persistent, Glass owns no inference of any kind
— there is no mode left to infer. Only the opt-in-collapsible arm of the prescription is
superseded.

Rows to update at your boundary (persistent-only replaces "explicit default-persistent /
opt-in-collapsible" as the Glass-7 close criterion):

- `ADDENDA.md` V-A92 (mark superseded-in-part by the new V-A### row) and V-A128
- `FINAL.md:40`
- `DECISIONS.md` D2 / D41
- `PROMPT-RECAP.md:225`
- `w17/glass-7.0.0/manifest.json:130` (`headerRibbonMode` expectation → persistent-only)

## Sequencing

Nothing here blocks or reopens Value 4.0.0 (immutable). The change rides the unpublished
Glass 7 line; your W17 rehearsal against the real Glass 7 artifact should expect the
persistent-only shape. MIGRATION.md in glass carries the consumer-facing rows.
