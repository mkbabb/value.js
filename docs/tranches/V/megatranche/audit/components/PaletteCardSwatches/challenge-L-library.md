# CHALLENGE-L — library structure · `PaletteCardSwatches.vue`

## Model receipt

I observe myself to be **Opus 5** (exact model id `claude-opus-5[1m]`, 1M-context variant), spawned
with an explicit Opus 5 declaration by the mega-tranche component-audit orchestrator. The seat is
declared, not inherited.

- Subject: `demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue` (96 lines, area `palettes`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: **library structure** — module boundaries, ownership, dependency direction, public surface

---

## Verdict: **DEFECTIVE**

The premise handed to this seat is correct, and more literally than the brief anticipated. The
defect is not that this component reaches across a *demo* boundary. It is that the component's
entire interactive surface is wired to **@mkbabb/glass-ui through channels that are not part of
glass-ui's `exports` contract** — a Vue prop that no longer exists, and two CSS class names that
no longer exist. Both channels are invisible to every gate in the repo. The result is measurable on
the live dev server: **the swatch is a `<span aria-hidden="true">` with `pointer-events: none`, and
the hover action panel renders 756 px off the left edge of the document, unstyled, below the fold.**

`vue-tsc -p tsconfig.demo.json --noEmit` exits **0**. The demo typecheck is the trust boundary the
tranche docs celebrate (`tsconfig.demo.json` header, `dist/*.d.ts` "trust boundary"), and it does
not see any of this.

Strongest defect: **L-2**.

---

## Method — everything I ran

```
$ node -e "…closure('./glass-ui.js') / closure('./dom.js')…"    # transitive module closure
$ grep -rn "p-1.5 rounded-sm hover:bg-accent active:scale-95" demo/ | wc -l
$ node -e "…scan glass-ui dist CSS for 'floating-panel' / 'btn-interactive'…"
$ cat node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo EXIT=$?
$ for g in demo/color-picker demo/@/components demo/@/lib demo/@/composables; do …find…; done
$ git log --oneline -L '/glass-ui/,+1:package.json'
```
Live probes (Playwright MCP, `http://localhost:9000`, viewport 1512×806, dark):
navigate `/#/palettes` → real `click()` on `[aria-label="Palette: Audit Alpha"]` → real `hover()` on
the first swatch wrapper → `getComputedStyle` / `getBoundingClientRect` readback. One full-page
screenshot saved at `evidence-hover-panel-offscreen.png` (this directory).

---

## Findings

### L-1 · BLOCKER — `.floating-panel` is a dead class; the hover action panel renders off-screen and unstyled

`SwatchHoverMenu.vue:42` — the panel `PaletteCardSwatches` drives — is `class="floating-panel"`
inside `<Teleport to="body">`, positioned only by the inline `floatingStyle`. **No rule for
`.floating-panel` exists anywhere.**

```
$ grep -rn "floating-panel" demo/ src/
demo/DESIGN.md:273: … Shared keyframes (dialog, floating-panel, card-menu, shimmer) come from `@mkbabb/glass-ui/styles/animations.css`.
demo/styles/animations.css:2: * Shared keyframes (dialog, floating-panel, card-menu, shimmer, etc.)
demo/palettes/browser/card/SwatchHoverMenu.vue:42:                    class="floating-panel"
demo/palettes/browser/card/composables/useHoverPopover.ts:7: * Shared hover-timer + floating-panel positioning pattern.
```
Two prose mentions, one template use, one comment. Zero declarations. And in glass-ui 7.0.0
(`node_modules/@mkbabb/glass-ui/dist/glass-ui.css` + all 20 files under `dist/styles/`) the string
`floating-panel` does not occur — my node scan printed nothing.

Runtime confirmation (`getComputedStyle` on a synthetic probe div, live page):

| class | position | background | box-shadow | z-index |
|---|---|---|---|---|
| *(bare div)* | static | rgba(0,0,0,0) | none | auto |
| `floating-panel` | static | rgba(0,0,0,0) | none | auto |
| `btn-interactive` | static | rgba(0,0,0,0) | none | auto |
| `glass-floating` | **relative** | oklab(0.379…/0.894) | 8-layer glass stack | auto |

`glass-floating` is live — glass-ui *does* ship a floating surface atom. `floating-panel` is not it.

**Reproduction (real events, measured):** `/#/palettes` → click the "Audit Alpha" card to expand →
hover the first swatch wrapper. `useHoverPopover.positionPanel` computes **correctly**
(`top: 491.547px; left: 824.445px` for a swatch at `x=804.4, w=40, y=533.5` — exact centre, exact
−42 px offset). But because `.floating-panel` has no `position` rule, the element is `static` and
both offsets are inert:

```json
{ "parentTag": "BODY", "position": "static",
  "inline": "top: 491.547px; left: 824.445px; transform: translateX(-50%);",
  "bg": "rgba(0, 0, 0, 0)", "shadow": "none", "zIndex": "auto", "display": "flex",
  "rect": { "x": -756, "y": 806, "w": 1512, "h": 40 },
  "visibleInViewport": false,
  "buttons": [ {"al":"Edit color #e11d48","w":28,"h":28},
               {"al":"Copy color #e11d48","w":28,"h":28} ] }
```

A static block-level flex row: it takes the full 1512 px body width, lands at the document's end
(`y = 806`, viewport height 806), and `translateX(-50%)` — which *does* apply to static elements —
shoves it 756 px off the left edge. `visibleInViewport: false`. Screenshot:
`evidence-hover-panel-offscreen.png` (expanded card visible, no panel anywhere near it).

**Mechanism.** `PaletteCardSwatches` → `SwatchHoverMenu` styles its surface by *naming a glass-ui
CSS class*. Class names are not in `package.json#exports`, are not in any `.d.ts`, and are not
linted. glass-ui 7.0.0 dropped the class; nothing anywhere noticed. This is a **dependency through
an unversioned, uncontracted channel** — the textbook wrong-public-surface defect.

**Cure (architectural).** The floating panel is a *popover*. glass-ui already owns popovers
(`./popover` subpath, used on the touch branch of this very file) and already owns the floating
surface (`glass-floating`, measured live above). Delete the hand-positioned Teleport branch
entirely and let one `Popover` serve both pointer classes — see the lattice, §M-2. If a bespoke
panel must survive as an interim, its surface must come from a *component* (`Surface` /
`glass-floating`), never a bare class name.

---

### L-2 · BLOCKER — `WatercolorDot tag="button"` + `aria-label` are silently dropped; the swatch is inert and `aria-hidden`

`SwatchHoverMenu.vue:14-20` and `:29-36` pass `tag="button"` and `:aria-label="\`Color swatch ${color}\`"`
to `WatercolorDot`. glass-ui 7.0.0's prop set has **no `tag`**:

`node_modules/@mkbabb/glass-ui/dist/components/watercolor-dot/WatercolorDot.vue.d.ts`
```ts
type __VLS_Props = {
    color: string;
    variant?: "solid" | "ghost";
    animate?: boolean;
    cycleDuration?: number;
    range?: [number, number];
    seed?: string;
};
```

Live DOM inside the expanded card (`[role="article"] [data-testid="watercolor-swatch"]`, ×2):

```json
{ "tag": "SPAN", "ariaHidden": "true", "ariaLabel": null, "tagAttr": null,
  "pe": "none", "w": 40, "h": 40, "role": null, "tabindex": null }
```

Consequences, all of them this component's contract:

1. **`pointer-events: none` on the only rendered element.** `SwatchHoverMenu.vue:35`
   `@click.stop="$emit('click')"` can never fire → `PaletteCardSwatches.vue:36` `@click="$emit('swatchClick', i)"`
   → `PaletteCard.vue:254` `onSwatchClick` is dead code. The click-to-pin-popover affordance does
   not exist.
2. **The touch branch is dead too.** `SwatchHoverMenu.vue:13` wraps the dot in
   `<PopoverTrigger as-child>`; the child is a `pointer-events: none` span, so a tap never reaches
   the trigger. On `(hover: none)` devices the swatch has *no* action path at all — the add / edit /
   copy buttons `PaletteCardSwatches.vue:41-62` become unreachable on mobile.
3. **No accessible name, and explicitly `aria-hidden="true"`.** The consumer's `aria-label` is
   overridden by glass-ui's own `aria-hidden`. Every swatch in every palette card is invisible to
   assistive tech, and the careful `W5-a11y` labels at `PaletteCardSwatches.vue:15/43/50/57` label
   controls that live only inside an off-screen panel (L-1).
4. **40 × 40 px** — below the 44 px tap-target floor, matching the visual audit's
   `smallTapTargets` rows for `/#/palettes` (`REPORT.md:120`, 8 per matrix).

**The gate is blind.** `tag="button"` is accepted as a fallthrough attribute by Vue's template type
checker:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit ; echo "EXIT=$?"
EXIT=0
```
Zero diagnostics. The `dist/*.d.ts` "trust boundary" celebrated in `tsconfig.demo.json`'s header
verifies *declared* props and is permissive about undeclared ones — precisely the direction in
which a design-system consumer breaks.

**Mechanism, named.** `git log` shows the glass-ui 7.0.0 adoption commit:

```
$ git log --oneline -L '/glass-ui/,+1:package.json'
f2c8f565 feat(v-w44)!: adopt @mkbabb/glass-ui 7.0.0 across the demo consumer surface
+        "@mkbabb/glass-ui": "^7.0.0",
```
`f2c8f565` **did** touch `PaletteCardSwatches.vue` — and its entire edit was a symbol rename:

```diff
-                @click="copyToClipboard(displaySlug)"
+                @click="writeClipboard(displaySlug)"
-import { copyToClipboard } from "@mkbabb/glass-ui";
+import { writeClipboard } from "@mkbabb/glass-ui";
```
It did **not** touch `SwatchHoverMenu.vue` (last touched at `a61094e3`, the W43b3 tree move). The
adoption migrated the symbols the compiler could see and left the two files' worth of untyped
glass-ui contract — `tag`, `aria-label`, `.floating-panel`, `.btn-interactive` — completely
unaudited. The W44 close is recorded as "GREEN-WITH-RESIDUALS"; this is the residual.

**Cure.** The swatch is a *button that looks like a dot*. Ownership belongs in glass-ui: either
`WatercolorDot` regains an interactive mode (`as` / `interactive` prop that renders a real
`<button>`, drops `aria-hidden`, restores hit-testing and forwards `aria-label`), or the demo
composes `Button icon-only` with the dot as decorative content. Either way the **decision is
glass-ui's**, and it must be expressed in the prop types so `vue-tsc` can enforce it. This is a
BH/BI relay item under the standing glass-ui coordination edict.

---

### L-3 · MAJOR — `btn-interactive` is a second dead class; the ruled cure for this component's button recipe does not exist

`demo/DESIGN.md:237,247` records the T.W5-R5 ruling: "interactive scales consume the producer atoms
(`btn-interactive`, …)". `CurrentPaletteEditor.vue:71-79` and `demo/shell/dock/ColorInput.vue:69,78`
apply it. Measured above: `.btn-interactive` computes **identically to a bare div**. It is not in
glass-ui 7.0.0 (`grep -rl "btn-interactive" node_modules/@mkbabb/glass-ui` → no matches; only
`data-table-row-interactive` and `fourier-field--interactive` contain the substring "interactive").

So the migration target of the R5 ruling is a no-op, and `PaletteCardSwatches` — which never
migrated — carries the *un*-cured original at lines 14, 44, 51, 58:

```
active:scale-95 … transition-colors
```
`transition-colors` transitions colour only; the `scale-95` press leg is therefore **instantaneous
and untimed** at every one of the four buttons — exactly the "dead 150 ms default (F1/F3)" the
`PaletteCard.vue:10-13` comment says was retired. It was retired *around* this file, not in it, and
the place it was retired to is empty.

**Cure.** Kill the class-name channel (same root as L-1/L-2). Press/hover choreography is a
*component* behaviour: `Button` (glass-ui) already carries `tap-squish focus-ring` — observed live
on the card's own menu trigger, `class="button tap-squish focus-ring glass-wash glass-capsule …"`.
Use the component; delete the recipe.

---

### L-4 · MAJOR — six verbatim copies of the icon-button recipe; glass-ui's atom is used 10 lines away in the same cluster

```
$ grep -rn "p-1.5 rounded-sm hover:bg-accent active:scale-95" demo/ | wc -l
6
```
- `PaletteCardSwatches.vue:44, 51, 58` (add / edit / copy)
- `CurrentPaletteEditor.vue:46, 49, 52` (edit / copy / remove)

plus two near-copies with a different padding rung: `PaletteCardSwatches.vue:14` (`p-0.5`, the slug
copy) and `PaletteSlugBar.vue:84` (`p-1`). Four files, eight instances, one concept.

The precedent is *inside this component's own parent*. `PaletteCard.vue:93-104`:

```
<!-- S.W5-4: 3rd copy of the hand-rolled icon-trigger recipe dies onto the glass-ui atom; the sm
     square also cures the ~24px touch target. -->
<Button icon-only variant="ghost" size="sm" aria-label="Palette menu" class="shrink-0">
```
The S.W5-4 ruling cured three copies and stopped. Six more survived, all of them in the swatch
family, and they carry the same ~28 px touch target the ruling names as the defect it cured
(measured live: the panel's edit/copy buttons are `28 × 28`).

Violates edict 1 (focused modules), edict 4 (glass-ui is the design system), edict 5 (style at the
root component level, never per-instance).

**Cure.** `<Button icon-only variant="ghost" size="sm">` at all eight sites. Zero new abstractions,
zero new files — the atom is already imported in the parent.

---

### L-5 · MAJOR — the import-boundary law that is supposed to protect this component's seam matches zero files

`eslint.config.js:229-296` declares three "STANDING" gates — G-DEMO-1, G-DEMO-3a, G-DEMO-3b — whose
stated purpose is exactly this component's module boundary ("reach palette-browser through its
barrel seam, never a raw `.vue` file"). Their globs:

```
$ for g in demo/color-picker demo/@/components demo/@/lib demo/@/composables; do
    echo "$g -> $(find $g -type f 2>/dev/null | wc -l) files"; done
demo/color-picker -> 28 files
demo/@/components -> 0 files
demo/@/lib -> 0 files
demo/@/composables -> 0 files

$ ls -d demo/@
ls: demo/@: No such file or directory
```
`demo/@/` was deleted by `a61094e3 feat(v-w43b3)!: home the feature UI trees; demo/@ dies (D-c)`.
That commit **did not touch `eslint.config.js`**:

```
$ git show --stat a61094e3 | grep -c "eslint.config.js"
0
$ git log --oneline -3 -- eslint.config.js
616e84f2 refactor(U.W-DEMO · U-F45/U-F47): the color-spine layer-boundary cure + two STANDING import-boundary gates
```
The config is pinned to the pre-W43 tree. Worse, the *banned pattern* itself is a retired alias:
`@components/custom/palette-browser/**/*.vue` — and `tsconfig.demo.json`'s own header records that
"W43 (RF-15): the demo `@…` path aliases were killed". The only surviving occurrence of the string
in the tree is a comment (`demo/palettes/browser/status/index.ts:5`). G-DEMO-3b bans a specifier
form nobody can write, over a file region that no longer exists.

**Honest negative:** there is no *live* violation today —

```
$ grep -rn "from \"[^\"]*palettes/browser/[^\"]*\.vue\"" demo/ | grep -v "^demo/palettes/browser/"
(no output)
$ grep -rn "browser/card/" demo/ | grep -v "^demo/palettes/browser/card/"
(no output)
```
— and `PaletteCardSwatches` is correctly *absent* from `browser/card/index.ts` (it is a private
sub-component; the barrel exports only the six public faces). The seam holds **by accident**. The
enforcement that is documented as making it structural is dead law.

**Cure.** Re-key the three objects onto the live tree (`demo/palettes/**`, `demo/shell/**`,
`demo/color-session/**`, `demo/picker/**`, `demo/workbenches/**`, `demo/scenes/**`) and ban
relative raw-`.vue` reaches (`**/palettes/browser/*/**.vue`) rather than a dead alias. Better: this
is the last thing in the repo that should be spelled in glob strings — see §M-4.

---

### L-6 · MAJOR — `writeClipboard` is imported through the glass-ui **root barrel**; the narrow subpath is 17.8× smaller and is already used by a sibling composable

`PaletteCardSwatches.vue:71` — `import { writeClipboard } from "@mkbabb/glass-ui";`

`writeClipboard` is declared in `dist/composables/dom/useClipboard.d.ts:37` and is re-exported by
the `./dom` subpath (`dist/dom.d.ts` → `export * from "./composables/dom"`; `dom.js` contains the
symbol — verified). Measured transitive ESM closure of each entry:

```
$ node -e "…closure…"
root  @mkbabb/glass-ui      -> {"files":66,"kb":"218.9"}
sub   @mkbabb/glass-ui/dom  -> {"files":8,"kb":"12.3"}
dom exports writeClipboard: true
```
**66 files / 218.9 KB vs 8 files / 12.3 KB — 17.8× by weight, 8.3× by module count**, for the
identical symbol. In Vite dev that is 58 extra module requests per consumer; in the gh-pages build
it is 46 extra chunk edges for Rollup to prove side-effect-free before it can drop them.

The sibling composable in the same directory already does it right —
`useHoverPopover.ts:3` `import { useBreakpoint } from "@mkbabb/glass-ui/dom";`. So the card cluster
reaches one package at two different granularities, three files apart. And the wrong granularity is
the majority position:

```
$ grep -rn "writeClipboard" demo/ | grep import | wc -l
12          # all twelve from the root barrel; zero from /dom
```

**Cure.** `import { writeClipboard } from "@mkbabb/glass-ui/dom";` at all 12 sites, and a lint rule
banning the bare root specifier for anything glass-ui publishes a subpath for (68 subpaths exist).

---

### L-7 · MAJOR — the library's failure channel is discarded at 6/6 sites, in a component whose sibling *is* the feedback surface

glass-ui documents `writeClipboard` explicitly
(`dist/composables/dom/useClipboard.d.ts:32-36`):

> Returns the discriminated result (`{ ok }` / `{ ok, reason }`) rather than a lossy boolean, for
> identical call ergonomics: `const { ok } = await writeClipboard(text)`.

```ts
export type CopyResult = { ok: true } | { ok: false; reason: CopyFailureReason };
```

Every palettes call site throws it away:

```
$ grep -rn "writeClipboard(" demo/palettes/ | grep -v import
demo/palettes/usePaletteActions.ts:134:        void writeClipboard(cssColorOpaque);
demo/palettes/browser/slug/PaletteSlugBar.vue:169:    if (userSlug) void writeClipboard(userSlug);
demo/palettes/browser/card/composables/useSwatchActions.ts:87:        void writeClipboard(css);
demo/palettes/browser/card/PaletteCard/PaletteCardSwatches.vue:16:                @click="writeClipboard(displaySlug)"
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:294:        copyAll: () => void writeClipboard(...)
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:333:    void writeClipboard(css);
```
`PaletteCardSwatches.vue:16` is the worst of the six: it does not even `void` the promise — it is a
floating `Promise<CopyResult>` returned from a template handler, so a rejection is unhandled.

The sharpness: **`ActionFeedback.vue` sits in the same directory** and `PaletteCard.vue:238-244`
`defineExpose({ showFeedback })` exists precisely to say "copied" / "copy failed". The designed
feedback channel is two files away and wired to nothing. glass-ui even ships `useClipboard` —
"reactive clipboard copy with scope-owned confirmation state" — the exact primitive for a copy
button with feedback, unused anywhere in the repo.

For a package whose own `package.json:4` description is *"Immutable, **failure-explicit** CSS
color…"*, silently swallowing a discriminated failure result at every site is a house-doctrine
violation, not a nit.

**Cure.** `const { ok } = await writeClipboard(text); showFeedback(ok ? "Copied" : "Copy failed", ok ? "success" : "error")`
— one helper in the card cluster, six call sites, `ActionFeedback` finally load-bearing.

---

### L-8 · MAJOR — split ownership of panel centring: two consumers of one composable disagree, and one of them is wrong

`useHoverPopover.ts:20-24` deliberately emits the swatch **centre** as `left`:

```ts
function positionPanel(swatchEl: Element, offsetY = -42) {
    const rect = swatchEl.getBoundingClientRect();
    style.top  = `${rect.top + offsetY}px`;
    style.left = `${rect.left + rect.width / 2}px`;   // centre x
}
```
It never says who converts centre → left edge. The two consumers answer differently:

- `PaletteCardSwatches.vue:31` — `:floating-style="{ ...floatingStyle, transform: 'translateX(-50%)' }"`
- `CurrentPaletteEditor.vue:35` — `:floating-style="currentFloatingStyle"` — **no transform**

The current-palette editor's hover panel is therefore offset by +½ panel width. (Both are presently
moot because L-1 makes the panel `static`; this is the defect that surfaces the *moment* L-1 is
fixed — a latent regression sitting under the blocker.)

One concept — "where does the panel go" — has two homes, and the composable that owns the hard half
(measuring) does not own the trivial half (centring), so the trivial half drifted.

**Cure.** `positionPanel` returns a complete style: `{ position: "fixed", top, left, transform: "translateX(-50%)" }`.
Consumers spread it and add nothing. Unique semantic ownership restored.

---

### L-9 · MINOR — three type declarations for one value

| site | declared type |
|---|---|
| `useHoverPopover.ts:17` | `reactive({ top: "0px", left: "0px" })` → `{ top: string; left: string }` |
| `PaletteCardSwatches.vue:82` | `floatingStyle: Record<string, string \| number>` |
| `SwatchHoverMenu.vue:73` | `floatingStyle?: CSSProperties \| undefined` |

Structural typing lets all three pass, so nothing catches the drift. The composable is the owner;
it should export the type (`export type FloatingPanelStyle = CSSProperties`) and both components
should import it. Widening it to `Record<string, string | number>` at the middle hop also erases
`CSSProperties`' safety for anything a future author adds.

---

### L-10 · MINOR — the swatch-size literal is owned twice and required a third time

```
$ grep -rn "w-9 h-9 sm:w-10 sm:h-10" demo/
demo/workbenches/generate/GenerateControls.vue:205: … generate-swatch w-9 h-9 sm:w-10 sm:h-10 …
demo/palettes/browser/card/SwatchHoverMenu.vue:82:        sizeClass: "w-9 h-9 sm:w-10 sm:h-10",
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:194: /** … (default: "w-9 h-9 sm:w-10 sm:h-10") */
demo/palettes/browser/card/PaletteCard/PaletteCard.vue:197: { layout: "default", swatchClass: "w-9 h-9 sm:w-10 sm:h-10" },
```
Two live defaults (`PaletteCard`, `SwatchHoverMenu`) plus a doc-comment copy plus a fourth
hand-rolled instance in a different feature. `PaletteCardSwatches.vue:83` declares
`swatchClass: string` **required with no default**, so it forces the parent's copy to be the live
one and makes `SwatchHoverMenu`'s default permanently dead in this path.

A swatch has *sizes*, not *class strings*. `WatercolorDot` should carry `size?: "sm" | "md" | "lg"`
in glass-ui; the demo passes a token, not Tailwind rungs. Until then, one exported constant with
one home.

---

### L-11 · MINOR — a domain rule expressed as a raw boolean in a leaf template

`PaletteCardSwatches.vue:42` — `v-if="!isLocal"` gates the *"Add to current palette"* action. That
is a business rule ("you may only pull colours out of someone else's palette"), and it lives in a
presentational leaf as a negated `boolean | undefined`.

The concept already has a home: `demo/palettes/utils.ts` exports `getPaletteKind` / `PaletteKind`,
and `PaletteCard.vue:225` already computes `const kind = computed<PaletteKind>(...)` and passes it
to `PaletteCardMenu` as `:palette-kind`. So the same parent hands **two different representations
of one concept** across two child boundaries in the same template: `kind` to the menu (line 85),
raw `isLocal` to the swatches (line 141). One of them is the concept; the other is its wire form.

**Cure.** Pass `kind`; let the parent decide *which actions exist* and hand the leaf a list, not a
predicate (see §M-3).

---

### L-12 · MINOR — clipboard ownership is split inside one parent/child pair

Within this component: the **slug** copy is handled locally (`PaletteCardSwatches.vue:16`,
`writeClipboard` imported at line 71), while the **colour** copy is emitted up
(`:59 @click="$emit('popoverCopy', color.css)"`) and executed by the parent
(`PaletteCard.vue:331-334`). Two identical operations, two different ownership decisions, eleven
lines apart. A third home exists at `useSwatchActions.ts:85-88` for the current-palette editor's
copy, and a fourth at `usePaletteActions.ts:134`.

Whatever the rule is — "leaves emit, containers act" or "leaves act" — it must be one rule.

---

### L-13 · INFO — 50 % of the prop surface is pure conduit; the popover state lives two levels above its only consumer

Of 8 props (`:75-84`), four — `openPopoverIndex`, `canHover`, `floatingStyle`, `swatchClass` — are
never read by this component; they are forwarded verbatim to `SwatchHoverMenu` (`:29-32`). Of 8
emits (`:86-95`), five — `hover`, `leave`, `cancelLeave`, `swatchClick`, `popoverTouch` — are
verbatim re-emissions of `SwatchHoverMenu` events. The component is 96 lines of which roughly half
is plumbing for state that `PaletteCard.vue:246-255` owns solely because `useHeightTransition`'s
`onBeforeCollapse` needs to null it (`:277`).

That coupling is dissolvable: `PaletteCardSwatches` is `v-if`-mounted (`PaletteCard.vue:139`), so
unmount already closes the popover; the only thing the early close buys is hiding the panel at the
*start* of the collapse instead of the end, which a `watch(() => props.collapsing)` or a
`defineExpose({ close })` handles without hoisting four props and five emits.

---

### L-14 · INFO — variance and idiom divergence with its own sibling

- `PaletteCardSwatches.vue:76` — `colors: readonly PaletteColor[]`
- `PaletteColorStrip.vue` (same cluster, same data) — `colors: PaletteColor[]`

Both receive the same `palette.colors`. Two conventions for one type in one card.

- `PaletteColorStrip.vue` uses Vue 3.5 reactive props destructure (`const { colors, orientation = "horizontal" } = defineProps<…>()`),
  as does `CurrentPaletteEditor.vue:196`. `PaletteCardSwatches.vue:75` uses bare `defineProps<…>()`.
  Harmless here (template-only), but edict 7 names the idiom and the cluster is inconsistent.

`verbatimModuleSyntax` is **clean**: `PaletteCardSwatches.vue:72` correctly uses
`import type { PaletteColor }`.

---

### L-15 · INFO — this component has zero visual-audit coverage

The mega-tranche matrix captured `/#/palettes` and `/#/browse` in all four matrices
(`REPORT.md:120-121, 135-136, 150-151, 165-166`) with **0 pageErrors, 0 consoleErrors, 0
horizontalOverflow**. But
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` shows *"The
commons is unreachable / Failed to load palettes"* and *"No saved palettes yet."* — the matrix ran
against an empty API and an empty local store, so **no `PaletteCard` was ever expanded and
`PaletteCardSwatches` never rendered in any of the 60 captures.** The green rows for these routes
say nothing about this component. (A sibling seat's `shot-browse-desktop-light-expanded.png` in
this directory *does* show it, with the slug chip and five inert dots.)

The `smallTapTargets: 8` on `/#/palettes` therefore comes from the *collapsed* chrome; this
component's own 28 px and 40 px targets are additive to it.

---

### L-16 · INFO — the demo's core colour datum never touches the library

`PaletteColor.css` (`demo/palettes/types.ts:2`) is an unvalidated `string`, threaded from the API
through `PaletteCard` → `PaletteCardSwatches` → `WatercolorDot`, where glass-ui paints it straight
onto a `background-color`. Across the whole palettes area:

```
$ grep -rn "@mkbabb/value.js" demo/palettes/ | wc -l
2       # mix.ts (colour math), export/png.ts (oklch → rgba8)
```
`value.js` is a CSS-colour library, and the demo's *palette colour* type does not use its `Color`
type, its parser, or its `Result` failure discipline anywhere in the browse/card path. This is not a
boundary *violation* — nothing illegal crosses — it is the public surface being **under-consumed**
by the very program that exists to dogfood it. An invalid `css` string from the API is
indistinguishable from a valid one until a browser paints nothing.

Not a defect I can reproduce as a user-visible failure today; recorded as the structural
observation the challenge asked for. (See §M-5.)

---

## The greenfield module lattice

If I were structuring this today with no legacy, this is what it would be.

**M-1 · One interactive dot, owned by glass-ui.**
`WatercolorDot` gains `interactive?: boolean` (or `as?: "span" | "button"`). When interactive it
renders a real `<button>`, drops `aria-hidden`, restores hit-testing, forwards `aria-label`, and
carries `tap-squish focus-ring` — the same behaviour bundle `Button` already ships. Size becomes a
token (`size?: "sm" | "md" | "lg"`), not a Tailwind class string. This single change kills L-2 and
L-10 and is the only change that can be *type-enforced*, because it moves the contract from the
attribute channel into the prop channel.

**M-2 · One popover. Delete the dual path.**
`SwatchHoverMenu` currently branches on `canHover` into (a) a reka `Popover` and (b) a
hand-positioned `Teleport` + dead class. Branch (b) exists only to get hover-open semantics. glass-ui
7 ships `<Popover trigger="hover">` — the W44 commit message itself records
`HoverCard -> <Popover trigger="hover">`. So:

```
SwatchHoverMenu  =  <Popover :trigger="canHover ? 'hover' : 'click'"> + <PopoverContent> + <slot name="actions">
```
That deletes `.floating-panel` (L-1), deletes `positionPanel` / the `translateX(-50%)` split (L-8),
deletes `useLeaveTimer` (17 lines) and most of `useHoverPopover` (67 lines), gets real focus
management and keyboard access for free, and removes the `aria-hidden="true"` escape hatch at
`SwatchHoverMenu.vue:41` that currently admits in a comment that the hover path is
keyboard-inaccessible. **~120 lines and two composables die; the surface gets strictly better.**

**M-3 · The leaf takes a model, not eight props.**
`PaletteCardSwatches` should receive one object and one emit:

```ts
defineProps<{ swatches: readonly PaletteSwatch[]; slug?: SlugChip }>();
defineEmits<{ action: [SwatchAction] }>();

type PaletteSwatch = { css: string; actions: readonly SwatchAction[] };
type SwatchAction  = { kind: "add" | "edit" | "copy"; index: number; css: string };
```
The parent computes `actions` from `PaletteKind` (killing L-11), the popover state moves into
`SwatchHoverMenu` where its only consumer lives (killing L-13), and the leaf becomes ~40 lines of
pure layout. The action buttons become `<Button icon-only variant="ghost" size="sm">` in a `v-for`
over `swatch.actions` — killing L-4's six copies with one loop.

**M-4 · Boundaries expressed as package structure, not glob strings.**
`demo/palettes` is a mega-feature with a barrel seam that eslint no longer guards (L-5). Globs
rotted because they were written once against a tree that moved twice. The durable encoding is
`package.json#imports` subpath declarations (`#palettes` → `demo/palettes/index.ts`) or workspace
sub-packages with their own `exports`: then the *resolver* enforces the seam and a raw-`.vue` reach
across features simply fails to resolve — build-state-independent, rename-proof, no lint rule to
maintain. Failing that: one small script that asserts every `no-restricted-imports` glob matches ≥1
file, run in CI. **A boundary rule that matches nothing must fail loudly, not pass quietly.**

**M-5 · The colour datum is a library value, not a string.**
`PaletteColor` becomes `{ color: Color<"oklch">; css: string; position: number; weight?: number }`,
parsed once at the API boundary through `parseCssColor` with the library's `Result` discipline, and
serialised back for display. The card then never handles an unparsed string, `useSafeAccentFn` gets
a real colour instead of re-parsing, `PaletteColorStrip`'s weight maths and `export/png.ts`'s
`oklch()` call stop being the only two places the library is consulted, and the demo becomes an
actual proof of the published API rather than a consumer of `background-color: <string>`.

**M-6 · One clipboard seam.**
`useSwatchClipboard()` in the card cluster: wraps `writeClipboard` from **`@mkbabb/glass-ui/dom`**
(L-6), consumes the `CopyResult` discriminant, and drives `ActionFeedback` through the parent's
`showFeedback` (L-7). Four call sites collapse to one. Slug copy and colour copy get the same
ownership answer (L-12).

Net: `PaletteCardSwatches` 96 → ~40 lines; `SwatchHoverMenu` 93 → ~35; `useHoverPopover` 67 → 0;
`useLeaveTimer` 17 → 0. Two blockers, four majors and four minors resolved. Nothing is wrapped, no
`shared/` directory is invented, and every deleted concept lands in a home that already exists.

---

## Negative results — what I checked and found sound

- **No deep-import into `src/`.** `PaletteCardSwatches` imports nothing from `@mkbabb/value.js` at
  all, and the whole `demo/palettes/` tree reaches the library only through published subpaths
  (`mix.ts` → `@mkbabb/value.js/color`, `export/png.ts` → `@mkbabb/value.js/color`). The T.W1
  demo-dogfood keystone holds: no demo import exists that a real consumer could not write.
- **No feature → shell / component → boot edge.** Its three imports are `@lucide/vue` (declared dep,
  `package.json:87`), `@mkbabb/glass-ui` (design system, legal for `demo/`), and two relative
  siblings inside its own feature (`../../../types`, `../SwatchHoverMenu.vue`). Direction of
  dependency is correct at every edge.
- **Barrel seam intact in practice.** `PaletteCardSwatches` is correctly *not* exported from
  `browser/card/index.ts` (private sub-component), and nothing outside `demo/palettes/browser/card/`
  imports any file inside it — verified by grep, twice, above. It is unenforced (L-5), not violated.
- **`verbatimModuleSyntax` clean** (`import type { PaletteColor }`, line 72).
- **No god module.** 96 lines, one job, one `<template>`, no `<style>`, zero logic beyond one
  clipboard call. The cluster's largest file is `PaletteCard.vue` at 364 lines — also not a god
  module. `demo/palettes/export.ts` (the named historical suspect) does still coexist with
  `demo/palettes/export/`, but resolution is unambiguous (`usePaletteExport.ts:9` imports `./export`
  → the file; `demo/test/export/byte-exact.test.ts:23` imports `export/serializers` → the directory)
  and **neither is in this component's blast radius** — out of scope for this seat, recorded for the
  export seat.
- **`useHoverPopover`'s async `currentTarget` read is NOT a defect.** `positionPanel` runs inside
  `nextTick`, reading `e.currentTarget` after dispatch — which the DOM spec nulls. I tested it with
  a real trusted `pointerenter`: `{ syncCurrentTarget: "DIV", microtaskCurrentTarget: "DIV" }`, and
  the live inline style came out numerically exact (`left: 824.445px` for a swatch centre of
  `804.445 + 20`). It works. (A synthetic `dispatchEvent` *does* throw
  `TypeError: … reading 'getBoundingClientRect'` at `useHoverPopover.ts:18` — that is a probe
  artifact, and I record it only so nobody re-reports my own console line as a finding. The
  spec-vs-Chromium gap is a **hypothesis** for Safari, untested here, and I decline to claim it.)
- **No dual `useDark`, no `useLayerTransition` reimplementation** in this component or its imports —
  the other two named historical suspects do not reach here.

---

## Summary table

| id | sev | defect | one-line cure |
|---|---|---|---|
| L-2 | BLOCKER | `WatercolorDot tag="button"`/`aria-label` dropped → `<span aria-hidden pointer-events:none>`; click + tap dead, no a11y name | glass-ui owns an interactive dot; put it in the prop types |
| L-1 | BLOCKER | `.floating-panel` undefined → hover panel static, at `x=-756, y=806`, unstyled | delete the hand-positioned branch; one `<Popover trigger="hover">` |
| L-3 | MAJOR | `.btn-interactive` undefined → the ruled press-motion cure is a no-op | behaviour belongs to `Button`, not a class name |
| L-4 | MAJOR | 6 verbatim icon-button recipes across 4 files; glass-ui atom used 10 lines away | `<Button icon-only variant="ghost" size="sm">` ×8 |
| L-5 | MAJOR | the 3 "STANDING" import-boundary gates match 0 files (`demo/@` deleted, alias retired) | `package.json#imports` seams; CI-assert every glob matches ≥1 file |
| L-6 | MAJOR | glass-ui **root barrel** for `writeClipboard`: 66 files / 218.9 KB vs 8 / 12.3 KB via `/dom` | use `@mkbabb/glass-ui/dom`; ban the bare root specifier |
| L-7 | MAJOR | `CopyResult` discarded 6/6; `ActionFeedback` + `showFeedback` wired to nothing | one `useSwatchClipboard()` that consumes `{ ok }` |
| L-8 | MAJOR | centring split between composable and consumer; the two consumers disagree | `positionPanel` returns the complete style |
| L-9 | MINOR | 3 type declarations for one `floatingStyle` value | export the type from its owner |
| L-10 | MINOR | swatch-size literal owned twice, required a third time | `size` token on the dot |
| L-11 | MINOR | `v-if="!isLocal"` — a domain rule in a leaf template | pass `PaletteKind`; hand the leaf an action list |
| L-12 | MINOR | slug copy local, colour copy emitted — one operation, two ownership answers | one seam (M-6) |
| L-13 | INFO | 50 % conduit props; popover state 2 levels above its consumer | fold state into `SwatchHoverMenu` |
| L-14 | INFO | `readonly` variance + props-destructure divergence with `PaletteColorStrip` | one convention per cluster |
| L-15 | INFO | 0 of 60 visual-audit captures ever rendered this component (empty API + empty store) | seed the fixture before the matrix |
| L-16 | INFO | the palette colour datum never touches value.js | parse at the API boundary into `Color<"oklch">` |
