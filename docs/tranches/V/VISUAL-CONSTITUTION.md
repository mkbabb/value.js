# Tranche V — Optical Bench Visual Constitution

## 1. Product identity

value.js is a chromatic laboratory, not a dashboard. A person brings one color, image, or palette and leaves with an understood, edited, code-ready color artifact. Each screen therefore has one dominant instrument, one clear specimen, and one primary action instrument.

The signature risk is the **spectral meniscus**: a continuous liquid-color rail reserved for genuinely chromatic continuous domains—Picker and Gradient. Easing uses a neutral temporal rail carrying the selected specimen color; Mix derives color only from its operands. The second signature is the existing WatercolorDot species. Everything structural stays calm enough for those two ideas to read.

## 2. Material hierarchy

| Tier | Role | Rule |
|---|---|---|
| Ambient field | low-frequency active-color atmosphere | chromatic from frame zero; never gray, never card chrome |
| Structural glass | dock, header, primary plate | neutral Clear-Ice/Smoke family; real glass-ui resting/floating tiers |
| Instrument veil | controls genuinely over live color | denser neutral veil with named alpha/clarity levers; no drop shadow |
| Specimen well | image, curve, palette or code artifact | opaque/quiet neutral stage; the specimen supplies color |
| Watercolor/data | swatches, active mark, pastel `Palettes` identity | the only ornamental color-bearing species |

One surface has one tier. An inner card is not automatically another pane of glass. Glass earns its blur by revealing live content; otherwise it is a neutral well.

Dark chrome uses the restrained neutral pole. Seed tint is forbidden outside the ambient field, active accent, WatercolorDot/specimen, and pastel Palettes lanes.

The pastel-rainbow identity has exactly two textual coordinates: the `Palettes` Dock destination and the `Palettes` substring in the Library heading `My Palettes`. W18 owns their one shared composition/token law, W19 owns the Dock witness, and W22 owns the Library witness. Both coordinates render in light and dark; `My` and every other navigation, route, pane, Admin, Account, action, and status label use neutral ink. Consequently pastel/rainbow identity applications outside those two exact `Palettes` substrings equal zero. This count excludes chromatic specimens and data-bearing WatercolorDots, which remain color because they depict color rather than brand a surface.

## 3. Proportion laws

1. A two-part desktop scene is **earned**, not default. A P122 instrument chooses exactly `golden` (`61.8033989% / 38.1966011%`) or `preview-dominant` (`66.6666667% / 33.3333333%`); the display-rounded protagonist law is 61.8–66.7%. Non-P122 workspaces may tune within those exact outer bounds only where their binding composition says so.
2. Empty secondary content occupies at most a narrow invitation tray (≤15% of the stage) or disappears. It never receives half the viewport.
3. Configuration panes show preview first, controls second. Atmosphere/Blob preview area is larger than the form at every desktop size.
4. The top dock owns a reserved band. Expanded/collapsed/mounted states do not move the scene below it.
5. A header contracts as a whole block. At rest it breathes; when stuck, title, padding, and band all take the compact token step.
6. Mobile uses one document-scrolling stage→inspector→action sequence beneath the same top dock. Secondary controls may enter a shallow disclosure region, but no global pane selector, left/right split state, or simultaneous two-stage miniature survives.
7. Spacing is container-scaled from glass-ui tokens. No desktop-tight/mobile-airy fork and no breakpoint pile.
8. One pane may have one full-strength visual protagonist. Supporting fixtures do not compete with it through equal size or equal shadow.

## 3.1 Binding route compositions

`InstrumentChassis` is the glass-ui housing contract for a real instrument: stage, inspector, action region, material role, reserved geometry and phase. It is landmark-neutral: the value shell owns the route's sole `<main>`, so no chassis stage/dial may emit a nested `<main>` or require a consumer role override. value.js composes regions with domain content; it does not clone a local chassis recipe. `Card` remains semantic housing for a bounded object or specimen and is never the default page primitive.

