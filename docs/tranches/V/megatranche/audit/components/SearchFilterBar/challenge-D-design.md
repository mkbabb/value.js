<!-- HYDRATED-FROM-PAYLOAD 2026-07-28 · harvest area-palettes.json · agent ae19f78140584c55b -->
<!-- M-16 durability rule: the live seat wrote this file, the wall erased it, the returned payload
     is materialized here verbatim. Not a rerun. Payloads seen for this path: 1. -->

# CHALLENGE-D — design (visual truth, state coverage, motion, design-system boundary, proportion/seat law) for demo/palettes/browser/search/SearchFilterBar.vue

## Model receipt

Opus 5 — exact model id `claude-opus-5[1m]` (1M-context arm). Seat declared at spawn, not inherited.

## Verdict: DEFECTIVE

**Strongest defect:** D2-B1 — the entire Tags filter section is inert. `SearchFilterBar.vue:51-55` calls `:checked` / `@update:checked` against glass-ui 7's `Checkbox`, whose only contract is `modelValue` / `update:modelValue`. Both fall through silently, so `toggleTag()` is never called and `update:selectedTags` is never emitted; the producer falls back to its own uncontrolled cell, so the box PAINTS checked while the wall never filters, the badge never counts, and the state dies when the popover is re-created. Measured cross-engine: after ticking pastel/neon/earthy the boxes read `aria-checked="true"` with `badge: null` and `cards: 2` unchanged; after Escape+reopen all three read `aria-checked="false"`. The DOM carries `checked="false"` as a raw fallthrough attribute — the proof that it is not a prop.

