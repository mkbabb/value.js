# CHALLENGE-L — library structure · `demo/shell/dock/menus/MobileMenuDropdown.vue`

## Model receipt

I observe myself to be **Opus 5** (`claude-opus-5[1m]`, 1M-context variant) — the model this
seat was explicitly spawned with. Declared, not inherited.

Subject: `demo/shell/dock/menus/MobileMenuDropdown.vue` (115 lines incl. blanks; 108 non-blank).
Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
Axis: library structure — module boundaries, ownership, direction of dependency, public surface.

**Verdict: DEFECTIVE.** Nine findings; three MAJOR, one of them (L-1) a measured
79%-of-closure over-reach, and one (L-3) a live, reproducible dead-link defect the component
inherits from an undeclared producer prop. Four load-bearing claims from the root registry are
NEGATED with positive evidence (§6).

---

## 0 · What this seat measured, and with what

| instrument | what it decided |
|---|---|
| Tarjan SCC + closure walk over 250 demo modules, `import type` erased (`probe/cycles.mjs`) | L-1 closure sizes, L-9 the single cycle, the cross-area edge census |
| `difflib.SequenceMatcher` over whitespace-normalised SFC lines | L-4 fork ratio |
| chunk-graph walk over `node_modules/@mkbabb/glass-ui/dist` | L-2 barrel-vs-subpath closure; the shared-chunk negative proof |
| isolated headless Chromium at 390×844 and 1440×900 against the live dev server (`probe/probe-{mobilemenu,branches,aschild,enter,tap,gold}.mjs`) | L-2 boot bytes, L-3 dead link, L-4 both-branches-mounted, L-5 cascade, L-8 tap/keyboard |
| in-page dynamic `import()` of `demo/color-session/ink.ts` via `/@fs/` (`probe/probe-doublecert.mjs`) | L-6 the double-certification drift table |

Every browser number below comes from a **private** context I launched myself. An earlier probe
through the shared MCP browser produced a spuriously cycling route and a reverted viewport —
another seat was driving the same Chrome. Nothing from that session is reported here.

---

## 1 · The import ledger — every edge, traced to its home

`MobileMenuDropdown.vue:1-14`

| # | line | specifier | resolves to | verdict |
|---|---|---|---|---|
| 1 | :2 | `vue` | peer | OK |
| 2 | :4-5 | `@lucide/vue` | devDependency | OK (demo-only) |
| 3 | :6 | `@mkbabb/glass-ui/dark` | published subpath, 2-module closure | **OK — exemplary** |
| 4 | :10 | `../../../ui/dropdown-menu` | `demo/ui/dropdown-menu/index.ts` → `@mkbabb/glass-ui` **root barrel** | **L-2 MAJOR** |
| 5 | :11 | `@mkbabb/glass-ui/dock` | published subpath, 32-module closure | OK |
| 6 | :12 | `../../../ui/avatar` | `demo/ui/avatar/index.ts` → root barrel (no `./avatar` subpath exists) | **L-2 MAJOR (producer gap)** |
| 7 | :13 | `../../../palettes/usePalettePorts` | the palettes feature's 275-line five-port provider | **L-1 MAJOR** |
| 8 | :14 | `../../../color-session/useContrastSafeColor` | the ink instrument, 5-module closure | OK (see L-6 for the *value* passed in) |

Two of eight edges cross a boundary they should not. Lines 6/11 and 10/12 use **two different
conventions for the same producer in the same file** — bare subpath for `dark`/`dock`, a
demo-local relative shim for `dropdown-menu`/`avatar`.

### The `@mkbabb/value.js` question — SOUND, and provably so

This component imports value.js not at all. Its transitive reach is
`@mkbabb/value.js/color` + `@mkbabb/value.js/css` through `demo/color-session/ink.ts:1-12`.
Tree-wide census:

```
$ grep -rhn '@mkbabb/value.js[^"]*"' demo/ -o | sed 's/^[0-9]*://' | sort | uniq -c | sort -rn
  25 @mkbabb/value.js/color"
  10 @mkbabb/value.js/css"
   6 @mkbabb/value.js/math"
   5 @mkbabb/value.js/easing"
   4 @mkbabb/value.js/quantize"
$ grep -rn '"@src/' demo/ | grep -v assets/docs
(no output)
```

Fifty bare imports, all five specifiers present in `package.json#exports`, **zero** deep `src/`
reaches outside the exempt `assets/docs/*.md` source-embed pages, zero `dist/` paths. A real
consumer of `@mkbabb/value.js@4.0.0` could write every one of these lines verbatim. The T.W1
dogfood keystone holds. **No finding on this axis.**