| Distinct member | Protagonist | Support / collapse | Mobile order | Outer housing |
|---|---|---|---|---|
| Picker | optical color stage | exact golden inspector 38.1966011%; an absent inspector leaves no filler | stage, then shallow controls | `InstrumentChassis` |
| About | typographic product argument | no synthetic companion; supporting examples content-hug | argument, examples, provenance | structural article, no default Card |
| Browse | discoverable public specimen field at 64%…66.6666667% when selected | complementary selected-public-palette inspector at 33.3333333%…36%; primary empty invitation content-hugs | search, results, selected inspector | browse workspace chassis; every rendered bounded palette entity slip has exactly one Card shell, and the field/empty/inspector have none |
| Library / My Palettes | owned Device Draft, Workspace, Published and Trash field at 64%…66.6666667% when selected | complementary selected action/history inspector at 33.3333333%…36%; an empty secondary lane collapses | owner-state selector, library, selected inspector | owner workspace chassis; every rendered bounded palette entity slip has exactly one Card shell, and the field/lane/empty/inspector have none |
| Generate | generated WatercolorDot specimen | generative-model inspector then commit region | specimen, model inspector, commit action | `InstrumentChassis` |
| Extract | source image and sampler stage | developed specimen/inspector; undeveloped result stays contextual | source, sampled result, controls | `InstrumentChassis` |
| Mix | ordered N-operand convergence trough | result/provenance inspector; absent operands occupy no filler | operand rack, result, controls | its own `InstrumentChassis` composition |
| Gradient | spectral meniscus preview | stop and code inspector | preview, stops, code/action | `InstrumentChassis`; no nested stage Card |
| Easing | neutral curve/time stage | catalogue, specimen strip and code inspector | curve, catalogue, code/action | `InstrumentChassis`; no nested stage Card |
| Atmosphere | persistent Aurora preview | compact atom essentials plus scroll-confined advanced disclosure | preview, essentials, advanced | producer-compatible `InstrumentChassis` |
| Blob | persistent material hero preview | compact morphology essentials plus scroll-confined advanced disclosure | preview, essentials, advanced | its own producer-compatible `InstrumentChassis` composition |

Every Browse/Library palette entity uses the one retained Card tuple exactly: `size="sm"`, `material="content"`, `tier="quiet"`, `surface="opaque"`, `shadow=false`, `grain=false`, `specular="off"`. The tuple does not vary with selection or viewport and has no cartoon, grid, or Card-level selected variant. The Card/article root is a noninteractive container: it owns no activation, focus or selection state, but carries no HTML `inert` attribute so its live child remains reachable; palette-Card `[inert]` count is `0`. Its sole selection seat is a native named `<button type="button" aria-pressed="false|true">` spanning the specimen/identity region; it owns activation, visible selection and focus without `aria-selected`, `role="option"`, a listbox or another composite-selection fiction. `aria-pressed="true"` iff that entity's palette ID equals the selected inspector identity, at most one seat is true, and no selection means every seat is false while the inspector is absent. An optional reorder handle remains a separate named control. Its root anchor is always `C = --card-pad-inline = --spacing(4)`; the five Card-padding relations derive from that same `C` at every viewport. Only the surrounding workspace gutter responds. Every later palette Card/root reference has this exact noninteractive-container meaning and never authorizes the DOM attribute around the selection seat.

`OPTICAL-BENCH-COMPOSITIONS.md` is the binding topology decision. W18 must ratify one low-fidelity and one real-rendered composition for **each of these eleven members plus Users, Names, Audit, Flagged, Tags, Account and unsupported/corrupt storage recovery** before feature styling proceeds. A shared family board may carry related members, but it counts only when each member has a separately named frame and separately measured protagonist, region ratio, collapse behavior, mobile sequence, Card decision, exact boundary/reserve inventory and main-landmark count. Picker cannot stand in for About, Browse cannot stand in for Library, Extract cannot stand in for Mix, Gradient cannot stand in for Easing, Atmosphere cannot stand in for Blob, and one Admin frame cannot stand in for its four siblings. Resizing the old equal-card matrix cannot satisfy any member.

The member-route inventory is exactly `/`, `/palettes`, `/browse`, `/extract`, `/mix`, `/generate`, `/gradient`, `/easing`, `/atmosphere`, `/blob`, and `/about`. About is a quiet trailing destination rather than Picker's companion; Easing is a peer route adjacent to Gradient rather than a nested P122 instrument. W19 owns route/Dock/title/focus reachability, W18 owns About's body, and W27 owns Gradient and Easing bodies.

### 3.2 Binding Picker crop correction

