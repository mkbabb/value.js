# Cross-repository mobile, Safari, component, and page audit law

Date: 2026-08-01  
Mode: tranche development only  
Authority: none  
Execution credit: 0  
Product credit: 0

## 1. Owner mark

The current deployed mobile experience of `fourier-analysis` and
`keyframes.js` is unacceptable. The owner specifically reports
`keyframes.babb.dev` as broken. This is a binding defect report, not a design
preference and not a claim that the other repositories are already sound.

Every repository in the constellation tranche-set must receive a complete
component and page audit on:

1. a real Apple iOS Simulator running Mobile Safari, or a real iOS/iPadOS
   device when Simulator cannot reproduce the feature;
2. the installed desktop Safari application on macOS, not only Playwright
   WebKit, Chromium device emulation, a resized desktop window, or a screenshot
   renderer;
3. the deployed origin and an isolated, reproducible local/API environment;
4. every public, authenticated, admin, debug, diagnostic, error, empty, and
   otherwise hidden-but-shipping surface;
5. every component instance in its meaningful lifecycle, interaction, data,
   network, accessibility, theme, and timing states.

This document plans that later evidence. It authorizes no product mutation,
browser execution, release, deployment, or admission in the present tranche.

## 2. Scope and expansion law

The initial closed constellation scope is:

| Repository | Human-facing domain to inventory | Current honest boundary |
|---|---|---|
| `value.js` | demo application, every user route, all admin routes, debug/development views, reusable visual components, API-backed states | 14 routes and 88 workflows are specified; prior Pixel-7 evidence is Chromium; real iOS Safari coverage is 0 |
| `keyframes.js` | deployed site, demo routes, editors, panes, popovers, menus, admin/debug surfaces, all mounted and library component cells | v8 specifies 138 workflows/414 cells; 357 are formation-supported and 57 remain RED; Browser/product credit is 0 |
| `fourier-analysis` | deployed and local frontend, API-driven pages, owner/admin/debug views, visualization and paper views | bounded diagnostics found 45 operations, 36 client edges, Browser 0/33 and 0/396; product credit is 0 |
| `glass-ui` | every exported visual primitive, compound component, style/theme surface, demo/docs/fixture page, and consumer-mounted state | existing inspection counts 72 export keys, 67 runtime exports, 4 CSS exports, 1 font wildcard, and 156 root exports; Browser/package closure is 0 |
| `atlas` | every shipping page, visualization, package/demo surface, and Keyframes/Fourier integration state | exact surface census and all real-Safari evidence remain OPEN |
| `bbnf-buddy` and other tranche-linked UI repositories | every page, editor, inspector, debug surface, and exported visual component discovered by the closed census | exact surface census and all real-Safari evidence remain OPEN |
| `parse-that` and library-only siblings | any docs/demo/inspector/playground surface; otherwise a sealed no-human-facing-surface receipt | parser work is PAUSED; no browser work is authorized by this law |

Before execution, the owner must enumerate every repository referenced by the
current tranche DAG. A repository may leave the visual denominator only with a
sealed receipt proving that it ships no route, HTML entrypoint, app shell,
Storybook/docs site, playground, visual component, WebView, or consumer-mounted
UI. “Library” is not, by itself, an N/A reason.

Any newly discovered human-facing repository or package is added before the
first audit run. The denominator is immutable after the first executed receipt;
later discoveries make that candidate AMEND and require a fresh denominator.

## 3. The Kronecker audit domain

Let the required audit set be the constrained Kronecker product:

`K = R ⊗ O ⊗ P ⊗ C ⊗ D ⊗ V ⊗ L ⊗ I ⊗ X ⊗ N ⊗ A ⊗ T`

where:

