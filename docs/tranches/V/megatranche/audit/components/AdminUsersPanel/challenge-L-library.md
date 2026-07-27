# CHALLENGE-L — library structure under `AdminUsersPanel.vue` (r3)

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the tier this seat was
spawned with. The seat is declared, not inherited or defaulted.

- Subject: `demo/palettes/browser/admin/AdminUsersPanel.vue` (391 lines, area `palettes`, route `#/admin/users`)
- Repo: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`
- Axis: library structure — module boundaries, ownership, direction of dependency, public surface
- **Verdict: DEFECTIVE**

### Pass provenance

Two prior passes of this axis exist at this path and are preserved verbatim — nothing is lost:

| pass | file | findings |
|---|---|---|
| r1 (2026-07-24) | `challenge-L-library.2026-07-24-prior.md` | 11 |
| r2 (2026-07-27) | `challenge-L-library.2026-07-27-r2-prior.md` | 14 |
| **r3 (this)** | `challenge-L-library.md` | **18** |

r3 opened blind — I traced the import closure and ran my own probes before reading r2, then
reconciled. The reconciliation is stated honestly in both directions:

- **4 findings are NEW in r3** — L-15 (the dead enforcement layer), L-16 (duplicated wire
  contract), L-17 (the skeleton's shape lie), L-18 (one ink referent across two surface rungs).
  None appears in r1 or r2.
- **9 findings I re-derived independently** and they match r2. Tagged **[r2 · independently
  re-derived]** with my own command output where the derivation differed in method.
- **1 self-correction against r2, in r2's favour**: I counted `demo/ui/` as 20 barrels by
  directory listing; `find demo/ui -type f` → **19**. r2 is right, I was wrong. Recorded because
  a wrong number in an audit is worse than a missing one.
- r2's L-1 Consequence #2 (the `remotePalettes` divergence) I re-read and **confirm** — see L-1.

**L-15 is the headline of this pass**, and it is the finding that explains the other seventeen:
the demo's module-boundary laws are dead code matching zero files, and a barrel comment in the
tree asserts they are enforced when they enforce nothing.

---

## 0 · The import lattice, traced

| # | line | specifier | resolves to | judgement |
|---|------|-----------|-------------|-----------|
| 1 | 186 | `vue` | framework | **L-14** — `Transition` is a compiler built-in; the import is inert |
| 2 | 187 | `../../../color-session/keys` | `demo/color-session/keys.ts` | **L-9 · L-18** — the injected accent is one referent used on two rungs |
| 3 | 188 | `../../../ui/button` | `demo/ui/button/index.ts` — one re-export line | **L-5** — alias barrel |
| 4 | 189 | `../../../ui/badge` | `demo/ui/badge/index.ts` — one re-export line | **L-5** — alias barrel |
| 5 | 190–197 | `@mkbabb/glass-ui/dialog` | glass-ui 7.0.0 published subpath | SOUND — and the right form, which convicts #3/#4 |
| 6 | 198 | `@lucide/vue` | icon package | SOUND |
| 7 | 199 | `../../types` | `demo/palettes/types.ts` | **L-16** — a second declaration of the api's wire contract |
| 8 | 200 | `../../usePalettePorts` | 275-line wiring module, imported for one `Symbol` | **L-1 · L-2 · L-3** |
| 9 | 201 | `../card` | `demo/palettes/browser/card/index.ts` | SOUND — named barrel (PI-6), same area |
| 10 | 202 | `../../../shared/ui/EmptyState.vue` | raw `.vue`; **the area has no barrel** | **L-15** — a raw cross-area reach the dead rule was written to ban |
| 11 | 203 | `./AdminListSkeleton.vue` | sibling | **L-7 · L-17** — right file, wrong shape |

### `@mkbabb/value.js` — clean, proved not assumed

The subject imports the library **not at all**. Demo-wide, my own scan:

```
$ grep -rn "@mkbabb/value.js" demo --include=*.ts --include=*.vue | … | sort | uniq -c
     24  "@mkbabb/value.js/color"      10  "@mkbabb/value.js/css"       6  "@mkbabb/value.js/math"
      5  "@mkbabb/value.js/easing"      4  "@mkbabb/value.js/quantize"
$ grep -rn "@src/" demo --include=*.ts --include=*.vue          → 0 hits
$ grep -rn 'from "@mkbabb/value.js"' demo --include=*.ts …      → 0 hits (no root-barrel reach)
```

Five of seven published subpaths, zero deep reaches, zero bare-barrel reaches, and the Vite
self-alias set is *generated* from `package.json#exports` (`vite.config.ts:37-50`), so it is
structurally incapable of resolving a specifier a real consumer could not write. **The dogfood is
honest; there is no false proof of the public API here.** (Matches r2 by an independent method.)

---

## 1 · NEW in r3

### L-15 · MAJOR — the demo's module-boundary laws match zero files; a barrel in the tree asserts they are enforced **[NEW r3]**

