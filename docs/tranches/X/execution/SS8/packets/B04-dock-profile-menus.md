# SS-8 packet — B04-dock-profile-menus

**SERVED MODEL:** `claude-opus-5-5` (Opus 5.5), the model ID in this seat's own system prompt.
**Seat:** SS-8 WITNESS · 2026-10-19 · authority: EXECUTION-RUNBOOK §4.1, COHESION §0gd.4.
**Records:** shell-dock-mobilemenudropdown (7) · shell-dock-profilesection (16) · shell-dock-slugeditlayer (12) = 35 items (SS8-0086..0120).
**Tally:** PROVEN 7 · REFUTED 12 · UNPROVEN 16.

## Served state and apparatus
- App `http://localhost:9000` (value.js dev, vite pid 12243, `tranche-u` at `9682675e2`, dirty tree shared with Track A and the X-DS tail), API `:3000` (tsx, `api/`). One cell (`desktop-out-dark`) logged a transient HMR error from a concurrent seat's edit (`findCustomName is not a function`, `useColorNameResolution.ts?t=…`); its readings are band/menu geometry and ink, which that error does not touch.
- Probes: `docs/tranches/X/execution/SS8/probes/B04/` — `lib.mjs` (shared kit: storage seed, canvas sRGB, WCAG ratio of computed ink over the **painted ground** sampled from a screenshot with all ink made transparent), `desktop.mjs`, `desktop2.mjs`, `flip.mjs`, `mobile.mjs`, `slug.mjs`, `webkit.mjs`, `extra.mjs`. Headless Chromium (Playwright default), one browser per run, one context per cell, context + browser closed in `finally`.
- Fixed pick for single-pick cells: `oklch(0.62 0.19 25)`. The D-06/L-6 matrix uses 7 picks × 2 routes (`#/`, `#/palettes`) × 2 schemes.
- Identity: logged-in cells use a fresh real session from `POST :3000/sessions`; the admin end-to-end cell uses the token the **served** API accepts (the dev sentinel documented in `scripts/dev/dev.sh:331`, passed as `B04_ADMIN_TOKEN`; `api/.env`'s token is NOT the live one — the first attempt got `GET /admin/tags 403` and "Not a slug or admin token."). No token value is written to evidence (grep-checked).
- Runs (all through `~/.claude/guard/guarded`, none `--light`):
  - `guarded --timeout 15 -- node …/B04/desktop.mjs` (6 cells: out/in/admin × light/dark, 1440×900)
  - `guarded --timeout 15 -- node …/B04/desktop2.mjs` (2 cells)
  - `guarded --timeout 15 -- node …/B04/flip.mjs` (4 cells, reduced motion)
  - `guarded --timeout 30 -- node …/B04/mobile.mjs matrix` (28 cells, 390×844 DPR3 touch)
  - `guarded --timeout 20 -- node …/B04/mobile.mjs orphan` · `B04_ADMIN_TOKEN=… guarded --timeout 20 -- node …/B04/mobile.mjs admin`
- **NOT ADMITTED:** `slug.mjs` (geom/hold/focus/submit), `extra.mjs` and `webkit.mjs` (`guarded --exclusive webkit`). `guarded` held `slug.mjs geom` in its headroom queue from 15:11 to past 17:12 EDT. The 1-minute load stayed between 68 and 185 the whole time, against a gate of 36 (`uptime`; `~/.claude/guard/log/zone.log` 15:17 load=184, 16:21 load=172, 16:35 load=92). Every item that needs those probes stays **UNPROVEN** for that reason. The probes are written and ready to run unchanged.
- Evidence directory `E/` = `docs/tranches/X/execution/SS8/evidence/B04-dock-profile-menus/`.

## Verdicts

| sid | item | claim (abridged) | probe | verdict | evidence |
|---|---|---|---|---|---|
| SS8-0086 | MMD D-06 | 4.03/5.21 composited pair; re-measure the **failing fraction** across pick × route × scheme | mobile.mjs matrix: kebab menu open, every label's computed ink over its painted ground | **PROVEN** — the failure is real and depends on the ground. **43 of 252** label cells are below 4.5:1 (17.1 %). light `#/` 19/63 · light `#/palettes` 13/63 · dark `#/` 10/63 · dark `#/palettes` 1/63. Worst: light `#/` "Share color" 1.49–1.55 at 3 picks, where black ink sits over the dark spectrum canvas that bleeds through the veil. Dark `#/`: "Regenerate slug" (muted) 1.25–1.91 at 7/7 picks. Labels render at 14 px weight 400, not the record's 11 px. | `E/mobile-matrix.json`; `E/mob-menu-{light,dark}-red.png` |
| SS8-0087 | MMD C-3 | the orphan across engines + the focus-restoration fall-to-body arm | mobile.mjs orphan (Chromium 390→1440 resize); webkit.mjs (not admitted) | **UNPROVEN** (WebKit arm not admitted, load > gate). Chromium arm re-witnessed. After the resize the menu stays mounted at `[0,17,176,260]` with opacity 1, while the trigger has 0 client rects and `aria-expanded="true"`. Escape then drops focus to `BODY`, so the fall-to-body arm holds in Chromium. | `E/mobile-orphan-deadzone-zoom.json` (`orphan`, `orphanAfterEscape`); `E/mob-orphan-after-resize-1440-chromium.png` |
| SS8-0088 | MMD C-8 | the 276 ms swap latency and its rescue path | desktop2.mjs: real-mouse click Profile→@mbabb; in-page rAF stamps from the pointerdown | **PROVEN** — 10 trials over 2 schemes: @mbabb menu painted at **265.2–311.1 ms** (mean ≈ 286). Profile menu gone at 147.6–208.6 ms. The rescue lands every time (`mbabbOpen: true` 10/10). Synthetic dispatch (desktop.mjs) bypasses the mutex delay at 17–32 ms, so it is not the user path. | `E/desktop2-{light,dark}.json` (`swap`) |
| SS8-0089 | MMD L-6 | drift table magnitudes (7/7 picks, ~−5.5 pp L / −12 % C) of double certification | mobile.mjs matrix: read the mounted twin's `cssColorOpaque` prop, `menuInk`, and `safeCss(pick)` (single certification) per pick | **REFUTED** — light: `menuInk` ≡ single certification to 1e-9 at **7/7** picks, so double certification adds zero drift. Dark: `menuInk` = the prop (no recertification), and the single certification differs by only +0.3–0.4 pp L. | `E/mobile-matrix.json` (`inst`) |
| SS8-0090 | MMD L-2 | dev-boot byte figures with `node_modules/.vite/deps` cold | none | **UNPROVEN** — needs a cold vite deps cache on the served instance. That server (pid 12243) is shared with concurrently editing seats, so this seat did not purge or restart it. | — |
| SS8-0091 | MMD dead-zone | dead-zone percentages 73.2/26.8 + row geometry | mobile.mjs orphan: 20×5 `elementFromPoint` grid over the GitHub row (390 touch); desktop.mjs same at 1440 | **REFUTED** — hit fraction **1.00** at both widths. The row is 150×44 with 0 nested anchors: the item itself is the row (`@select="openRepository"`). | `E/mobile-orphan-deadzone-zoom.json` (`deadZone`); `E/desktop-*.json` (`github`) |
| SS8-0092 | MMD admin arm (D-08) | the admin arm end-to-end under a real token against the live API | mobile.mjs admin: ⋮ → Login → token → Enter → ⋮ → Sign out of admin → ⋮ | **REFUTED** (D-08's no-exit shape does not reproduce). Before: `[Login, Share color, GitHub]`. After submit the admin token is stored and the layer is closed (`GET /admin/tags 200`). Admin menu: `[admin, Switch account, Sign out of admin, Share color, GitHub]`. Sign out clears the token, and the menu returns to `[Login, …]`. 0 console errors. | `E/mobile-admin-e2e.json`; `E/mob-admin-menu-live.png` |
| SS8-0093 | PS U-1 | D-1's ratios: LIGHT Login 3.43 · DARK @mbabb 4.18 | desktop.mjs: trigger ink over the painted band ground | **REFUTED** (at HEAD, red pick): Login light **5.23**, @mbabb dark **11.0**, Profile light 5.23 / dark 5.57, @mbabb light 5.14. Login is now glass's `DockControl shape="tab"` (`.dock-tab-button`, X.W12.e). The secondary wash-capsule second layer that D-1 indicts is not in the band. | `E/desktop-{out,in}-{light,dark}.json` (`trigInk`); `E/desk-band-out-light.png` |
| SS8-0094 | PS U-2 | C-1 staleness DURATION ("permanent" vs "reconverges") | flip.mjs: reduced motion, no drag; flip via the Dark-mode item; sample Profile ink at +0/+1f/+600 ms/+5 s/+60 s against a cold boot in the target scheme | **PROVEN** — the staleness is real and its duration depends on the direction. light→dark: ink `L 0.7477` vs cold-dark `0.7348` through +5 s, reconverged by +60 s (`0.73495`). dark→light: ink `L 0.0167` vs cold-light `0.1195` still at +60 s. Neither "permanent" (C-1) nor "reconverges" (L-8) holds for both directions. | `E/flip-u2.json` |
| SS8-0095 | PS U-3 | L-1 magnitudes: model α 0.88 vs band α 0.4544; delivered 5.365/8.259 vs 5.75 | desktop.mjs: band `.dock-plate` computed bg, menu bg, delivered trigger ratio | **UNPROVEN** — the quantities depend on the pick, and the record does not state its pick. Red-pick readings: plate α **0.10** light / **0.14** dark; menu α 0.18 / 0.22; delivered 5.23 / 5.57. A mismatch at one pick decides neither way. | `E/desktop-in-{light,dark}.json` (`band.plate`, `inst.contrast`) |
| SS8-0096 | PS U-4 | L-2's +26.3 % over-certification table + painted ink byte-identity with `--accent-live` | desktop.mjs: live `triggerInk`, `chromeSafeCss(raw)` vs `chromeSafeCss(safe)`, `--accent-live` | **UNPROVEN** — this is a table across picks, and one pick was read. Red pick: light ink is byte-identical to `--accent-live` (`oklch(11.9496…% 0.04844 25deg)`). Dark is not (73.476 % vs 73.088 %). Over-certification gain is +6.3 % in light (5.231 vs 4.920) and 0 % in dark. | `E/desktop-in-{light,dark}.json` (`inst`, `band.accentLive`) |
| SS8-0097 | PS U-5 | D-2 row geometry: Δy 15.9; 48.9 vs 44.0 px; 55.4 px iPhone 14 | desktop.mjs: @mbabb menu row rects; webkit.mjs iPhone arm (not admitted) | **REFUTED** (desktop limb): every row is **44.0** px tall, GitHub included, so no 48.9/44.0 split exists (the as-child anchor is gone). The 55.4 px iPhone 14 cell was not run. | `E/desktop-*.json` (`menu.rows`) |
| SS8-0098 | PS U-6 | D-15/16/17 pixel geometry: seat rects (28 px), separator air 15.8/10.2 · 9.8/12.2, chroma collapse, hover deltas | desktop.mjs: band children rects + gaps | **REFUTED** (geometry limbs): seats are Login 87.8×**38**, Profile 104.9×**31**, admin 85.2×31, @mbabb 75×31, not 28. Separator air is **10/10/12** (out, admin) and 10/9.9/12 (in). Band chroma collapse and hover deltas were not measured. | `E/desktop-*.json` (`band.kids`, `band.air`) |
| SS8-0099 | PS U-7 | D-6's rendered 16×24 theme glyph | desktop.mjs: svg rects in the Dark-mode row | **REFUTED** — the row is a `menuitemcheckbox` with no sun/moon glyph. Its only svg is the producer's 24×24 checked indicator (dark), and there is none when unchecked (light). | `E/desktop-*.json` (`menu.rows[2]`) |
| SS8-0100 | PS U-8 | D-12's offline avatar render | desktop.mjs out-light: `avatars.githubusercontent.com` aborted via `ctx.route` | **PROVEN** — 28×28 avatar, `img.naturalWidth 0`, no fallback text: an empty circle (no `AvatarFallback`, ProfileSection.vue:201–203). | `E/desktop-out-light.json` (`menu.avatar`); `E/desk-mbabb-menu-out-light.png` |
| SS8-0101 | PS U-9 | does `backdrop-filter` reach the portaled menu subtree? | desktop2.mjs: 2 px b/w stripe field under the menu; mean horizontal gradient inside the menu rect, shipped vs `backdrop-filter:none` | **REFUTED** (the "near-unblurred" reading): the blur reaches. Energy is **3.65**/4.97 shipped vs **100.15**/95.66 forced-none, ≈96 % suppression. Computed on `[role=menu]`: `blur(20px) saturate(1.5)` at `--glass-level: 1`. | `E/desktop2-{light,dark}.json`; `E/desk-u9-stripes-shipped-{light,dark}.png`; `E/desktop-*.json` (`menu.chain`) |
| SS8-0102 | PS U-10 | N-3 per-label ratios over the bleed-through, both schemes | desktop.mjs (`menuInk`, `profileInk`); mobile.mjs matrix (same unguarded population in the twin) | **PROVEN** — the labels are unguarded and the ratio follows the ground. Desktop red pick: @mbabb menu light 4.72–4.81 / dark 9.12–9.57; Profile menu light **4.52–4.65**. In the twin matrix the same labels fall to **1.49** where the spectrum canvas bleeds through (see 0086). | `E/desktop-in-{light,dark}.json`; `E/mobile-matrix.json` |
| SS8-0103 | PS U-11 | D-19's "all 60 captures are logged-out" + `STATES.json` corroboration | none | **UNPROVEN** — a claim about a past capture corpus, which a live probe of the app cannot decide. | — |
| SS8-0104 | PS U-12 | C-2's repo-wide `variant=` count (103) + C-3's live regeneration trace | grep at HEAD; extra.mjs (not admitted) | **UNPROVEN** — the live trace was not admitted. Static limb only (no browser): `git grep -c 'variant=' -- demo` = **57** lines at `9682675e2`, and none in `demo/shell/dock/menus`. That is today's count, not the record's 103. | — |
| SS8-0105 | PS U-13 | N-2 coarse cell, WebKit iPhone-14 arm | webkit.mjs | **UNPROVEN** — `guarded --exclusive webkit` not admitted (load > gate). | — |
| SS8-0106 | PS U-14 | D-13's 200 %-zoom rendered arm | mobile.mjs: 720×450 CSS px at DPR 2 (= 1440 at 200 %), fine pointer | **PROVEN** — the seam is crossed. Both ProfileSection blocks are hidden and ⋮ is present. The menu carries `[Login, Share color, GitHub, Dark mode]`. No horizontal overflow (dock scrollW 188 = clientW). Emulated zoom, not browser zoom. | `E/mobile-orphan-deadzone-zoom.json` (`zoom200`); `E/zoom200-720-kebab.png` |
| SS8-0107 | PS U-15 | dark-scheme gold-band ratio (~3.3:1) | desktop.mjs admin cells | **REFUTED** — admin trigger dark **7.04:1** (`oklch(0.784 0.143 86)`), light 4.93:1. The gold is now `.gold-ink` rebound per ground (bd72e216e), and the static `#D4AF37` light ceiling is gone. | `E/desktop-admin-{light,dark}.json` (`trigInk`) |
| SS8-0108 | PS U-16 | GitHub row pointer dead-zone (~73 %) | desktop.mjs hit grid; desktop2.mjs ArrowDown focus walk + Enter, right-edge click | **REFUTED** — hit fraction **1.00**. Enter on the focused GitHub item calls `window.open("https://github.com/mkbabb/value.js")`, and so does a click 4 px from the right edge (both schemes). | `E/desktop-*.json` (`github`); `E/desktop2-{light,dark}.json` |
| SS8-0109 | SEL A-1 | live submit chain in the hash-history app | slug.mjs submit | **UNPROVEN** — not admitted (load > gate). | — |
| SS8-0110 | SEL D-4 | 320 px aperture hit-test, scroll widths at 320/390 | slug.mjs geom | **UNPROVEN** — not admitted. | — |
| SS8-0111 | SEL D-2 | wall-clock idle-collapse t≈4000 / t≈6000 | slug.mjs hold | **UNPROVEN** — not admitted. | — |
| SS8-0112 | SEL D-5/C-7 | focus timelines (re-execute at least one sampling run) | slug.mjs focus; webkit.mjs | **UNPROVEN** — not admitted. | — |
| SS8-0113 | SEL geometry | 22×22 / 23.3 rects, 47/75/28 px centres, inputRect, 200 % negative | slug.mjs geom | **UNPROVEN** — not admitted. | — |
| SS8-0114 | SEL D-3 | pixel-identity frames (rest vs focus) | slug.mjs geom (1440) | **UNPROVEN** — not admitted. | — |
| SS8-0115 | SEL D-6 | long-token overflow scrollWidth 749 / clientWidth 160 | slug.mjs geom (1440) | **UNPROVEN** — not admitted. | — |
| SS8-0116 | SEL placeholder | placeholder advance width per arm | slug.mjs geom (6 arms) | **UNPROVEN** — not admitted. | — |
| SS8-0117 | SEL iOS pair | sub-16 px focus auto-zoom + missing `autocapitalize` on device | none possible | **UNPROVEN** — NEEDS-HARDWARE. A headless engine cannot show iOS focus zoom. Static note, not a live verdict: the "missing `autocapitalize`" limb no longer matches the source, since `SlugEditLayer.vue:106` sets `autocapitalize="off"`. This seat also saw the rendered input carry `autocapitalize="off"` in a Playwright call log during the first admin attempt. That log was overwritten, so it is not cited. | — |
| SS8-0118 | SEL C-2 | live submit trace (net, dialog t+50 ms, spinner MO) | slug.mjs submit | **UNPROVEN** — not admitted. | — |
| SS8-0119 | SEL PRM | `animation-duration: 1e-05s` live | slug.mjs submit (reduced-motion cell) | **UNPROVEN** — not admitted. | — |
| SS8-0120 | SEL L-10 | one committed capture of the ACTIVE layer | slug.mjs geom (`slug-layer-active-{1440,390,320}.png`) | **UNPROVEN** — not admitted. | — |

## REFUTED: owner and root cure

Every refutation below is a **cure that already landed at HEAD**. It is not a new defect. The record's number or shape describes an earlier tree, and the root cure is to stop carrying that figure forward. The records are E-3 immutable, so the verdict lives here only.

| sid | owner | root cure (landed) |
|---|---|---|
| 0089 L-6 | consumer | The menu re-certification is idempotent in light and absent in dark. The drift magnitude is gone; L-6's single-owner carve (X-W8) remains a naming/ownership row, not a drift row. |
| 0091 dead-zone · 0108 U-16 · 0097 U-5 | consumer | The GitHub row is the `DropdownMenuItem` with `@select="openRepository"` (UIA-V-18/22/71; ProfileSection.vue:213–223, MobileMenuDropdown twin). The as-child anchor and its two-line break are gone. |
| 0092 D-08 | consumer | The admin identity is a menu with Switch account + Sign out of admin (UIA-V-21/215/227). |
| 0093 U-1 · 0098 U-6 | consumer | X.W12.e (OA-22): band controls are glass `DockTrigger`/`DockControl`, so there is no page `Button` wash capsule and no 28 px `--control-h-xs` seat. |
| 0099 U-7 | consumer | UIA-V-254/268: the theme row is `DropdownMenuCheckboxItem`, and the sun/moon glyph is gone. |
| 0101 U-9 | consumer (record harness) | No product defect. The corpus "near-unblurred" reading was a capture artifact. Strike it as an input to U-10/N-3. N-3's real risk is the translucent veil's low alpha, which 0086/0102 prove. |
| 0107 U-15 | consumer | bd72e216e: the admin gold reads the certified ink, rebound per ground. |

## PROVEN rows that still carry a live defect
- **0086 / 0102 (D-06, N-3):** the menu labels have no contrast guard over the bleed-through. Twin worst case is 1.49:1 (light, `#/`, spectrum canvas under the veil). Dark "Regenerate slug" (muted ink) is 1.25–1.91 at 7/7 picks on `#/`. Cure seam per the record: the producer's `--dropdown-menu-bg` (via `--glass-bg-rung`), or certifying the row ink the way the pill and trigger already are. **Owner: consumer** (the seam exists in glass and is unused; no O-row is needed unless the rung itself is wrong).
- **0094 (C-1):** a scheme flip leaves the certified trigger ink stale, for ≥60 s on dark→light. The cure is the producer's `onFlipSettled`, per the record (X-W8).
- **0100 (D-12):** the offline avatar is an empty circle. Cure: `AvatarFallback` + `referrer-policy` (NO-WAVE-OWNER row).
- **0087 Chromium arm (C-3):** the menu is orphaned across the 1024 seam and focus falls to body.

## Re-run recipe for the UNPROVEN-by-admission rows
```
~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B04/slug.mjs geom   # 0110 0113 0114 0115 0116 0120
~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B04/slug.mjs hold   # 0111
~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B04/slug.mjs focus  # 0112 (chromium)
~/.claude/guard/guarded --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B04/slug.mjs submit # 0109 0118 0119
~/.claude/guard/guarded --timeout 15 -- node docs/tranches/X/execution/SS8/probes/B04/extra.mjs        # 0104 live limb, 0093 layer chain
~/.claude/guard/guarded --exclusive webkit --timeout 20 -- node docs/tranches/X/execution/SS8/probes/B04/webkit.mjs  # 0087 0097(iPhone) 0105 0112(webkit)
```

## cures

Seat: SS-8 CURE, batch B04-dock-profile-menus, 2026-10-20 (served model `claude-opus-5-5`). The verdicts above stay verbatim (E-3). This section records only what the cure seat did with each REFUTED row. Every row's root cure **had already landed at HEAD**, so no product code changed. What this seat added is a falsifier per row that holds the landed shape.

**Falsifier:** `demo/test/shell/dock-profile-menus.test.ts` (13 tests). It mounts both real twins (`ProfileSection.vue`, `MobileMenuDropdown.vue`) with the session port and the ink ambient supplied. The desktop twin sits inside a painted `.dock-plate` (α 0.10), because the G-13 chrome ink throws when it has no band. Menus open through their own `v-model:open`.

**RED witness:** with `SS8_B04_VARIANT=.ss8red`, the suite mounts sibling mutants `<Name>.ss8red.vue`. Each mutant reintroduces one pre-cure shape:
- the GitHub row as an item wrapping `<a href>` with no `@select`
- the theme row as a plain item with a lucide Sun/Moon glyph
- the desktop admin arm as an inert `gold-shimmer` pill with inline `#D4AF37` and no menu
- the mobile admin arm with no exits
- Login as glass `Button variant="outline" size="xs"`
- the twin's slug ink as `floating(page(pick))`, the double certification

The mutants existed only for the RED runs and were deleted before the GREEN runs. The app never imports them.

**Runs** (`E/cure/`, all via `~/.claude/guard/guarded`, vitest `--maxWorkers=2`):
- RED: `SS8_B04_VARIANT=.ss8red guarded --timeout 10 -- npx vitest run --maxWorkers=2 demo/test/shell/dock-profile-menus.test.ts`. `red-run1.txt` and `red-run2.txt` each show `Tests 10 failed | 3 passed (13)`.
- GREEN: the same command without the variable, under `--light`, since it is a single unit file. The heavy-slot queue held the non-light attempt for more than 20 min. `green-run1.txt` and `green-run2.txt` each show `Tests 13 passed (13)`.
- Touched suite: `demo/test/shell` (10 files) shows `Tests 49 passed (49)`.

**Type-check:** `guarded --light -- npx vue-tsc -p tsconfig.test.json --noEmit` reports 0 errors in the new file. The one remaining error is in `demo/test/picker/spectrum-dot-position.test.ts`, which belongs to another seat and was not touched.

| row | cure (root, landed) | falsifier test | RED (x2, mutant) | GREEN (x2, HEAD) |
|---|---|---|---|---|
| 0089 MMD L-6 | **Already cured.** The twin certifies the raw pick once, on the floating rung (`MobileMenuDropdown.vue` `menuInk`). Re-certification is idempotent. No drift row remains; the L-6 single-owner carve (X-W8) stays an ownership/naming row. | "SS8-0089 … 7/7 picks paint safeCss_floating(pick), idempotent" (light + dark; the pill's painted ink equals one floating certification to 1e-4 L/C, and re-certifying adds nothing) | dark arm RED: `L: expected 0.00182 to be less than 0.0001` at `oklch(0.62 0.19 25)`. The light arm stays green under the mutant, matching the witnessed zero drift in light. | passed |
| 0091 MMD dead-zone | **Already cured** (UIA-V-18/22/71, `b41731371`). The GitHub row is the `DropdownMenuItem @select=openRepository`, with no inner anchor. | "SS8-0091 · 0108 · 0097 …" ×2 twins | `expected 1 to be +0` (nested `<a>`), both twins | passed |
| 0092 MMD D-08 | **Already cured** (UIA-V-21/215/227, `d8b8e063b`). The admin identity is a menu with Switch account and Sign out of admin. Sign out reaches `adminLogout`. | "SS8-0092 …" ×2 twins | desktop: `no open menu` (inert pill). Mobile: `expected [Array(3)] to deeply equal ArrayContaining{…}` (no exits). | passed |
| 0093 PS U-1 | **Already cured** (X.W12.e/OA-22). Login is glass `DockControl shape="tab"` (`.dock-tab-button`); Profile, admin and @mbabb are `DockTrigger`. No page Button wash capsule. | "SS8-0093 · 0098 … (out/user/admin)": every band `<button>` is `.dock-trigger` or `.dock-tab-button` | out: `expected +0 to be 1` (no DockControl). admin: `expected 1 to be 2`. | passed |
| 0097 PS U-5 | **Already cured** with the GitHub row: no as-child anchor, so no two-line 48.9 px row. jsdom has no layout, so the falsifier holds the cause (no nested `<a>`, one menuitem), not the pixel height. The iPhone 14 cell stays UNPROVEN (WebKit not admitted, above). | the 0091 test | as 0091 | passed |
| 0098 PS U-6 | **Already cured** (X.W12.e). Seat height comes from the dock control family's tokens, not a 28 px `--control-h-xs` Button. The falsifier holds the family membership, not pixels. | the 0093 test | as 0093 | passed |
| 0099 PS U-7 | **Already cured** (UIA-V-254/268, `21aeff087`). Dark mode is `DropdownMenuCheckboxItem` (`menuitemcheckbox`, `aria-checked`), with no sun/moon glyph. | "SS8-0099 …" ×2 twins | `expected 'menuitem' to be 'menuitemcheckbox'`, both twins | passed |
| 0101 PS U-9 | **No product defect.** Strike the corpus "near-unblurred" artifact as an input to U-10/N-3. No code change. jsdom cannot paint `backdrop-filter`, so the regression witness is the live probe `probes/B04/desktop2.mjs` stripe-field reading (`E/desktop2-{light,dark}.json`: 3.65/4.97 shipped vs 100.15/95.66 forced-none). | none new (live probe banked above) | not constructible (no defect) | probe reading banked above |
| 0107 PS U-15 | **Already cured** (`bd72e216e`). The admin trigger wears `.gold-ink`, the one reader of the per-ground rebound `--ink-gold`, with no inline gold and no shimmer. | "SS8-0107 …" (trigger classes and inline style) + utils.css `.gold-ink { color: var(--ink-gold); }` | trigger arm: `expected false to be true` (no `.gold-ink`). The utils.css arm was not mutated (static, green in both). | passed |
| 0108 PS U-16 | **Already cured** (UIA-V-18/22/71). A click on the item, and Enter on the focused item, both call `window.open(REPO, "_blank", "noopener,noreferrer")`. | the 0091 test (click + Enter arms) | as 0091 | passed |

blockedByDirty: none. `demo/shell/dock/menus/*` and this packet were clean, and no product file was edited.