**Negative proof:** Verdict is DEFECTIVE, so this field records the claims I tested and could NOT substantiate — the negatives I owe, so no downstream seat re-litigates them. (1) "Controls in the popover are unreachable by Tab" — FALSE. WebKit suggested it; Chromium (`probe6.mjs`, per the repo's own standing rule at `audit/visual/states.mjs:6-9` that macOS ships Full Keyboard Access OFF) shows all six control species reachable in DOM order. Claim withdrawn. (2) "Motion is ad hoc / ignores prefers-reduced-motion" — FALSE. `.filter-option` uses `var(--duration-fast) var(--ease-standard)` (:246); bare `transition-*` utilities inherit house tokens via `demo/styles/foundation.css:128-129`; `demo/styles/animations.css:184-192` is a global reduce guard with a deliberate overlay-opacity carve-out at :202-210; no layout-forcing property is animated. (3) "RTL is broken" — FALSE; `shots/rtl-desktop/browse.png` mirrors the trigger to the pill's logical start correctly. (4) "Horizontal overflow" — FALSE; `audit/visual/REPORT.json` `/#/browse` `overflowX: 0` in all four matrices, confirmed at 390/720/1440. (5) "Undersized touch targets" — FALSE; `[role=radio]` measures 44x44 around an 18x18 visible mark, which is exactly PROPORTION-AUDIT §5.7 / PR-12. (6) `verbatimModuleSyntax` — CLEAN (:144 `import type { Tag }`, all other imports value-position). (7) Vue 3.5 idioms — CLEAN (:147 reactive props destructure; no template refs and no `defineModel` round-trip exist, so `useTemplateRef`/`shallowRef` are not applicable). (8) "Escape inside the nested MiniColorPicker mismanages focus" — FALSE; openDialogs 2->1, outer stays expanded, focus returns to the exact connected opener, which is VISUAL-CONSTITUTION §5.1's rule. (9) The forced-colors matrix is INCONCLUSIVE because WebKit does not truly emulate it, so no forced-colors finding is claimed.

## Defects (17)

### D2-B1 — BLOCKER

The entire Tags filter section is inert: ticking a tag paints a checked box and changes nothing — no filtering, no badge, and the state dies when the popover is re-created.

- **Evidence:** demo/palettes/browser/search/SearchFilterBar.vue:51-55 passes `:checked` and `@update:checked`. node_modules/@mkbabb/glass-ui/dist/components/checkbox/Checkbox.vue.d.ts declares `modelValue?: CheckedState|null` and emits only `update:modelValue` — neither `checked` nor `update:checked` exists. Live DOM (probe4.mjs, Chromium+WebKit): checkbox attributes = [data-slot="checkbox", class="checkbox …", checked="false", role="checkbox", aria-checked="false", data-state="unchecked"] — `checked` present as a raw fallthrough attribute, which only happens for undeclared props. After ticking pastel/neon/earthy one tick apart: ariaChecked true/true/true, badge=null, cards=2 (unchanged). probe3.mjs: selectedTagsAfterSequential=["pastel","neon","earthy"] while the badge reads "1" (the tier alone).
- **Mechanism:** Retired shadcn/radix-era component API called against a glass-ui 7 contract. Vue fallthrough attributes fail silently: the undeclared prop lands as a DOM attribute and the undeclared emit lands in $attrs and never fires, so `toggleTag()` is never called and `update:selectedTags` is never emitted. With `modelValue` absent the producer runs uncontrolled, so the box paints checked — the surface asserts a state the product does not hold.
- **Reproduction:** node docs/tranches/V/megatranche/audit/components/SearchFilterBar/probe4.mjs with PROBE_ORIGIN pointed at a dev server started as `VITE_API_URL=/api npx vite --port 9100` (a relative base keeps detectDevMisconfig() false so the availability latch never trips and /colors/tags can be stubbed). Manually: open /#/browse with a populated tag catalogue, open the ⋮ menu, tick three tags — the wall does not change and no badge appears; press Escape and reopen — all three are unchecked again.
- **Proposed cure:** Transpose onto glass-ui `DropdownMenuCheckboxItem` with `v-model` bound to one owned `selectedTags` model. The producer already owns the whole controlled-checkbox mechanism; the local `toggleTag` array-splice helper disappears with it.

### D2-B2 — BLOCKER

The tallest legal state of the popover is 685.6px with no max-height and no scroll container anywhere in its ancestor chain; the only clear-filters control renders 101px below the fold at 1440x900, and on mobile / 200% zoom the menu is taller than the viewport and is pushed off the top of the screen.

- **Evidence:** probe2.mjs, tallest legal state (4 sections + Clear-all row). Desktop 1440x900: content rect {x:433,y:381,w:240,h:685.6}, contentOverflowBottom +166.6; clearRow {y:1001.3,h:36} visibleInViewport:false; colorInput y=944.3. Mobile 390x664: content {x:104,y:-315.3,w:240,h:691.7}. Zoom-200 720x450: content {x:337.5,y:-390,w:240,h:663.9}. Measured scroll chain: div.popover-content overflowY:visible maxHeight:none h685.6 -> popper wrapper overflowY:visible maxHeight:none -> body.relative overflowY:visible. The only overflow-y:auto in the component is on the tag list (SearchFilterBar.vue:49 `max-h-28 overflow-y-auto`). Frames: shots/tall-desktop-light-open.png, shots/tall-mobile-open.png, shots/tall-zoom200-open.png.
- **Mechanism:** An overlay whose height is data-dependent (tags list) and state-dependent (the v-if Clear-all row at :110) was designed with no containment strategy. Containment was applied to the one region that needed it least. The escalation is structural: `Clear all filters` is v-if-gated on activeFilterCount>0 and appended at the bottom, so the only escape hatch materialises exactly in the state where the menu is tallest and it cannot be reached.
- **Reproduction:** node .../probe2.mjs (PROBE_ORIGIN=http://localhost:9100). Manually: /#/browse with tags loaded, open ⋮, set the Featured tier — at 1440x900 the Find-by-Color section and the Clear-all row are below the viewport and nothing scrolls; at 390x664 the Sort and Tier sections are above the top of the screen and the menu paints over the Dock.
- **Proposed cure:** Transposing onto glass-ui `DropdownMenuContent` inherits the producer's collision/max-height/scroll behaviour and removes the local `max-h-28` scroller. Separately, split the drawer: sort is not a filter (activeFilterCount excludes it), and surfacing applied filters as removable chips beneath the SearchBar removes the need for a bottom-anchored Clear-all entirely.

### D2-B3 — BLOCKER

The active-filter count badge is clipped to an illegible olive crescent by the trigger's own `contain: paint` plus its 9999px radius; the digit never renders. It is also absent from the trigger's accessible name. This overturns pass 1's recorded negative ("the badge is not clipped by any ancestor").

- **Evidence:** probe7.mjs, WebKit and Chromium, byte-identical: trigger.contain="paint", trigger.borderRadius="9999px", trigger::before.zIndex="1", badge.zIndex="auto", badge overhang 4.1px top and 4.1px right (SearchFilterBar.vue:7-12 `absolute -right-1 -top-1`), badgeText="1". Five-point hit test: centre->span (badge), topEdge->div.px-4.sm:px-6 (the pane body BEHIND the trigger), rightEdge->div.input-bar.search-seated (the SearchBar pill behind it), topRightCorner->div.px-4.sm:px-6, bottomLeft->span. badgePointsThatHitTheBadge = 2 of 5 in BOTH engines. Frames at 3x DPR: shots/probe5-badge-3x.png, shots/probe7-webkit-badge-3x.png, shots/probe7-chromium-badge-3x.png. probe4.mjs: triggerName="Filters", triggerText="1", badgeAnnouncedInName=false.
- **Mechanism:** A per-instance overhanging badge was hand-positioned inside a producer root that declares paint containment. `contain: paint` clips descendants to the padding box and the pill radius bevels the remainder. Two independent occlusions: the containment box, and the trigger's ::before capsule fill at z-index 1 painting over a z-auto child. The aria-label on the trigger then overrides its own text content, so the count is not announced either — the state is color-and-glyph-only, which VISUAL-CONSTITUTION §4.1 forbids.
- **Reproduction:** node .../probe7.mjs. Manually: /#/browse, open ⋮, choose the Featured tier, press Escape, and look at the trigger at any zoom — an olive sliver, no digit.
- **Proposed cure:** Use the glass-ui `Badge` atom (dist/components/badge/index.d.ts, variant/tone/size/surface axes) as a sibling of the trigger outside the contain:paint root, and put the count in the trigger's accessible name (aria-label="Filters, 2 active"). Never hand-position an overhang inside a producer root.

### D2-B4 — BLOCKER

The field labelled `aria-label="Search by CSS color"` with placeholder `#hex, hsl(...)` accepts exactly one CSS colour syntax and silently searches a DIFFERENT colour — the swatch's `#4488cc` — for every other input, with no error state anywhere. A valid accepted input and an invalid input produce identical visible outcomes.

- **Evidence:** SearchFilterBar.vue:218: `const hex = text.startsWith("#") && /^#[0-9a-f]{6}$/i.test(text) ? text : pickerHex.value;`. probe3.mjs typed six inputs and clicked Search each time; every row returned errorShown:false, rejections:[], swatchBefore===swatchAfter===rgb(68,136,204) and swatchLabel unchanged at "Open color picker, current color #4488cc": `hsl(200 50% 50%)` (the placeholder's own example), `#abc`, `rebeccapurple`, `oklch(70% 0.15 200)`, `garbage!!` all fell back to #4488cc; `#AABBCC` was accepted and searched but the swatch still showed #4488cc. `parseColorIn` — value.js's own CSS colour parser, which parses every one of those — is already imported at :145 and used at :206.
- **Mechanism:** A regex gate placed in front of the product's own competence, failing closed to a substitution rather than open to the parser. Because there is no error state and no representation of the applied colour, the substitution is undetectable from the UI.
- **Reproduction:** node .../probe3.mjs. Manually: /#/browse, open ⋮, type `hsl(200 50% 50%)` into the Find-by-Color field, click Search — the badge increments and the wall filters, on #4488cc, with no indication.
- **Proposed cure:** Delete the regex gate at :218. Pass the raw trimmed text to `parseColorIn` inside a try/catch and render the two real states: parsed -> the swatch and a removable applied-filter chip both take that colour; unparsed -> a named error on the field. This also makes the currently-unreachable `searching` register meaningful or honestly deletable.

### D2-M1 — MAJOR

Five consumer-authored API calls in this one file are silently inert against glass-ui 7 (`variant="ghost"` twice, `:checked`, `@update:checked`, `p-0`) and a sixth is half-inert (`h-8 w-8` renders 32x40).

- **Evidence:** glass-ui 7 ButtonProps (dist/components/button/Button.vue.d.ts) declares emphasis/tone/size/iconOnly/loading — there is NO `variant`. Live DOM of the trigger (Chromium): `data-emphasis="secondary" data-tone="neutral" data-size="md" data-icon-only="true" … variant="ghost" aria-label="Filters"`, rect 32x40. PopoverContent authored `class="w-60 p-0"` (:16) computes `padding: 20.352px 16px` because the producer emits px-(--overlay-pad-inline)/py-(--overlay-pad-block). Checkbox `checked="false"` fallthrough per D2-B1. Sibling UserSortMenu.vue:9 passes `size="xs"` with no geometry override and renders a true 28.4x28.4 circle on /#/admin/users.
- **Mechanism:** Pre-glass-7 (shadcn/radix) idioms survived the 7.0.0 adoption as no-ops because Vue fallthrough attributes never warn. The design defect and the legacy-code defect are the same defect: the surface looks styled while nothing was applied. `p-0` and `h-8 w-8` are additionally per-instance overrides of producer roots — wrong to write and lost anyway. Net visual consequence: an `iconOnly` button whose contract is square geometry renders as a 32x40 vertical stadium seated in a 374x24.6 input row.
- **Reproduction:** node -e with playwright against /#/browse, read `[...document.querySelector('button[aria-label="Filters"]').attributes]` and `getComputedStyle(popoverContent).padding`; or `npx vue-tsc` with strict template checking, which would surface the undeclared props.
- **Proposed cure:** Transpose onto DropdownMenu/DropdownMenuTrigger and pass only declared axes: `emphasis="quiet" size="xs" iconOnly`. Delete `variant`, `p-0`, `h-8 w-8`, `:checked` and `@update:checked` outright — no shims. Enable strict template type-checking on demo/ so an undeclared prop is a compile error rather than a silent DOM attribute.

### D2-M2 — MAJOR

Two option lists of the same species sit in one 240px menu at 57px and 33px pitch — a 1.73x rhythm fork — and the Sort section is 42% dead vertical space.

- **Evidence:** Chromium measurement, popover open: glass-ui RadioGroup computes display:flex, flexDirection:column, gap:26px; .filter-option row ink = 31.0px; option y = 441.9 -> 498.9 -> 555.9, i.e. 57.0px pitch. The hand-authored tag list (SearchFilterBar.vue:49 `flex flex-col gap-0.5`) computes gap:2px over identical 31.0px rows, i.e. 33.0px pitch. Sort section rect h=197.5 carrying 21.6 (label) + 3x31.0 (rows) = 114.6px of ink. Visible in shots/tall-desktop-light-open.png.
- **Mechanism:** Category error: RadioGroup's 26px is a FORM-field stack gap sized for labelled form rows; these are MENU option rows. The component consumed the wrong producer default for one list and then hand-authored the sibling list at its own gap, so the same menu speaks two rhythms. Violates VISUAL-CONSTITUTION §3.7 (no spacing fork) and PROPORTION-AUDIT §5.8 (real rendered relation wins over token intent); it is also the direct cause of ~134px of D2-B2's overflow.
- **Reproduction:** Playwright evaluate on /#/browse with the popover open: getComputedStyle(document.querySelector('[role=radiogroup]')).gap -> "26px"; getComputedStyle(document.querySelector('.max-h-28')).gap -> "2px"; then read the .filter-option rects.
- **Proposed cure:** Use `DropdownMenuRadioItem` and `DropdownMenuCheckboxItem` for both lists, as UserSortMenu.vue:22-33 already does — the menu rhythm then comes from the producer and neither list carries a local gap.

### D2-M3 — MAJOR

The radio species has no focus indicator at all in either scheme, and the popover exhibits four different focus vocabularies — including Chrome's default blue-grey outline on a hand-rolled button.

- **Evidence:** probe6.mjs, CHROMIUM (per audit/visual/states.mjs:6-9), tallest state, light and dark. button[role=radio].radio-group__item: outline "none 3px …" (style none, not painted), boxShadow "none", hasVisibleRing FALSE in both schemes. button[role=checkbox].checkbox: boxShadow "… 0 0 0 2px". input.field-control: boxShadow "… 0 0 0 2px". button.block (swatch, :75): cartoon shadow. button.absolute (hand-rolled Search, :97): outline "auto 1px rgb(176,192,210)" — the UA default. Also measured: unchecked checkbox edge = 1px color(srgb 0.11 0.098 0.09 / 0.12) light and 1px color(srgb 0.914 0.9 0.886 / 0.12) dark — a 12%-alpha boundary on a translucent veil; see shots/tall-desktop-dark-open.png.
- **Mechanism:** Six control species assembled from three different sources (producer atoms, a hand-rolled swatch button, a hand-rolled Search button) with no single focus owner. The Search button at :97 carries no `focus-ring` class and therefore falls back to the UA ring, a register that exists nowhere else in the system. WCAG 2.4.7 and VISUAL-CONSTITUTION §4.1 ('focus remains visibly distinct from selection in both schemes') both fail on the radio.
- **Reproduction:** node .../probe6.mjs — walks Tab in Chromium and records outline/boxShadow per stop in both schemes. Manually: open the ⋮ menu in Chrome, press Tab once, and look at the Sort radio.
- **Proposed cure:** One producer focus register for every seat: transpose the option rows onto DropdownMenu*Item, and replace the hand-rolled swatch and Search buttons with glass-ui `Button` so `focus-ring` is inherited rather than re-invented. The radio's missing register should be relayed to glass-ui BH as a producer defect.

### D2-M4 — MAJOR

Four horizontal dividing lines render inside the popover on the Browse route, whose binding boundary inventory is `none`.

- **Evidence:** SearchFilterBar.vue:17 `class="flex flex-col divide-y divide-border"`. probe2.mjs, tallest state, all matrices: divide-y children borders = [{bt:0px,bb:1px,rgb(198,180,159)}, {bt:0,bb:1px}, {bt:0,bb:1px}, {bt:0,bb:1px}, {bt:0,bb:0}] -> renderedDividerCount 4. (Tailwind v4's divide-y writes border-BOTTOM on :not(:last-child), so a border-top-only read misses them.) docs/tranches/V/OPTICAL-BENCH-COMPOSITIONS.md §5 binding table: Browse -> Retained non-P122 dividing line = `none`, and 'Any additional line … is a defect.' PROPORTION-AUDIT.md PR-05 concurs.
- **Mechanism:** A boundary drawn where interval and material already express the grouping — demonstrated inside the same menu by the tag list, which has no divider and groups perfectly well.
- **Reproduction:** node .../probe2.mjs, read `dividers` / `renderedDividerCount`; visible in shots/tall-desktop-light-open.png between SORT/TIER, TIER/TAGS, TAGS/FIND BY COLOR and above the Clear-all row.
- **Proposed cure:** Delete `divide-y divide-border`. If the transposition to DropdownMenu is taken, boundaries become an explicit `DropdownMenuSeparator` decision, and the binding answer for Browse is zero.

### D2-M5 — MAJOR

All four section headings render in Fira Code uppercase — the rung the closed type matrix reserves for values, code and provenance — and the option rows declare `font-family: var(--font-serif)` for what must be the sans control voice.

- **Evidence:** Computed .section-label across all four sections and all matrices: font-family "Fira Code", font-size 14.384px (--type-caption), text-transform uppercase, letter-spacing 1.4384px, weight 400. Traced to node_modules/@mkbabb/glass-ui/dist/styles/typography/utilities.css: `.section-label { @apply text-mono-caption; color: var(--muted-foreground) }` with `@utility text-mono-caption { font-family: var(--font-mono); font-size: var(--type-caption); letter-spacing: var(--type-tracking-caps); text-transform: uppercase }`. VISUAL-CONSTITUTION.md §4 and OPTICAL-BENCH-COMPOSITIONS.md §5 'Binding type matrix' both bind section headings -> text-heading + Plus Jakarta Sans, and reserve mono-caption for values/code/provenance. Separately SearchFilterBar.vue:243 sets `font-family: var(--font-serif)`, which only resolves to Jakarta because glass-ui aliases --font-serif -> --font-stack-text (documented as deliberate and fragile at demo/styles/foundation.css:95-102).
- **Mechanism:** The demo mapped 'section heading' onto the producer's mono eyebrow recipe (demo/DESIGN.md:52 recommends `.section-label`), so the closed matrix is violated at four sites here and repo-wide as a family. The `--font-serif` line is a name that lies: it says serif and means sans, and is one producer change away from flipping every filter option to Fraunces.
- **Reproduction:** Playwright evaluate on /#/browse with the popover open: getComputedStyle(document.querySelector('.section-label')) -> fontFamily "Fira Code", textTransform "uppercase". Visible in every open-popover frame as SORT / TIER / TAGS / FIND BY COLOR in monospaced caps.
- **Proposed cure:** Locally: use `DropdownMenuLabel` with `text-small`/`text-heading` (Plus Jakarta Sans) for the four group labels, and write the type role directly rather than `var(--font-serif)`. Family-wide: the `.section-label` -> section-heading mapping needs a canon ruling, since the same substitution is repo-wide.

### D2-M6 — MAJOR

A god-menu: five unrelated jobs (sort, tier, tags, colour-distance search with a nested picker, clear-all) behind one unlabelled ellipsis, while the identical job is already implemented correctly in 58 lines by a sibling in the same directory — two chrome families for one job, on two routes.

- **Evidence:** SearchFilterBar.vue (249 lines) vs UserSortMenu.vue (58 lines) in the same folder. Measured differences: primitive Popover+RadioGroup+<label> vs DropdownMenu+DropdownMenuRadioGroup/RadioItem; announced semantics aria-haspopup="dialog" role="dialog" vs aria-haspopup="menu"; trigger geometry 32x40 stadium vs 28.4x28.4 circle; glyph NOT aria-hidden (glyphAriaHidden null) vs aria-hidden="true" (UserSortMenu.vue:13); option rows hand-rolled .filter-option at 57px pitch vs producer DropdownMenuRadioItem. The component's own activeFilterCount (:189-195) deliberately excludes `sort`, proving it knows sort is not a filter. VISUAL-CONSTITUTION.md §7: 'Search/filter chrome is one family.' Also: the mirror route /#/palettes has no filter affordance at all (shots/safari-desktop-light/browse.png).
- **Mechanism:** A hand-rolled clone of a producer family, hosting five jobs behind one anonymous entry point. Every geometry, rhythm, semantics and focus defect above is downstream of this one architectural choice, which is why they cannot be patched individually.
- **Reproduction:** Read both files; compare the two triggers live at /#/browse and /#/admin/users (probe.mjs records the sibling's rect 28.4x28.4 and aria-haspopup="menu" against this one's 32x40 and "dialog").
- **Proposed cure:** Transpose onto DropdownMenu + DropdownMenuLabel + DropdownMenuRadioGroup/RadioItem + DropdownMenuCheckboxItem, exactly as UserSortMenu.vue:1-37 does, and split sort out of the filter drawer into its own named control beside the field. The file should land near UserSortMenu's size.

### D2-M7 — MAJOR

Applying, changing or clearing a filter changes the wall with no announced result count and no status region — there is no aria-live anywhere in the document.

- **Evidence:** probe3.mjs on /#/browse with the wall populated: resultDelta = { before: 5, after: 5, liveRegions: 0, statusRoles: 1 }. `liveRegions: 0` is a whole-document count; the single role="status" is not this component's and carries no count. VISUAL-CONSTITUTION.md §5.1, row 'in-route filter, tab, selection, or pagination' -> Announcement rule: 'changed result count/state through the owning status region'.
- **Mechanism:** The component emits filter changes upward and owns no status surface; the consumer (BrowsePane.vue) provides none either. Combined with the clipped badge (D2-B3) and the absence of applied-filter chips (D2-M8), the user's only route to learning what is filtering the wall is to reopen the drawer and read five separate controls.
- **Reproduction:** node .../probe3.mjs; or on /#/browse run `document.querySelectorAll('[aria-live]').length` after applying a filter -> 0.
- **Proposed cure:** One polite status region owned by the Browse workspace announcing the changed result count and the active filter set on every filter mutation, paired with the visible removable chips of D2-M8. Focus behaviour already complies; only the status is missing.

### D2-M8 — MAJOR

The colour actually being filtered on has no representation anywhere — the swatch never updates even on a successful search — and there is no way to clear one filter without clearing all of them.

- **Evidence:** applyColorSearch (SearchFilterBar.vue:213-225) computes `hex` and emits but never writes `pickerHex`. probe3.mjs across all six inputs including the accepted `#AABBCC`: swatchBefore === swatchAfter === rgb(68,136,204), swatchLabel unchanged at 'Open color picker, current color #4488cc'. colorSearchActive (:171) is a boolean, so activeFilterCount contributes 1 with no identity. `clearColorSearch` is emitted from exactly one place, onClearAll (:227-232) — and that control is the one D2-B2 renders below the fold.
- **Mechanism:** Applied state lives only in the parent (BrowsePane's colorSearchParams) and in a local boolean; nothing renders it. VISUAL-CONSTITUTION §5 ('persistent operation state stays with the entity/workspace') and PROPORTION-AUDIT PR-08 ('pending/failure/export/recovery truth only transient -> ADD-AFFORDANCE') both bear on it.
- **Reproduction:** node .../probe3.mjs, `nonHexCases[4]` (typed `#AABBCC`): accepted, searched, swatch unchanged. Manually: type any accepted hex, click Search, observe the swatch.
- **Proposed cure:** Write `pickerHex` on a successful parse so the swatch is the state witness, and render the applied filter set as removable chips beneath the SearchBar (one chip per tag, one for tier, one carrying the searched colour swatch). Per-chip removal replaces the bottom-anchored Clear-all as the primary clear path.

### D2-m1 — MINOR

The designed loading state can never paint: the spinner and the disabled register are unreachable code.

- **Evidence:** SearchFilterBar.vue:213-225 — `async function applyColorSearch()` sets searching=true, emits synchronously, and sets searching=false in `finally`, all within one tick with no `await`. probe.mjs sampled the button across 40 rAF frames with a MutationObserver on childList+subtree+attributes: { sawSpinner: false, sawDisabled: false, finalText: "Search" }. The dead markup is the Loader2 `animate-spin` at :102 and `disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none` at :99.
- **Mechanism:** An affordance designed for an asynchronous search wired to a synchronous emit. Vue never flushes a render with the flag set. Tranche A's Ad-13 requested this loading state; what landed reads as covered while being structurally impossible — worse than an acknowledged gap.
- **Reproduction:** node .../probe.mjs, read stateProbes.spinner.
- **Proposed cure:** Either make the search genuinely asynchronous (which it should be — see D2-m5, the server-side colour-distance filter) and keep the register, or delete `searching`, the Loader2 branch and the disabled classes outright. No third option; a dead state is legacy code by another name.

### D2-m2 — MINOR

The colour field is narrower than its own placeholder and truncates it silently.

- **Evidence:** Measured: input rect 148x36, padding-right 64px (reserved for the absolutely-positioned Search pill at :97), scrollWidth 146 === clientWidth 146, font Fira Code 14.384px, placeholder '#hex, hsl(...)'. That leaves roughly 72px of usable lane. shots/tall-mobile-open.png shows the placeholder rendered as '#hex…'. SearchFilterBar.vue:94 adds `truncate`, so the truncation is silent.
- **Mechanism:** A 64px in-field action reservation inside a 148px field in a 240px popover whose horizontal budget is already halved by D2-M1's doubled padding (16px producer + 12px .filter-section per side). The field cannot display `oklch(0.7 0.15 200)`, `rebeccapurple`, or its own advertised `hsl(...)`.
- **Reproduction:** node .../probe2.mjs, read `colorInput`; visually in shots/tall-mobile-open.png and shots/desktop-light-open.png.
- **Proposed cure:** Move Search out of the field (a real glass-ui Button beside it, or commit on Enter only) so the field owns its full width; drop `p-0` and let the producer inset be the only inset.

### D2-m3 — MINOR

The only committing action in the colour sub-instrument renders at 11px, and the count badge is text-micro bold — both outside the closed control/label rung.

- **Evidence:** Computed Search pill: font-size 11px, color rgb(112,89,66) on bg oklab(0.965259 0.00091 0.006098 / 0.5), height 24px. Its neighbours in the same popover compute 16.4px (.filter-option, = --type-small at 1440). Badge computed: font-size 11px, font-weight 700, bg oklch(0.470927 0.096235 89.834023). VISUAL-CONSTITUTION.md §4 binds 'control or label, including dropdown options' to `text-small` + Plus Jakarta Sans, explicitly non-bold; `text-micro` is not in the closed matrix.
- **Mechanism:** A hand-rolled action styled by hand rather than by the producer's control rung, at 67% of the size its own neighbours use.
- **Reproduction:** Playwright evaluate on the open popover: getComputedStyle([...root.querySelectorAll('button')].find(b=>b.textContent.trim()==='Search')) -> fontSize "11px".
- **Proposed cure:** Replace with glass-ui `Button size="xs"`, which carries the control rung; move the count into the `Badge` atom of D2-B3, which owns its own size axis.

### D2-m4 — MINOR

The popover has no semantic structure: two unnamed radiogroups, zero headings, zero role=group. The four visible section labels are never associated with the controls they label.

- **Evidence:** probe4.mjs on the open popover: menuRole "dialog", radiogroups 2, radiogroupNames [null, null], sectionHeadings 0 (h1..h6), groupRoles 0. The labels are plain `<div class="section-label">` (SearchFilterBar.vue:20,32,48,63) with no aria-labelledby, no fieldset/legend and no role=group on the RadioGroups or the tag list.
- **Mechanism:** Visual grouping expressed entirely through styled divs and dividers. AT receives 'Filters dialog' containing two anonymous radio groups and an unassociated pile of checkboxes. VISUAL-CONSTITUTION §4.1: 'Role, accessible name, state/value and associated error/status are explicit.'
- **Reproduction:** node .../probe4.mjs, read `axe`.
- **Proposed cure:** `DropdownMenuLabel` + `DropdownMenuGroup` carry the association from the producer. Absent the transposition, at minimum give each RadioGroup an aria-labelledby pointing at its own section label id.

### D2-m5 — MINOR

'Find by Color' filters only the pages already loaded, client-side, while its host field says 'Search the commons...' and the api offers a server-side colour-distance filter.

- **Evidence:** demo/palettes/BrowsePane.vue:339-355 filters pm.filteredBrowse in the client by OKLab distance with radius 0.15, carrying the comment 'API also supports server-side via colorL/colorA/colorB params, but client-side is instant'. docs/tranches/V/PALETTE-CONTRACT.md:60 records `GET /palettes` supporting a 'color-distance filter'. The wall is paged — BrowsePane.vue:132-144 renders a 'More from the commons' trigger past the cap.
- **Mechanism:** The label's scope (the commons) and the operation's scope (the loaded page) differ, and nothing on screen discloses it. A user who has loaded one page is told they searched the commons.
- **Reproduction:** Read BrowsePane.vue:339-355 against PALETTE-CONTRACT.md:60; behaviourally, load /#/browse, run a colour search, then click 'More from the commons' and observe that the newly loaded page is filtered only after the fact.
- **Proposed cure:** Route the colour search through the api's colorL/colorA/colorB parameters so the filter is a query, not a view. This also makes the search genuinely asynchronous and so restores the meaning of the `searching` register in D2-m1. Owned by BrowsePane + api, not by this component alone.
