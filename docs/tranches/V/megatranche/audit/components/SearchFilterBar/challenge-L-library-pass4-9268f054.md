# CHALLENGE-L — library structure · `demo/palettes/browser/search/SearchFilterBar.vue`

## PASS 4 (2026-07-28) — read this header first

Three CHALLENGE-L seats preceded me on this axis. **I overwrote none.** All three are preserved verbatim:

    challenge-L-library-pass1-c654824e.md   (42 745 B · 12-row ledger · HEAD c654824e · had a browser)
    challenge-L-library-pass2-80fc5c40.md   (31 870 B ·  8-row ledger · HEAD 80fc5c40 · no browser)
    challenge-L-library-pass3-f36f780c.md   (25 006 B ·  6-row ledger · HEAD f36f780c · had a browser)

This is the **fourth pass**. I re-derived the axis independently before reading any predecessor,
then reconciled. What survives that reconciliation is short, and it is deliberately short:

1. **one correction that changes the wave** (§2, P4-1) — pass 1 concluded, in print, that
   `vue-tsc` *structurally cannot* see the defect family it discovered, and proposed a glass-ui
   change or a new eslint rule as the only closures. **That conclusion is wrong.** The blindness is
   one unset compiler option in this repo. Flipping it catches every member of the family. I have
   the reproduction.
2. **two new findings** (§3) — a dead "public seam", and a design-system primitive that exists but
   is not published.
3. **one scoping measurement** (§4) the wave that acts on P4-1 needs before it starts.
4. **independent re-verification** (§5) of the confirmed core, and one thing I looked for and did
   not find.

For the import trace, `demo/ui/`, the inert `:checked` Checkbox, `variant` not being a `ButtonProps`
key, the `/^#[0-9a-f]{6}$/i` gate and its live wrong-color search, the dead
`colorL/colorA/colorB` client params, `useDialogBrowseActions`' filter handlers, the
`tsconfig.demo.json` `paths` drift, the 32×40 icon button, the dead G-DEMO eslint boundaries, the
HSV↔hex divergence, and the defeated focus ring — **read passes 1, 2 and 3.** I re-verified every
one of them at `9268f054` and have nothing to add or correct beyond what is below.

## Model receipt

I observe myself to be **Opus 5 (1M context)**, exact model id `claude-opus-5[1m]` — the tier this
seat was spawned with. Declared, not inherited. No seat defect.

## Substrate

- **HEAD at this pass: `9268f054`** (`docs(V·mega): picker band COMPLETE 12/12 validated …`) — not
  the `c654824e` in my work order, nor `80fc5c40`, nor `f36f780c`. The branch has now advanced three
  times under this axis. The subject file is byte-identical across all four substrates; every line
  number cited by all four passes still resolves.
- **I had a browser.** The Playwright MCP profile was held by a concurrent seat
  (`Browser is already in use for …/mcp-chrome-83447af`), so I drove Chromium directly through the
  repo's own `playwright` dependency against the live dev server on `:9000`.
- Dev server `:9000` is live; the commons API is unreachable from it (same condition passes 1 and 3
  hit). Anything needing populated tag data is labelled accordingly.

**Verdict: DEFECTIVE.** Confirming all three predecessors. One correction, two new findings, one
scoping measurement.

---

## §1 · Ledger — pass 4 only

| id | sev | defect | status vs passes 1–3 |
|---|---|---|---|
| P4-1 | **MAJOR** | **CORRECTION** — the typecheck gate's blindness is `vueCompilerOptions.strictTemplates` being unset, not a Vue limitation. With the flag, `vue-tsc` reports **11 errors** on this component alone — including both of pass 1's BLOCKER/L-1 bindings. Pass 1's stated closures (a glass-ui `inheritAttrs` change; a new eslint rule) are unnecessary | **contradicts pass 1 §L-2's closing paragraph and §L-1's "the gate does not see it" rationale** |
| P4-2 | MINOR | **NEW** — `demo/palettes/browser/index.ts`, which declares itself "the mega-feature's TOP-LEVEL SEAM … the stable public API", has **zero consumers**. Every real reach goes to a sub-barrel | neither pass 1 (cites it only as context for the dead lint rule) nor pass 2 (counts barrels, proposes collapsing *onto* this one) established it is dead |
| P4-3 | MINOR | **NEW** — glass-ui ships the menu-row recipe `SearchFilterBar` hand-rolls (`_shared/menuRowClass.d.ts`) but does **not** export it. The fork is forced, not chosen | no pass mentions `menuRowClass` |
| P4-4 | INFO | **SCOPING** — of the 11 strict-template errors, **6 are real API drift and 5 are type-noise that works at runtime.** Verified against `forwardedAttrs` and the live DOM. A wave that flips the flag needs this split up front | new |