The 2026-07-15 Lab crop is the decisive counterexample for PR-01…03. In the settled Picker, the read-only Fira Code numeric readout is the headline and the Fraunces selected-space identity is exactly one adjacent glass-ui golden rung smaller. BI P019 supplies a paired clamp whose complete rendered ratio is `1/√φ`; independently clamped display-2/display-3 tokens and a local approximation are forbidden. Let `G` be BI P122's settled `--instrument-title-gap`, `I_before` the W0 baseline rendered-ink separation and `I_after` the final rendered-ink separation. At P019's floor, fluid and ceiling arms and in complete-route 1440px, 390px, 320px, and actual 400% browser-zoom observations, `I_after ≤ min(φG, I_before − G)` with measurement tolerance `±0.5 CSS px`. The 400% arm is the live routed page at actual in-app Browser zoom, not a substituted CSS-width or responsive-emulation frame. The exact line-box edge gap remains `G`; no Card-local/section token or Blob footprint may reserve vertical space there.

Blob layout footprint, chassis-relative placement and painted mass are independent. W0 freezes reference seed/color/frame, records the footprint center in old-Card coordinates and measures rendered `b₀` (nominal source geometry 0.52 is not substituted). W18/W20 move the footprint toward the chassis center by exactly one settled P122 title-gap (`±0.5px`), preserve its header-line relation, delete title-row reservation and lock that coordinate. The complete routed Picker at 1440px, 390px, 320px, and actual 400% in-app Browser zoom proves that locked displacement, unchanged outer rect, and no Blob/readout collision. W29 grows the central alpha component from `b₀` to `0.66 ±0.015` under the shared protocol with 0px further geometry growth, then re-proves local centroid and hull containment. The dedicated Blob workbench fills its independently container-scaled `preview-dominant` stage. Desktop and mobile consume the same law.

## 4. Type jurisdictions

| Semantic role | Exact glass-ui role | Family |
|---|---|---|
| route H1 or major argument | `text-display` | Fraunces |
| instrument identity | `--type-title` | Fraunces |
| palette identity | `--type-subheading` | Fraunces |
| section heading | `text-heading` | Plus Jakarta Sans |
| prose/help | `text-prose` | Plus Jakarta Sans |
| control or label, including dropdown options | `text-small` | Plus Jakarta Sans, non-bold |
| value, code, or provenance | `text-mono-small`, or the already-established `mono-caption` where the content is a caption | Fira Code |

This matrix is closed across all eighteen compositions. P019's family-neutral Picker identity/headline pair is the sole paired-scale exception: value applies Fraunces to its identity arm and Fira Code to its headline arm at exact `1/√φ`, without introducing a second role mapping. The old unconditional display-2 claim is retired because it cannot preserve the exact fluid ratio. Live numbers use tabular figures and reserve their widest legal representation so value changes never reflow the settled chassis. Alpha appears only when semantically relevant; editing occurs only in W21's semantic numeric fields. About prose has `max-inline-size: 66ch`; only the named `Conversion paths` ordered graph and fenced code specimens may escape that prose measure. The 1440px, 390px, 320px, and actual 400%-zoom in-app Browser arms record the computed role, family, size, line height, weight, and About measure rather than inferring typography from class names.

## 4.1 Perceptual and semantic laws

- Text, focus, boundaries and state meet their rendered contrast on the actual material tier; a token name is not evidence.
- Selected, failed, pending, withdrawn and disabled states are never color-only. Role, accessible name, state/value and associated error/status are explicit.
- Focus remains visibly distinct from selection in both schemes, forced colors and reduced transparency.
- Each route has one H1 and exactly one stable main landmark, owned by the shell. `InstrumentChassis` and its stage/dial region remain landmark-neutral. Route changes announce the new identity, move focus only by the declared navigation policy, and restore focus when overlays close.

## 4.2 Component register laws

