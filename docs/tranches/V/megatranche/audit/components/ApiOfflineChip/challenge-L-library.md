# CHALLENGE-L — library structure · `ApiOfflineChip.vue`

## Model receipt

I observe myself to be **Opus 5** — exact model id `claude-opus-5[1m]`, the 1M-context
variant. The seat was spawned with an explicit Opus 5 declaration and the served tier matches
it; the seat is **not** undeclared and **not** inherited.

- **Axis**: CHALLENGE-L — the library/module structure underneath the component.
- **Subject**: `demo/palettes/browser/status/ApiOfflineChip.vue` (91 lines, area `palettes`).
- **Repo state**: `/Users/mkbabb/Programming/value.js`, branch `tranche-u`, HEAD `c654824e`.
- **Verdict**: **DEFECTIVE** — 3 BLOCKER / 3 MAJOR / 4 MINOR.
- **Strongest defect**: **L-1/L-2** — the surface the owner ordered dead (MT-F031) exists **twice**,
  in two independently authored implementations; the one witnessed in `OM-5` is the *sibling*
  (`DockStatusLamp.vue`), and killing it leaves this component's byte-identical copy alive.

---

## 0. What this component actually is, structurally

91 lines. One import edge in the whole file:

```
demo/palettes/browser/status/ApiOfflineChip.vue:31
    import { useApiClient } from "../../../platform/transport/useApiClient";
```

Two computed booleans over one injected ref (`:35-37`), two mutually exclusive `<span>`s, 51 lines
of scoped CSS. **Its entire dependency cone is `platform/transport`. It has zero coupling to
`palettes` — no palette type, no palette store, no palette api sub-module, nothing.**

Cone check (rigorous, exit code shown):

```
$ grep -rn "@mkbabb/value.js\|@src/" demo/palettes/browser/status/ demo/platform/transport/ demo/shell/dock/
GREP_EXIT=1
```

---

## L-1 — BLOCKER · MT-F031 attribution: the witnessed banner is the SIBLING, and this component holds a second copy the owner order does not reach

**The owner's question** ("determine whether this component or a sibling renders it") **is answered
by measurement: the sibling renders it.** But the answer is a trap, because *both* render it.

### Reproduction (exact)

```
$ env -u VITE_API_URL npx vite --port 9137 --strictPort
  VITE v8.0.16  ready in 731 ms
  ➜  Local:   http://localhost:9137/
```

Playwright → `http://localhost:9137/#/palettes`, then `page.evaluate`:

```json
{
  "href": "http://localhost:9137/#/palettes",
  "availability": "misconfigured",
  "baseUrl": "https://api.color.babb.dev",
  "lamp": [{
    "cls": "dock-status-lamp fira-code",
    "role": "alert",
    "variant": "misconfigured",
    "text": "dev misconfigured — run `npm run dev`",
    "rect": { "x": 1177, "y": 33, "w": 247, "h": 23 },
    "pad": "4.8px 8.8px",
    "pos": "absolute",
    "fontSize": "11px",
    "color": "rgb(219, 36, 36)"
  }],
  "chip": []
}
```

`pad: 4.8px 8.8px` = `0.3rem 0.55rem` = **`DockStatusLamp.vue:56`**, *not* `ApiOfflineChip.vue:49`
(`0.3rem 0.7rem` = `4.8px 11.2px`). `pos: absolute` = `DockStatusLamp.vue:44`; the chip is in-flow
(`inline-flex`, `ApiOfflineChip.vue:42`). **`OM-5-dev-misconfigured-banner.png` is
`demo/shell/dock/DockStatusLamp.vue`, mounted unconditionally at `demo/shell/dock/Dock.vue:293`.**

### Why the ruling does not land if only the lamp dies

`ApiOfflineChip.vue:11-18` renders the **same banner, same string, same register**:

```
ApiOfflineChip.vue:17   dev misconfigured — run `npm run dev`
status-lamp.ts:54       label: "dev misconfigured — run `npm run dev`",
```