---

## §2 · P4-1 · MAJOR · CORRECTION — the gate is blind by configuration, not by construction

### What pass 1 concluded

`challenge-L-library-pass1-c654824e.md:146-149`:

> **The gate does not see it.** `npx vue-tsc -p tsconfig.demo.json --noEmit` → `EXIT=0`. Vue's
> component typing admits unknown attributes as fallthrough and unknown `on*` handlers as native
> listeners, so a prop/emit rename in the design system passes the demo typecheck silently.

and `:227-229`:

> **And close the gate**: glass-ui should declare its SFC props under
> `defineOptions({ inheritAttrs: false })` where a prop rename is semantic, or the demo's eslint
> should carry a `vue/no-undef-properties`-class rule for glass-ui components — because vue-tsc
> exits 0 on all 51 of these today.

Both proposed closures are cross-repo or new-machinery. Both are unnecessary.

### What is actually true

`vue-tsc` admits unknown props and handlers **only because `vueCompilerOptions.strictTemplates` is
unset**, and its default is `false`.

```
$ grep -rn "vueCompilerOptions\|strictTemplates" tsconfig*.json vite.config.ts
(no matches; exit 1)

$ cat tsconfig.base.json
{ "compilerOptions": { "target": "ES2022", … "strict": true, "verbatimModuleSyntax": true,
    "noUncheckedIndexedAccess": true, "exactOptionalPropertyTypes": true, … } }
```

Every TypeScript strictness dial in this repo is at maximum. The **Vue** dial — the only one that
governs template↔component-API agreement — was never turned on.

### Reproduction

Baseline, the shipped gate:

```
$ npx vue-tsc -p tsconfig.demo.json --noEmit
(no output — 0 errors)
```

The same program, same substrate, one option added:

```
$ cat > /tmp/tsconfig.strict.json <<'EOF'
{ "extends": "/Users/mkbabb/Programming/value.js/tsconfig.demo.json",
  "vueCompilerOptions": { "strictTemplates": true },
  "include": ["/Users/mkbabb/Programming/value.js/demo/palettes/browser/search/SearchFilterBar.vue",
              "/Users/mkbabb/Programming/value.js/src/vite-env.d.ts"] }
EOF
$ npx vue-tsc -p /tmp/tsconfig.strict.json --noEmit
demo/palettes/browser/search/MiniColorPicker.vue(48,21): error TS2353: … 'variant' does not exist in type
  '{ readonly emphasis?: ButtonEmphasis; readonly tone?: …; readonly size?: ButtonSize;
     readonly iconOnly?: boolean; … 5 more …; readonly as?: string | Component; } & VNodeProps & …'
demo/palettes/browser/search/MiniColorPicker.vue(51,22): error TS2353: … 'onClick' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(5,25):   error TS2353: … 'variant' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(52,38): error TS2353: … 'checked' does not exist in type
  '{ readonly modelValue?: CheckedState | null; readonly defaultValue?: CheckedState; … }'
demo/palettes/browser/search/SearchFilterBar.vue(53,38): error TS2353: … ''onUpdate:checked'' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(89,46): error TS2322: Type 'string | number' is not
  assignable to type 'string'.
demo/palettes/browser/search/SearchFilterBar.vue(93,37): error TS2353: … ''aria-label'' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(95,38): error TS2353: … 'onKeydown' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(112,29): error TS2353: … 'variant' does not exist …
demo/palettes/browser/search/SearchFilterBar.vue(115,30): error TS2353: … 'onClick' does not exist …
```

**11 errors on this component alone.** Lines 52 and 53 are pass 1's L-1 — the inert Checkbox — named
by the compiler, at the exact character column, with the correct expected type. Lines 5, 112 and
MiniColorPicker 48 are pass 1's L-2, the `variant` family. Line 89 is a real type hole nobody had
recorded (`Input` emits `string | number`; `colorText` is `Ref<string>`).

