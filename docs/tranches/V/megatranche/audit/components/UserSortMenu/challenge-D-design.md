# CHALLENGE-D — `UserSortMenu.vue` design audit

## Receipt

Source `demo/palettes/browser/search/UserSortMenu.vue`, lines 1–58, SHA-256 `de6cc257db85223fea80f45823f6df07af08b7bfc8d2e7f44bee3e92bfa1cf9a`. Source-only audit; runtime commands **0**.

**Verdict: SOURCE-RED.** The three-option menu is understandable, but its current sort is hidden behind an ellipsis and the control reads as “more actions,” not “sort.”

## Findings

1. The trigger glyph is an ellipsis, the conventional sign for overflow actions. Sorting needs a sort glyph and ideally the current criterion in text at widths that permit it.
2. `aria-label="Sort users"` names the action but not the selected state. A user scanning the panel cannot see whether newest, alphabetical, or most-palettes is active without opening the menu.
3. All options have equal weight and no explanatory hint. “Most palettes” may be a count sort, while “Newest” could mean account creation or last activity.
4. The menu uses `font-display` for an administrative utility. The expressive face competes with fast scanning and may reduce clarity for data operations.
5. The component has no unavailable/loading state while the list is re-sorted or re-fetched.

## Required states

Closed/open; each of three selections; keyboard roving; touch; disabled/loading; long localized labels; mobile narrow toolbar; desktop Safari. Preferred treatment: a named “Sort: Newest” capsule on desktop and a dedicated sort icon with selected-state announcement on mobile widths.