---

## 2 · MAJOR findings

### L-1 · MAJOR — a Symbol drags 31 of the component's 39-module closure across a feature boundary

`MobileMenuDropdown.vue:13` — `import { SESSION_PORT_KEY } from "../../../palettes/usePalettePorts"`.

Measured closures (runtime imports only, `import type` erased):

```
demo/shell/dock/menus/MobileMenuDropdown.vue  ->  39 modules  {shell:1, color-session:5, palettes:23, platform:8, ui:2}
demo/palettes/usePalettePorts.ts              ->  31 modules  {palettes:23, platform:8}
demo/color-session/useContrastSafeColor.ts    ->   5 modules  {color-session:5}
```

**79 % of this component's demo-module graph (31/39) exists solely to deliver one `InjectionKey`
Symbol.** The modules dragged in include the entire palette API layer and auth stack, none of
which the menu touches:

```
demo/palettes/api/{admin-audit,admin-colors,admin-users,admin-palettes,colors,versions,palettes}.ts
demo/palettes/{useAdminUsers,useAdminTags,useAdminFlagged,useAdminAudit,useBrowsePalettes,
               useColorNameQueue,useVersionHistory,usePaletteStore,usePaletteActions,
               useSlugMigration,useTagEdit,useFilteredList,constants,utils}.ts
demo/platform/transport/{client,api-problem}.ts
demo/platform/auth/{useAdminAuth,useUserAuth,useSession,sessions,sessionToken}.ts
demo/platform/storage/useSafeStorage.ts
```

The component consumes **four** members of `SessionPort` (`userSlug`, `isAdminAuthenticated`,
`userLogout`, `onRegenerateSlug`; template :45/:58/:61/:65). The port itself is fine — seven
members, cohesive (`usePalettePorts.ts:126-134`). What is wrong is its **home**.

**Direction of dependency.** The shell is the app's outer chrome; `palettes` is a feature. Census
of the demo cross-area runtime graph:

```
  5  shell -> palettes        (all five are SESSION_PORT_KEY)
  0  palettes -> shell
```

No cycle — but the arrow points the wrong way. The shell must not know a feature exists. And the
identity concern the port exposes does not belong to `palettes` in the first place: its own
implementations already live one layer down, in `demo/platform/auth/{useUserAuth,useAdminAuth,
useSession}.ts`. `usePalettePorts` merely re-exports them through a Symbol that happens to sit in
the palettes tree.

**Mechanism.** A contract token (`InjectionKey<T>` + the interface it keys) was co-located with
its *provider* instead of living in a leaf. Importing a token then means importing a construction.

**Cure (transposition, not patch).** Identity is a `platform` concern:

```
demo/platform/session/port.ts       # SessionPort interface + SESSION_PORT_KEY  — LEAF, 0 runtime deps
demo/platform/session/provide.ts    # providePalettePorts' PORT-1 half moves here; the composition
                                    # root calls it; palettes/ consumes the key like anyone else
```

Then `shell -> palettes` drops to 0 and this component's closure falls from 39 to ~9. The other
four shell consumers (`Dock.vue:18`, `DockViewSelect.vue:8`, `SlugEditLayer.vue:5`,
`ProfileSection.vue:14`) are cured by the same move.

---

### L-2 · MAJOR — `demo/ui/` is a 19-module, 29-line pure re-export shim layer; reaching glass-ui through it costs a 234 609-byte root barrel on the dev boot path

`MobileMenuDropdown.vue:10,12`.

```
$ wc -l demo/ui/*/index.ts | tail -1
      29 total
$ find demo/ui -type f ! -name index.ts
(no output)
```

Nineteen directories, twenty-nine lines, **zero implementation**. Eighteen are literally one line:

```ts
// demo/ui/dropdown-menu/index.ts
export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, … } from "@mkbabb/glass-ui";
// demo/ui/avatar/index.ts
export { Avatar, AvatarImage, AvatarFallback } from "@mkbabb/glass-ui";
```

The nineteenth documents itself as exactly the thing the standing edicts forbid
(`demo/ui/alert/index.ts:1-9`):

> *"This barrel previously held a local shadcn-vue re-implementation … B.W2 converted it to a
> re-export … **The two consumers … import from this barrel unchanged.**"*

