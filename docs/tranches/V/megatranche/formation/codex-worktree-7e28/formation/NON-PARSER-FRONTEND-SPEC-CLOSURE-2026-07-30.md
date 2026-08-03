<!--
  PROVENANCE — M-21 C-11 (codex-provenance ledger row 28), 7e28 worktree census, ruled 2026-08-03
  original: /Users/mkbabb/.codex/worktrees/7e28/value.js/docs/tranches/V/megatranche/formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md
  original-mtime: 2026-07-30T14:42:25
  original-sha256: a911162502a5a32cb512c00af266004e1d5d3f56ed2a963256b75caa3ee6c883
  original-bytes: 25198
  ruling: ADOPT-COPY — M-21 C-11 — 2026-08-03
  note: this comment block is prepended to otherwise byte-exact original content, so the
  copy's own sha256 differs; both digests are recorded in CENSUS.md. The original bytes
  are exactly the last original-bytes bytes of this file.
-->
# Value non-parser frontend specification closure — 2026-07-30

Status: FORMATION SPECIFICATION COMPLETE; PRODUCT EXECUTION CLOSED
Scope: the 88 physical Vue SFCs, 264 D/L/C axes, fourteen route identities,
and their future in-app Browser receipts
Authority: admitted Value R2 formation plus the 2026-07-30 user continuation
and temporary-test boundary amendment

## 1. Truth boundary

This packet closes specifications, not implementation evidence:

```text
component workflow identities specified       88 / 88 = 100%
D/L/C axis contracts specified               264 / 264 = 100%
historical exact D/L/C evidence banked        218 / 264 = 82.58%
historical fully banked component rows         72 / 88 = 81.82%
new product/browser execution receipts          0 / 88 = 0%
route identities with one exact workflow       14 / 14 = 100%
```

The sixteen formerly incomplete component rows and their 46 axes are
specification-complete below. They remain execution-RED until their own source,
test, packed, and Browser receipts exist. Nothing in this file changes the
physical 88-SFC denominator, banks an implementation axis, edits product
source, or substitutes one component's evidence for another.

Parser-dependent behavior stays blocked at its existing receiver. Parser
research is paused and is not counted in this packet.

## 2. Subject-specific design law

Value is a precision color instrument for people authoring, comparing, and
publishing color. It is not a glass-component gallery.

- **Golden Glass:** Glass owns interaction mechanics, focus, hit targets,
  overlays, and material paint. Value owns the color specimen, measured
  chroma, route hierarchy, content geometry, and state truth. A glass surface
  survives only when it makes a real grouping or interaction boundary legible.
- **Breath of Life:** the authored color, palette, gradient, image, or generated
  field is the protagonist. Secondary controls retreat. The distinctive
  signature is the measured-chroma specimen plus the watercolor channel marker,
  not another Card, glow, pill, or generic dashboard statistic.
- **Movement of Momentum:** one semantic owner animates a state change. A route
  transition, a color-field response, and an async operation outcome may not
  each animate the same event. Reduced motion seats the declared final state
  immediately.
- **Typography:** the display face names route/job hierarchy, the body face
  explains actions and outcomes, and the mono face is reserved for authored
  numeric/color data. Uppercase microcopy is not a substitute for a heading.
- **Decoration:** dividers name real groups; cards require both a material and
  interaction reason; ornamental chips, duplicate shadows, debug paint, and
  companion surfaces that do not advance the route job are removable.
- **Color:** feature CSS consumes semantic and measured-chroma tokens. No new
  hard-coded decorative color may bypass forced-colors, contrast, or the
  selected color's truthful representation.

The design pass and self-critique pass are distinct. The first states the
subject/job/hierarchy and one signature. The second removes generic defaults,
checks every state and environment, and records the surviving terminal
disposition.

## 3. Per-row receipt contract

Every `VC-###` below owns a distinct future receipt. Each receipt must contain:

1. exact component and parent/consumer hashes;
2. route, protagonist, job, hierarchy, interaction owner, and paint owner;
3. desktop 1440×900, mobile 390×844, and short-landscape 720×450;
4. named container owner and overflow/scroll measurements;
5. full keyboard order, activation, cancellation, focus return, and
   `:focus-visible`;