I verified the probe harness genuinely type-checks the template's host file rather than silently
including nothing: a planted script-block error **was** reported —

```
probe.vue(6,7): error TS2322: Type 'string' is not assignable to type 'number'.
```

— while, in that same file and same run, a planted `:bogusPropXyz="1"` on `<Checkbox>` under the
default configuration was **not**. Script is checked; templates are waved through. That asymmetry is
the whole defect.

### Why this changes the wave

Pass 1 ranked its own BLOCKER (L-1, the dead tags filter) first and treated the gate as an open
research question requiring a glass-ui change. The correct ordering is the reverse of what that
implies: **flip `strictTemplates` first**, because doing so converts the entire family — pass 1's
L-1 and L-2, both Checkbox consumers, all 51 `variant` sites, and every future design-system prop
rename — from "invisible, found by audit" into "red at the gate, found by CI." It is one line in
`tsconfig.demo.json`, it needs no glass-ui coordination, it needs no new lint rule, and it is the
only cure on this axis that is *self-enforcing*.

Independently measured scale of what the flag would catch, repo-wide:

```
$ python3 - <<'PY'
import re, pathlib
hits=0; files=set()
for p in pathlib.Path('demo').rglob('*.vue'):
    s=p.read_text(encoding='utf8', errors='ignore')
    for m in re.finditer(r'<Button\b[^>]*?>', s, re.S):
        if 'variant=' in m.group(0): hits+=1; files.add(str(p))
print("Button tags carrying a dead `variant` prop:", hits, "across", len(files), "files")
PY
Button tags carrying a dead `variant` prop: 51 across 22 files
```

My **51** agrees exactly with pass 1's **51**. My file count is 22 against pass 1's 20 — my regex
scopes to `<Button …>` tags specifically, pass 1's tabulation appears to enumerate by component; the
site count, which is the number that matters for the wave, is identical from two independent
methods. Recorded so nobody reads the file-count delta as a contradiction.

**Recommended born-RED gate for the wave:**
`vueCompilerOptions.strictTemplates: true` in `tsconfig.demo.json`; `npm run typecheck` must be
green with it. That gate is falsifiable, needs no sampling policy, and cannot be satisfied by a
comment.

---

## §3 · New findings

### P4-2 · MINOR · NEW — the declared "top-level seam" has zero consumers

`demo/palettes/browser/index.ts` is 46 lines, of which 18 are a docblock asserting a boundary law:

> *"palette-browser — the mega-feature's TOP-LEVEL SEAM (U.W-DEMO · U-F47). The stable public API of
> the palette-browser feature: a single barrel that re-exports the six sub-feature faces … External
> consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a raw
> internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces it standing."*

```
$ grep -rn '"./browser"\|palettes/browser"' demo/
(no matches)
```

**Nothing imports it.** Every real consumer reaches a sub-barrel directly:

```
$ grep -rn 'browser/search"' demo/
demo/palettes/BrowsePane.vue:190:import { SearchFilterBar, TagEditPopover } from "./browser/search";
demo/palettes/admin/AdminPane.vue:86:import { UserSortMenu } from "../browser/search";
```

The file's own docblock concedes the pattern in its last sentence — *"App.vue's eager `index.js`
chunk therefore still reaches `MigratePalettesDialog` through the `dialog/` sub-barrel directly"* —
and then calls the unused parent "the public contract" anyway. A seam nobody crosses is not a seam.
It is a module whose entire content is a claim about other modules' behaviour, and the claim is
false.

**This materially redirects pass 2's cure.** Pass 2 (`…pass2-80fc5c40.md:344`) proposes *"collapse
the leaf's seven barrels to the one at `browser/index.ts`"* — i.e. collapse onto the dead one, and
rewrite the two live call sites to route through a file that currently has no reason to exist.
Given the measurement, the honest options are: (a) delete `browser/index.ts` and let the sub-barrels
be the surface they already are, or (b) keep it and make the two consumers actually use it — but
(b) only earns its keep once G-DEMO-3b can fire, and it cannot (pass 1's L-11: three of four globs
name `demo/@/**`, a tree deleted at W43; I re-confirmed `ls demo/@` → *No such file or directory*).
I recommend (a). It is the option that removes a module instead of adding an obligation.