A shim kept so consumers would not have to be migrated is the definition of back-compat. Owner
edict 2 (no legacy code, no aliases, no dual paths) and edict 3 (no wrapper layers that do not
already need to exist) are both violated, tree-wide, and this component contributes 2 of the tree's 87
relative `ui/…` import sites (`grep -rn 'from "\.\./…/ui/' demo/ | wc -l` → 87).

**The measured cost.** Every one of the 19 shims imports the glass-ui **root barrel**, not a
subpath. Closure of the producer's own dist entries:

```
glass-ui.js       66 modules  218.9 KB
dropdown-menu.js  11 modules   23.5 KB
dock.js           32 modules   98.9 KB
dark.js            2 modules    2.4 KB
barrel-only modules (in barrel closure, not in dropdown-menu closure): 56
```

Live dev boot, private context, 390×844, `/#/`:

```
@mkbabb_glass-ui.js          234 609 B   startMs 15   <- the ROOT BARREL, first glass chunk on the path
@mkbabb_glass-ui_aurora.js   202 967 B   startMs 45
@mkbabb_glass-ui_blob.js     104 969 B   startMs 45
@mkbabb_glass-ui_dock.js      45 541 B   startMs 17
@mkbabb_glass-ui_dark.js       2 764 B   startMs 15
```

There is **no** `@mkbabb_glass-ui_dropdown-menu.js` in `node_modules/.vite/deps` — because nothing
in the tree imports that subpath. The producer publishes it (`package.json#exports["./dropdown-menu"]`)
and it is dead.

**Honest scope.** In the *production* build this is tree-shaken away — I checked
`dist/gh-pages/assets` for seven barrel-only symbols (`FourierField`, `LiquidGrid`, `Timeline`,
`DataTable`, `Typewriter`, `Handmark`, `PaperBackdrop`): **0 hits each**, against 0–2 demo uses.
`sideEffects: ["*.css"]` does its job. The cost is **dev-loop only** — and dev is where every
author and every one of this mega-tranche's browser gates lives.

**The producer gap, stated precisely.** Mapping the 19 shims onto `glass-ui@7.0.0`'s exports map:

- **13 can go direct today**: badge, button, card, collapsible, dialog, **dropdown-menu**, label,
  popover, select, separator, slider, switch, tooltip.
- **6 have no subpath**: alert, **avatar**, checkbox, input, radio-group, skeleton.

So `MobileMenuDropdown.vue:10` (`dropdown-menu`) is curable in-repo *today*; `:12` (`avatar`) is
blocked on a producer ask. That ask rides the standing BH/BI relay fond — *publish
`./avatar`, `./alert`, `./checkbox`, `./input`, `./radio-group`, `./skeleton` subpaths* — never a
local patch.

**Cure.** Delete `demo/ui/` in one move; rewrite all 87 consumer imports to
`@mkbabb/glass-ui/<component>`; for the six gap primitives import the root barrel **directly and
visibly** (`import { Avatar, AvatarImage } from "@mkbabb/glass-ui"`) with the BH ask booked, so the
debt is legible at the call site instead of hidden behind a directory that pretends to be a design
system. Add an eslint `no-restricted-imports` ban on `@mkbabb/glass-ui` (root) with a
six-name allow-list that shrinks as the producer lands the subpaths — a self-retiring gate.

---

### L-3 · MAJOR — `as-child` on `DropdownMenuItem` is undeclared and silently ignored: the GitHub row is 73 % dead to touch and 100 % dead to keyboard

`MobileMenuDropdown.vue:92-99` (and byte-identically `ProfileSection.vue:158-165`).

The producer's declared surface (`node_modules/@mkbabb/glass-ui/dist/components/dropdown-menu/DropdownMenuItem.vue.d.ts`):

```ts
export interface DropdownMenuItemProps {
    disabled?: boolean;
    textValue?: string;
    inset?: boolean;
    class?: HTMLAttributes["class"];
}
```

There is **no `asChild`**. The demo writes it anyway. Vue does not error on an unknown attribute
passed to a component, and `vue-tsc` does not either — so the typecheck is green and the prop is a
no-op. The rendered DOM (private context, 390×844, menu open):

```json
{ "tag": "DIV", "txt": "GitHub", "role": "menuitem", "h": 55.4,
  "containsAnchor": true, "anchorDisplay": "block", "anchorTabIndex": 0 }
```

versus the three sibling rows: `containsAnchor: false, h: 44`. The anchor did not *become* the
menuitem; it is nested inside it.

**Three measured consequences.**

1. **Layout.** Row height 55.4 px vs 44 px for every sibling; the icon and the word "GitHub" wrap
   onto two lines. Visible in the capture at `probe/mobilemenu-open.png` — the only two-line row
   in the menu.

