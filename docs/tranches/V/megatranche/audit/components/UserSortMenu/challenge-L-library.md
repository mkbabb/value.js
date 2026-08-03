# CHALLENGE-L — `UserSortMenu.vue` library-boundary audit

Source `demo/palettes/browser/search/UserSortMenu.vue`, lines 1–58, SHA-256 `de6cc257db85223fea80f45823f6df07af08b7bfc8d2e7f44bee3e92bfa1cf9a`. Static review only.

**Verdict: SOURCE-RED.** The component uses the right menu family, but erases its domain type at the event seam and addresses the installed Button through a dead `variant` vocabulary.

## Findings

- `Button` and dropdown pieces arrive through demo forwarding barrels. `variant="ghost"` is not part of the current glass-ui Button axis (`emphasis`, `tone`, `size`, `iconOnly`), so the intended visual register is not producer-owned.
- The prop correctly declares `"slug" | "newest" | "palettes"`, but the emit widens to `string` and the menu update is cast from `any`. Invalid values can cross the component boundary.
- The four lucide icons are direct package imports; decorative option icons lack explicit `aria-hidden` while the trigger icon has it.
- Sort criteria are hand-declared in template rather than a typed shared registry consumed by query, menu, URL, and API layers.

## Target boundary

Export a `UserSort` type and immutable option registry from the user-query capsule. Make the radio group generic over that union, emit only `UserSort`, and consume the real Button axes. This is a source-structure correction, not product authorization.