### P4-3 · MINOR · NEW — glass-ui owns the menu-row recipe but does not publish it

`SearchFilterBar.vue:240-248` hand-rolls a menu-row:

```css
.filter-option {
    display: flex; align-items: center; gap: 0.5rem;
    padding: 0.25rem 0.5rem;
    font-family: var(--font-serif); font-size: var(--type-small);
    line-height: var(--leading-small); cursor: pointer;
    border-radius: var(--radius-md);
    transition: background-color var(--duration-fast) var(--ease-standard);
}
.filter-option:hover { background-color: color-mix(in srgb, var(--accent) 50%, transparent); }
```

glass-ui already has this primitive:

```
$ cat node_modules/@mkbabb/glass-ui/dist/components/_shared/menuRowClass.d.ts
export type MenuRowIndicator = "none" | "start";
export declare function menuRowClass(indicator?: MenuRowIndicator): string;

$ grep -rn "menuRowClass" node_modules/@mkbabb/glass-ui/dist/index.d.ts
(no matches)
```

It lives under `_shared/` and is reachable only through internal chunk imports (`forms.js` imports
`./menuRowClass-Nh7CtMON.js`). It is not on the public barrel and not on any of glass-ui's 70
published subpaths. **The demo cannot consume it.** So this component's fork of the recipe is not a
choice against the design system — it is the only move available, and edict 4 has no compliant path
here.

Same class, same file, one line up: `SearchFilterBar.vue:239` writes
`.filter-section > .section-label { margin-bottom: 0.375rem }` — a per-instance override of a
glass-ui typography recipe that `demo/DESIGN.md` §Type lists among the system's named utilities
(edict 5).

**Relay (standing BH/BI fond).** This is a glass-ui-level change and belongs in the active glass-ui
inbox, not in `demo/`: publish `menuRowClass` (or a `MenuRow` primitive) on a real subpath, and give
`.section-label` a spacing token so consumers stop reaching for margin overrides. Until it ships,
the demo's fork should be recorded as *blocked-upstream*, not filed as a demo defect to fix locally
— fixing it locally would mint exactly the parallel implementation edict 4 exists to prevent.

---

## §4 · P4-4 · Scoping — which 6 of the 11 strict-template errors are real

A wave that flips `strictTemplates` will meet 11 errors on this component. They are not equivalent,
and treating them as such will either produce needless churn or hide the real ones. I resolved each
against glass-ui's compiled source and the live DOM.

**REAL — the binding does not work (6):**

| line | binding | why it is dead |
|---|---|---|
| `SFB:52` | `:checked` | `CheckboxProps` has no `checked`; the setup forwards **props** (`{class, ...t}`) into reka's root, so an attribute never enters the forward |
| `SFB:53` | `@update:checked` | compiled Checkbox: `emits: ["update:modelValue"]` — nothing ever emits `update:checked` |
| `SFB:5` | `variant="ghost"` | no `variant` in `ButtonProps`; measured live below |
| `SFB:112` | `variant="ghost"` | ditto |
| `MCP:48` | `variant="outline"` | ditto |
| `SFB:89` | `v-model="colorText"` | `Input` emits `string \| number` into a `Ref<string>` — a real type hole, benign at `type="text"` |

**NOISE — the binding works at runtime (5):** `SFB:93` `aria-label` and `SFB:95` `@keydown.enter`
on `<Input>`; `SFB:115` `@click` and `MCP:51` `@click` on `<Button>`; (`MCP:51` counted once).

The Input case is decided by glass-ui's own attr forwarding —
`dist/field-control.css_…-CeLay9Tk.js`:

```js
forwardedAttrs: e(() => { let { "aria-invalid": e, ...t } = i; return t; })
```

Every attribute except `aria-invalid` is spread onto the rendered `<input>`. Confirmed live: the
field's `aria-label` reached the DOM —

```json
"input": { "al": "Search by CSS color",
           "cls": "field-control glass-defined w-full pr-16 font-mono truncate",
           "ph": "#hex, hsl(...)" }
```