2. **Touch: 73 % of the row is dead.** Row box `200.6 × 55.4` at `(101, 223.75)`; live anchor box
   `68.6 × 43.4` at `(109, 229.75)` — 26.8 % of the row's area.
   ```
   tap at (239.6, 251.4)  — inside the row, right of the anchor  ->  newPages 0, menu closed
   tap at anchor centre                                          ->  newPages 1, https://github.com/mkbabb/value.js
   ```

3. **Keyboard: the link is unreachable.** Roving-focus walk with ArrowDown:
   `Login → Share color → GitHub → Dark mode` — focus lands on the **DIV**, never the anchor.
   Enter on the focused GitHub row:
   ```
   { "focusedRow": "GitHub", "urlChanged": false, "newPages": 0, "menuStillOpen": false }
   ```
   It closes the menu and navigates nowhere. There is no `@select` handler on that item
   (:92) because the author believed `as-child` had made the anchor the item.

Also WAI-ARIA 1.2 invalid: `role="menuitem"` takes presentational children; a focusable `<a>`
inside it is not a permitted structure.

**Mechanism.** The demo codes against a **believed** producer API rather than the published one.
Nothing in the toolchain can catch it: fallthrough attributes are legal, so the false belief is
type-checked green and renders "almost right".

**Cure.** Rows become data, not markup (see §5). A row carrying `href` renders as
`<DropdownMenuItem @select="() => window.open(href, '_blank', 'noopener')">` — the whole 200 px is
live, Enter works, the ARIA tree is valid, and there is no nested interactive element. In parallel,
relay to glass-ui: *`DropdownMenuItem` should either declare and forward `asChild` (reka-ui's
`MenuItem` supports it) or reject it loudly*. Until it lands, the `as-child` spelling must not
appear in the demo at all.

---

## 3 · The fork, and what desktop renders that mobile does not

### L-4 · MAJOR — 78.7 % byte-identical twin, and **both are always mounted**

```
ProfileSection non-blank lines: 170
MobileMenuDropdown non-blank lines: 108
identical matched lines: 85            -> 78.7 % of MobileMenuDropdown
longest identical run: 28 lines  (ProfileSection[142] ≡ Mobile[80])
   = the whole @mbabb block: avatar + Share color + GitHub + separator + Dark mode
next runs: 15 lines (the slug pill), 9 lines (the avatar/bio block), 7 lines (the import tail)
```

(A prior pass measured 81 % on a different normalisation; my 78.7 % corroborates rather than
contradicts. Same identity.)

The responsive split is **CSS only** — `lg:hidden` at `:38`, `hidden lg:flex` at
`ProfileSection.vue:48,127`. Measured in private contexts:

| | 390 × 844 | 1440 × 900 |
|---|---|---|
| `[aria-label="Menu"]` in DOM / visible | 1 / **1** | 1 / **0** |
| `nav .hidden.lg\:flex` hosts in DOM / visible | 2 / **0** | 2 / **2** |
| `nav button` in DOM / visible | 12 / 10 | 20 / 17 |

Both twins mount at every viewport. Each runs `inject(SESSION_PORT_KEY)`, `useGlobalDark()`, and
`useSafeAccentFn(...)` (ProfileSection twice — `chrome` + `floating`), and each registers a
`bumpProbeEpochOnMount` in `useContrastSafeColor.ts:74`. Three `usePopupMutex` keys
(`Dock.vue:67-69`) are alive in every viewport for two menus of which one is invisible.
`display:none` keeps the hidden branch out of the a11y tree, so this is a *cost and duplication*
defect, not an a11y one.

### L-5 · MINOR — the fork has diverged, and the desktop half's animation is cascade-dead

`ProfileSection.vue:96` vs `MobileMenuDropdown.vue:67`, the admin pill:

```html
<!-- desktop -->  <span class="slug-pill … gold-shimmer" style="border-color: var(--color-gold); color: var(--color-gold)">admin</span>
<!-- mobile  -->  <span class="slug-pill … text-muted-foreground" style="border-color: var(--muted-foreground); color: var(--muted-foreground)">admin</span>
```

`.gold-shimmer` is the producer's metal register
(`glass-ui/dist/styles/utilities/base-misc.css`): a 250 %-wide gold gradient, `background-clip: text`,
`color: transparent`, `animation: metal-shimmer-sweep` under `prefers-reduced-motion: no-preference`.
Cascade measured by reproducing both markups verbatim in the live document:

| | `color` | `background-clip` | `animation-name` |
|---|---|---|---|
| desktop pill (as authored) | `oklch(0.751 0.147 84.2)` — **opaque gold** | `text` | `metal-shimmer-sweep` |
| control: `.gold-shimmer`, no inline colour | `rgba(0, 0, 0, 0)` | `text` | `metal-shimmer-sweep` |
| mobile pill (as authored) | `rgb(124, 102, 80)` | `border-box` | `none` |

The inline `style` attribute outranks the class, so `color: transparent` never applies and the
clipped gradient is painted **under an opaque glyph**. The animation runs and is invisible. This is
the identical pathology this very file documents for the login button ten lines later
(`ProfileSection.vue:103-110`, *"the `border-primary/30` accent voice was cascade-DEAD"*) — the
lesson was written down and the neighbouring element was not fixed. Edict 5 (style at the root
component level, never per-instance overrides) and edict 6 (animations are never deleted) both bite.

Mobile, meanwhile, has no gold and no shimmer at all: an authenticated admin sees a muted-brown
chip on a phone and (intended) gold on a laptop.

### The asked comparison — what desktop renders that mobile does not

| desktop (`ProfileSection.vue`) | mobile (`MobileMenuDropdown.vue`) |
|---|---|
| two `DockSeparator` (glass-ui, :49/:123) | none |
| a **text-labelled** `Button variant="outline"` trigger ("Profile" / "Login", :59-68, :111-120) | an **icon-only** `DockTrigger for="dropdown"` (:40-42) |
| `data-o18="profile-trigger"` census hook (:64) — present only while logged in | **no O-18 hook at all**: the mobile menu ink is never certified by the census |
| gold `.gold-shimmer` admin pill (:96) | muted-foreground pill, no shimmer (:67) |
| a `DropdownMenuSeparator` before "Regenerate slug" (:86) | no separator — four identity rows in one undivided group (:52-63) |
| **two** DropdownMenu roots (profile + @mbabb) → two mutex keys | one root, one key |
| the `chrome`-rung ink instance (`useSafeAccentFn("chrome")`, :28) | only the `floating` rung (:23) |

**MT-F005 does not live here.** Measured on mobile: nameless focusable buttons = **0** (§6).
The nameless button is `ColorInput.vue`'s `send-btn`, already booked; and `ColorInput` renders only
in the desktop action bar, which is exactly the desktop-only / mobile-zero pattern MT-F005 reports.
This component's trigger is correctly named: `aria-label="Menu"`, `aria-haspopup="menu"`,
`aria-expanded="false"`, `type="button"`. Glass-ui's `DockTrigger` uses `inheritAttrs: false` and
spreads `$attrs` onto the reka trigger (`dock.js`, the `for === "dropdown"` branch), so the label
lands on the real button.

---

## 4 · Ownership

### L-6 · MAJOR — the certified accent is certified twice; the prop name says otherwise

`Dock.vue:35` injects `SAFE_ACCENT_KEY` — the ink **already certified against the resting plate**
by `useContrastSafeColor` and provided at `useAtmosphereBoot.ts:91`. `Dock.vue:209` then passes it
down as:

```
:css-color-opaque="safeAccent"
```

and `MobileMenuDropdown.vue:23-24` certifies it **again**, against the floating rung:

```ts
const { safeCss } = useSafeAccentFn("floating");
const menuInk = computed(() => safeCss(cssColorOpaque));
```

The D6 contract both twins document in their own comments is *"certify the RAW pick against the
surface it actually composites over"* (`ProfileSection.vue:22-27`). The raw pick was one identifier
away — `Dock.vue:34` injects `CSS_COLOR_KEY` into scope and does not use it here.

**Measured drift.** Dynamic-importing `demo/color-session/ink.ts` in the live document and running
the contract's single walk against the shipped double walk (static producer rung model,
`ambient = 0.62`, light scheme; `L_resting = 0.85`, `L_floating = 0.924`):

| pick | contract `raw → floating` | shipped `raw → resting → floating` | ΔL | ΔC |
|---|---|---|---:|---:|
| `oklch(0.75 0.15 30)` | L 47.52 % | L 42.08 % | **−5.43 pp** | 0 |
| `oklch(0.62 0.2 140)` | L 44.47 %, C 0.1432 | L 39.17 %, C 0.1261 | −5.30 pp | **−12 %** |
| `oklch(0.55 0.18 250)` | L 45.80 %, C 0.1296 | L 40.34 %, C 0.1142 | −5.46 pp | −12 % |
| `oklch(0.85 0.1 90)` | L 45.86 % | L 40.39 % | −5.47 pp | −12 % |
| `oklch(0.45 0.22 320)` | L 45.00 % | L 43.14 % | −1.86 pp | −4 % |
| `rgb(255 0 0)` | L 48.16 %, C 0.1976 | L 42.42 %, C 0.1741 | **−5.74 pp** | −12 % |
| `rgb(0 128 255)` | L 46.19 %, C 0.1583 | L 40.68 %, C 0.1394 | −5.51 pp | −12 % |

