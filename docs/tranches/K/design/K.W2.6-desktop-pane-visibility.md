> **Mode: planning-only. NO code.** Authored 2026-06-04 from the visual-grounded audit (2 serial 6-agent workflows over the 84-capture screenshot session). Visual evidence: `../audit/visual-evidence-2026-06-04/DELTA.md`. Synthesis: `../audit/path-forward-2026-06-03-postW2.md §9`.

# K.W2.6 — Desktop Pane-Visibility Restoration (Tailwind-v4 source-scan emission gap)

## VERDICT (one line)

The desktop secondary-view "off-screen-left / blank panel" P0 is **a real layout bug, not a transition artifact** — but the bug is **NOT** in the pane-router, the `componentFor` escape-hatch, or the `.pane-slide` keyframes. It is a **Tailwind v4 content/source-scan emission gap**: the responsive display utilities `lg:flex` / `lg:block` / `lg:hidden` used *only* on `App.vue`'s pane wrappers (`demo/color-picker/App.vue:35,46,59`) are **never generated into the stylesheet**, so the base `hidden` wins unconditionally on the two desktop pane wrappers (→ `display:none`) while the mobile single-slot (which lacks a base `hidden`) stays visible at desktop. Proven live: injecting the three missing rules instantly restores the centered dual-pane desktop layout.

The "desktop dock absent" and the "palettes/mix render the picker" findings are **separate and largely benign** (see §4): the dock is present-but-collapsed at desktop (a 57px pill, capture-missed), and palettes/mix legitimately share `left:"color-picker"`. They do **not** share the layout P0's root cause.

---

## 1. METHOD — live reproduction (the decisive test)

Ran `npm run dev` (port 9000), drove Playwright to `#/browse`, resized to 1280×800, and inspected the **live DOM + computed styles + the actual generated CSSOM** (not pixels alone). This distinguishes a real layout bug from a cold-route transition artifact, which the static captures could not.

Grounding evidence:
- `docs/tranches/K/audit/visual-evidence-2026-06-04/browse-1280-light.png` (sliver), `browse-1440-light.png` (blank), `browse-375-light.png` (perfect, centered) — the cross-cut signal.
- `picker-1280-light.png` / `palettes-1280-light.png` (identical, picker left-of-center) vs `gradient-1280-light.png` (slid to a sliver) — the differential.

---

## 2. ROOT CAUSE — grounded in the CSSOM, not inference

### 2.1 The measured fault
At 1280px the two desktop pane wrappers compute `display:none`:
- `demo/color-picker/App.vue:46` — `class="pane-wrapper hidden lg:flex …"` → measured `display:none`
- `demo/color-picker/App.vue:59` — `class="pane-wrapper hidden lg:block …"` → measured `display:none`
- `demo/color-picker/App.vue:35` — the mobile slot `class="lg:hidden w-full max-w-md sm:max-w-lg …"` → measured `display:flex`, rect `{x:140, w:496}` (the left-of-center narrow panel the screenshots see).