The Button case is decided by the absence of `inheritAttrs: false` in `dist/button-Bu9F4uU6.js`, so
`@click` binds by fallthrough.

These five are the price of the flag: they will need declared props upstream or an attrs-typing
accommodation, and they must not be "fixed" by deleting working bindings.

**Live confirmation of the `variant` family, this pass, this substrate** (headless Chromium,
`/#/browse`, `document.querySelector('button[aria-label="Filters"]')`):

```json
"attrs": [ "data-slot=\"button\"", "data-emphasis=\"secondary\"", "data-tone=\"neutral\"",
           "data-size=\"md\"", "data-icon-only=\"true\"", …,
           "class=\"button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover relative h-8 w-8\"",
           "variant=\"ghost\"", "aria-label=\"Filters\"" ],
"rect": { "w": 32, "h": 40 }
```

`variant="ghost"` sits on the element as inert markup, ordered after Vue's bound attributes —
the signature of fallthrough. `data-emphasis="secondary"` is the glass-ui default, and `secondary`
is exactly the branch that applies the capsule wash:

```js
g = r(() => p.tone === "neutral" && (p.emphasis === "primary" || p.emphasis === "secondary")),
x = r(() => e("button tap-squish focus-ring", g.value && "glass-wash glass-capsule", …))
```

The 32×40 geometry independently reproduces pass 1's measurement at a new substrate. And it is
visible without a probe: in
`docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png` the `⋮` trigger
renders as a solid raised pill on the search field — the opposite of ghost — while the twin
Palettes pane beside it carries no filter affordance at all.

---

## §5 · Negative proof — what pass 4 independently re-verified as sound

Each derived before reading any predecessor.

1. **The published-surface contract holds at runtime.** The demo consumes value.js only through
   `package.json#exports` subpaths. `grep -rn 'from "@mkbabb/value.js"' demo/` → **0** bare-root
   imports (there is no `.` key in the exports map, so a bare-root import would be
   `ERR_PACKAGE_PATH_NOT_EXPORTED` for a real consumer). The Vite self-alias set is *generated* from
   the exports map (`vite.config.ts:37-50`), so it cannot drift. The subject reaches the library only
   transitively via `color-session/color-utils.ts:1` → `@mkbabb/value.js/color`. **No import on this
   path is one a real consumer could not write.** (Pass 1's L-10 correctly records that the *TypeScript*
   `paths` block has drifted — 3 phantom keys, 2 omissions; I re-confirmed `ls dist/index.d.ts`,
   `dist/subpaths/parsing.d.ts`, `dist/subpaths/units.d.ts` all → *No such file*. Latent, not live.)