Two hand-typed copies of one literal. Same `role="alert"` (`ApiOfflineChip.vue:13` /
`status-lamp.ts:39`), same filled-dot-vs-open-ring semantics, same `--destructive` ink
(`ApiOfflineChip.vue:69-71` / `DockStatusLamp.vue:92-102`).

The chip's misconfig branch is gated only on `availability === "misconfigured"`
(`ApiOfflineChip.vue:37`) — **it is not dev-gated**, unlike the lamp (`status-lamp.ts:48`
`if (!isDev) return null`). Its mount precondition is
`CurrentPaletteEditor.vue:116` `v-if="savedColorStrings.length > 0"`. So in dev with one saved
color, the killed banner comes straight back, in a second seat.

**Cure**: MT-F031 must be executed against the **concept**, not the witness. Delete
`ApiOfflineChip.vue:11-18` (the misconfig `<span>`), `:37` (`misconfigured` computed), `:66-79`
(`.api-misconfig-chip` + `.misconfig-dot`), **and** `status-lamp.ts:50-55` + `DockStatusLamp.vue:88-107`.
The dev-environment diagnosis the owner named already exists and is untouched:
`demo/platform/transport/availability.ts:163` `console.error(...)`, plus the synchronous
`DevMisconfigError` throw at `:189-191`. Nothing is lost by removing both surfaces.

Note: `detectDevMisconfig` requires `isLoopbackHost(pageHostname)` (`availability.ts:114`), so the
chip's misconfig branch is **provably unreachable in production** — it is pure dead code even before
the owner's ruling.

---

## L-2 — BLOCKER · Two full implementations of one concept: the availability affordance is forked

Unique semantic ownership is the invariant. This concept has **two homes**:

| | `ApiOfflineChip.vue` | `DockStatusLamp.vue` + `status-lamp.ts` |
|---|---|---|
| home | `demo/palettes/browser/status/` | `demo/shell/dock/` |
| reads | `useApiClient().availability` (`:35`) | `useApiClient().availability` (`:30`) |
| `misconfigured` label | `:17` literal | `status-lamp.ts:54` literal |
| `unavailable` label | `:25` literal | `status-lamp.ts:60` literal |
| roles | `alert` `:13` / `status` `:21` | `alert` / `status`, `status-lamp.ts:39` |
| pill CSS | `:41-55` | `:43-62` (same 11 declarations) |
| dot CSS | `:57-64`, `:74-79` | `:79-86`, `:104-107` |
| keyframes | `offline-dot-pulse` `:82-85` | `lamp-dot-pulse` `:110-118` — **identical body** |
| dev-gated | **no** | yes (`status-lamp.ts:48`) |
| tests | **none** | `test/status-lamp.test.ts` (160 L) + `e2e/smoke/oracles/o22-status-lamp.spec.ts` (85 L) |

`DockStatusLamp.vue:42` names the duplication in its own comment: *"one status language, two seats."*
That is the defect, written down and shipped.

Footprint measured:

```
$ wc -l demo/palettes/browser/status/ApiOfflineChip.vue demo/palettes/browser/status/index.ts \
        demo/shell/dock/DockStatusLamp.vue demo/shell/dock/status-lamp.ts \
        test/status-lamp.test.ts e2e/smoke/oracles/o22-status-lamp.spec.ts
      91 ApiOfflineChip.vue
       7 status/index.ts
     123 DockStatusLamp.vue
      65 status-lamp.ts
     160 test/status-lamp.test.ts
      85 e2e/.../o22-status-lamp.spec.ts
     531 total
```

**531 lines for a two-state boolean read off one ref.** Once L-1 removes the misconfig face,
`resolveLampState` collapses to `availability === "unavailable"` — a predicate, not a module, and its
160-line closed-form matrix suite becomes a test of `switch` with one live arm.