- A selected `SegmentedTabs` item has one producer-owned filled indicator whose four edges match the active inner button within 0.5px across orientation/viewport/direction; it cannot label-pill, halo or double-fill, and focus stays separate. V retires the global Dock `PaneSegmentedControl` and left/right view state. P092 survives only at owner-state, Admin Names state and Mix Colors/Palettes source-mode tabs; W17 deletes descendant corrections and W23/W24/W26/W30 prove them.
- `ColorSpaceSelector` retains its listbox option semantics: each item is `role="option"`, selection is `aria-selected`, and the sole glass-ui `SelectItem` indicator uses its producer-owned gutter. It deletes `hide-indicator` and may not add a local pill, halo, pseudo-element, marker, or Card/face selected variant. Exactly one visible marker agrees with the selected option and `aria-selected`; the named option seat and marker show a nonzero selected-state delta in monochrome and forced colors, focus has its own independent nonzero delta, and the WatercolorDot face delta remains `0`. The Browse/Library pressed-button rule does not apply here.
- V **abrogates a selection outline and interactive host on `WatercolorDot`**. P051 removes the public `tag="button"`/interactive-host branch in the clean major; the organic face supplies color/specimen identity only. Selection, activation, drag and keyboard focus belong to a named enclosing geometric button/seat and remain distinguishable there; no ring/shadow/pseudo-element crosses the seeded edge. W17 owns the live exhaustive manifest—currently 25 explicit `tag="div|button"` calls—and W19–W22/W25–W27 execute Dock seal/edit, ColorSpaceSelector, eyedropper, Spectrum, channel, palette, Generate, Mix and Gradient sites. Ornamental faces are aria-hidden; data-bearing static faces remain present as noninteractive named list/text content with zero activation/focus/drag semantics; HTML `[inert]` is not implied.
- `InstrumentChassis` region presence and divider presence are independent. P122 accepts a unique typed boundary set drawn from `{stage-inspector, inspector-action}` so either, neither, or both boundaries are expressible; it may not auto-emit a line merely because a region exists. Consumer CSS may not hide a producer divider. The binding value.js inventory in `OPTICAL-BENCH-COMPOSITIONS.md §5` selects `[]` and `reserve="none"` for all eight P122 workbenches; Picker's genuinely wrapped tuple grows through feature-local flow below the readout and is not a persistent P122 reserve. Only the five Admin lists retain a non-P122 adjacent-row separator; every other composition retains no divider.

## 5. Interaction grammar

The global grammar is **select → tune → commit**.

- Selection changes the active specimen without committing it.
- Tuning is continuous and interruptible; every spatial action has a keyboard/numeric equivalent.
- Commit uses one glass-ui action set. Secondary verbs disclose within that same instrument.
- Persistent operation state stays with the entity/workspace. A transient flourish may celebrate success but never carries the only truth.
- A palette card is a bounded entity article, not a clickable `role=article`, `listbox`/`option` composite, or seven-mode omnibus. One native named `<button type="button">` spans its specimen/identity region and expresses inspector selection only through `aria-pressed`; it has no `aria-selected`. Its pressed value is true iff its palette ID equals the selected inspector identity, so at most one rendered seat is true; clearing selection makes every seat false and removes the inspector. Pointer click, Enter and Space on the same seat produce the same selected palette/inspector identity, and the AT transcript announces its accessible name and pressed state. An optional reorder handle is a separate named sibling control. The card body owns no expand, inline rename, action menu, transient result or hover-only swatch-action path. Full detail, rename/lifecycle/export actions and durable operation state live in the selected inspector; the card's compact swatch strip remains noninteractive data with zero activation/focus/drag semantics; HTML `[inert]` is not implied.

The domain-neutral axis composition sits over BI `Slider`: label, unit, reserved live value, optional numeric entry, focus/target behavior, and a color-bearing or neutral track chosen by semantics. Picker, Generate count, Extract, Gradient, Atmosphere and Blob adopt that one composition; feature waves own their domain arrangement, not new slider mechanics.

## 5.1 Navigation focus, scroll, and announcement

| Origin | Focus target after settlement | Scroll rule | Announcement rule |
|---|---|---|---|
| direct URL or reload | browser document start; do not steal initial focus | top, unless a valid same-route anchor is explicitly requested | destination `<title>` and the single visible H1 exist before app-ready; no duplicate live-region echo |
| Dock/global in-app route choice | destination H1 with temporary `tabindex="-1"` | top after the incoming main is committed | title update plus focused H1 exactly once |
| browser Back/Forward | last connected focused element stored in that history entry; otherwise destination H1 | restore that entry's document scroll after layout, without animation | title plus the restored control's name, or focused H1 on fallback; never both H1 and a duplicate status |
| auth, not-found, or policy redirect | destination H1 | top | redirect reason in one polite status, then destination title/H1; no focus on removed content |
| in-route filter, tab, selection, or pagination | initiating control, or the newly selected entity only when the command explicitly moves selection | preserve document scroll; reveal a keyboard-selected item only as needed | changed result count/state through the owning status region; no route announcement |
| Dialog/Drawer/Popover open and close | producer initial-focus rule on open; exact connected opener on close, otherwise the nearest surviving owning action | preserve underlying document scroll | overlay title/description/state on open; no route announcement on close |
| successful command that deliberately navigates to a new resource | new resource H1 | top | focused resource identity followed by one durable operation result; transient celebration is silent |

