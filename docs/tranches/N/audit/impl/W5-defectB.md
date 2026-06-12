# N.W5 Defect-B — the dock view-select cannot-open + never-settles — impl lane report

**Lane:** N.W5 Defect-B remediation (dock-open). Pulls forward the chartered
**W6.B** first-paint work-order as the defect's UX root.
**Branch:** `tranche-f-handoff` · **Date:** 2026-06-12.
**Ownership:** `demo/**` dock surfaces (the first-paint decision) + `e2e/**` (the
open idiom). Paired-authorship into `../glass-ui` was AUTHORIZED but **not
needed** — see §2.
**Gates after the lane:** typecheck **0** · lint **0** · boot-smoke **PASS in
isolation** (the shared-tree boot-smoke flake is a concurrent-lane artifact, not
this lane — §6).

---

## §0 — Verdict (one paragraph)

The W2 gate's Defect-B diagnosis had **three** claimed causes; a live-probe
diagnosis (the brief's mandate: probe before choosing) **confirmed one,
refuted one, and re-rooted the third**. CONFIRMED: the desktop dock booted
COLLAPSED, so the `.glass-dock.collapsed` overlay intercepted the view-select
trigger's pointer (`elementFromPoint` = the overlay `DIV`). **REFUTED:** the
"W5.D spring keeps the dock perpetually micro-moving" claim — a 2-second
mutation count on `--dock-morph-t` at rest returned **0** on BOTH desktop and
mobile; the upstream glass-ui spring DOES reach rest and stops its rAF (the
`SpringProgress.checkSettled` epsilon-clamp + `RAFPlayback.drive` settle-stop are
sound). **NO glass-ui change was needed.** RE-ROOTED: the `force:true` click the
specs used is not a workaround for an overlay — it is the *cause* of the
closed-listbox: reka-ui 2.9's `<Select>` IGNORES (and on a primed dock,
mis-toggles) a synthetic forced click, so the listbox stayed `closed`. The fix
is two-part, both at the true root: (1) **the desktop dock boots EXPANDED**
(`Dock.vue` `:start-collapsed="false"`), so the view-select trigger is a
top-level reachable control on first paint — exactly as on mobile; (2) **the
specs use a REAL click** (the new `openView` fixture, no `force`). Live-probed:
a real click then opens the listbox deterministically (WebGL-off **5/5** and
**4/4** end-to-end; the canonical `view-switch.spec.ts` and `webgl-goo-blob.spec.ts`
**PASS** in the real harness). The residual intermittency under SwiftShader is
the **orthogonal Defect-A** WebGL renderer crash/stall (proven independent: it
vanishes with WebGL disabled), owned by the parallel N.W5 Defect-A lane.

---

## §1 — The live diagnosis (probe before choosing)

All probes ran headless Chromium (`channel: "chromium"`) against a real dev
server, at desktop `1280×720` and mobile `390×844`.

### (i) Spring-settle — REFUTED (no upstream fix)

A `MutationObserver` on the `.glass-dock` `style`/`data-morphing` attributes,
counting `--dock-morph-t` writes over 2 s **at rest** (no interaction):

| viewport | `--dock-morph-t` mutations / 2 s at rest |
|---|---|
| desktop 1280 | **0** |
| mobile 390 | **0** |
| desktop, post-expand (settled) | **0** (1.5 s window) |