This is the structural precondition for most of the rest of this report. Every boundary defect
below persists because the layer meant to catch it is dead.

**The claim in the tree.** `demo/palettes/browser/index.ts:6-8`:

> *"External consumers reach the feature through THIS seam (or a sub-barrel it re-exports), never a
> raw internal `.vue` file — the G-DEMO-3b boundary (**eslint.config.js**) enforces it standing."*

**The rules.** `eslint.config.js` declares three boundary objects — G-DEMO-3b (lines 220-256),
G-DEMO-1 + G-DEMO-3a (lines 257-304) — over these file globs:

```
demo/color-picker/**/*.{ts,vue}
demo/@/components/**/*.{ts,vue}
demo/@/lib/**/*.{ts,vue}
demo/@/composables/**/*.{ts,vue}
```

**`demo/@/` does not exist.**

```
$ ls -d demo/@
ls: demo/@: No such file or directory
```

Nor can the *banned specifier* be written any more. The bans target
`@components/custom/palette-browser/**/*.vue` and `**/color-picker/**` in alias form; the
`@components` alias was killed at W43 (RF-15). The repo says so twice, in its own words:

```
vite.config.ts        "W43 (RF-15) killed the demo `@…` path aliases: every demo import is now
                       relative to its physical home (color-session/palettes/platform/shell/…)"
tsconfig.demo.json:33 "import is relative to its physical home. No `@styles`/`@components`/…"
```

**Proof through ESLint's own resolver**, not by reading globs:

```
$ node -e "…new ESLint({}).calculateConfigForFile(f)…"
demo/palettes/browser/admin/AdminUsersPanel.vue -> no-restricted-imports = null
demo/palettes/usePalettePorts.ts                -> no-restricted-imports = null
demo/palettes/useAdminUsers.ts                  -> no-restricted-imports = null
```

**Control** — the library-side ban is alive on the same config, so this is a targeted death, not a
broken file:

```
src/color/index.ts -> [2,{"patterns":[{"group":["@mkbabb/glass-ui","@mkbabb/glass-ui/*"],
                     "message":"inv-K-1: the value.js LIBRARY (src/) must never import glass-ui …"}]}]
```

**Mechanism.** A tranche restructured the demo tree (`demo/@/components/custom/*` →
`demo/{palettes,shell,picker,scenes,workbenches,platform,color-session,shared,ui}/`) and moved the
*files* without moving the *laws*. Three invariants became decoration in the same motion. The
comment in `browser/index.ts` is now a false statement about the repository — strictly worse than
no comment, because it tells the next reader the seam is defended.

**Live consequences already in this report.** With G-DEMO-3b dead, raw cross-area `.vue` reaches
are unchecked — there are **seven** into the seam-less `shared/ui`, one of them being
`AdminUsersPanel.vue:202`:

```
$ grep -rn 'shared/ui/.*\.vue"' demo/palettes
AdminPane.vue:88 · PaletteCardGrid.vue:36 · AdminUsersPanel.vue:202 · AdminFlaggedPanel.vue:142
AdminTagsPanel.vue:118 · AdminNamesPanel.vue:129 · AdminAuditPanel.vue:100
$ ls demo/shared/ui
EmptyState.vue  PaneHeader.vue          ← no index.ts; the one area with no seam
```

Every sibling area publishes a hardened barrel with a documented PI-6 named-re-export rationale
(`browser/`, `card/`, `admin/`, `search/`, `dialog/`, `slug/`, `status/`). `shared/ui` publishes
none, so its 12 `EmptyState` consumers are all coupled to its internal file layout, and nothing
notices.

**And the law this audit needed does not exist at all.** No rule expresses *"a `.ts` composable
may not import a `.vue` component"* — which is exactly L-1, the BLOCKER, written at
`useAdminUsers.ts:14`. That line even satisfies G-DEMO-3b *in letter* (it reaches the barrel
`./browser/admin`, not a raw `.vue`) while inverting the layering the rule exists to protect.

**Cure.** Re-aim the globs at the live tree, re-express the bans as relative paths (there are no
aliases left to name), add the missing direction law, and — because it is the same class of gap —
close the design-system-prop hole L-4 identifies. The rule for that is installed and unused:
`node_modules/eslint-plugin-vue/dist/rules/no-restricted-static-attribute.js`.

```js
// eslint.config.js — over demo/**/*.{ts,vue}
"no-restricted-imports": ["error", { patterns: [
  { group: ["**/palettes/browser/*/[A-Z]*.vue"], message: "G-DEMO-3b: reach the feature through its barrel." },
  { group: ["**/color-picker/**"],               message: "G-DEMO-1: features never import app-root boot." },
]}],
"vue/no-restricted-static-attribute": ["error",
  { key: "variant", element: "Button", message: "glass-ui 7 Button: use `emphasis` + `tone`." }],
// + the direction law (L-1): a *.ts module may not import a *.vue component.
// + add demo/shared/ui/index.ts so the seam it is reached through actually exists.
```