The shell `<main>` and route H1 are stable nodes; route scenes are landmark-neutral children and never contribute another main or H1. Once the incoming scene is ready, one atomic DOM commit changes shell H1/title, marks the outgoing scene inert/AT-hidden and makes the incoming scene the sole active accessibility subtree; no observer or microtask sees zero or two active subtrees. Only then may the visual outgoing clone and incoming child crossfade. Focus moves to the stable destination H1 after that commit. Reversal cancels the abandoned target without focusing a detached node. First/middle/terminal/reversal frames each expose exactly one main, one H1 and one active route subtree.

## 5.2 Direction, axes, and reordering

| Mechanism | LTR keys | RTL keys | Home/End and result |
|---|---|---|---|
| numeric `Slider` axis: channel, count, quantity, morphology, time | Right/Up increase; Left/Down decrease | identical; numeric/scientific sign never mirrors | Home=min, End=max; announce label, value, unit |
| Spectrum coordinates | expose two named numeric axes using the same Slider law; pointer canvas is not the sole keyboard control | identical domain signs | Home/End apply to the focused axis; both controls and canvas update one coordinate model |
| image sampler coordinates | Right/Left increase/decrease source-image `x`; Down/Up increase/decrease source-image `y` | identical physical image axes | named x/y controls own Home=min and End=max; reticle, loupe and numeric value remain one model |
| Gradient stop position | Right increases serialized stop percentage; Left decreases; Up/Down use the same signed step when supported | identical; explicit gradient coordinates do not mirror with prose | Home=0%, End=100%; announce stop identity, percentage, ordinal |
| Easing control point | Right/Left increase/decrease time `x`; Up/Down increase/decrease progress `y` | identical scientific axes | named x/y numeric controls own their own Home/End; canvas handle and fields share one model |
| horizontal Dock/rail roving focus | Right moves to the visual-right item; Left to visual-left | Right moves to the visual-right item (previous semantic ordinal); Left to visual-left | Home=first semantic item, End=last; activation is separate from movement |
| vertical channel/list roving focus | Down=next, Up=previous; Left/Right do not mutate selection | identical | Home=first, End=last; focus may follow selection only for the declared single-select rail |
| horizontal explicit reorder: palette colors, operands, stops | after Space grabs, Right moves one visual position right; Left one visual position left | visual direction remains literal, so ordinal change reverses | Home=first ordinal, End=last; every move announces item and `position of total`; Space drops, Escape cancels |
| vertical list/review reorder | after Space grabs, Down=next ordinal, Up=previous | identical | Home=first, End=last; same grabbed/drop/cancel and announcement contract |
| CSS direction keywords, physical axes, code, hex, slug, ID | preserve the declared physical/domain meaning | identical domain meaning inside an LTR-isolated value | native text editing owns Home/End; no custom bidi reinterpretation |

Arrow keys never both navigate focus and mutate a value in the same state. Reorder starts only after the explicit grab command; otherwise roving focus follows the applicable rail/list row. Pointer drag, arrow movement, and numeric entry must resolve to the same model value or ordinal.

## 6. Motion

- Spatial continuity uses one producer-owned glass-ui spring register.
- Color/opacity effects use the corresponding short effect curve; exit is shorter than entry.
- A scene swap preserves the specimen and changes the surrounding instrument. No full-slab remount hole, rAF-delayed blank, or dock collapse.
- The CSS ground is the honest first frame. Aurora/Blob enhance it after paint without geometry change.
- No path desaturates through gray. No consumer counter-filter fights a producer reveal.
- Reduced motion resolves directly to the final geometry and stable chromatic state.
- Continuous Aurora/Blob ambient motion terminates within five seconds or exposes one persistent keyboard-operable still/pause control whose state is announced and remembered. Paused, parked and offscreen mean no animation work.

## 6.1 Direction jurisdictions

| Domain | Direction rule |
|---|---|
| chrome, navigation and layout | logical inline/block direction follows the document |
| CSS directional keywords and scientific coordinate axes | preserve their declared physical/domain meaning; arrow behavior is specified per axis |
| palette/release order | preserve explicit ordinal identity; UI movement announces the resulting ordinal |
| CSS strings, hex, slugs, IDs and provenance | render in LTR-isolated spans inside RTL prose |