A full CSSOM walk across every stylesheet found **exactly one** display-affecting rule for these selectors: `.hidden { display:none }`. There is **no `.lg\:flex`, no `.lg\:block`, no `.lg\:hidden` rule anywhere** in the shipped stylesheet. (The only `lg:` rules that *do* exist — 8 of them: `lg:col-start-1`, `lg:grid-cols-[…configurator-aside…]`, `lg:border-*` — come from glass-ui's vendored dist, proving `lg`-as-a-breakpoint works; the demo's own `lg:` utilities simply weren't emitted.) `matchMedia('(min-width:1024px)')` is `true`; root font-size 16px; the `(min-width:64rem)` media block exists. **So the breakpoint is correct — the utilities are missing.**

> Caveat noted for the record: a bare `<div class="lg:flex">` probe *did* resolve to `flex` — but that is the Vite Tailwind plugin's **dev-mode on-demand JIT** reacting to the injected node, NOT the built stylesheet. The authoritative signal is the CSSOM rule-walk (no rule) + the real wrapper computing `display:none`.

### 2.2 Why exactly these classes, and not others
`sm:` (13 rules) and `md:` (5 rules) utilities from *other* demo files DID emit; glass-ui's `lg:` emitted. Only the utilities used **solely in `demo/color-picker/App.vue`** are absent. The demo has **no `tailwind.config.*`** and **no `@source` directive** (`demo/@/styles/style.css:1` is a bare `@import "tailwindcss"`; the two `@source` mentions at `style.css:10,13` are prose in a comment, not directives). It compiles via `@tailwindcss/postcss` (`vite.config.ts:8,17`). Under Tailwind v4 automatic content detection the scan is rooted at the CSS file's ancestry (`demo/@/styles/`) and prunes `.gitignore` matches; **`demo/color-picker/App.vue` is a sibling subtree** (the Vite `root` is `./demo/color-picker/`, `vite.config.ts:211`), so its classes fall outside the auto-detected source set. Net: every utility that lives *only* in `App.vue` silently no-ops in the consumer build.

This is the **same failure class as the grand-audit's P9** ("rounded-panel utility silently no-ops — Tailwind-v4 dep-utility-scan gap", `constellation-grand-audit.md`). It is now confirmed to also strike the demo's own app shell, not just dependency utilities.

### 2.3 Symptom mechanics (one root cause → two visible faces)
- **Desktop wrappers vanish:** `hidden lg:flex` / `hidden lg:block` with `lg:*` unemitted → base `hidden` wins → `display:none`. The `.pane-container--dual` grid (`grid-template-columns:1fr 1fr` from `style.css:170`, a real `@media` rule that *does* fire) is correct but **empty** — both its children are `display:none`.
- **Mobile slot leaks onto desktop:** `App.vue:35` has **no base `hidden`** — its visibility relies entirely on `lg:hidden` to disappear at desktop. With `lg:hidden` unemitted, it stays `display:flex`, lands in grid column 1, and is clamped to `max-w-md`(448px, which *is* emitted via other scans) → the narrow **left-of-center** panel.
- **The sliver / fully-blank captures (`browse-1280` sliver, `browse-1440`/`extract-1440` blank):** the structural bug parks the panel left-of-center-and-narrow; the **`.pane-left` enter transition** (`App.vue:262` `transform: translateX(-110%) rotate(-2deg)`) then **amplifies** it on a *cold direct-hash load*. On a direct hash route, `viewManager.ready` flips `true` after `router.isReady()` (`useViewManager.ts:41`), so `transition-name` switches from `''` to `'pane-left'` and the slot plays its enter from `-110%`. Caught mid-flight (or stuck, with the already-narrow off-center panel) the capture shows a left sliver at 1280 and nothing at 1440. The live settled repro shows the panel parked left-of-center (not a sliver) — confirming the transition is the *amplifier*, the unemitted utilities are the *cause*.

### 2.4 Fix proven in-situ
Injecting the three missing rules under `@media (min-width:1024px)` (`.lg\:flex{display:flex}`, `.lg\:block{display:block}`, `.lg\:hidden{display:none}`) immediately restored: left wrapper `{x:140,w:496,flex}`, right wrapper `{x:644,w:496,block}`, mobile slot `display:none`. Screenshot confirmed a correct centered dual-pane "Browse | My Palettes" at 1280. **This is the fix surface.**

---

## 3. THE FIX (specced, not coded) + WAVE HOME

### 3.1 Primary fix — make Tailwind emit the demo's own utilities
Add an explicit `@source` for the demo app-shell tree to `demo/@/styles/style.css` so Tailwind v4 scans `demo/color-picker/` (and any sibling subtree the auto-root misses). Concretely, an `@source` glob covering `demo/color-picker/**/*.{vue,ts,html}` (and, to be safe against future shell files, the whole `demo/` custom tree the consumer authors). This is the **structural** fix: it restores `lg:flex` / `lg:block` / `lg:hidden` (and `sm:max-w-lg` on the mobile slot, which is also currently unemitted) for the entire app shell, not just these three.

> Why `@source` over per-class hacks: the gap is systemic (any `App.vue`-only utility no-ops). A safelist or inline-style patch would whack-a-mole. The `@source` directive closes the whole class of bug and is the Tailwind-v4-idiomatic answer.

### 3.2 Defense-in-depth (belt + suspenders, optional within the same wave)
The display toggle is load-bearing for the entire desktop/mobile split yet rides on utilities a content-scan can silently drop. Harden it so a future scan regression cannot blank the desktop again: move the breakpoint visibility off Tailwind responsive utilities and into the **already-present project `@media (min-width:1024px)` block in `style.css`** (which demonstrably fires) — e.g. give the wrappers/mobile-slot stable class hooks (`.pane-wrapper--desktop`, `.pane-slot--mobile`) toggled by the same `@media` that already drives `.pane-container--dual` (`style.css:166-173`). This collapses the desktop layout's correctness onto **one** media query the project owns, eliminating the Tailwind-emission dependency for the load-bearing toggle. (This is the more robust long-term posture; §3.1 alone fixes the bug, §3.2 prevents recurrence.)

### 3.3 Verification step (required gate)
Re-run the capture harness **after the fix** AND add a live navigation trace: at 1280, load `#/picker`, then in-app click-navigate dock → Browse, and assert via DOM probe that `getComputedStyle('.pane-wrapper.lg\:flex').display === 'flex'` and the right wrapper `=== 'block'`, mobile slot `=== 'none'`, with both wrappers' rects inside the centered `.pane-container` (x≈140→1140 at 1280). The exact probe used to root-cause this (CSSOM rule-walk for `.lg\:flex|block|hidden` + wrapper rect/display at 1280) is the regression assertion — fold it into the smoke suite so a future scan gap fails CI instead of shipping a blank desktop. Capture browse/extract/generate/gradient at 1280 **and** 1440 to confirm no residual off-screen drift (i.e., the `.pane-left` enter transition no longer amplifies because the panel now starts centered).

### 3.4 WAVE HOME — recommendation
**Elevate to a dedicated early lane: K.W2.6 "Desktop Pane-Visibility Restoration."** Rationale:
- It is a **P0 usability break** — the desktop product is non-functional above ~1024px for every non-picker view (and the picker itself renders left-of-center, half-width). This blocks any meaningful desktop visual verification of K.W3 (blob), K.W4 (aurora-from-color), and K.W5 (view-transition) — you cannot judge aurora-from-color or the blob footprint on a desktop whose panes are `display:none` or sliding off-screen.
- It is **small, surgical, and orthogonal** to the K.W5 pane-router/VIEW_MAP rebuild: the fix is a CSS source-scan/visibility correction, not a router change. Folding it into K.W5 would gate a trivial CSS fix behind a large rebuild and leave every interim desktop capture untrustworthy.
- Sequence it **immediately after the K.W2 green substrate and the K.W2.5 mechanism-C transposition** (so it lands on a clean build), and **before** K.W3/W4 so those waves' visual gates run on a correct desktop. It does NOT belong in K.W5 — K.W5's `componentFor`-single-source work is unrelated (see §4.3).

---

## 4. THE OTHER TWO SUB-CLAIMS — adjudicated (same investigation)

### 4.1 "Desktop dock absent" — REFUTED as a P0; reclassify as benign/cosmetic
Live at 1280 the dock **is present**: `nav .fixed` spans the top band (`{y:8, h:55}`), and the glass pill renders **centered** at `{x:612, w:57, h:55}`. It is the **collapsed** state: `Dock.vue:93` sets `:start-collapsed="isDesktop"`, so desktop boots to the 57px `#collapsed` pill (`Dock.vue:197-202`). The captures missed it (tiny, centered, against the aurora). The dock is `position:fixed` (`Dock.vue:91`), fully decoupled from the pane grid — it is **not** part of the layout P0. Optional cosmetic follow-up (separate, low priority): reconsider `start-collapsed` default or make the collapsed pill more legible; not a K.W2.6 concern.

### 4.2 "palettes-1280 / mix-1280 pixel-identical to picker = routing fallthrough" — REFUTED
Not a `componentFor` escape-hatch bug. `VIEW_MAP` (`viewSchema.ts:92,116`) defines `palettes.left = "color-picker"` and `mix.left = "color-picker"`. They render the picker left pane **by design**; they differ only in the right pane (`palettes` vs `mix`), which is currently hidden by the §2 bug. Once §3 lands, palettes shows picker|Palettes and mix shows picker|Mix — distinct from picker's picker|About. The `componentFor` `return ColorPicker` fallthrough (`usePaneRouter.ts:93`) is only reached for genuinely-unknown names; every real view name is matched explicitly above it. **No fallthrough defect here.** (The fallthrough default is still worth tightening to the VIEW_MAP single-source in K.W5, but it is not causing this symptom.)

### 4.3 "browse renders off-screen = routing broken" — REFUTED as routing; it is §2
Live, the visible content at `#/browse` is genuinely **BrowsePane** (headers "Browse" / "BrowsePalettes" / "Start a new palette"), rendering through the **mobile slot** (the only un-`display:none` slot). Routing dispatches correctly; the pane is just rendered by the wrong (mobile) slot because the desktop slots are `display:none`. §3's fix routes it back to the desktop dual-pane. **Routing is sound; the §2 emission gap is the whole story.**

---

## 5. GESTALT — one cause, three faces, one fix

| Observed symptom (captures) | True cause | Resolution |
|---|---|---|
| Secondary views off-screen-left sliver @1280 / blank @1440; mobile fine | Tailwind never emitted `lg:flex/block/hidden` → desktop wrappers `display:none`, mobile slot leaks onto desktop; `.pane-left` enter transition amplifies on cold hash-load | §3.1 `@source` (+ §3.2 hardening) |
| Picker/palettes/mix @1280 render left-of-center, half-width | Same — picker shows via the narrow mobile slot (max-w-md), not the desktop left wrapper | §3.1 |
| "Dock absent" @desktop | Capture artifact — dock is present but `start-collapsed` to a centered 57px pill | benign; optional cosmetic (§4.1) |
| "palettes/mix == picker = fallthrough" | By-design shared `left:"color-picker"`; not a router bug | none (§4.2) |

**The desktop view-switching is NOT "fundamentally broken" at the router layer.** The router, pane-router, `componentFor`, and `.pane-slide` keyframes are all sound. A single Tailwind-v4 source-scan emission gap blanks the desktop panes; the cold-route enter-transition makes it look like an off-screen slide. One `@source` directive (plus optional media-query hardening) closes it, verified by live injection.

## LEDGER
- [value.js] demo/@/styles/style.css — ADD an explicit `@source` directive covering the demo app-shell tree (`demo/color-picker/**/*.{vue,ts,html}` and the broader `demo/` custom-component tree) so Tailwind v4 scans App.vue; this restores the unemitted `lg:flex`/`lg:block`/`lg:hidden`/`sm:max-w-lg` utilities. Root cause of the desktop layout P0.
- [value.js] demo/@/styles/style.css — (defense-in-depth) move the load-bearing desktop/mobile pane-visibility toggle off Tailwind responsive utilities into the existing project `@media (min-width:1024px)` block (the one already driving `.pane-container--dual` at style.css:166-173) via stable class hooks, so the toggle cannot be silently dropped by a future content-scan regression.
- [value.js] demo/color-picker/App.vue — if §3.2 adopted, swap the pane wrappers' Tailwind responsive display utilities (lines 35,46,59: `hidden lg:flex`, `hidden lg:block`, `lg:hidden`) for the project-owned class hooks toggled by the style.css media query; otherwise leave classes as-is (the @source fix alone restores them).
- [value.js] e2e/smoke — ADD a desktop-pane-visibility regression assertion at 1280: probe the CSSOM for `.lg\:flex|block|hidden` emission AND assert `.pane-wrapper.lg\:flex` computes `display:flex`, `.lg\:block` → `block`, mobile slot → `none`, both wrappers' rects inside the centered `.pane-container`. Fail CI on a future Tailwind source-scan gap instead of shipping a blank desktop.
- [value.js] docs/tranches/K — author the K.W2.6 wave-gate doc (Desktop Pane-Visibility Restoration): root cause (Tailwind-v4 @source emission gap, same class as grand-audit P9), the @source fix, the defense-in-depth media-query hardening, and the verification gate (post-fix re-capture at 1280+1440 + the live picker→browse navigation trace).
- [value.js] (no change) demo/@/composables/usePaneRouter.ts — confirmed NOT the cause; the `componentFor` `return ColorPicker` default (line 93) is unreached for known views. Note in K.W5 to tighten it to the VIEW_MAP single-source, but it is not this P0.
- [value.js] (no change) demo/@/components/custom/dock/Dock.vue — confirmed dock is present-but-collapsed at desktop (`:start-collapsed="isDesktop"`, line 93). Optional separate cosmetic follow-up on the collapsed-pill default; not a K.W2.6 item.

## GATES
- Live re-capture at 1280 AND 1440 of browse/extract/generate/gradient/picker/palettes/mix/admin-* shows centered dual-pane (or single-pane) layout, no off-screen-left sliver, no blank viewport.
- DOM probe at 1280 post-fix: `.pane-wrapper.lg\:flex` → `display:flex`, `.pane-wrapper.lg\:block` → `display:block`, mobile slot (`.lg\:hidden.w-full.max-w-md`) → `display:none`; both desktop wrappers' bounding rects inside `.pane-container` (x≈140→1140 at 1280).
- CSSOM rule-walk post-build confirms `.lg\:flex`, `.lg\:block`, `.lg\:hidden` rules now EXIST in the generated stylesheet under `(min-width:64rem)`.
- Live in-app navigation trace: load `#/picker` @1280, dock-click → Browse, assert BrowsePane renders in the desktop LEFT wrapper (not the mobile slot) and the right wrapper shows Palettes — i.e. the `.pane-left` enter transition no longer amplifies because the panel starts centered.
- Sequenced after K.W2 green + K.W2.5 mechanism-C transposition, before K.W3/W4 so those waves' desktop visual gates run on a correct layout.
- npm run dev boots clean and the demo renders the corrected desktop layout (already verified live during root-cause).