| Axis | Meaning | Required examples |
|---|---|---|
| `R` | repository/package | every repository admitted by section 2 |
| `O` | origin/environment | deployed production, isolated local frontend, isolated real API, documented offline fixture |
| `P` | page/route | public, member, owner, admin, debug, diagnostic, not-found, forbidden, error, deep link |
| `C` | component instance | every mounted instance plus every exported visual component not mounted by the primary app |
| `D` | device/browser | real iPhone Simulator, real iPad Simulator where tablet behavior exists, physical device where required, desktop Safari |
| `V` | viewport and geometry | portrait, landscape, split view where supported, safe-area/notch, compact height, desktop narrow/standard/wide, zoom |
| `L` | locale/display mode | light, dark, increased contrast, reduced transparency where relevant, LTR, RTL when supported, long-copy locale, Dynamic Type |
| `I` | interaction/lifecycle | inactive, idle, hover where available, focus, focus-visible, pressed, active, selected, open, expanded, dragging, resizing, scrolling, loading, success, error, disabled, read-only, destructive confirmation |
| `X` | data/auth state | anonymous, member, owner, admin, empty, single, representative, maximum, invalid, stale, deleted, permission-limited |
| `N` | network/API state | healthy, slow, offline, reconnect, timeout, CORS/preflight, 401, 403, 404, 409, 422, 429, 500, malformed payload |
| `A` | access/input mode | touch, hardware keyboard, pointer, VoiceOver, keyboard-only desktop, reduced motion, forced/increased contrast, 200% zoom |
| `T` | time/animation state | before action, 0 ms, 120 ms, 420 ms, settled, sustained animation, interruption/reversal, background/resume |

The raw Cartesian product may be reduced only by a machine-readable equivalence
proof. Every omitted cell must point to one executed witness and state exactly
which axes are proven behaviorally identical. “Same component,” “responsive,”
“covered elsewhere,” or “looks fine” are not equivalence proofs.

Each page owns a page-level matrix. Each mounted component owns an instance
matrix. Each unmounted exported visual component owns a harness matrix. A page
screenshot does not close its component states; a component story does not
close its integration in a page.

## 4. Exact inventory required before the first run

Each repository must produce a closed, codepoint-ordered inventory with:

- every route, alias, redirect, nested route, title, H1, access role, deep-link
  form, and error boundary;
- every page shell, layout, modal, drawer, popover, menu, tooltip, tab, form,
  editor, canvas, WebGL surface, visualization, table, list, pagination control,
  toast, banner, empty state, and loading state;
- every exported visual component, source file/hash, public props/events/slots,
  variants, default values, and known consumers;
- every live mount path from route to component instance, including conditional
  predicates and duplicate mounts;
- every admin/debug/development surface, even when hidden from primary
  navigation;
- every API request made by a page or component and the visible state for each
  relevant response class;
- every gesture, pointer action, keyboard shortcut, focus transition, scroll
  owner, drag target, resize owner, and animation owner;
- every deployed origin, service worker, manifest, CSP, CORS rule, storage key,
  feature flag, and auth/bootstrap precondition affecting rendering.

The inventory is authenticated against source and deployment bytes before any
coverage percentage is reported. Counts copied from an earlier tranche are
archaeology until rejoined to the current source and deployed origin.

## 5. Real Apple environment law

### 5.1 iOS and iPadOS

The minimum accepted mobile evidence is an Apple Simulator device booted by
`xcrun simctl`, with exact Xcode, Simulator runtime, device type, OS build,
locale, appearance, accessibility settings, orientation, scale, and UDID
recorded. The audit must drive Mobile Safari itself through XCUITest or another
recorded Apple UI-automation path. Playwright’s `devices["iPhone …"]`, WebKit
on macOS, Chrome responsive mode, and screenshots resized to an iPhone viewport
do not satisfy this gate.

At minimum, each responsive breakpoint family is exercised on:

- a compact iPhone with notch/safe-area behavior;
- a current large iPhone;
- an iPad in portrait and landscape when the app or component declares tablet
  support;
- a physical iPhone/iPad when camera, share sheet, installed-PWA, GPU, memory,
  touch latency, viewport keyboard, or device-only WebKit behavior cannot be
  established in Simulator.

The software keyboard must be shown for every editable surface. Rotation,
background/resume, back/forward navigation, deep links, safe-area insets,
Dynamic Type, VoiceOver, and reduced motion are explicit cells, not prose.

### 5.2 Desktop Safari

Desktop evidence must come from the installed `Safari.app` on a recorded macOS
build and hardware/GPU/display-scale tuple. Safari Technology Preview may add
coverage but cannot replace stable Safari. Playwright WebKit is a diagnostic
secondary engine only.

Each desktop page/component family must cover narrow, standard, and wide
windows; 100% and 200% zoom; light/dark; reduced motion; keyboard-only focus;
pointer hover; trackpad scroll/zoom where supported; back/forward cache;
download/share/clipboard behavior where used; and Web Inspector console,
network, memory, layout, and timeline evidence.