## 6.2 Frame-zero seed latch

Prepaint accepts one deliberately narrow absolute interchange value, never arbitrary CSS. `SeedToken` has canonical text `v1:<L>:<C>:<H>` and first matches `^v1:(0|[1-9][0-9]{0,5}):(0|[1-9][0-9]{0,5}):(0|[1-9][0-9]{0,5})$`; the three ASCII base-10 integers are then range-checked: `L ∈ 0…100000` is OKLCH lightness in 0.001%, `C ∈ 0…500000` is chroma in 0.000001, and `H ∈ 0…359999` is hue in 0.001°. Achromatic `C=0` requires `H=0`. Token creation is application/link-writer work: the final `/color` kernel converts the full parsed input to an opaque, displayable OKLCH ground projection, normalizes hue, applies its one named gamut map, and quantizes once. Alpha and missing components remain in the full color model but never become context-dependent prepaint inputs.

The tiny prepaint script validates only that token grammar and range, then emits exactly `oklch(<L fixed to 3 decimals>% <C fixed to 6 decimals> <H fixed to 3 decimals>)`; it does not call `CSS.supports`, parse a CSS color, consult computed `color`, or accept a variable. Consequently `var(...)`, `env(...)`, `currentColor`, system colors, relative colors, CSS-wide keywords, URLs, calc expressions, and self-reference are structurally impossible seeds. The scheme defaults are themselves canonical tokens in `--ground-seed-token-light` and `--ground-seed-token-dark`; no computed arbitrary-color default enters selection.

The frozen prepaint union is `GroundSeedBoot = { state: "ready", schema: "value-ground/3", source: "url" | "storage" | "default", seedToken, seedCss, scheme, diagnostics[] } | { state: "invalid-default", schema: "value-ground/3", scheme, diagnostics: ["default-seed-invalid", ...] }`. The document declares `data-ground-schema="value-ground/3"`, `data-ground-store="value-color-session/v2"`, and `data-color-mode-store="value-color-mode/v1"`; the persisted color-session value is exactly `{ schema: "value-color-session/v2", inputColor, seedToken, displaySpace? }`, while color mode is `light | dark | auto`. One synchronous same-origin external classic script runs in `<head>` after the critical ground CSS and before the app module; it uses no inline code, `eval`, import, arbitrary CSS parser, or build-time token injection and therefore works under `script-src 'self'`.

Scheme resolution happens first. A valid persisted `light` or `dark` wins; `auto` or absence resolves the initial `prefers-color-scheme`, while an invalid mode records `mode-invalid` and resolves through that same media query without rewriting storage. Before reading a default token or allowing paint, the script executes `document.documentElement.classList.toggle("dark", scheme === "dark")` and sets `document.documentElement.style.colorScheme` to the exact resolved `light` or `dark`. The seed default is read only after those mutations. Hydration consumes this frozen scheme and does not re-toggle it on app-ready; a later explicit user mode change updates the same class/style owner. Thus persisted light on a dark OS and persisted dark on a light OS both paint the persisted scheme from frame zero.

Selection is binding: a strictly valid `seed` hash-query token wins; otherwise a same-schema persisted strict `seedToken` wins; otherwise the strict resolved-scheme default token wins. A share link carrying full `color` always carries its canonical `seed`; a color-only legacy link is invalid rather than a fourth path. Invalid URL token or storage JSON/schema/token records `url-seed-invalid`, `storage-json`, `storage-schema`, or `storage-seed-invalid` without deleting or rewriting user input and may continue to the next named source. When a ready source exists, its canonical CSS is written once to `--ground-seed`, `data-ground-state="ready"` is set, and `window.__VALUE_GROUND_BOOT__` freezes the ready arm with token, CSS, source, resolved scheme and diagnostics.

An invalid default is different: if no valid URL/storage token exists and the selected scheme's configured default token fails grammar/range, the script sets `data-ground-state="invalid-default"`, freezes only the failure arm of `window.__VALUE_GROUND_BOOT__`, leaves `--ground-seed` unset, and stops seed/atom initialization. A static semantic boot-error region already present in HTML becomes visible through that data state and names a configuration fault; its scheme-correct critical styling does not consume seed atoms. The app may hydrate that terminal error but may not synthesize a seed, enter the normal workbench, or fall through to black, gray, `currentColor`, the other scheme's default, or a browser-dependent value. Ready-case seed/atom equality obligations therefore do not apply to this deliberate terminal failure arm.