**Divergence proof** (the copies have already drifted, which is what forks do):
- `ApiOfflineChip.vue:50` `var(--radius-pill)` vs `DockStatusLamp.vue:57` `var(--radius-pill, 9999px)`.
- `DockStatusLamp.vue:36` declares `@reference "../../styles/foundation.css"` but the block contains
  **zero `@apply`** — inert. The chip has no `@reference` and needs none.
- The lamp folds its label below 1024px (`:67-74`); the chip does not.

**Cure**: one component, one home, one seat. See §Lattice.

---

## L-3 — MAJOR · Ownership inversion: a `platform/transport` concept is homed inside the `palettes` mega-feature

`ApiOfflineChip` sits at `demo/palettes/browser/status/` — three levels inside the palette-browser
mega-feature — and imports **only** `demo/platform/transport/useApiClient` (`:31`, `../../../`). It
consumes no palette concept whatsoever.

The consequence is visible in the tree: the *same* platform concept, when it was re-homed at T.W6,
could not reuse this component because the component was buried in a feature — so a **second one was
written in `shell/`**. That is L-2's proximate cause. A concept whose only dependency is
`platform/transport` belongs in `platform/transport`; `demo/platform/transport/` already exists
(4 modules), so this is a **move**, not a new directory (KISS / edict 3 satisfied).

This is the same inversion an adjacent seat recorded independently:
`docs/tranches/V/megatranche/audit/components/PaletteCardMenu/challenge-L-library.pass-2-2026-07-28.md:240,252`.

---

## L-4 — MAJOR · The barrel seam this component lives behind is transitively dead, and the eslint law that protects it cannot fire

### (a) The seam has zero entrants

```
$ grep -rnE "from ['\"][^'\"]*(browser)['\"]" demo/ --include="*.ts" --include="*.vue"
--- exit 1 ---
```