**7 / 7 differ.** The shipped ink is uniformly darker and less chromatic than the contract
prescribes. The absolute numbers depend on the rung model (the live probe reads different tints);
the *direction* does not — `certifyAccentInk` is a monotone walk away from the surface, so composing
two walks can only over-correct, never return. The user's picked colour is muted further than the
guard requires, systematically, on the menu that carries their identity.

**Mechanism.** Ownership of "which colour travels this prop" is unstated. The name
(`cssColorOpaque`) claims raw; the wiring supplies certified; the component re-applies the guard.
Three parties, no single owner.

**Cure.** One of two, not both: either the prop is renamed `pickedColorOpaque` and `Dock.vue:209/220`
passes `cssColorOpaque` (restoring the documented D6 contract), **or** the prop is renamed
`certifiedInk`, the component drops `useSafeAccentFn` entirely, and the boot writer publishes a
per-rung certified ink (`SAFE_ACCENT_FLOATING_KEY`) so each rung is certified exactly once, at one
site. The second is the better lattice: certification becomes a boot-owned map from rung to ink,
and no view component ever holds the guard.

### L-7 · MINOR — the `@mbabb` identity block is hardcoded twice, and is not menu content

`MobileMenuDropdown.vue:79-87` ≡ `ProfileSection.vue:144-152`, a 9-line identical run carrying a
third-party avatar URL, a GitHub handle, and the product tagline:

```html
<AvatarImage src="https://avatars.githubusercontent.com/u/2848617?v=4" />
<a href="https://github.com/mkbabb" …>@mbabb</a>
<p …>Color space picker &amp; converter</p>
```