6. reduced-motion, forced-colors, and RTL assertions;
7. loading, empty, error, offline, auth, and Admin applicability, using `N/A`
   only with a causal explanation;
8. sampled semantic/motion frames at 0/120/420 ms, or exact `N/A` for a static
   component;
9. exact visible copy and accessible names;
10. Glass import/paint ownership, removable-decoration finding, and terminal
    `KEEP | FOLD | MOVE | SPLIT | PRUNE`;
11. π and DELTA artifact hashes under
    `PI-DELTA-MANIFEST-2026-07-29.json`; and
12. a verdict that fails when any required field or coordinate is absent.

No route sweep, shared parent, screenshot, prose claim, or live-root
reconnaissance can stand in for a component receipt.

## 4. Sixteen closed workflow specifications

### 4.1 Palette and Admin components

| ID | Owner / route / protagonist | Exact states and copy | Interaction, responsive, and environment contract | Glass/design and disposition |
|---|---|---|---|---|
| VC-011 `AdminListItem.vue` | Owning panel is `AdminNamesPanel`; `/admin/names`; one proposal record is protagonist. The slot is constrained to record identity, evidence, and policy-valid actions and is not a generic row authority. | loading `N/A` because VC-012 owns geometry; empty owned by the panel; action pending says `Reviewing…`; refusal names the operation; offline says `Review unavailable offline`; unauthorized/withdrawn/trashed hide record existence; Admin is required before data renders. | Parent list owns width and scrolling; row wraps identity before actions at 390px/short landscape; DOM order is identity→evidence→actions in LTR and RTL; keyboard reaches every named action once and returns to the triggering record after a dialog; static at 0/120/420 except the owning action outcome. | Direct Glass controls only; swatch is evidence, not decoration; one divider only between evidence and actions. **KEEP** as Admin record layout and **PRUNE** any use as a shared component substitute. |
| VC-012 `AdminListSkeleton.vue` | Consumed independently by Names, Flagged, Users, and Audit panels; each caller supplies its own accessible loading label; the awaited list geometry is protagonist. | visible copy/label is `Loading <subject>…`; no empty/error/offline/auth content; it disappears atomically when caller state resolves; Admin gate occurs before the skeleton. | Caller container owns row count and width; skeleton mirrors final row breakpoints; no focusable descendants; reduced motion is static with no shimmer; forced colors uses system border/text geometry; RTL mirrors blocks without changing evidence order; frames 0/120/420 remain geometry-identical. | Glass `Skeleton` owns material. **KEEP** only as a geometry-preserving primitive; **PRUNE** shimmer or decorative rows not matched to the final list. |
| VC-016 `PaginationBar.vue` | `AdminAuditPanel` and `AdminFlaggedPanel`; `/admin/audit` and `/admin/flagged`; current result window is protagonist. | Hidden for `pageCount <= 1`; exact status `Page {page} of {pageCount}`; buttons `Previous page` and `Next page`; pending disables both without changing the page; error/offline remains in owner; auth/Admin gate in owner. | Collection owns page and server cursor semantics; bar owns no fetch; fits one line at 390px and short landscape with status retained; Tab order previous→next, disabled controls are skipped; focus stays on invoked control after success and moves to the remaining enabled control at a boundary; RTL changes placement, not meaning; static frames. | Direct Glass Button; no Card/pill. **KEEP** only against actual server paging and **PRUNE** local array slicing disguised as authority. |
| VC-018 `ActionFeedback.vue` | `PaletteCard` action owner; `/palettes` and `/browse`; one completed card command is protagonist. | Exact outcome is `{action} succeeded` or `{action} failed: {reason}`; pending belongs to the invoking control; offline/auth/policy/CAS refusals are distinct; success may auto-dismiss only after announcement, error remains until dismissed or retried. | Card owns placement and width; feedback never covers swatches/actions; keyboard focus remains with the invoking control and an explicit dismiss is named; timer is cancelled on unmount; reduced motion removes transition/delay; forced colors uses system status/error channels; RTL preserves icon-before-copy semantics; frames prove entry/final/dismissal. | No celebratory glow or decorative chip. **FOLD** visual outcome into the owning action when it has no independent live-region job; otherwise **KEEP** one `role=status`/`role=alert` implementation. |
| VC-021 `PaletteCardMeta.vue` | `PaletteCard`; `/palettes` and `/browse`; factual authorship, release, tags, and viewer-valid vote state are protagonists only after swatches/name. | Copy names author, revision, tag overflow, and viewer vote. A fork count is never stored/public authority; unreadable children are absent. Pending vote says `Saving vote…`; offline/auth/policy failure is visible and rolls back; no metadata field silently disappears when it is applicable. | Card owns wrapping; metadata becomes two semantic rows before truncation and never pushes actions off-screen; links/buttons have accessible names and 44px touch target where interactive; RTL reverses visual row flow while preserving author→release→tags→vote reading; static factual fields, only vote outcome may move. | **SPLIT** factual metadata from interactive vote; **PRUNE** stored `forkCount`, title-only icon meaning, and ornamental badges. **KEEP** measured tag/status evidence. |
| VC-023 `PaletteRenameInput.vue` | `PaletteCard`; `/palettes`; the owned palette name edit is protagonist. | Initial value is selected; `Save name` and `Cancel rename`; Enter submits, Escape cancels, blur does not silently commit; blank/unchanged/too-long/noncanonical input refuses locally; pending, offline, auth, policy, `412` CAS, and server error are distinct and preserve input. | Card owns width; input and two actions wrap without viewport escape; focus enters input, returns to the rename trigger on cancel/success, remains on input with error; forced colors retains input boundary; RTL keeps text direction appropriate to user content and actions in DOM order; reduced motion is immediate; frames cover enter/pending/final. | Glass Input/Button mechanics; no nested Card. **KEEP** local edit, **PRUNE** unlabeled icon controls and any optimistic name change before CAS success. |
| VC-024 `PaletteCardGrid.vue` | `/palettes` and `/browse`; the collection, not the grid shell, is protagonist. | loading uses exact card skeleton count from owner; empty uses one `EmptyState`; error, offline, auth, and policy states replace—not accompany—the grid; Admin is `N/A` except an explicit Admin consumer. | The route content container owns responsive columns, gap, max width, and scroll; card order equals DOM order in LTR/RTL; no masonry reordering; keyboard follows collection order; short landscape preserves horizontal actions without nested scroll; static frames except caller route transition. | Grid has no Card/material of its own. **KEEP** collection layout and **PRUNE** decorative container paint or a second empty surface. |
| VC-034 `TagEditPopover.vue` | `BrowsePane`; `/browse`; the selected palette's complete tag set is protagonist. | Trigger `Edit tags`; list `Available tags`; loading `Loading tags…`; empty `No tags available`; error `Tags could not be loaded`; offline `Tag editing is unavailable offline`; auth/policy refusal hides mutation; save conflict says `Tags changed elsewhere. Review and retry.` Optimistic failure restores the exact prior set. | Trigger owns anchor; popover owns collision/viewport fit; list has one labelled checkbox per tag, Escape closes and restores trigger focus; Space toggles; Tab cannot enter background; 390px uses bounded sheet/popover without clipped actions; forced colors exposes checked state; RTL mirrors placement; reduced motion seats open/close final in one frame. | Glass Popover/Checkbox owns mechanics. **KEEP** contextual edit; **PRUNE** ornamental tag clouds and emit-before-save state that cannot roll back. |
| VC-035 `UserSortMenu.vue` | `AdminPane`; applicable Admin collection route; the server order is protagonist. | Trigger says `Sort: {label}`; options are only server-supported `Newest`, `Slug`, and `Palette count`; selected state is exposed; pending keeps selection; offline/error leave prior order and say `Sorting unavailable`; unauthorized never renders the menu. | Collection owner performs query; menu owns selection only; 390px/short landscape collision stays within container; Arrow/Home/End/Enter/Escape and focus return use Glass menu semantics; RTL mirrors popup side, not option order; static frames except popup open/close; forced colors shows selection. | **KEEP** verified server sorts, **PRUNE** options without query semantics and a generic `Sort` label that hides the current choice. |