`demo/palettes/browser/index.ts` (46 lines, headed *"the mega-feature's TOP-LEVEL SEAM … External
consumers reach the feature through THIS seam"*) has **no importers at all**. Real external consumers
bypass it for the sub-barrels:

```
demo/workbenches/mix/MixSourceSelector.vue:8      from "../../palettes/browser/card"
demo/workbenches/generate/GenerateControls.vue:16 from "../../palettes/browser/card"
demo/workbenches/extract/ExtractWorkbench.vue:200 from "../../palettes/browser/card"
demo/color-picker/App.vue:176                     from "../palettes/browser/dialog"
```

`demo/palettes/browser/status/index.ts`'s **only** importer is that dead top barrel
(`browser/index.ts:46`). The real consumer bypasses the barrel entirely:

```
demo/palettes/browser/card/CurrentPaletteEditor.vue:193
    import ApiOfflineChip from "../status/ApiOfflineChip.vue";
```

— a raw `.vue` reach from the `card/` sub-feature into `status/`. The barrel's own header concedes it
(`status/index.ts:3-4`). Independently confirmed at
`docs/tranches/V/megatranche/excavation/extracts/shadcn-library-census.md:123` (**C-04**); this seat
re-verified it by grep.

### (b) G-DEMO-3b is unenforceable dead law

```
$ npx eslint demo/palettes/browser/card/CurrentPaletteEditor.vue \
             demo/palettes/browser/status/ApiOfflineChip.vue
(no output — clean)
```

The raw-`.vue` reach passes lint. Why:

- `eslint.config.js:232-238` — the rule's file globs are
  `demo/color-picker/**`, `demo/@/components/**`, `demo/@/lib/**`.
  `$ ls -d demo/@` → `No such file or directory`. Three of four globs match **nothing**;
  `demo/@/composables/**` (`:275-278`) likewise matches nothing.
- `eslint.config.js:248` — the banned pattern is `"@components/custom/palette-browser/**/*.vue"`,
  an **alias specifier W43 (RF-15) deleted** (`vite.config.ts:66-70`: *"W43 (RF-15) killed the demo
  `@…` path aliases"*). Residual `@components/` occurrences in `demo/`: **1**, and it is inside a
  comment (`demo/palettes/browser/status/index.ts:5`).

So the boundary the barrel exists to defend has (i) no consumers, (ii) no enforcement, and (iii) a
documented bypass. It is ceremony.

**Cure**: delete `demo/palettes/browser/index.ts` and `demo/palettes/browser/status/index.ts`; retire
the G-DEMO-3b rule objects (`eslint.config.js:221-256`, `:277-300`) or re-express them over the
*live* tree with *relative* patterns. A lint rule whose globs point at deleted directories is worse
than no rule: it reads as a standing guarantee and delivers none.

---

## L-5 — MAJOR · `--type-mono-caption` is a phantom token: both twins hardcode `0.6875rem` behind a masking fallback

```
ApiOfflineChip.vue:47    font-size: var(--type-mono-caption, 0.6875rem);
DockStatusLamp.vue:54    font-size: var(--type-mono-caption, 0.6875rem);
```

Measured live (`getComputedStyle(document.documentElement).getPropertyValue(...)`):

```json
{ "--type-mono-caption": "\"\"",
  "--type-caption": "\"clamp( 0.75rem, 0.71rem + 0.21vw, 1rem )\"",
  "--destructive": "\"light-dark(hsl(0 72% 50%), hsl(0 80% 60%))\"",
  "--radius-pill": "\"9999px\"",
  "--ease-standard": "\"cubic-bezier(0.4, 0, 0.2, 1)\"",
  "--card-edge": "\"color-mix(in oklab, light-dark(hsl(24 10% 10%), hsl(30 14% 90%)) 12%, transparent)\"" }
```

`--type-mono-caption` resolves to **empty** — it is defined nowhere
(`grep -rn -- "--type-mono-caption\s*:" demo/styles/` → no matches). Confirmed at the rendered
element: `fontSize: "11px"` = `0.6875rem × 16`, i.e. the fallback, always.

This is a **masking fallback** (owner edict 2) *and* a false tokenization: the chip reads as
type-scale-compliant and is in fact a hardcoded literal that the type scale cannot move. The scale
that exists is `--type-caption` (a fluid clamp, consumed at `demo/styles/utils.css:20`); glass-ui
also registers a `text-mono-small` utility (`demo/styles/foundation.css:88`).

**Cure**: `font-size: var(--type-caption)` — bare, no fallback — or the glass-ui `text-mono-small`
utility. Either way the token must exist and the fallback must go.

---

## L-6 — MINOR · Dead masking fallbacks on `--destructive` (×3) and radius drift

```
ApiOfflineChip.vue:69  color: var(--destructive, oklch(0.58 0.19 25));
ApiOfflineChip.vue:70  border-color: color-mix(… var(--destructive, oklch(0.58 0.19 25)) 55% …);
ApiOfflineChip.vue:71  background: color-mix(… var(--destructive, oklch(0.58 0.19 25)) 12% …);
```

`--destructive` is measured **present** (§L-5). Three dead fallbacks, each a second, drifting,
hardcoded definition of the destructive ink (`oklch(0.58 0.19 25)` vs the real
`light-dark(hsl(0 72% 50%), hsl(0 80% 60%))` — they are not the same colour). Edict-2 violation.
`DockStatusLamp.vue:92-102` carries the identical three.

Same family: `var(--radius-pill)` (chip `:50,:60,:77`) vs `var(--radius-pill, 9999px)`
(lamp `:57,:83`) — one concept, two spellings, proving the fork.

These lines die with L-1 (they are all inside `.api-misconfig-chip` / `.misconfig-dot`).

---

## L-7 — MAJOR · A third parallel ownership of "the backend is not answering", measurably contradicting the latch

The concept "backend not reachable" has **three** independent owners in this app:

1. the transport latch `apiAvailability` (`availability.ts:47`) → this component + the lamp;
2. eight per-composable error refs (`useBrowsePalettes.ts:31`, `useAdminAudit.ts:40`,
   `useAdminFlagged.ts:53`, `useAdminTags.ts:34`, `useAdminUsers.ts`, `useColorNameQueue.ts:24,:25`,
   `useVersionHistory.ts`), several literally re-inventing the string
   (`useAdminAudit.ts:66` `e?.message ?? "Backend unreachable"`);
3. seven hand-written per-surface error copies:

```
$ grep -rn "is unreachable\." demo/ --include="*.vue"  →  7
demo/palettes/BrowsePane.vue:65                       "The commons is unreachable."
demo/palettes/browser/admin/AdminUsersPanel.vue:54    "The roster is unreachable."
demo/palettes/browser/admin/AdminAuditPanel.vue:45    "The ledger is unreachable."
demo/palettes/browser/admin/AdminFlaggedPanel.vue:25  "The flag queue is unreachable."
demo/palettes/browser/admin/AdminTagsPanel.vue:71     "The tag ledger is unreachable."
demo/palettes/browser/admin/AdminNamesPanel.vue:33    "The proposal queue is unreachable."
demo/palettes/browser/admin/AdminNamesPanel.vue:83    "The approved list is unreachable."
```

**Measured contradiction** — `docs/tranches/V/megatranche/audit/visual/shots/safari-desktop-light/browse.png`
(read this session): the Browse plate reads **"The commons is unreachable. / Failed to load palettes /
Retry"** while the dock band's right end is **empty** and no chip renders anywhere in the 1440×900
frame. `capture.mjs:4` states the run is *"Read-only against the running dev server"* (so
`import.meta.env.DEV` is true and the lamp is not gated off). At that instant the app asserted
"unreachable" through owner #3 and "available" through owner #1, simultaneously.

Mechanism: the latch trips only on a *fetch rejection* (`client.ts:80` comment; `markApiUnreachable`,
`availability.ts:167`), while the per-composable refs trip on **any** thrown error including HTTP
4xx/5xx. Two definitions of one word.

**Cure**: the latch is the single owner of *reachability*. The per-composable refs own only
"this request failed" and must not spell reachability themselves. The seven bespoke sentences reduce
to one `EmptyState variant="error"` message derived from the latch — which also discharges the
already-ruled text-contrivance row (`om-15-text/TEXT-CONTRIVANCE-AUDIT.md:330`).

---

## L-8 — MINOR · The design system already owns this primitive twice over

glass-ui is `@mkbabb/glass-ui@7.0.0` and publishes, among 60+ subpaths:

```
./badge  ./chip  ./status-dot  ./pulse
```

`node_modules/@mkbabb/glass-ui/dist/components/_shared/feedback.d.ts`:

```ts
export declare const STATUS_DOT_STATES: readonly ["online", "warning", "error", "unknown"];
export type StatusDotState = (typeof STATUS_DOT_STATES)[number];
```

`StatusDot` props: `{ state?: StatusDotState; size?: FeedbackSize; label?: string; class? }`.

Both twins hand-roll a status dot in scoped CSS (`ApiOfflineChip.vue:57-64,:74-79`;
`DockStatusLamp.vue:79-86,:104-107`) including their own pulse keyframes, and hand-roll the pill
(`:41-55` / `:43-62`) while `./chip` and `./badge` ship. `STATUS_DOT_STATES` is a near-isomorphism of
`ApiAvailability` (`availability.ts:40-44`). Edict 4: the variant belongs in glass-ui, and the
component-type name already exists — reuse `StatusDot` (and `Chip`/`Badge` for the shell), do not
re-derive them in demo scoped CSS.

**Animations are not deleted** (edict 6): `offline-dot-pulse` moves into the glass-ui `StatusDot`
primitive or, if kept demo-side, is tokenized into `demo/styles/animations.css` — the census already
tracks it (`docs/tranches/T/audit/w1-pr7-keyframes-census.md:58`, row 17) and the PRM idiom at
`ApiOfflineChip.vue:81` is one of the 6 conforming blocks
(`excavation/DESIGN-CANON-BRIEF.md:88`) — it must survive the move intact.

---

## L-9 — MINOR · `initApiEnvironment` is an import-time side effect; the "guaranteed at first paint" claim rests on chunk-eval order

```
demo/platform/transport/client.ts:38-45
    export const BASE_URL = import.meta.env.VITE_API_URL ?? DEFAULT_REMOTE_API_URL;
    initApiEnvironment(BASE_URL);      // ← top-level, mutates apiAvailability + console.error
```

Importing the transport module for *any* reason mutates global app state and emits a console error.
`DockStatusLamp.vue:2-6` and `status-lamp.ts` justify the T-9 re-home on the claim that the state is
*"guaranteed visible the moment the shell paints"* — but the state does not exist until
`client.ts` evaluates, which is a bundler/route-graph property, not a shell property.

**Labelled HYPOTHESIS** (mechanism is measured, timing consequence is not): I did not obtain a clean
first-paint timing measurement — my successful `9137` probe included a 3000 ms settle. The structural
defect (initialization as a module-eval side effect, untestable without registry surgery) stands on
`client.ts:45` alone; the paint-timing hole is unproven and must be measured before it is asserted.

**Cure**: `initApiEnvironment(BASE_URL)` becomes an explicit call from the app-root provider
(`demo/color-picker/App.vue:189` already calls `provideApiClient()` — the natural seat). Imports stop
having effects.

---

## Negative proof — what is clean

- **Library import correctness: PASS, vacuously and correctly.** The component's entire cone
  (`status/`, `platform/transport/`, `shell/dock/`) contains **zero** `@mkbabb/value.js` and **zero**
  `@src/` specifiers (`grep … ; GREP_EXIT=1`). There is no deep-path reach into `src/` internals and
  no false proof of the public API. The published surface (`package.json#exports`:
  `./color ./value ./css ./easing ./math ./transform ./quantize`, mirrored by `src/subpaths/*.ts`) is
  untouched by this component — correctly, since a transport-status chip has no business there.
- **`verbatimModuleSyntax`: PASS.** The single import (`:30` `import { computed } from "vue"`) is a
  value import; there are no type-only imports to mis-spell.
- **God module: PASS.** 91 lines, one concern, one dependency. It is not a god module and does not
  feed one.
- **Vue 3.5 idiom: PASS.** No props, no `defineModel`, no template refs — nothing for
  `useTemplateRef` / reactive destructure / `shallowRef` to apply to. `computed` over an injected
  `Ref` is correct.
- **DI seam: PASS and exemplary.** `useApiClient()` (`:31,:35`) is the S.W2 W2-4 provide/inject seam,
  not a module-singleton import. This is the one structural decision in the file that is right, and
  it should survive every cure below unchanged.
- **Per-instance styling: PASS.** The only consumer-side class is a layout utility
  (`CurrentPaletteEditor.vue:116` `class="self-start"`); no per-instance visual override.

---

## The greenfield lattice

Structured today with no legacy, the concept is **one module, three files**, all under
`demo/platform/transport/` — which already exists, so nothing new is invented:

```
demo/platform/transport/
    availability.ts        ── the latch. SINGLE owner of "can we reach the backend".
                              Keeps: apiAvailability, ApiUnavailableError,
                              markApiReachable/Unreachable, assertApiAttemptAllowed.
                              LOSES: the whole S.W0-1 misconfig apparatus's *surfaces*;
                              keeps detectDevMisconfig + the console.error (:163) as the
                              console-only dev diagnosis the owner named.
    client.ts              ── transport. NO module-eval side effect (L-9).
    useApiClient.ts        ── the DI seam. Unchanged. It is already correct.
    ApiOfflineOnly.vue     ── ONE surface. `availability === "unavailable"` → a
                              <StatusDot state="warning"> inside a glass-ui <Chip>,
                              label "backend offline — saved locally", role="status".
                              No misconfig branch. No dev gate (the state is honest in prod).
                              No scoped pill CSS — the pill IS the design system.
```

Mount: **one seat**, the dock band (`demo/shell/dock/Dock.vue:293`), because the fact is
app-global. The per-surface seat inside `CurrentPaletteEditor` dies with the component: gating an
app-global transport truth on `savedColorStrings.length > 0` was never coherent.

Deleted outright:

```
demo/palettes/browser/status/ApiOfflineChip.vue    (91)   → moved+collapsed
demo/palettes/browser/status/index.ts              (7)    → dead barrel (L-4)
demo/palettes/browser/index.ts                     (46)   → dead barrel, zero importers (L-4)
demo/shell/dock/DockStatusLamp.vue                 (123)  → the fork (L-2)
demo/shell/dock/status-lamp.ts                     (65)   → collapses to one predicate (L-2)
test/status-lamp.test.ts                           (160)  → the lamp-matrix half dies with the
                                                            matrix; the S.W0-1 CONTRACT rows
                                                            (detectDevMisconfig / synchronous
                                                            DevMisconfigError / console.error)
                                                            MOVE to test/availability.test.ts —
                                                            those assertions survive verbatim.
e2e/smoke/oracles/o22-status-lamp.spec.ts          (85)   → one leg survives: the `unavailable`
                                                            face renders at the band seat.
eslint.config.js:221-256, :277-300                        → dead globs, dead alias (L-4)
```

Net: **~490 lines retired**, one concept, one home, one seat, one test file, and MT-F031 executed
against the concept instead of the witness.

Sequencing note for the formation: L-1 (kill the misconfig surface, both copies) is independently
landable and discharges the owner mark. L-2/L-3 (unify + re-home) should land in the same wave,
because leaving one copy in `palettes/browser/status/` after killing the other re-creates exactly the
condition that produced the fork at T.W6.

---

## Findings index

| id | sev | one line | anchor |
|---|---|---|---|
| L-1 | BLOCKER | OM-5 is `DockStatusLamp`; `ApiOfflineChip` holds a second, un-dev-gated copy of the killed banner | `ApiOfflineChip.vue:11-18,:37,:66-79`; `status-lamp.ts:50-55` |
| L-2 | BLOCKER | Two full implementations of one availability affordance; 531 lines for one boolean | `ApiOfflineChip.vue` ↔ `DockStatusLamp.vue`+`status-lamp.ts` |
| L-3 | MAJOR | Ownership inversion: a pure `platform/transport` concept homed 3 levels inside `palettes` | `ApiOfflineChip.vue:31` |
| L-4 | MAJOR | Dead barrel chain + G-DEMO-3b unenforceable (globs point at deleted `demo/@/**`, alias killed at W43) | `browser/index.ts`; `status/index.ts`; `eslint.config.js:232-248`; `CurrentPaletteEditor.vue:193` |
| L-5 | MAJOR | `--type-mono-caption` phantom token; measured empty; `11px` hardcoded via masking fallback | `ApiOfflineChip.vue:47` |
| L-7 | MAJOR | Third parallel ownership of "unreachable"; measured contradiction in `browse.png` | `BrowsePane.vue:65` + 6 admin panels; `useBrowsePalettes.ts:79` |
| L-6 | MINOR | Three dead `--destructive` fallbacks with a drifted hardcoded colour; `--radius-pill` spelling drift | `ApiOfflineChip.vue:69-71,:50` |
| L-8 | MINOR | glass-ui already ships `StatusDot`/`Chip`/`Badge`; both twins re-derive them in scoped CSS | `_shared/feedback.d.ts`; `ApiOfflineChip.vue:41-79` |
| L-9 | MINOR (hypothesis on timing) | `initApiEnvironment` runs as a module-eval side effect | `client.ts:45` |

## Probe ledger (parsimony)

Four Playwright evaluates + one navigate against the owner's live `:9000`, plus one short-lived
`vite --port 9137` (started, probed, `pkill`ed) to reproduce the misconfig precondition — that server
was the only way to decide the owner's attribution question, and it decided it. Two audit images read
(`OM-5-dev-misconfigured-banner.png`, `shots/safari-desktop-light/browse.png`). No file outside
`docs/tranches/V/megatranche/audit/components/ApiOfflineChip/` was written or modified.
