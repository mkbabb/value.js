# F.W14U — the fourier UI-audit rows, whole

**Minted by:** COHESION §0cl (2026-09-23). **Opens after:** F.W14 CLOSED. **Model:** Opus 5.5, every seat. **Record:** `docs/tranches/X/execution/C/F-W14U.md`. **Tree:** `/Users/mkbabb/Programming/fourier-analysis`, branch `m/w1-bump-migration`.

## Why
The owner ordered a full UI audit of every page (OA-37). The fourier register, `docs/tranches/X/audit/UI-AUDIT-fourier.md`, holds 256 rows. F.W14 `.u` dispositioned 88: 33 cured, 4 cured by `.t` or `.h`, 48 GLASS rows routed (O-59/O-63) and 3 SERVER rows routed. **168 are owed**, including BROKEN F-9 and F-14, plus 24 SPLIT consumer halves. The owner's standard for every row is "glass-ui idiomatic, rounded properly, good design hierarchy and usage of space".

## Units
- **The open seat reads the `.u` receipt** in `execution/C/F-W14.md` and the register whole. It lists every owed row by id and groups the rows by page family, following the register's own page sections. It then mints one unit per family, named `F.W14U.<family>`. Each unit takes a set of files disjoint from the others, so groups whose file sets are disjoint may run in parallel. Units that share a file run serially.
- BROKEN rows go first, in their family's unit. The SPLIT consumer halves go with their family.
- **Per row:**
  - a served-page frame before the cure (headed, 1440 and 390, in the themes the row names)
  - the cure at the root, with glass idiom and no local copy of a glass surface
  - a falsifier that reads RED before the cure and GREEN after, twice
  - a frame after the cure
  - the row's disposition written into the unit's receipt
- **GLASS rows** are relay-only. Cite O-59, or add a dated addendum beside O-59 for a newly found glass half.
- **Bounds:** `web/**` and `web/e2e/**` (additive). **`api/**` is granted** for the server rows: F-35, F-83, F-112, F-39 and F-46's server half. Also the value.js receipt and INBOX rows. The ADJACENT-LINE RULE applies.

## Close
- All 256 UIA-F rows are dispositioned. Each is either CURED with its falsifier ×2, or routed by id: GLASS to O-59/O-63, SERVER to its api cure.
- Full e2e at `--workers=1`, twice, with the load recorded. REDs stay within the named baseline set plus the honest-RED ids.
- `vue-tsc -b` 0. `vitest` GREEN.

## ADDENDUM 2026-09-24 (COHESION §0cq): OA-57/59/60 join F.W14U
- **Owner, verbatim (2026-09-24):** *"the dock when collapsed is not correct--same with keyframes.js and the docks in the other apps; … the easing curve picker is not organized well with proper design hierarchy and dividing … the side controls pane in fourier should be seperated, not totally attached, like it is now. The table of contents should be hideable in the paper view, it should slide under the paper and become a drawer that expands out to where it is now. The hide/show animation ball preview in keyframes.js should have a eye icon in every view, and it should not impact the fow, it should float in the top right corner and it should animate the hide and show--ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project. All issues should be fixed at the glass-ui root, too. The mobile view for the controls and panes in keyframes.js are wrong and not centreed and aligned properly. Audit every mobile view for every mobile app view for all projects, too. Keep ttrack of the projects, too, and hold them in your plans and mind, like parse-that, bbnf, keyframes.js, etc."*
- **Frames:** `fourier/evidence/W14/owner-2026-09-24-side-pane.png` (the controls pane fused to the viewport edge) and `audit/owner-2026-09-24-collapsed-dock.png`.
- **New units, run before the family units:**
  - **`F.W14U.s` the side controls pane is separated, OA-59.** The Configurator's controls pane becomes a detached glass card: an inset gutter from the viewport edge and from the stage, all four corners at `--radius-card`, and its own shadow. It is never flush with or attached to the edge or the stage. This holds at 1440, 1024 and 390, where the mobile sheet keeps its own form. It uses glass's Configurator tokens, and if glass lacks a detached mode, the gap goes to O-65.
  - **`F.W14U.t` the paper's table of contents becomes a hideable drawer, OA-60.**
    - A toggle hides the ToC. Hiding it slides the ToC **under** the paper, animated. It collapses to a drawer tab at the paper's edge.
    - Expanding the tab slides it back out to exactly where it sits now.
    - The state persists per viewer, with try/catch around storage.
    - Keyboard: the toggle is a button with `aria-expanded`, and focus returns to the toggle.
    - Reduced motion is instant.
    - `PaperSidebar` and `MobileFloatingToc` become one component with two presentations, and no duplicate stays (DRY).
    - Use glass's drawer or sheet primitive, and relay any gap to O-65.
  - **`F.W14U.d` the collapsed dock, OA-57, fourier's consumer half.** Read and cure consumer causes. The producer half is O-65, honest-RED **DOCK-COLLAPSED-FORM**.

## ADDENDUM 2026-09-24 (b) — P-1 and P-2 as glass read them (COHESION §0cr)
- **`.s`, the detached pane.** Glass's Configurator is already a floating, rounded card (I-48 P-1). What is missing is only its placement, and placement is the consumer's layout. `.s` places glass's own card with an inset gutter through fourier's layout, never restyling the card. If glass later ships an inset mode, it is adopted at the landing repin.
- **`.t`, the paper table-of-contents drawer.** Glass has no edge-drawer-under-content primitive (I-48 P-2). The table of contents is fourier's own content, and hiding it under the paper is fourier's layout. `.t` builds it from fourier's layout: the paper's grid column collapses, and the table of contents translates under the paper surface. The visible surfaces are glass's own, so it copies no glass surface.
  - The component is written so that one glass primitive can replace the slide. Its motion lives in one place with no bespoke styling of glass surfaces.
  - If glass's formation ships P-2, fourier adopts it at the landing repin, recorded as **P-2-ADOPT**.

## ADDENDUM 2026-09-24 — OA-66/OA-67 (COHESION §0cs)
- Record honest-RED **GLASS-SELECT-GREY** (O-66) for Select triggers and selected items painting grey. Check the call sites for any consumer class or dead prop that causes it, and cure those locally. Never override the glass surface. Dock motion stays with glass D2 (O-66 §2).

## ADDENDUM 2026-09-24 — OA-68 (COHESION §0ct)
- Read every side and canvas dock on the served page, in both themes. Record honest-RED **SIDE-DOCK-EDGE** (O-67) for plate edges that do not close and for badge overlap. Cure only a consumer clip or crowding in the ancestor chain, such as a missing gutter to the panel above. Never override the dock.