### 4.2 Picker, shell, and gradient components

| ID | Owner / route / protagonist | Exact states and copy | Interaction, responsive, and environment contract | Glass/design and disposition |
|---|---|---|---|---|
| VC-040 `ConsoleRail.vue` | `ComponentSliders`; `/`; active color channel is protagonist. This is channel navigation, not a developer console. | Exact accessible label `Color channels`; active channel exposes name plus current value; loading/error/offline/auth/Admin are causal `N/A` because values are local and synchronous; invalid model/channel is a visible terminal color-session error, not an empty rail. | Rail owns roving tabindex, ArrowUp/Down or ArrowLeft/Right by orientation, Home/End, and focus-visible; parent container switches vertical→horizontal below its measured threshold; 390px/short landscape retain all channels and 44px targets; RTL reverses horizontal arrows only; forced colors replaces watercolor-only distinction with border/text; static frames. | WatercolorDot is the subject-specific signature. **MOVE/rename** to the semantic child name `channels/Rail.vue` under filename law, **KEEP** one marker, **PRUNE** diagnostic-console vocabulary and duplicate numeric readouts. |
| VC-042 `ColorComponentDisplay.vue` | `ColorPicker`; `/`; exact authored numeric tuple is protagonist beside the color specimen. | Each component is a labelled textbox with current canonical display value; Enter commits, Escape restores, blur follows the declared commit law; incomplete, nonfinite, out-of-domain, and noncanonical values refuse in place; local synchronous operation makes loading/offline/auth/Admin `N/A`; parse refusal is blocked on V.L1 and must remain visible. | The picker display container owns reserved width/line count; no layout shift across value length; keyboard order equals semantic channel order; 390px and short landscape retain label/value/unit; numerical text remains LTR inside RTL layout; forced colors preserves editable boundary; reduced motion static; frames cover edit/refusal/commit only. | Mono data typography, no Card. **KEEP** as the sole exact tuple editor/readout and **PRUNE** duplicate echo values. |
| VC-043 `DebugEventLog.vue` | Current owner `PointerDebugOverlay`; `/`; developer event trace has no product protagonist. | Product states are all `N/A`; diagnostic output must use deterministic event names/times only in an isolated test fixture and must not contain user/auth data. | No product focus, viewport, RTL, forced-colors, or animation contract; test probe owns bounded log length and teardown. Production absence is the Browser assertion. | Hard-coded debug paint is removable. **MOVE** useful trace semantics to isolated dev/test instrumentation and **PRUNE** the production SFC/import/provider path. |
| VC-045 `PointerDebugOverlay.vue` | Current owner `ColorPicker`; `/`; developer pointer geometry has no product protagonist. | Product states are all `N/A`; clipboard/events/actions are test-harness functions only. Production must expose neither overlay nor debug provider. | Product Browser receipt proves absence at all three viewports/media/directions and no focusable/debug DOM. A separate isolated probe may assert pointer geometry and cleanup without Teleport or clipboard fallback DOM mutation. | **PRUNE** production overlay, infinite blink, hard-coded paint, Teleport, and `POINTER_DEBUG_KEY`; **MOVE** bounded geometry diagnostics to tests. |
| VC-059 `ActionToolbar.vue` | `ActionBarLayer` and `ColorPicker`; `/`; route-local color commands are protagonists subordinate to the color. | Named actions: `Reset color`, `Copy color`, `Random color`, `Palettes`, `Extract palette`; copy success/error is visible; no silent optional-chain command; loading/offline/auth/Admin are `N/A` except destination policy in the target route. | Dock owns container/placement; toolbar owns no route state; roving/group semantics must not trap focus; 390px and short landscape expose all commands through the same semantic owner; forced colors and RTL preserve names/order; reduced motion immediate; frames cover dock open/close only. | Preserve `ActionBarLayer`. **KEEP** ColorPicker-local toolbar, **PRUNE** unused `canProposeName`, forward-only `clearHover` exposure, and any generic descriptor registry. |
| VC-064 `ParseEchoReadout.vue` | `ColorInput`; `/`; the user's parsed color interpretation—not an AST—is the possible protagonist. | Exact user-facing result is canonical color plus gamut/refusal; pending is `Checking color…`; invalid input names the refusal; offline/auth/Admin `N/A`; an AST/debug echo is never product copy. | Input owner seats result and focus; readout is not focusable unless it contains a named correction action; wraps without shifting dock controls; numerical/color strings remain LTR in RTL; forced colors uses text/system status; reduced motion static; frames cover pending/final only. | **SPLIT** and **KEEP** a proven `GamutReadout`; **MOVE** AST echo to tests/dev or **PRUNE** it. Product half stays blocked on V.L1. |
| VC-077 `GradientPane.vue` | route `/gradient`; authored gradient is protagonist. | Header actions are local `Reset gradient` and `Copy CSS`; Reset returns the declared canonical two-stop baseline and reports success/failure; Copy is disabled on inverse refusal; implicit `Seed from palette` is absent; loading/offline/auth/Admin are `N/A` for local authoring, while parser refusal is explicit and blocked on V.L1/L2. | Route scene owns H1, focus, scroll, and pane width; visualizer owns gradient paint; controls remain usable at 390px/short landscape; keyboard reaches header actions then stops/easing/code in DOM order; RTL keeps CSS text LTR and mirrors layout; forced colors supplies stop/order text; reduced motion makes easing specimen static; 0/120/420 prove one route transition owner. | One earned Glass surface around the authored specimen, not nested cards. **KEEP** pane and local Reset/Copy; **PRUNE** `seedFromPalette`, first-palette heuristic, `defineExpose` proxy, and shell relay. |