The upstream spring (`@mkbabb/keyframes.js` `SpringProgress`, driven by
`dockMorphContext.ts`'s `useDockMorphOrchestrator`) settles correctly:
`checkSettled()` clamps `value→target` + `velocity→0` and sets `isSettled` once
both fall under the epsilon thresholds; `RAFPlayback.drive` returns
`!settled` and the rAF auto-stops; `maybeSettleRoot()` then removes
`--dock-morph-t` + `data-morphing` and disposes the spring. **The
"perpetually micro-animating" story is false.** No glass-ui paired-authorship
change was made (the authorization stood; the root was elsewhere).

### (ii) Collapsed-overlay interception — CONFIRMED (the W6.B root)

`document.elementFromPoint(comboCenter)` on the un-fixed desktop dock returned
`DIV.glass-dock … collapsed`, NOT the trigger button. The dock booted a 54×54
collapsed pill (`start-collapsed = isDesktop`, pre-N at `256bacd`); its
collapsed-summary layer sits over the view-select. On mobile (`always-expanded`)
the combo's `elementFromPoint` was the combo's own SVG glyph — reachable.

### (iii) `force:true` vs a real click — the RE-ROOT

On mobile (no overlay, dock already expanded), a single fresh probe:

| open mechanism | result |
|---|---|
| **plain `click()`** | `data-state="open"`, 7 options ✓ |
| **`click({ force: true })`** | `data-state="closed"` ✗ |
| `focus()` + `Enter` | `data-state="open"` ✓ |

`force:true` — the idiom every smoke spec used — is what left the listbox shut.
reka-ui 2.9's Select opens on a real pointer/keyboard activation, not a
synthetic forced click.

### (iv) The desktop end-to-end, post-fix

With `:start-collapsed="false"`: the dock boots `expanded`, `elementFromPoint`
= `BUTTON.dock-select-trigger` (overlay gone), rest-mutations **0**, and a real
`click()` opens the Select **3/4** under SwiftShader and **5/5** with WebGL off.
The lone SwiftShader miss is Defect-A (next).

### (v) Defect-A is orthogonal (the residual flake's true owner)

The SAME real-click probe, WebGL **disabled** (`--disable-webgl`): **5/5** open.
The intermittent click-timeout/page-detach under SwiftShader is purely the
WebGL renderer hit-test stall / renderer-process death — the W2-gate's Defect-A,
being fixed in the parallel lane. It is NOT a dock-open defect and NOT masked
here.

---

## §2 — The app fix (W6.B first-paint): one line, at the true root

`demo/@/components/custom/dock/Dock.vue` (the dock shell):

```diff
- <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="isDesktop" :fit-content="true" :always-expanded="!isDesktop">
+ <GlassDock ref="dockRef" :collapse-delay="5000" :start-collapsed="false"     :fit-content="true" :always-expanded="!isDesktop">
```

**Why this is the idiomatic, viewport-derived fix.** The dock's collapse surface
is already viewport-derived: mobile (`< 1024px`) is `always-expanded` (the flat
bar with the segmented control — its collapsed *pill* affordance is what the W6.B
charter calls a mobile-class affordance), and on `always-expanded` the
`startCollapsed` prop is **inert by contract** (`useDockShellProps`:
`alwaysExpanded ? false : props.startCollapsed ?? true`). So the change is
*unconditionally* "desktop boots expanded; mobile unchanged". The desktop dock
stays fully collapsible (`always-expanded` is still `!isDesktop` → `false` on
desktop; hover/focus + the 5 s idle-collapse machinery is untouched) — it merely
**starts open**, so the view-select is a reachable top-level control on first
paint, eliminating the overlay interception at its source rather than punching
through it. No flash: `GlassDock`'s `onMounted(() => { if (!startCollapsed.value)
expand() })` seats the expanded state before first interaction; the
`useMediaQuery("(min-width: 1024px)")` `isDesktop` ref is still consumed by the
mobile-edit / view-select / label paths, so nothing dangles. Live boot probe
(isolated port, clean tree): `{ mounted: true, dock: { collapsed: false,
expanded: true }, pageErrors: [] }`.

The dock does NOT auto-collapse from a bare idle (probed: still `expanded` after
7 s with no pointer) — the idle-collapse timer is scheduled on `mouseleave`, and
a headless run never enters the dock, so the expanded first-paint state holds
through the test. `expandDock` (below) still defends the collapsed case for any
viewport that boots or idles to a pill.

---

## §3 — The e2e open idiom (the real-user interaction)

NEW shared fixture `e2e/smoke/fixtures/dock.ts` — `expandDock(page)` +
`openView(page, name)`. The idiom:

1. `expandDock` — if a `.glass-dock.collapsed` pill exists (a narrow viewport or
   a post-idle collapse), a real user clicks it first; the helper then waits for
   `.glass-dock[data-morphing]` to clear (the dock's single settling spring) so
   the controls inside are at rest. No-op when already expanded (mobile, or the
   desktop expanded first-paint).
2. Real-click the `Select view` combobox (**NO force**).
3. Assert the listbox opened **via the option becoming visible**, then click it.

### The open-assertion subtlety (a second real bug the probe surfaced)

The first cut asserted `expect(viewSelect).toHaveAttribute("data-state","open")`
on `getByRole("combobox", { name: "Select view" })`. It FAILED 3/3 even with a
provably-open listbox. Root cause (live-probed): once the reka-ui Select opens,
the combobox's **computed accessible name changes** (it incorporates the live
listbox's `aria-activedescendant`), so `getByRole("combobox", { name: "Select
view" })` no longer resolves that element — `count()` went **0** while the DOM
node still carried `aria-label="Select view"` + `data-state="open"`. The robust
open-signal is the **listbox itself**: the named `option` is visible only when
open, and it is also the node we click — so the assertion and the action share
one truth. With that fix the helper opens **4/4**.

### Sites converted (all `force:true` view-select opens → `openView`)

`view-switch.spec.ts`, `walk.spec.ts`, `views/{palettes,browse,extract,generate,
gradient,mix}.spec.ts`, `webgl-goo-blob.spec.ts`, `mobile/walk.spec.ts`,
`safari/sustained-30s.spec.ts`. `flows/color-propose.spec.ts` dropped its
combobox-poke-then-Escape dock-expand workaround for `expandDock` and its
action-bar `force:true` clicks became real clicks (the controls are reachable on
the expanded dock). **Zero `force:true` remain in e2e test code** (only
doc-comment mentions). The admin specs were NOT touched — they reach views by
direct hash nav (`page.goto("/#/admin/...")`), never the view-select, so Defect-B
never blocked them (the W2-gate's "admin navigates via the view-select" was
imprecise; their blocker is Defect-A's renderer crash in the admin shell).

---

## §4 — Proof

| evidence | result |
|---|---|
| spring rest-mutations (desktop + mobile) | **0 / 2 s** — settles (no upstream defect) |
| real click opens Select, WebGL off | **5/5** (single-click) · **4/4** (`openView` end-to-end) |
| real click opens Select, SwiftShader on | **3/4** (1 miss = Defect-A WebGL stall) |
| `view-switch.spec.ts` (real harness, WebGL-isolated) | **✓ PASS** (3.4 s) |
| `webgl-goo-blob.spec.ts` (real harness, WebGL-isolated) | **✓ PASS** (2.5 s) |
| Defect-A independence | WebGL-off → 5/5; the residual flake is the renderer, not the dock |
| isolated app boot (clean port) | `mounted: true`, dock `expanded: true`, 0 page errors |
| typecheck / lint | **0 / 0** |

`view-switch.spec.ts` is the canonical Defect-B spec; its pass in the real
Playwright harness (with WebGL isolated to remove the orthogonal Defect-A crash)
is the end-to-end proof that the dock view-select opens via real clicks headless.

---

## §5 — Why no glass-ui change

The brief authorized a paired-authorship spring fix *if the perpetual motion was
upstream*. The probe proved it was NOT (rest-mutations 0; the
`SpringProgress`/`RAFPlayback` settle path is correct). The dock-open defect was
entirely demo-owned (collapsed-on-desktop first paint) + e2e-owned (`force:true`
+ a brittle open-assertion). No `../glass-ui` source was touched; its AZ docs
work was not entangled.

---

## §6 — Gate note: the boot-smoke shared-tree flake

`npm run boot-smoke` PASSED on this lane's first invocation and an isolated
clean-port boot probe mounts the demo console-clean (`mounted: true`, 0 page
errors). Mid-lane it began FAILing (white-screen / `page.goto` load timeout) —
but a `git stash` bisect proved it FAILS **with this lane's `Dock.vue` change
stashed out too**, so the failure is NOT this lane. The concurrent Defect-A lane
is actively spawning dev servers + writing probe scripts in the shared working
tree (`repro-crash.mjs`, `repro-instrument.mjs`, `test-suspend.mjs`,
`drop-exp.mjs`, timestamped within the hour), contending for the dep-optimizer
cache + ports — the boot-smoke instability tracks that, not the one-line dock
prop. The isolated boot probe is this lane's authoritative boot evidence.

---

## §7 — Files touched

**App (1 line):**
- `demo/@/components/custom/dock/Dock.vue` — `:start-collapsed="isDesktop"` →
  `:start-collapsed="false"` (W6.B: desktop boots expanded).

**e2e (new fixture + 11 specs migrated off `force:true`):**
- `e2e/smoke/fixtures/dock.ts` — NEW `expandDock` + `openView` real-user idiom.
- `e2e/smoke/view-switch.spec.ts`, `walk.spec.ts`, `webgl-goo-blob.spec.ts`,
  `flows/color-propose.spec.ts`, `mobile/walk.spec.ts`,
  `safari/sustained-30s.spec.ts`, `views/{palettes,browse,extract,generate,
  gradient,mix}.spec.ts` — `openView`/`expandDock`, no `force:true`.

**No git commit/push** (the lead integrates). No `../glass-ui` change.

---

## §8 — Disposition / hand-off

- **Defect-B: CLOSED.** The dock view-select opens via real clicks headless
  (proven). The suite's open-idiom is migrated.
- **The suite reaches full green when Defect-A lands** (the SwiftShader WebGL
  renderer crash/stall under interaction — parallel N.W5 lane). After it lands,
  re-run `npx playwright test`; the selectors + idiom are already correct, so the
  view-select-driven specs should pass on the real (SwiftShader) config.
- **boot-smoke** must be re-confirmed once the concurrent Defect-A lane's probe
  artifacts + dev servers are cleared from the shared tree.