## 6. UI, UX, design, and copy rubric

Every surface receives two design passes before implementation credit:

1. a subject-specific brief naming the audience, the surface’s single job,
   palette, display/body/utility typography, layout logic, copy vocabulary,
   responsive/container ownership, and one memorable signature element;
2. an independent critique that identifies generic defaults, decoration that
   can be removed, unclear hierarchy, templated copy, motion without meaning,
   and choices not grounded in the product’s subject.

The audit must judge, at every required matrix cell:

- clipping, overlap, occlusion, safe-area violations, accidental horizontal
  scrolling, scroll traps, sticky/fixed collisions, viewport-unit failures,
  keyboard occlusion, and container-query failures;
- readable measure, type scale, line height, contrast, visual hierarchy,
  information density, alignment, spacing rhythm, and touch targets;
- clear affordance, visible state, predictable navigation, discoverability,
  reversible action, destructive confirmation, feedback, error recovery,
  empty-state direction, and preservation of user work;
- exact end-user language: active voice, stable action names, specific errors,
  helpful empty states, no implementation jargon, and no vague apology copy;
- keyboard and VoiceOver order, names/roles/values, focus restoration, focus
  visibility, landmark/headline structure, live-region behavior, and zoom;
- one semantic owner for each motion sequence, interruption/reversal behavior,
  reduced-motion equivalent, and absence of scattered ornamental animation;
- a repository-specific visual identity. Generic cards, gradients, glass,
  numbered markers, rounded containers, or decoration fail when they do not
  encode something true about the subject.

The owner’s qualitative assessment—Golden Glass, Breath of Life, and Movement
of Momentum where already required—remains an explicit appraisal, but it never
replaces the exact matrix evidence.

## 7. Function and state requirements

Each interactive component must be verified in:

- initial/inactive, idle, hover, focus, pressed, active, selected, disabled,
  read-only, loading, success, error, and recovery states as applicable;
- pointer, touch, keyboard, and assistive-technology activation;
- minimum, representative, maximum, overflowing, malformed, stale, and deleted
  data;
- authenticated roles and loss/refresh of authentication;
- slow/offline/reconnect and each API error class that changes visible behavior;
- repeated action, double activation, cancellation, undo, back/forward,
  interruption, route change, background/resume, and reload;
- persistent state, storage denial, cleared storage, version drift, and
  multi-tab behavior where the product exposes it.

Admin and debug surfaces are held to the same design and usability floor as
public pages. “Internal” does not waive mobile, accessibility, error, or copy
quality.

## 8. Performance and stability evidence

Every executed cell records, when applicable:

- navigation and resource waterfall, response/cache/service-worker provenance,
  console messages, failed requests, CORS/preflight, and API latency;
- first contentful paint, largest contentful paint, interaction latency, layout
  shifts, long tasks, main-thread saturation, memory growth, and page weight;
- animation frame cadence, dropped frames, sustained CPU/GPU load, WebGL
  context loss/recovery, background/resume behavior, and reduced-motion cost;
- touch-to-visual and keyboard-to-visual latency for primary interactions;
- cold/warm navigation, repeated route changes, 30-second sustained activity,
  and representative maximum-data behavior.

Thresholds are declared per surface before the run. A slower result may remain
honest RED; thresholds may not be rewritten after observation to turn it green.

## 9. Temporary environment and repair law

Temporary fixes needed to obtain real Safari, Simulator, API, Docker, CORS,
TLS, auth, fixture, or deployment access are allowed only in a uniquely named
disposable copy/stack. Each such accommodation must record:

- exact original failure and why it prevents observation;
- exact patch/configuration, bytes/hash, ports, Compose project, containers,
  networks, volumes, certificates, hosts entries, simulator state, and data;
- why the accommodation does not change the product behavior under audit;
- before/after repository, process, port, Docker, keychain, browser, and
  simulator identities;
- teardown commands and proof that the disposable state is absent afterward;
- the product change that would be required if the accommodation reveals a real
  source/deployment defect.

A temporary accommodation earns no product or audit-green credit. Attaching to
an existing user stack, database, browser session, keychain, Docker network, or
volume is forbidden. Existing user processes and state remain untouched.

## 10. Evidence packet per cell

Each cell receipt contains:

- immutable cell ID and all axis values;
- source/deployment/component/page pins;
- device, OS, browser, hardware/GPU, display, locale, accessibility, and network
  identity;
- exact executable/automation command and environment;
- start/end, exit/signal, raw stdout/stderr, console, network, screenshot/video,
  accessibility tree, performance trace, and hashes;
- action sequence, expected visible/functional result, observed result, and
  independently derived failure code;
- before/after storage, route, focus, scroll, API, filesystem, process, Docker,
  and simulator residue identities;
- UI, UX, accessibility, performance, copy, responsive, and functional verdicts
  as separate fields;
- zero-credit and preservation fields.

Raw receipts are written before aggregation. Aggregates are one-to-one with
raw cell IDs and hashes. Screenshot-only, generated-label, summary-only, or
manually claimed PASS rows are inadmissible.

## 11. Convergence gates

Audit coverage and product quality are separate denominators.

1. **Inventory convergence:** 100% of routes, pages, components, exports,
   mounts, API-visible states, admin/debug surfaces, and repos are enumerated.
2. **Matrix convergence:** 100% of required cells are executed or mapped to an
   exact executed equivalence witness.
3. **Evidence convergence:** 100% of cells carry replayable raw evidence and
   preservation receipts.
4. **Quality convergence:** zero unresolved critical/high UI, UX,
   accessibility, functional, responsive, performance, deployment, or data-loss
   defects; lower severities require explicit owner disposition.
5. **Design convergence:** every page/component family has its subject brief,
   independent generic-default critique, exact copy/state review, and responsive
   ownership.
6. **Platform convergence:** real iOS Mobile Safari and installed desktop Safari
   are both complete. WebKit emulation cannot bank either denominator.
7. **Review convergence:** a sealed candidate passes independent Clean A, owner
   intake, and a genuinely later independent Clean B.

One hundred percent audit coverage with RED product cells is an honest complete
audit, not product convergence. Product convergence is reached only after the
defects are fixed in a later authorized implementation tranche and the affected
matrix cells plus all impacted equivalence witnesses are re-run.

## 12. Current re-exhortation and baseline

| Repository/lane | Existing useful archaeology | What it does **not** close | New real-iOS / true-Safari baseline |
|---|---|---|---:|
| Value | 14 known routes; prior Playwright user/admin/mobile work; 42 disposable route/viewport diagnostics | Pixel-7 is Chromium; no complete component-state matrix; no real iOS Safari; no complete desktop Safari | 0% |
| Keyframes | 138 workflow/414 formation-cell model; 184-file snapshot; v8 source/route/mount work | no Browser/product credit; 57 RED; deployed mobile reported broken | 0% |
| Fourier | isolated API/frontend diagnostic; 45 operations and 36 client edges | Browser 0/33 and 0/396; deployed mobile quality unacceptable; no full component matrix | 0% |
| Glass | export/consumer archaeology and package closure model | no complete visual-state, real-iOS, true-Safari, or package-green audit | 0% |
| Atlas and other UI repos | earlier tranche references and integration asks | no closed current surface census or platform matrix | 0% |
| parse-that/library-only lanes | parser research and package archaeology | paused; no current visual-surface N/A receipt | 0% / N.A. unproven |

No prior percentage is silently imported. This law is additive to existing
wave/component contracts and supersedes any claim that Chromium mobile
emulation, Playwright WebKit, a few route screenshots, or desktop resizing
constitutes full mobile/Safari convergence.

## 13. Ordered tranche path

1. Keep parser development paused.
2. Seal the repository and surface census without executing browsers.
3. Generate the immutable Kronecker registry and equivalence plan.
4. Independently audit the registry for missing admin/debug/component states.
5. In a later explicitly authorized execution tranche, establish disposable
   API/Docker/auth/TLS fixtures and record every accommodation.
6. Execute real iOS Simulator/Mobile Safari and installed desktop Safari cells,
   raw-first.
7. Aggregate defects without changing thresholds or denominators.
8. Author subject-specific remediation briefs and implementation waves.
9. Re-run impacted cells and witnesses after authorized fixes.
10. Seal, run Clean A, owner-intake, run later Clean B, and publish.

Until steps 1–4 are complete, no UI audit execution should begin. Until steps
5–10 complete, every repository remains zero-credit for this mobile/Safari law.