## 5. Fourteen-route bijection

Every route owns one scene contract; route-local components may be shared only
through explicit child edges. The `RouteScene` owns H1, initial focus, scroll,
state replacement, and route-local actions.

| Route / path | Job and protagonist | Exact primary workflow | Required route states | Terminal formation disposition |
|---|---|---|---|---|
| `picker` `/` | author one color; color specimen | VC-038 with VC-040/042/059/064 children | local ready/invalid; parser refusal | KEEP scene; PRUNE debug VC-043/045 |
| `palettes` `/palettes` | manage viewer palettes; owned collection | VC-007 with VC-018/021/023/024 | anonymous/auth, loading, empty, error, offline, policy | KEEP |
| `browse` `/browse` | discover readable palettes; public collection | VC-006 with VC-024/034 | loading, empty, error, offline, filtered policy | KEEP |
| `extract` `/extract` | turn an image into a palette; source image/result | VC-071/072 | idle, acquiring, processing, result, refusal | KEEP |
| `mix` `/mix` | combine selected colors; result color | VC-086/087 | zero selection, configured, mixing, result, refusal | KEEP local Mix/Copy/Reset |
| `generate` `/generate` | generate a palette; generated swatches | VC-076 | configured, generating, result, save/copy outcome | KEEP local seats |
| `gradient` `/gradient` | author a gradient; gradient specimen | VC-077/081 | valid, parser refusal, inverse refusal, copy/reset outcome | KEEP; delete implicit Seed |
| `atmosphere` `/atmosphere` | tune a color field; aurora field | VC-051 | ready, reduced-motion final, copy/reset outcome | KEEP one motion owner |
| `blob` `/blob` | tune color geometry; blob specimen | VC-052 | ready, reduced-motion final, copy/reset outcome | KEEP one motion owner |
| `admin-users` `/admin/users` | administer accounts; user roster | VC-015 with VC-012 loading geometry | auth/Admin gate, loading, empty, error, offline | KEEP explicit Admin policy |
| `admin-names` `/admin/names` | adjudicate names; proposal queue | VC-013 with VC-011/012 | auth/Admin gate, loading, empty, error, offline, action result | KEEP |
| `admin-audit` `/admin/audit` | inspect audit history; chronology | VC-009 with VC-012/016 | auth/Admin gate, loading, empty, error, offline | KEEP immutable order |
| `admin-flagged` `/admin/flagged` | triage reports; flagged queue | VC-010 with VC-012/016 | auth/Admin gate, loading, empty, error, offline, action result | KEEP |
| `admin-tags` `/admin/tags` | administer tag taxonomy; tag definitions | VC-014 | auth/Admin gate, loading, empty, error, offline, action result | KEEP |