---

### L-16 · MINOR — the wire contract has two declarations; the divergence is paid in masking guards **[NEW r3]**

```ts
// demo/palettes/types.ts:88            |  // api/src/modules/admin/service/users.ts:24
export interface User {                 |  export interface UserListEntry {
    slug: string;                       |      slug: string;
    createdAt: string;                  |      createdAt: Date;
    lastSeenAt?: string;                |      lastSeenAt?: Date | undefined;
    status?: "active" | "suspended";    |      status?: UserStatus | undefined;
    paletteCount?: number;              |      paletteCount: number;        // ← REQUIRED on the wire
}                                       |  }
```

`demo/palettes/api/admin-users.ts:26` types the response `Promise<PaginatedResponse<User>>` — the
demo's hand-mirrored copy, never the server's type.

`paletteCount` is **required on the wire and optional on the client**. That single optionality lie
is paid for at five sites in the subject (`:81`, `:87-89`, `:103` `?? 0`, `:113`, `:241` `?? 0`)
and two more in the composable (`useAdminUsers.ts:120`, `:136`). Each `??` is a masking fallback
for a field the server always sends — forbidden by the no-legacy edict.

(`createdAt: Date → string` is JSON-honest and correct. `USER_STATUSES` matches exactly today —
`api/src/modules/session/model.ts:96` — and nothing keeps it matched tomorrow.)

**Cure.** One declaration. Either the api package publishes its DTO types and the demo imports
them, or `demo/palettes/types.ts` is generated from the api contracts. Minimum immediate fix:
`paletteCount: number`, deleting all seven guards.

---

### L-17 · MINOR — the skeleton draws a leading swatch the real row does not have **[NEW r3 — the rendered consequence of L-7]**

r2's L-7 establishes that the admin row grammar is transcribed in three places. It does not state
what that costs at runtime. It costs a reflow on every roster load.

`AdminListSkeleton.vue:15` — rendered by the subject at `:47` and `:136` — draws a leading circle:

```html
<Skeleton surface="glass" variant="breath" class="w-8 h-8 rounded-full shrink-0" />
```

because it is shaped to `AdminListItem` (its own comment, `:4`), whose first slot is a `w-8 h-8`
swatch anchor (`AdminListItem.vue:14-16`). The subject's hand-rolled row (`:78-132`) has **no
leading element** — it opens straight into `flex-1 min-w-0`.

So the loading state shows a 32 px leading circle per row and the loaded state does not: every
roster load ends in a horizontal shift of the whole row — precisely what the "ONE loading grammar"
comment at `:44-45` exists to prevent. The skeleton is telling the truth about `AdminListItem` and
a lie about this panel.

The two rows also disagree on where the border lives — `AdminListItem` carries
`rounded-md border border-card-edge min-w-0` on the row itself; the subject puts it on an *outer
wrapper* (`:68`) and leaves the row bare, so the S.W5-12/F-1 `min-w-0` fix documented inside
`AdminListItem` was never inherited here.

**Cure** is r2's L-7 cure; this finding supplies the measurable reason it is not cosmetic.

---

### L-18 · MINOR — one injected ink referent, bound across two different surface rungs in one file **[NEW r3]**

`AdminUsersPanel.vue:232` injects a single value and binds it in two places:

- `:99` — the slug pill inside `AdminPane`'s `<Card tier="resting">` → **resting** rung
- `:168` — the slug pill inside `<DialogContent surface="glass">` → **floating** rung

`SAFE_ACCENT_KEY` is certified against **resting** only — `useContrastSafeColor.ts:299-311` calls
`surfaceLightnessNow("resting", …)` — and the module states the contract in its own doc-comment:

> *"the referent is the SURFACE RUNG, never the bare page ambient … Page-rung consumers keep their
> own referent through `useSafeAccentFn("page")`."*

**Measured live** (`http://localhost:9000#/admin/users`, read-only evaluate) — the two rungs are
materially different surfaces:

```
--glass-bg-resting  : color-mix(in srgb, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) calc((1 - (1 - 0.65) * 1) * 100%), transparent)
--glass-bg-floating : color-mix(in srgb, light-dark(hsl(30 85% 96%), hsl(26 22% 17%)) calc((1 - (1 - 0.80) * 1) * 100%), transparent)
```

α **0.65 vs 0.80** over the same ambient: the floating rung composites 15 pp more plate tint, so in
light scheme it is measurably lighter than the referent the ink was certified against.

**Structural claim: CONFIRMED** by file:line — one referent, two rungs, same file.
**Contrast consequence: HYPOTHESIS** — reproducing the dialog needs an admin token and a non-empty
roster, unavailable in this checkout. Direction of error is unfavourable (certified against a
darker plate, rendered on a lighter one); magnitude unmeasured. Labelled a hypothesis, not a defect.