Product identity is not view state. It belongs in one module (`demo/shared/identity.ts` or the
app's existing config surface), read by both presentations. Measured a11y consequence of it being
raw markup inside `role="menu"`: the `<a>@mbabb</a>` renders **51.7 × 17 px** — under WCAG 2.5.8's
24 × 24 minimum — and never appears in the roving focus walk (`Login → Share color → GitHub →
Dark mode`). A bare `<div>` and `<a>` are not permitted children of `role="menu"`.

---

## 5 · Modularization — the greenfield lattice

Structured today with no legacy, concretely:

```
demo/
  platform/                     — no UI, no feature knowledge, no upward edges
    auth/        useUserAuth · useAdminAuth · useSession          (unchanged)
    session/
      port.ts    SessionPort interface + SESSION_PORT_KEY          ← LEAF: zero runtime deps
      provide.ts providePalettePorts' PORT-1 half, called by the composition root
    identity.ts  { handle, avatarUrl, tagline, repoUrl }           ← one home for L-7

  color-session/                — the ink instrument (unchanged; 5-module closure is correct)
      keys.ts    SAFE_ACCENT_KEY + SAFE_ACCENT_FLOATING_KEY + SAFE_ACCENT_CHROME_KEY
                 — certification happens ONCE per rung, at the boot writer (L-6)

  shell/
    dock/
      identity/
        useDockIdentityMenu.ts  ← THE MODEL. Returns MenuRow[]:
                                    { id, icon, label, kind: "command" | "link",
                                      onSelect?, href? }
                                  Reads platform/session + platform/identity.
                                  ONE home for what the menu contains.
        DockIdentityMenu.vue    ← THE VIEW. props: { rows, variant: "bar" | "overflow" }
                                  "bar"      → labelled Buttons + separators (today's desktop)
                                  "overflow" → one DockTrigger + one DropdownMenu (today's mobile)
                                  Rendered with v-if on a useMediaQuery breakpoint:
                                  exactly ONE branch mounts (kills L-4's double mount).
      Dock.vue                  ← imports ./identity/DockIdentityMenu directly
    # demo/shell/dock/index.ts  DELETED — it is the tree's only runtime cycle (L-9)

  # demo/ui/  DELETED (L-2). Every consumer imports @mkbabb/glass-ui/<component>;
  #           the six primitives with no subpath import the root barrel explicitly,
  #           each with the BH relay ask booked at the call site.
```

**Standing rules the lattice enforces (eslint `no-restricted-imports`, file globs pointed at the
real tree — see L-8):**

- `demo/shell/**` may import `platform`, `color-session`, `shared`. It may **not** import
  `palettes`, `picker`, `workbenches`, `scenes`. (Kills L-1 and prevents its return.)
- `@mkbabb/glass-ui` (root specifier) is banned outside a six-name allow-list that shrinks to zero
  as the producer publishes the missing subpaths. (Kills L-2, self-retiring.)
- `demo/color-session/**` and `demo/platform/**` may not import upward into `demo/color-picker/**`
  (app-root boot) or into any feature.

**Why the model/view split is the right cut, not a wrapper for its own sake.** The two menus today
share 78.7 % of their bytes and *all* of their semantics — the same four identity commands, the same
three @mbabb rows, the same dark-mode command. What differs is purely presentational: labelled bar
vs icon-and-popover. Rows-as-data is the smallest structure that makes that difference a `variant`
instead of a copy, and it dissolves L-3 and L-7 as a side effect (a `kind: "link"` row renders
through `@select`, never through a nested anchor). It adds one composable and removes one component
— net −1 module, −78 duplicated lines, −1 always-mounted subtree.

---

## 6 · Negative proofs — four registry claims, negated with evidence

**MT-F009 (three parallel dark stores) is CURED; the residue is one deliberate line.**
```
$ grep -rn "useGlobalDark\|useDark" demo/ | grep -v '\.md:'
→ 11 call sites, every one glass-ui's useGlobalDark. Zero vueuse useDark instances.
$ grep -rn 'classList.contains("dark")' demo/ src/
demo/color-session/useContrastSafeColor.ts:242
```
That single line is the tint cache's validity stamp, documented at `useContrastSafeColor.ts:229-238`
as reading DOM truth deliberately so a probe that raced a scheme flip self-corrects. It is not a
parallel store. The retirement is recorded at `useMarkdownHighlighting.ts:76-80` (S.W4-8).
**This component's `useGlobalDark()` at :34 is correct and needs no change.**

**D58.i (nesting a theme command inside a clickable row double-toggles) is NOT LIVE here.**
Measured: `darkBefore: false → darkAfter: true` on one tap of the Dark mode row; exactly one flip;
`menuOpenAfterDark: true` (the `@select.prevent` at :101 holds the menu open, matching desktop).
The decorative `Moon`/`Sun` glyph at :108-109 is `aria-hidden` and non-interactive. The comment at
:102-110 describes the design correctly and the design works.

**MT-F005 does not touch this component.** Mobile nameless-focusable-button census, live, 390×844:
`[]` — zero. The trigger carries `aria-label="Menu"`, `aria-haspopup="menu"`,
`aria-expanded="false"`, `type="button"`, and measures 42.7 × 33.3 px (clears WCAG 2.5.8's 24 × 24;
short of 44 × 44 on height, which is a separate, already-booked tap-target row).

**No dual glass-ui instance, despite the mixed import paths.** `demo/ui/dropdown-menu` (root barrel)
and `@mkbabb/glass-ui/dock` (subpath) both resolve to the same chunks:
```
$ grep -o 'DropdownMenuTrigger-[A-Za-z0-9_-]*\.js\|dropdown-menu-[A-Za-z0-9_-]*\.js' \
      node_modules/@mkbabb/glass-ui/dist/{glass-ui.js,dock.js,dropdown-menu.js} | sort -u
DropdownMenuTrigger-ClIq8RJE.js
dropdown-menu-BlbnvMaZ.js
```
So `DockTrigger for="dropdown"` (which renders that shared trigger internally) and the demo's
`DropdownMenu` root share one reka-ui context. L-2 is a graph-weight and legacy-shim finding, **not**
a correctness one. Stated so the cure is not over-scoped.

---

## 7 · Remaining findings

### L-8 · MINOR — the mobile menu has **zero** coverage in every gate the repo runs

```
$ grep -rn 'aria-label="Menu"\|MobileMenu\|mobile-menu' e2e/ test/
(no output)
$ grep -rn "MobileMenuDropdown" demo/ e2e/ test/ | grep -v '\.md:'
demo/shell/dock/Dock.vue:11
demo/shell/dock/Dock.vue:207
```

No unit test, no e2e spec, no oracle. The visual audit captures the **closed** state only — its own
per-capture table records `safari-mobile-light /#/` text = **70** characters against desktop's
**859**, because the entire identity/share/theme surface is behind a trigger the harness never
opens. The only route to Login, Share color, GitHub and Dark mode on a phone is ungated by
everything. L-3 (a dead link) and L-5 (a dead animation) both survived to HEAD for exactly this
reason.

### L-9 · MINOR — the demo's only runtime import cycle is this component's host

Tarjan over 250 demo modules, `import type` erased: **1** SCC of size > 1.

```
demo/shell/dock/Dock.vue  <->  demo/shell/dock/index.ts
```

`index.ts` re-exports `GlassDock`/`DockLayerGroup`/`DockLayer` from `@mkbabb/glass-ui/dock` **and**
`Dock.vue`; `Dock.vue` mounts `MobileMenuDropdown`. The barrel adds nothing — its glass-ui half is a
second alias for a specifier that already works, its local half is one default export. Delete it;
`App.vue` imports `./dock/Dock.vue` directly. (Independently filed by a prior pass; corroborated
here by measurement.) The subject component itself is clean of the cycle: it imports
`@mkbabb/glass-ui/dock` directly at :11, never the barrel.

### L-10 · INFO — the demo's structural eslint bans match ~zero files

`eslint.config.js:~250-330` bans feature-internal and app-root reaches over these globs:

```
demo/color-picker/**   demo/@/components/**   demo/@/lib/**   demo/@/composables/**
```

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

W43/RF-15 moved the demo to `shell/ palettes/ color-session/ platform/ picker/ scenes/ ui/
workbenches/ shared/`. Three of the four globs address a tree that no longer exists; the bans they
encode (features depend on shared, never the reverse; the shared layer never reaches up into boot)
are exactly the class of rule that would have caught L-1 the day it landed. The guard is
structurally present and functionally dead. (Also independently filed; corroborated.)

### L-11 · INFO — `verbatimModuleSyntax` and Vue 3.5 idiom: both clean

No type-only import exists in this SFC, so edict 8 has nothing to bind. `defineProps` uses reactive
destructure (:16-19), `defineModel` is used for the open state (:32) — both Vue 3.5-idiomatic. No
`useTemplateRef` is needed (no template refs). No `shallowRef`/`defineModel` stale-read hazard: the
model is a boolean write-through to `Dock.vue`'s mutex computed, never read-after-write.
**No finding.**

---

## 8 · Summary table

| id | sev | one line | evidence |
|---|---|---|---|
| L-1 | MAJOR | a Symbol from `palettes/` drags 31 of 39 closure modules into the shell | closure walk: 39 → 8 without the edge |
| L-2 | MAJOR | `demo/ui/` = 19 shims / 29 lines, all → the 234 609 B root barrel | `wc -l`, dev boot resource timing, exports-map map |
| L-3 | MAJOR | `as-child` undeclared → GitHub row 73 % dead to tap, 100 % dead to keyboard | `DropdownMenuItemProps` d.ts; tap/Enter probes |
| L-4 | MAJOR | 78.7 % identical twin; **both** mount at every viewport | difflib 85/108; DOM census at 390 and 1440 |
| L-5 | MINOR | forks diverged; desktop's `.gold-shimmer` is cascade-dead under an inline colour | computed-style probe, 3 markups |
| L-6 | MAJOR | the accent is certified twice; 7/7 picks drift ~−5.5 pp L, −12 % C | in-page `ink.ts` import, drift table |
| L-7 | MINOR | `@mbabb` identity hardcoded twice; its `<a>` is 51.7 × 17 px and unfocusable | 9-line identical run; focus walk |
| L-8 | MINOR | zero unit/e2e/oracle coverage; visual audit captures the closed state only | greps; REPORT.md text counts 70 vs 859 |
| L-9 | MINOR | the demo's only runtime cycle is `Dock.vue ↔ dock/index.ts` | Tarjan, 250 modules, 1 SCC |
| L-10 | INFO | the eslint boundary bans glob a `demo/@` tree that no longer exists | `ls -d demo/@` |
| L-11 | INFO | `verbatimModuleSyntax` + Vue 3.5 idiom clean — no finding | source read |

**Strongest defect: L-1** — 79 % of this component's module graph exists to deliver one injection
key from a feature the shell must not know about. It is the finding whose cure (move the session
port to `platform/`) simultaneously repairs four sibling shell components and restores the demo's
layer direction; and it is the boundary error that every other structural finding here grew in.

---

*Probe scripts and the open-menu capture: `docs/tranches/V/megatranche/audit/components/shell-dock-mobilemenudropdown/probe/`.
No file outside this directory was modified by this seat.*