The wildcard redirect is not a fifteenth workflow. Stub router records and
out-of-band pane rendering **FOLD** into typed scenes when V.U1 executes.

## 6. Authenticated temporary Browser diagnostic

Receipt ID: `V-NP-BROWSER-DIAG-20260730-01`

### 6.1 Defect and reversible harness

The first `localhost:9000` observation targeted the live root and is excluded.
The isolated worktree has no `node_modules` or built `dist`, so it could not
serve directly.

The authorized reversible fix was:

1. create `/tmp/value-np.7Wea3r`;
2. copy exact committed product bytes with
   `git -C /Users/mkbabb/.codex/worktrees/7e28/value.js archive HEAD`;
3. copy dependency directories read-only from the live installation into the
   disposable root;
4. run `npm run build` inside the copy;
5. run copied Vite 8.0.16 on `127.0.0.1:41739`;
6. use the in-app Browser only against that coordinate; and
7. stop the process and remove the disposable root after evidence capture.

Authenticated source anchors:

```text
e01d0065fa6c7c80282280566af2b9a4add809bf  copied git commit
c8d073bda8d6dee378c7f05e6b9365364ddf742563f0650225ad2aaaf2935a0d  index.html
4afbc168284ab781bc21c7a1c5dac59a0c8227dc5ac30d82b2acf59ee741d2f2  vite.config.ts
5be878cd1806a003438ce0645d2c6338e027ff72ad075c107fa3e1aa08ebe544  package.json
26e03976bb05d94ba5602b9fd7c0e8ac44a75a63fbd0a05419dc6ff9c4dbc5de  package-lock.json
```

