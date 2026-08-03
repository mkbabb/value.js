# CHALLENGE-D — `TagEditPopover.vue` design audit

## Receipt and boundary

Source `demo/palettes/browser/search/TagEditPopover.vue`, lines 1–87, SHA-256 `961debf279365c91455ee1724521dbd699c76b40837b29d4d902851f38623cdc`. This is the missing D axis. It consumes the already-banked L/C source and runtime findings as chronology; it runs no Browser, product, API, or package command.

**Verdict: DEFECTIVE / SOURCE-RED.** The shipped object is designed as a tiny anchored popover although its only consumer opens it as a detached editing task. The mismatch leaves the user without a visible surface, an accessible name, trustworthy check state, save progress, or failure recovery.

## Subject brief

The subject is a palette curator who needs to understand the current taxonomy, add or remove several tags, and know whether those changes reached the server. The task is deliberative editing—not a momentary menu choice. The design should therefore be a named sheet/dialog with a stable checklist, category grouping, explicit dirty state, and a commit/result register.

## Findings

1. **Wrong surface archetype.** A triggerless popover has no spatial anchor; a programmatic editor needs a dialog/sheet. The existing L/C evidence proves the content is positioned off-screen and named by a missing trigger.
2. **The visual state lies.** The dead checkbox API renders applied tags unchecked while clicks only change an internal visual tick. Appearance and persistence diverge.
3. **No task hierarchy.** “Tags” is the only heading; categories are microtext, the current set is not summarized, and there is no count/dirty/committed layer.
4. **No failure register.** Loading has a spinner but no accessible label; save errors and stale ETags have no visible recovery. Optimistic change without rollback is especially dangerous in a taxonomy tool.
5. **Mobile and keyboard behavior are only partially owned.** The list correctly has `max-h-40 overflow-y-auto`, but the `w-52` surface is too narrow for long tags/categories and has no focus restoration or full-screen/touch adaptation.

## Kronecker state obligations

| axis | required cells |
|---|---|
| lifecycle | unopened · opening · ready-clean · ready-dirty · saving · saved · conflict · failed |
| data | empty catalog · populated · long names · duplicate categories · stale palette |
| interaction | pointer · keyboard · screen reader · touch · Escape/cancel |
| viewport | phone portrait · phone landscape · desktop Safari |

The redesign should use a calm taxonomy sheet: category headers as navigation, full-width named rows, persistent selection count, explicit Cancel/Apply, and a non-transient conflict/error region. No product credit follows until those cells are executed later under the Apple-browser law.