On the ready arm, hydration parses a selected full `inputColor` only through the final `/css` boundary and recomputes its `SeedToken` through the same `/color` projection. If it equals the frozen token, the full model is retained. If it is invalid or differs, hydration records `url-color-invalid`/`storage-color-invalid` or `url-seed-mismatch`/`storage-seed-mismatch` and initializes the editable color from the token's opaque OKLCH value; it never corrects the ground to the conflicting full input. `displaySpace` is honored only after this agreement. Negative cold-load traces cover every contextual/CSS-wide spelling above, malformed and out-of-range tokens, corrupt storage, valid-color/token mismatch, both persisted-scheme/OS oppositions, and terminal invalid default. Every ready negative case retains a nonempty seed/atom set; the invalid-default case proves the separate failure arm and absent seed atoms.

On the ready arm, the permanent critical CSS custom-property graph is the sole initial seed→seven-atom/ground derivation. The hydrated model consumes the frozen boot object and reads those computed tokens; it does not repeat scheme/URL/storage precedence, reconstruct an initial palette in TypeScript, or repaint a second “equivalent” ground. Later user edits use `/color` to mint the next canonical token and update that same seed/atom graph; Aurora/Blob adapters read those variables. `groundRecordInject`, `__GROUND_*__`, the stop cache, and the initial `deriveAurora` twin all die in the same cut.

## 7. Workbench directions

### Shell, dock, and header

The dock is its own top band, fully visible, focusable, and clipped by neither mask nor card. Direct route changes keep its full navigation identity. The whole header contracts; at-rest shading remains. Its exact `Palettes` destination is one of the two pastel-rainbow identity coordinates; every other Dock label is neutral in both schemes.

### Picker

The optical stage dominates. Title, read-only contiguous numeric readout, color-space selector, spectral meniscus and compact channel veil form one vertical argument. P019's family-neutral paired sizes keep the value-applied Fraunces label exactly `1/√φ` below the Fira headline, and P122's `--instrument-title-gap` owns their line-box gap; the rendered ink gap also satisfies §3.2's exact `I_after` inequality, and no Blob-derived minimum block size enters it. The headline→next-instrument interval is not dead acreage: in the settled routed Picker it is occupied by a visibly composited noninteractive Blob/rail or collapses to the named shared section rhythm, with screen-space paint/bounds/occlusion evidence. Buffer-only alpha or an empty canvas rectangle cannot satisfy this law. The selected menu option exposes one semantic checked marker/state that survives monochrome/forced colors while focus remains distinct. The channel rail reads as one instrument. Its bottom annotation is the persistent per-channel meter bound to the same named selected-color state as the headline, never static range furniture and never a routine live region: ordinary text uses `aria-live="off"`, while the operable slider exposes the identical channel name/value/unit through `aria-valuetext`. W20 records both the static-range→meter copy replacement and a selected-color before→after content transcript. Blob is a noninteractive center-ward specimen; Copy lives once in the action region. W29 grows W0's measured `b₀` central-alpha ratio to `0.66 ±0.015` inside W20's locked footprint/chassis; nominal source geometry `0.52` is not misreported as the rendered baseline.

### Palette library and Browse

Device Drafts, unpublished Server Workspaces, Published lineages, and Trash are explicit, non-interchangeable owner states. Saved palettes are matte specimen slips inside a glass workspace, not cartoon casters stacked within casters. Every entity Card uses the exact §3.1 quiet opaque `sm` tuple with no shadow, grain, specular, grid, cartoon, or Card-level selection variant; its noninteractive container root and WatercolorDot face have zero selected-state pixel delta, while its native named pressed-button seat alone owns visible selection/focus and the selected-inspector identity. The root owns no activation, focus or selection state, but palette-Card `[inert]` count remains `0` so the seat is reachable. No seat uses `aria-selected`, and no listbox/option fiction surrounds the field. Search/filter chrome is one family. A true empty invitation content-hugs its text/action and may carry one static, aria-hidden `EmptyPaletteMark`: exactly three WatercolorDots plus the established dashes. A secondary empty shelf collapses to a tray or absence. Request-bound skeletons exist only while real work is in flight.