No checkout byte, git index, existing container, volume, database, or live
process was modified.

### 6.2 Observed coordinate

```text
URL                 http://127.0.0.1:41739/#/<route>
viewport            1280 × 720 CSS px
devicePixelRatio    2
fonts               loaded
direction           ltr
prefers-reduced     false
forced-colors       false
```

All fourteen hashes reached their expected document title and one `main`
labelled `Color tool panes`; every route had **zero H1 elements**. Every route
also exposed the honest alert `dev misconfigured — run npm run dev` because
the copy had no API endpoint configuration. `/browse` additionally exposed
`The commons is unreachable. Failed to load palettes Retry`. Empty states for
palette and Admin collections were visible rather than silently blank.

The Generate→Gradient transition contained both route protagonists at 0 and
120 ms and only Gradient at 420 ms. This is useful diagnostic evidence for the
single-motion-owner and focus/announcement specification. It is not a pass:
the route H1/focus law is RED, only one viewport/media/direction was observed,
keyboard Tab did not advance from `body` through the browser harness, and no
authenticated/loading/forced-colors/RTL/PRM matrix was executed.

### 6.3 Diagnostic verdict

The receipt is **KEEP AS READ-ONLY DIAGNOSTIC / ZERO PRODUCT OR VISUAL
CREDIT**. It authenticates route identity, missing H1, visible offline/config
state, and one 0/120/420 transition observation only. All sixteen component
Browser receipts and V.G1/V.Q1/V.Q2 remain RED.

### 6.4 Cleanup and identity proof

The in-app Browser tab was finalized with zero retained tabs. The Vite process
was stopped; no listener remained on TCP 41739. The temporary root no longer
exists at `/tmp/value-np.7Wea3r`; it was moved recoverably to
`/Users/mkbabb/.Trash/value-np.7Wea3r-20260730`.

The four checkout anchors after cleanup exactly matched the before identities
listed in 6.1. Docker inspection before and after listed the same three
pre-existing containers; no container, network, volume, port, or database was
created or changed by this diagnostic.

## 7. Completion and execution gates

Formation specification closure is `88/88`, `264/264`, and `14/14`.
Implementation admission still requires one born-RED unit per component or
indivisible terminal deletion, then source/test work, exact public/packed
evidence, and the component's independent Browser receipt. Product execution
does not inherit this packet's percentage.