2. **glass-ui's own value.js consumption is clean.** `grep -o '"@mkbabb/value\.js[a-z/]*"'
   node_modules/@mkbabb/glass-ui/dist/*.js` → `@mkbabb/value.js/color` ×5, `/css` ×3, `/easing` ×1.
   Real subpaths only; no deep reach; no bare root.
3. **`palettes → color-session` is a correct downward edge**, re-confirmed independently (16 edges
   from `palettes/`, zero returning). Pass 3's per-area census stands.
4. **`verbatimModuleSyntax` holds.** `SearchFilterBar.vue:144` is the file's only type-only import
   and is written `import type` (edict 8 ✓).
5. **Idiomatic Vue 3.5.** Reactive props destructure at `:147`; `useTemplateRef` in the child at
   `MiniColorPicker.vue:82-83` (edict 7 ✓ on the surface this axis can see).
6. **The cluster barrel is correctly shaped** — named re-exports only (PI-6), `MiniColorPicker`
   deliberately unexported.
7. **What I looked for and did not find:** a second `useDark`-class store, an `ActionBarLayer`-style
   local re-implementation of a removed composable, or a `demo/palettes/export.ts` ↔
   `usePaletteExport.ts` dual path reachable from this component. `SearchFilterBar` touches none of
   the named historical suspects. Its duplication is elsewhere and is already on the ledger
   (MiniColorPicker's colour math; the client/server colour filter).

---

## §6 · Where pass 4 lands the axis

Three passes established that this component's concepts each have two homes, and that the
boundaries meant to prevent that are inert. Pass 1 then reached the conclusion that closed the
question the wrong way: that the type gate *cannot* see design-system API drift, and that closing it
requires changing glass-ui or inventing a lint rule.

It can see it. It has always been able to see it. One option, unset since the demo program was
split, is the difference between a fleet of prop renames being invisible and being red. That is the
single highest-leverage line available on this axis, and it costs nothing but the six real errors it
surfaces on this file and their siblings across 22 others.

The structural lesson generalises past this repo: **every strictness dial in this project is at
maximum except the one that governs the boundary the project actually crosses most often** — the
boundary between a consumer's template and a design system's component API. The library-structure
disease here is not that the demo reaches wrong; it is that the reach was never checked.

Priority order for the wave, folding all four passes:

1. **P4-1** — flip `strictTemplates`; it is the gate under items 2 and 3 and it makes them
   non-recurring,
2. pass 1 **L-1** (inert tags filter — the flag names it at `:52-53`),
3. pass 1 **L-5** / pass 3 §4 (silently wrong colour search — wrong answers with a success signal),
4. pass 3 **LP3-1** (ringless control — keyboard users get nothing, and the cure is written twice
   already),
5. pass 1 **L-2** (51 sites / 22 files — mechanical once the gate is red),
6. pass 1 **L-4** / pass 2 **LP2-3** (colour-filter topology; the library's byte projection),
7. re-homing — pass 3 **LP3-2** (`UserSortMenu`), pass 1 **L-9** (`demo/ui/`), **P4-2** (delete the
   dead seam, do not collapse onto it),
8. **P4-3** relayed to glass-ui, not fixed locally,
9. the eslint boundaries last — but *before* the re-homing lands, or nothing will hold it.

---

## Appendix — pass 4 probes

| purpose | invocation | key result |
|---|---|---|
| Baseline gate (§2) | `npx vue-tsc -p tsconfig.demo.json --noEmit` | 0 errors |
| Strict-template gate (§2, §4) | `npx vue-tsc -p /tmp/tsconfig.strict.json --noEmit` | **11 errors**, listed verbatim in §2 |
| Harness validity — script checked, template not (§2) | planted `TS2322` + planted `:bogusPropXyz` in one probe SFC | script error reported; template error not |
| `variant` scale (§2) | inline `python3` over `demo/**/*.vue` | **51 sites / 22 files**; agrees with pass 1's 51 |
| Live DOM of the trigger (§4) | headless Chromium, `/#/browse` | `variant="ghost"` inert; `data-emphasis="secondary"`; `glass-wash glass-capsule`; rect 32×40 |
| Live DOM of the popover interior (§4) | same run, trigger clicked | `aria-label` reached the `<input>`; sections `Sort · Tier · Find by Color`; **0 checkboxes** (commons unreachable → `availableTags` empty → the Tags section is `v-if`'d out, `SFB:47`) |
| Checkbox provider API (§4) | `dist/components/checkbox/Checkbox.vue.d.ts` + compiled `glass-ui.js` | no `checked` prop; `emits: ["update:modelValue"]`; setup forwards props, not attrs |
| Input attr forwarding (§4) | `dist/field-control…-CeLay9Tk.js` | forwards all attrs except `aria-invalid` → `aria-label`/`@keydown` are noise, not defects |
| Dead seam (§3 P4-2) | `grep -rn '"./browser"\|palettes/browser"' demo/` | zero consumers |
| Unpublished primitive (§3 P4-3) | `cat _shared/menuRowClass.d.ts`; `grep menuRowClass dist/index.d.ts` | exists; not exported |

Durable artifacts are preserved in-tree beside this report at
`docs/tranches/V/megatranche/audit/components/SearchFilterBar/evidence-p4-L/`:

    GATE-REPRO.md               both gate runs, re-executed at HEAD 9268f054, output verbatim
    tsconfig.strict.json        the one-option delta — copy it into tsconfig.demo.json to close the gate
    tsconfig.probe.json         the harness-validity program
    harness-validity-probe.vue  planted script error (reported) + planted template error (not reported)
    P4-dom-probe.mjs            the live Chromium DOM probe used in §4

**No source edits were made by this seat.** The only files written are this report, its
`evidence-p4-L/` artifacts, and the preservation copy `challenge-L-library-pass3-f36f780c.md`.
