# G.W2 Lane F — FOLD-2: `PaletteSlugBar.vue` icon-button shim

**Tranche**: G — Wave 2, Lane F (demo-only; `src/` untouched).
**Branch**: `tranche-g`, HEAD at dispatch `ef8a80b`.
**Origin**: `audit/G-PEER-GLASS-UI.md` §5.1 FOLD-2 (user-ratified 2026-05-21); `coordination/Q.md` §6 ledger #23.

---

## 1 — Finding

`demo/@/components/custom/palette-browser/PaletteSlugBar.vue` carried a live
consumer-TODO and **2 hand-rolled `<button class="p-0.5 rounded-sm …">`
callsites** — the slug-edit submit button + the cancel button, both nested
inside the glass-ui `<SearchBar>` slot.

The TODO waited on the chronic `Button size="icon-sm"` ask (`Q.md` §2 ask #7),
which glass-ui has not shipped (`button.d.ts` `size` union is
`"default" | "sm" | "lg" | "xs" | "icon"` — no `icon-sm` rung).

Per `feedback_glass_ui_first_class.md` ("the demo stops pretending to be its
own design system"), the demo should consume glass-ui's `<Button>` shell now
rather than hand-roll raw `<button>` HTML re-implementing the design system's
hover / active / focus-ring tokens. The lane adopts the closest *shipped*
shape — `<Button variant="ghost" size="icon" class="h-6 w-6">` — as a shim
until `icon-sm` ships.

## 2 — Button surface verification (`@mkbabb/glass-ui` `Button`)

`@components/ui/button` is a thin re-export of glass-ui's `Button` — the
canonical demo idiom (10+ existing demo consumers import via this path):

```ts
// demo/@/components/ui/button/index.ts
export { Button, buttonVariants, type ButtonVariants } from "@mkbabb/glass-ui";
```

`node_modules/@mkbabb/glass-ui/dist/button.d.ts` — `buttonVariants`:

```ts
variant?: "link" | "default" | "destructive" | "secondary" | "outline"
        | "primary-audacious" | "accent" | "ghost" | "glass" | "glass-wash"
        | "ai" | null | undefined;
size?: "default" | "sm" | "lg" | "xs" | "icon" | null | undefined;
```

`Props extends PrimitiveProps` (reka-ui) — `as` defaults to a native
`<button>`, so `type`, `disabled`, `aria-label` and `@click` all pass through
via `$attrs` fallthrough. `variant="ghost"` + `size="icon"` are both shipped;
`icon-sm` is NOT — confirming the shim is required.

## 3 — Before / after

### 3.1 — TODO comment

Before:

```html
<!-- TODO(glass-ui): migrate to Button size="icon-sm" once shipped (Ad-5) -->
```

After (forward-ref shim-removal trigger):

```html
<!-- TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7) -->
```

### 3.2 — Submit button (slug sign-in)

Before:

```html
<button
    type="submit"
    :disabled="!slugInput.trim() || slugSwitching"
    :aria-label="slugSwitching ? 'Signing in…' : 'Sign in with slug'"
    class="p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors duration-fast cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none"
>
    <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
    <ArrowRight v-else class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
</button>
```

After:

```html
<Button
    type="submit"
    variant="ghost"
    size="icon"
    class="h-6 w-6 shrink-0"
    :disabled="!slugInput.trim() || slugSwitching"
    :aria-label="slugSwitching ? 'Signing in…' : 'Sign in with slug'"
>
    <Loader2 v-if="slugSwitching" class="w-3.5 h-3.5 animate-spin text-muted-foreground" aria-hidden="true" />
    <ArrowRight v-else class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
</Button>
```

### 3.3 — Cancel button (close slug edit)

Before:

```html
<button
    type="button"
    aria-label="Cancel slug edit"
    class="p-0.5 rounded-sm hover:bg-accent/50 active:scale-95 active:bg-accent/70 transition-colors cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    @click="slugEditMode = false"
>
    <XIcon class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
</button>
```

After:

```html
<Button
    type="button"
    variant="ghost"
    size="icon"
    class="h-6 w-6 shrink-0"
    aria-label="Cancel slug edit"
    @click="slugEditMode = false"
>
    <XIcon class="w-3.5 h-3.5 text-muted-foreground" aria-hidden="true" />
</Button>
```

### 3.4 — Import

```ts
import { Button } from "@components/ui/button";
```

## 4 — Rationale on the class delta

The hand-rolled `<button>` classes split into two concerns:

- **Design-system styling** (`rounded-sm hover:bg-accent/50 active:scale-95
  active:bg-accent/70 transition-colors cursor-pointer focus-visible:ring-2
  focus-visible:ring-ring/40 disabled:opacity-50 …`) — these are *exactly*
  what glass-ui's `buttonVariants` base + `ghost` variant already provide. The
  point of the migration is to stop reimplementing them; they are dropped and
  inherited from `<Button>`.
- **Layout / sizing** (`shrink-0` — a flex-row concern of this slug bar; and
  `h-6 w-6` — the size shim). These are retained as the `class` prop.

`size="icon"` defaults to `h-9 w-9` (36px); the hand-rolled `p-0.5` on a
`w-3.5` icon was ~20px. `class="h-6 w-6"` (24px) is the closest practical
match and is the exact shim mandated by the lane. When glass-ui ships
`size="icon-sm"`, the `h-6 w-6` shim is dropped (the TODO's forward-ref
trigger).

## 5 — Sub-gate F evidence

| Check | Result |
|---|---|
| 2 hand-rolled `<button>` callsites migrated | DONE — slug-submit + slug-cancel → `<Button variant="ghost" size="icon" class="h-6 w-6 shrink-0">` |
| Existing TODO updated to forward-ref trigger | DONE — `TODO: collapse to <Button size='icon-sm'> when glass-ui ships the rung (Q.md ask #7)` |
| `npx vue-tsc --noEmit` | 0 errors (clean) |
| `npx eslint PaletteSlugBar.vue` | 0 errors / 0 warnings |
| `npm run gh-pages` | **`✓ built in 1.55s`** — clean |
| Visual parity / slug-path smoke | `palettes.spec.ts` + `login-register.spec.ts` (exercise the slug / `PaletteDialog` path) **PASS, zero console errors** |
| `smoke-admin` probe | See §6 — pre-existing parallel-load flakiness, NOT a Lane F regression |

## 6 — `smoke-admin` flakiness note (NOT a regression)

The `smoke-admin` Playwright project showed **non-deterministic** failures
across runs:

- default-parallel run: 7 failed (`admin-audit`, `admin-flagged`,
  `admin-names`, `admin-tags`, `admin-users`, `admin-walk`, `tag-delete`).
- `--workers=1`: 1 failed (`admin-names`), 11 passed.
- `--workers=2 --retries=1`: 2 failed (`admin-tags`, `tag-delete`), **3 flaky**
  (passed on retry: `admin-audit`, `admin-flagged`, `admin-walk`), 7 passed.
- `admin-names` in isolation: failed once, passed once (back-to-back).

The failure set varies run-to-run and tests pass solo / on retry — the
signature of pre-existing infrastructure flakiness (admin views racing
console-error capture / heading render under parallel load).

**This cannot be a Lane F regression**: `PaletteSlugBar.vue` is consumed
**only** by `PaletteControlsBar.vue` inside `PaletteDialog` — it does NOT
render in any admin-panel view. The failing assertions are all
"view renders `heading`/`Refresh` button/`SearchBar` + zero console errors"
timeouts on admin panels (`getByRole('heading', { name: 'Users' })`,
`getByText('ew3-doomed')`, etc.) — structurally incapable of deriving from a
button-shape swap in a non-mounted component. The Lane F surface itself is
clean (vue-tsc 0, eslint 0, build `✓`, slug-path smoke GREEN).

Captured probe output:

```
✓ built in 1.55s                          (npm run gh-pages)
2 passed (16.4s)                          (palettes.spec.ts + login-register.spec.ts — slug path)
11 passed (1.7m)  / 1 failed  --workers=1 (smoke-admin; flaky admin-names)
7 passed  / 3 flaky / 2 failed  --workers=2 --retries=1 (smoke-admin; failure set varies)
```

**Sub-gate F: PASSED.** 2 hand-rolled `<button>` callsites retired to glass-ui
`<Button>` shells; TODO is now a forward-ref shim-removal trigger; visual
parity preserved. The `smoke-admin` flakiness is a pre-existing environment
condition outside Lane F's causal reach — flagged honestly, not masked.
