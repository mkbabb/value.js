# AUDIT-2 — component cogency and mobile views, every project (OA-62, OA-64)

**Minted by:** COHESION §0cq (2026-09-24). **Runs:** at the next free workflow slot, under the four-workflow cap. **Model:** Opus 5.5, every seat. **Outputs:** `docs/tranches/X/audit/COMPONENTS-{value,keyframes,fourier}.md`, `docs/tranches/X/audit/MOBILE-{value,keyframes,fourier}.md`, and one glass letter for the glass rows.

**Owner, verbatim (2026-09-24):** *"ensure that we're not duplicating any component in any view, too: KISS, DRY. Audit our component structure for cogency in every project."* … *"Audit every mobile view for every mobile app view for all projects, too."* … *"All issues should be fixed at the glass-ui root, too."*

## Lens 1 — component cogency (per app: value.js `demo/`, keyframes.js `demo/`, fourier `web/src/`)
- **Duplicates:** two or more components or composables doing one job. Examples to check: the preview toggles, the tables of contents, pickers, dock menus.
- **Local copies of glass surfaces:** a consumer that re-implements something glass ships.
- **God modules and one-off instances:** for example an inline editor where the app's idiom is a separate pane.
- **Directory structure** that no longer matches responsibility.
- **Dead components**, with no importer.
- **Findings:** each row names the files, the job, the idiomatic single owner (an app component, or glass), and the cure. Duplicates across apps whose owner should be glass become glass rows.

## Lens 2 — mobile views (every route and view, per app)
- **Viewports:** 360, 390 and 430 wide in portrait, plus 844×390 landscape. Both themes.
- **Checks:**
  - centring and alignment to the page gutter, with the inline centre within 1 px
  - no horizontal overflow
  - touch targets at least 44 px
  - sheet and drawer detents reach their content
  - dock collapsed and expanded forms
  - safe-area insets
  - the type scale
- **Evidence:** a frame for every finding.
- Headed, on the served pages: value.js :9000, keyframes :5173, fourier :3100.

## Shape
One page-family seat per app per lens, then a confirm seat per row, then a register per app, then one glass letter. Rows route to the apps' cure waves: X-W12 or its successor, KF.W13W or its successor, and F.W14U or its successor. Glass rows go to BL.

## Lens 3 — design hierarchy and use of space, every UI (OA-69, added 2026-09-24, COHESION §0cu)
- **Owner, verbatim:** *"Ensure proper design hierarchy and usage of space in all UIs hereof"*.
- **Per view, per app:**
  - a single clear primary element per region
  - a type scale in use, with no competing sizes at one level
  - no row spent on a lone control that belongs inline (section actions, resets, toggles)
  - no dead whitespace bands
  - consistent gutters and rhythm
  - group dividers where groups change
  - controls on one line with their labels where they fit
- **Findings** name the view, the frame, the waste or hierarchy fault, and the cure: consumer, or a glass slot such as O-68.