**Mechanism.** `SAFE_ACCENT_KEY` is a convenience singleton co-existing with the
surface-parameterised `useSafeAccentFn(rung)` — 5 injection sites vs 6 function sites demo-wide. Any
consumer spanning two rungs is *guaranteed* to mis-reference one of them, and nothing can detect it.

**Cure.** Retire `SAFE_ACCENT_KEY` as a consumable; keep it only as the boot writer's
`--accent-live` source. Every consumer names its rung —
`useSafeAccentFn("resting")` for the row, `useSafeAccentFn("floating")` for the dialog — so the rung
cannot be implicit and the ink-on-tier law becomes structurally unbreakable rather than
conventionally observed. (This composes with r2's L-9 cure: once the pill is a glass-ui `Chip` with
a tone axis, both the inject *and* the rung question disappear from this file.)

---

## 2 · Carried forward from r2, re-verified in r3

Full evidence for these is in `challenge-L-library.2026-07-27-r2-prior.md`; each entry below records
what I re-derived myself this pass.

| id | sev | status in r3 | re-derivation |
|---|---|---|---|
| **L-1** | **BLOCKER** | **[r2 · independently re-derived + Consequence #2 confirmed]** | I traced the same five back-channel call sites (`useAdminUsers.ts:95/117/132/146`, `usePalettePorts.ts:123`) against `AdminUsersPanel.vue:389`'s 5-member `defineExpose`, and the same type cycle `useAdminUsers.ts:14 → browser/admin/index.ts:3 → AdminUsersPanel.vue:200 → usePalettePorts.ts → useAdminUsers.ts`. r2's Consequence #2 I re-read at `useAdminUsers.ts:112-125` and **confirm**: `onAdminDeletePalette` filters `deps.remotePalettes` (`:106`), `onAdminDeleteUserPalette` never touches it — Browse keeps rendering a deleted palette. |
| L-2 | MAJOR | [r2, not independently re-derived] | The 26-module drag is r2's closure measurement; I did not re-run it. I do confirm the shape: `AdminUsersPanel.vue:200` imports one `Symbol` from a 275-line module that wires 15 composables + auth + transport. |
| L-3 | MAJOR | **[r2 · independently re-derived]** | I counted `adminPort` from `usePalettePorts.ts:195-231` and traced the panel's single use — `pm.loadUserPalettes(slug)` at `:361`. Separately measured the props/emits ceremony: of `AdminPane.vue:26-39`'s 6 props, **5 are pure `pm.*` reads** (`filteredAdminUsers` · `loadingUsers` · `usersLoadError` · `expandedId` · `adminUsers.length`) and the 6th is a different inject the child could take directly; **7 of 7 emits** bind straight to `pm.*` handlers. The parent contributes zero information to a port the child already injects at `:234`. |
| **L-4** | MAJOR | **[r2 · independently re-derived, and extended with a live DOM measurement r2 does not have]** | glass-ui 7.0.0 `ButtonProps` (`dist/components/button/Button.vue.d.ts:6-19`) declares `emphasis`/`tone`/`size`/`iconOnly`/`loading` — **no `variant`**. My own scan reproduces r2's fleet count exactly: **51 `<Button variant=…>` sites across 22 files**, 5 of them here (`:22,33,58,114,123`). **New evidence — measured in the live DOM:** `{"text":"Prune empty","attrs":[…,"data-emphasis=\"secondary\"","data-tone=\"neutral\"",…,"variant=\"outline\"",…]}`. `data-emphasis="secondary"` is glass-ui's *default*; `variant="outline"` fell through onto the DOM as an inert attribute. The W5-12/F-8 intent at `:107-111` ("the per-row destructive is quieted to ink-at-rest") was expressed as `variant="ghost"` and is therefore **silently reverted** — the row delete renders at the same emphasis as the "Palettes" button beside it. |
| L-5 | MAJOR | **[r2 · independently re-derived; r3 SELF-CORRECTION]** | I confirm all barrels are pure one-line re-exports and that this file takes **both** paths (`Button`/`Badge` via `demo/ui/*`, `Dialog*` via `@mkbabb/glass-ui/dialog`) while `demo/ui/dialog` exports the identical eight symbols. **I initially counted 20 barrels by directory listing; `find demo/ui -type f` → 19, `find demo/ui -type f ! -name index.ts` → 0. r2's 19 is correct and mine was wrong.** Importer count re-run: `grep -rEl 'from "(\.\./)+ui/' demo …` → **48**, matching r2. I add one point r2 does not make: the shims import glass-ui's **root barrel**, so every shimmed import forfeits the per-component subpath splitting glass-ui publishes 74 export entries to provide. |
| L-6 | MAJOR | **[r2 · independently re-derived]** | I found the same two engines by search — `AdminUsersPanel.vue:254-286` (7 refs + `showConfirm` + `onConfirm` + 24 template lines) and `PalettesPane.vue:101-122`, both carrying the same "Glass 7: ConfirmDialog folded onto the Dialog family" comment. glass-ui's `exports` map has `./dialog` and **no** confirm entry. r2's `git show f2c8f565` provenance and the `ActionBarLayer`/`useLayerTransition` family framing are r2's; I did not re-run the archaeology. |
| L-7 | MAJOR | **[r2 · independently re-derived; extended by L-17]** | `grep -rn AdminListItem demo` → `AdminNamesPanel.vue` (5 hits, the only real consumer) and `AdminListSkeleton.vue:4` (**a comment**). The atom is being transcribed, not used. r3 adds the rendered consequence — see **L-17**. |
| L-8 | MAJOR | **[r2 · independently re-derived]** | Three homes for one concept: glass-ui ships `./toast` and the demo uses it **zero** times (`grep -rn "glass-ui/toast\|useToast\|Toaster" demo` → 0); `ActionFeedback.vue` owns the concept correctly *including a `clearTimeout` on re-trigger*, buried four levels deep in one card's private folder; `AdminUsersPanel.vue:301-309` rebuilds it with a bare `setTimeout(…, 3000)` — no handle, no cleanup. The newest copy is the only one that leaks. |
| L-9 | MINOR | [r2] | The `.slug-pill` recipe institutionalises per-instance `:style` overrides (`foundation.css:583-584` says so outright), four mechanisms across five consumers; the pill **is** a glass-ui `Chip`. r3 adds one datum r2 lacks: the copy-paste the class was created to kill **is still alive**, inside a component this panel renders — `PaletteCardSwatches.vue:9` reproduces all six `@apply` utilities in order (`text-mono-small font-bold px-2 py-0.5 rounded-full border`). And see **L-18** for the second, orthogonal defect on the same two lines. |
| L-10 | MINOR | [r2] | Per-instance button geometry (`h-7 px-2.5` / `h-7 px-2` at `:24,35,116,125`) hand-rebuilding the `size="xs"` rung glass-ui ships. Not re-measured. |
| L-11 | MINOR | [r2] | One global `expandedId` serving three lists across two disjoint ID namespaces. Not re-measured. |
| **L-12** | MAJOR | **[r2 · independently re-derived — same zero-network result, reached blind]** | I reproduced this before reading r2 and got the same answer by the same instrument. `useAdminUsers.ts:52-54` returns before touching `loadingUsers` **or** `usersLoadError`, so the panel takes `:63` — `eyebrow="· roster clear ·" message="No users found."`. Live: `{adminToken: null, bodyTextHasNoUsers: true}` and `browser_network_requests` filtered `users\|/api/` → **0 requests**. The roster was never *fetched and found empty* — it was never asked for. Corroborated in WebKit by all four Safari captures (`visual/shots/*/admin-users.png`, read this pass — dock reads "Login", panel reads `0 users` / `· ROSTER CLEAR ·`) and by `REPORT.md:128,143,158,173` (`pageErr 0 · consoleErr 0 · overflowX 0 · main 1`). The capture harness sets only `vueuse-color-scheme` (`visual/capture.mjs:71`) — no admin token. Structural half re-counted: `grep -c "if (!token) return" demo/palettes/useAdminUsers.ts` → **11**; across `demo/palettes/*.ts` → **22**; and `grep -rn "requiresAdmin\|adminOnly\|guard" demo/shell/` → nothing. This violates the invariant the file annotates itself with at `:49-50` ("the P0 case: error ≠ empty — a dead backend never costumes as an empty roster") on the branch every unauthenticated visitor takes. |
| L-13 | INFO | **[r2 · independently re-derived]** | `demo/palettes/export.ts` (file) and `demo/palettes/export/` (directory, 12 modules) share a basename; `usePaletteExport.ts:9` writes `from "./export"` and gets the **file**. I add the sharper point: `grep -rn "export/serializers" demo` → **one** consumer, `demo/test/export/byte-exact.test.ts:23`. The byte-exact serializer test certifies code the application never runs — a false proof, on this axis's own terms. **Off this component's closure** (the panel renders `PaletteCard` without wiring `@export`); recorded for whichever seat owns `usePaletteExport`. |
| L-14 | MINOR | **[r2 · independently re-derived]** | `AdminUsersPanel.vue:186` is the **only** file in `demo/` importing `Transition` from `vue`; 17 files use `<Transition>` and 16 rely on the compiler built-in. Invisible to lint — `vue/no-unused-components` and `@typescript-eslint/no-unused-vars` are both disabled (`eslint.config.js:18-22`). |

---

## 3 · The greenfield lattice

Unchanged in shape from r2 — I re-derived it independently and arrived at the same five modules —
with two additions this pass makes necessary (marked ★):

```
eslint.config.js                    ★ globs re-aimed at the LIVE tree; the direction law added;
                                      vue/no-restricted-static-attribute wired            (L-15, L-4)
      │ (the layer that makes every rule below hold)
      ▼
demo/shell/viewSchema.ts             auth: "admin" on the five admin views                 (L-12)
      ▼
demo/palettes/admin/AdminGate.vue    renders the auth plate, or its slot
      ▼
demo/palettes/admin/AdminPane.vue    composition root for the console
      │  props ▼                                    ▲ emits
demo/palettes/browser/admin/AdminUsersPanel.vue     pure view — zero inject, zero
      │                                             defineExpose, zero timers
      ├── AdminListItem.vue          the ONE row atom (interactive variant included)  (L-7, L-17)
      ├── AdminListSkeleton.vue      AdminListItem + <Skeleton> slots — same shape, by construction
      ├── shared/ui/index.ts        ★ the missing seam; 12 EmptyState consumers stop
      │                               reaching a raw .vue                                 (L-15)
      ├── shared/ui/EmptyState.vue   the ONE empty/error/UNAUTH plate
      ├── shared/ui/ActionFeedback.vue  the ONE transient beat                     (moved; L-8)
      └── ConfirmDialog + useConfirm()  3 consumers → BH-relay to glass-ui               (L-6)

demo/palettes/model/wire.ts        ★ ONE declaration of Palette · User · Tag · Flag,
                                      generated from the api contracts; paletteCount: number  (L-16)
demo/palettes/keys.ts                LEAF: 5 InjectionKeys + port types, type-only imports  (L-2)
demo/platform/auth/keys.ts           SESSION_PORT_KEY — the shell stops importing the feature
demo/palettes/ports.ts               providePalettePorts ONLY; imported by the root alone
demo/palettes/useAdminUsers.ts       roster state: "unauthenticated"|"loading"|"error"|"loaded"
demo/palettes/useAdminUserPalettes.ts expansion state — owns expandedUserSlug/userPalettes (L-1)
demo/palettes/api/admin-users.ts     transport (already correct: token as a parameter)
```

Seven rules hold it, each an **absence** rather than an addition:

1. **A `.ts` never imports a `.vue` outside a barrel.** Kills L-1 by construction — the cycle, the
   five `?.` swallows, and the `remotePalettes` divergence with it.
2. **`defineExpose` is for parent templates only** — never for composables, never for state.
3. **Injection keys live in a leaf `keys.ts`**, never in the module that wires them (L-2). The
   precedent is already in the tree and already consumed correctly by this very file at `:187`.
4. **One specifier per external package.** `@mkbabb/glass-ui/<subpath>` everywhere; `demo/ui/`
   deleted (19 files out of the lattice). Kills L-5 and makes L-4-class drift visible.
5. **Preconditions are gated once at the boundary**, never re-asserted per method. Kills L-12 and
   its 22 duplicated guards.
6. ★ **Every area publishes a seam, and the rule that says so is alive.** Kills L-15; without it,
   rules 1–5 are conventions, and conventions are what produced this report.
7. ★ **One declaration per wire contract.** Kills L-16 and its seven masking guards.

**What this removes from the subject** (391 lines today): `defineExpose` + its four methods
(`:367-389`), the confirm controller (`:254-286`), the sub-list state + `toggleUserExpand`
(`:236-238`, `:352-365`), the prune lifecycle (`:239`, `:288-309`), `slugHead`/`slugTail`
(`:243-252` → a Chip prop), the transcribed row (`:78-132` → `<AdminListItem interactive>`), the six
props and seven emits of pure ceremony, and the `Transition` import. **≈111 lines leave outright.**
The file stops wearing three hats — today it is simultaneously a view, a confirm-dialog controller
and a sub-store; only the first is its job. Result: ~200 lines, no `inject`, no `defineExpose`, no
timer, no confirm machine, no row transcription — mountable in a test with props alone.

---

## 4 · Negative proof — checked this pass, found sound

- **The published surface is dogfooded correctly** — §0. Five published subpaths, zero `@src/`,
  zero root-barrel reaches, and the alias set is generated from `package.json#exports` so it cannot
  drift. `AdminUsersPanel` imports value.js not at all.
- **`Badge variant="secondary"` (`:102`) is valid.** glass-ui's `Badge` *does* declare `variant`
  (`dist/components/badge/Badge.vue.d.ts:4`) — unlike `Button`. **L-4 is scoped to `Button` and does
  not generalise**; a mechanical sweep that touched `Badge` would be a regression.
- **`SAFE_ACCENT_KEY` is the right rung for the row** (`:99`). It is certified against `"resting"`
  (`useContrastSafeColor.ts:305`) and the row sits inside `<Card tier="resting">`
  (`AdminPane.vue:2`). Only the dialog binding (L-18) is mis-rung. I nearly filed the row as a
  defect and the measurement stopped me.
- **`vj-celebrate` degrades correctly without geometry vars.** All four custom properties carry
  fallbacks (`animations.css:156-165`: `--vj-celebrate-x, 0px` / `-scale, 0.9` / `-collapse, none`).
  This component sets none and renders correctly. **No animation was deleted or inlined** (edict 6).
- **The three-parallel-`useDark` suspect named in the brief is CURED.** All 10 live sites — including
  `useMarkdownColors.ts:18`, adjacent to the line the brief cites — import the single `useGlobalDark`
  from `@mkbabb/glass-ui/dark`. The only survivors are two *comments* describing the historical race.
  Stale prose, not live code. **Do not re-file.**
- **`import type` discipline (edict 8) is clean.** `:199` is `import type { Palette, User }`;
  `SAFE_ACCENT_KEY` and `ADMIN_PORT_KEY` are runtime consts and correctly value-imported.
- **The barrels that exist are correct.** `browser/index.ts`, `card/index.ts`, `admin/index.ts` are
  named re-exports per PI-6 with the SFC-scoped-style tree-shaking rationale stated. The seam
  *design* is right; only its **enforcement** (L-15) and its **coverage** (`shared/ui`, L-15) fail.
- **`inv-K-1` is alive** — proved by resolver against `src/color/index.ts`. L-15's death is specific
  to the three demo-side objects, not a config-wide failure.
- **`demo/shared/` is not a new contrivance** (edict 3). It predates this component; L-8's and
  L-15's cures move a file into it and add its missing `index.ts` — no new directory, no new concept.
- **No a11y finding is filed.** All four Safari matrices report the same 4 small tap targets on this
  route, every one in the dock (`ProfileSection.vue`), not in this panel; `overflowX 0`,
  `pageErr 0`, `consoleErr 0`, `main 1`. The roving-tabindex / Full-Keyboard-Access delta
  (MT-F022) is confirmed not a library-structure concern and is not counted.
- **The api layer is correctly shaped.** `demo/palettes/api/admin-users.ts` takes the token as a
  parameter and delegates to one `adminRequest` — no ambient token, no store reach-in. The rot is
  entirely in the composable layer above it.

---

## 5 · Summary

| id | sev | pass | defect |
|----|-----|------|--------|
| L-1 | **BLOCKER** | r2 · re-derived | state layer imports the SFC and drives it via `defineExpose`; latent cycle; 5 masking `?.`; `onAdminDeleteUserPalette` never updates `remotePalettes` → Browse renders a deleted palette |
| **L-15** | **MAJOR** | **NEW r3** | **the demo's three module-boundary rules match ZERO files (`demo/@/` does not exist; the `@components` alias is dead) — proved via `ESLint.calculateConfigForFile` → `no-restricted-imports = null`; `browser/index.ts:6-8` asserts they are "enforced standing"; `shared/ui` has no barrel and takes 7 raw `.vue` reaches; and no rule expresses the one law L-1 needs** |
| L-12 | MAJOR | r2 · re-derived blind | unauthenticated costumes as "· roster clear ·"; **0 network requests issued**; 22 duplicated `if (!token) return`; no route guard |
| L-4 | MAJOR | r2 · re-derived **+ live DOM** | 51 dead `variant` props in 22 files (5 here); measured `data-emphasis="secondary"` + fallthrough `variant="outline"`; the documented "quiet destructive" intent silently reverted |
| L-2 | MAJOR | r2 | injection keys live in the 275-L wiring module; 26 modules enter this leaf for one `Symbol`; 5 shell files import the palettes feature for an identity key |
| L-3 | MAJOR | r2 · re-derived | 34-member `adminPort` injected to call 1 method; 5/6 props + 7/7 emits are pure passthrough of a port the child already injects |
| L-5 | MAJOR | r2 · re-derived, **r3 self-corrected** | `demo/ui/` = **19** alias barrels (my 20 was wrong), 48 importers, both paths used in this file; shims forfeit glass-ui's subpath splitting |
| L-6 | MAJOR | r2 · re-derived | ConfirmDialog re-grown twice after Glass 7 removed it; two sibling destructive panels confirm nothing |
| L-7 | MAJOR | r2 · re-derived | admin row grammar transcribed in 3 places; `AdminListItem` serves 1 of 3 |
| L-8 | MAJOR | r2 · re-derived | 3 homes for the transient beat (glass-ui `./toast` unused; `ActionFeedback` mis-homed; inline copy leaks its timer) |
| L-9 | MINOR | r2 · extended | `.slug-pill` licenses per-instance overrides — 4 mechanisms, 5 consumers, **plus a surviving literal copy-paste at `PaletteCardSwatches.vue:9`** |
| L-10 | MINOR | r2 | per-instance button geometry — 22 sites in 11 files; `size="xs"` hand-built |
| L-11 | MINOR | r2 | one global `expandedId` for three lists across two disjoint ID namespaces |
| **L-16** | MINOR | **NEW r3** | wire contract declared twice; `paletteCount` required on the wire, optional on the client, paid for in 7 masking guards |
| **L-17** | MINOR | **NEW r3** | the skeleton draws a 32 px leading swatch the real row lacks → a reflow on every roster load, defeating the "ONE loading grammar" invariant |
| **L-18** | MINOR | **NEW r3** | one injected ink referent (resting-certified) bound on two rungs in one file; measured α 0.65 vs 0.80 |
| L-13 | INFO | r2 · re-derived | `export.ts` vs `export/` ambiguous specifier; **serializers reached only by a test** — a false proof. Off this closure. |
| L-14 | MINOR | r2 · re-derived | `Transition` imported from `vue` — 1 of 17, invisible to disabled lint rules |

**Strongest defect: L-1.** It is the only finding that inverts a layer, and it is the root of L-3
(the port carries `adminUsersPanelRef` solely to serve it). Curing it deletes a port member, a
`defineExpose`, an import edge, a latent cycle, five silent failure swallows, and the
`remotePalettes` divergence — which exists only because two lists have two mutators in two modules.

**Strongest NEW defect: L-15**, and it is the one that should shape the mega-tranche's ordering.
Every other finding here is a boundary crossed; L-15 is the fence that fell down. Fixing L-1..L-14
without L-15 fixes eighteen instances of a class the repo has no way to keep fixed — and leaves a
comment in `demo/palettes/browser/index.ts` telling the next auditor that it does.

**The one-sentence indictment.** Nothing in this slice owns a whole concept — the roster's state
machine is split between a composable and a prop contract (L-12), the expanded-user list between a
composable and a component (L-1), the confirm between a deleted glass-ui primitive and two demo
re-growths (L-6), the row between an atom and two transcriptions (L-7/L-17), the design system
between a package and a 19-file alias layer (L-5), the wire contract between a client and a server
(L-16), the accent between an injected singleton and two surface rungs (L-18) — and the rules that
would have caught any of it point at a directory that was deleted (L-15).

---

## 6 · Relay items (standing glass-ui BH/BI relay edict)

1. **`Button` 6→7 rename shipped without a consumer trap.** `variant` → `emphasis`+`tone` produced
   51 silent regressions across 22 files in this repo alone, invisible to `vue-tsc` (fallthrough
   attrs) and to lint. Request `variant?: never`, or `inheritAttrs: false` + an explicit allowlist so
   an unrecognised design-token prop is a *visible* no-op.
2. **Glass 7 removed `ConfirmDialog` with no replacement composition.** Two value.js consumers
   independently rebuilt it (`AdminUsersPanel.vue:254-286`, `PalettesPane.vue:101-122`). Request a
   `Dialog`-family confirm composition or `useConfirm()` from `@mkbabb/glass-ui/dialog` —
   `/dialog` already ships `dialogStageContext`, the natural home.
3. **`Chip` needs a tone axis** to absorb `.slug-pill` (4 mechanisms, 5 consumers, plus a literal
   copy-paste at `PaletteCardSwatches.vue:9`). Reuse the existing component-type name.
4. **`EmptyState` and a list-row `Skeleton` variant are design-system atoms living in an application
   tree** — 12 and 4 consumers respectively; glass-ui's 74 export entries contain neither.

---

## 7 · Evidence index

| kind | where |
|---|---|
| ESLint resolver proof (L-15) | `node -e "…new ESLint({}).calculateConfigForFile(f)…"` → `no-restricted-imports = null` for the subject + both composables; alive for `src/color/index.ts` |
| live Chromium probes (read-only) | `http://localhost:9000#/admin/users` — 3 evaluates: `{adminToken:null, bodyTextHasNoUsers:true}`; rung vars α 0.65 / 0.80; `data-emphasis="secondary"` + fallthrough `variant="outline"` on both toolbar buttons; `browser_network_requests` filter `users\|/api/` → 0 |
| WebKit capture reads (vision) | `visual/shots/safari-desktop-light/admin-users.png`, `visual/shots/safari-mobile-dark/admin-users.png` |
| capture-matrix rows | `visual/REPORT.md:128,143,158,173`; harness localStorage at `visual/capture.mjs:71` |
| glass-ui surface | `node_modules/@mkbabb/glass-ui/dist/components/{button,badge,chip}/*.d.ts`; `package.json#exports` (74 entries; `./toast` present, 0 demo consumers) |
| fleet counts (own scans) | Button-`variant` 51/22 (python regex over `<Button …>` tag-opens); `demo/ui` 19 files / 48 importers; `if (!token) return` 11 / 22; value.js subpath histogram |
| r1 pass, verbatim | `challenge-L-library.2026-07-24-prior.md` |
| r2 pass, verbatim | `challenge-L-library.2026-07-27-r2-prior.md` |

**Scope receipt.** This seat wrote exactly two files, both under
`docs/tranches/V/megatranche/audit/components/AdminUsersPanel/`: this report, and
`challenge-L-library.2026-07-27-r2-prior.md` (a verbatim byte-identical preservation of the r2
report before superseding it). No file in `src/`, `demo/`, `api/`, `test/`, `e2e/`,
`docs/tranches/V/vnext/**`, `scripts/dev/dev.sh` or any `INBOX.md` was modified. Browser use was
read-only: navigation and `evaluate` only — no click, no form entry, no mutation of any admin data.