The Library heading reads `My Palettes`: only its `Palettes` substring consumes the same pastel-rainbow identity composition as the Dock coordinate, while `My` remains neutral. This holds in both schemes and does not spread to Browse, palette names, filters, owner-state tabs, empty/error copy, or specimen metadata.

The closed attribution union is visual truth. `attribution:"system"` renders one quiet “Legacy system” annotation—not a fake owner, creator, avatar or actor—and a system-attributed read-only lineage exposes no edit affordance. Principal attribution renders only the supplied principal identity; absence is never filled by inference.

### Generate

Three chassis regions form one argument: generated-specimen stage, generative-model inspector, commit instrument. Narrow order is that same specimen→model-inspector→commit-action sequence. Preset and harmony expose truthful previews; WatercolorDots, name, seed provenance and count form the specimen; Regenerate, Save/Publish and Copy live in one Dock control set. Regeneration names which model inputs stay fixed and how the seed changes. The generated palette is a draft specimen, not a flat strip plus unrelated buttons.

### Extract

The image is the stage. The palette develops from it into a compact specimen plate; the undeveloped state remains contextual, not a giant shadow placeholder. Eyedropper and sampler have keyboard/numeric alternatives.

### Mix

An ordered N-operand rack (2–12 colors, or two or more potentially unequal palettes) converges through one trough into one result. Source mode, add/remove/reorder, method, unequal-palette strategy, provenance and commit share the same control grammar. The rack remains legible at 2, 3 and 12 colors. No shadow palette filler appears when an operand is absent.

### Gradient

The rounded meniscus rail and its preview dominate. Each WatercolorDot stop is a face inside an enclosing geometric button/seat; that seat alone carries selection, focus, drag and accessible state. Stops have explicit add/move/remove/numeric alternatives. Hatch/netting supports axis reading without dominating it.

### Easing

The curve is a centered, container-clamped 19–22rem stage. It directly uses the keyframes/glass-ui easing vocabulary. Catalogue and specimen strips support the curve rather than reducing it to a tiny nested widget.

### Atmosphere and Blob

These are two compositions, not one settings page. Aurora/boot owns the permanent chromatic CSS ground and a seven-atom causal map; every select/axis has an observable effect on its live preview. The dedicated Blob workbench owns a persistent container-scaled material preview filling P122's exact `preview-dominant` 66.6666667% stage, compact essential morphology controls, advanced grouped disclosure, reset/compare and a scroll-confined inspector; it does not reuse the Picker inline-seat diameter. Satellites detach as calm meatballs, not spikes. Both begin chromatic and expose settled/armed seams from the producer.

### About and Admin

About follows the type and material constitution without becoming a competing art board. Its prose is bounded to `66ch`; only the named `Conversion paths` ordered graph and fenced code specimens may exceed that measure. Its static definition is a lead paragraph, not an Alert; section headings and interval own grouping without the current seven repeated dividers; conversion paths are named ordered text/graph data, not cursor-bearing Tooltip triggers with empty content or hover-only pseudo-action. Admin is a five-route review suite—Users, Names, Audit, Flagged and Tags—using one review-row anatomy, query/pagination/state grammar, dangerous confirmation and responsive disclosure. Each Admin route uses the full main width: the current Palettes companion, right label and resulting mobile pane selector are removed rather than restyled. Actor, scope, provenance and effect remain visible. Elevated authority is communicated by labeling and scope, not by a fourth visual system.

### Account and storage recovery

Account is one modal side Dialog opened from the Dock, not a route chassis or second main. It owns registration/recovery when signed out and identity, recovery-credential rotation and logout when active; secret retention temporarily replaces its action region and never becomes a nested Card/Dialog. W23 owns the rendered composition and journey while W15 supplies auth/outbox state.

Unsupported/corrupt palette storage replaces the Library body inside its existing main with one content-hug recovery article: diagnosis, preservation/export, then separately confirmed reset. W15 owns detection/export/reset semantics and W22 owns the visible composition. It is never rendered as an empty library, silent reset, migration choice, overlay, or companion pane.

## 8. π and DELTA

Every visual wave identifies its minimum real-rendered frames and the explanatory DELTA. The common matrix is in `EVIDENCE.md`. A visual claim without a tracked frame pair and a named geometry/color/timing/interaction delta is incomplete; a screenshot without an explanation is equally incomplete.
