# CHALLENGE-L · r2 — `ActionFeedback.vue`, library structure

**Seat** `demo/palettes/browser/card/PaletteCard/ActionFeedback.vue` (58 L)
**Axis** L — module boundaries, ownership, dependency direction, public surface
**Receipt** `sha256 9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2` (identical to the r1 receipt — the r1 file's SHA hygiene was sound)
**Method** live dev stack (:9000 demo / :3000 api), five re-runnable probes under `evidence-r2/`, plus glass-ui 7.0.0 `dist/` byte reads. Nothing in this file rests on source reading alone.
**Consumer graph** ActionFeedback ← `PaletteCard.vue:123-128` (sole consumer) ← `defineExpose({ showFeedback })` `PaletteCard.vue:244` ← `cardRefs` registry ← `BrowsePane.vue:230,239,249,264` + `PalettesPane.vue:207`.

## Verdict

**AMBER — RED on ownership, GREEN on dependency direction and motion.**

The r1 file graded this leaf SOURCE-RED for reasons that do not survive measurement: its motion finding is materially false, its "local duplicate" is a singleton, its central prop citation names a prop that does not exist, and its prescribed producer contract (toast) is the structurally wrong one. The axis *is* red — but on four defects r1 never reached, three of which are only visible with the stack running.

The load-bearing truth: **this leaf's dependency direction is exemplary and its motion is fully producer-governed; what is broken is everything about how it is OWNED and ADDRESSED.**

---

## §1 · Re-adjudication of `challenge-L-library.md`, claim by claim

The r1 file is report-authored (26-min batch, zero probes). Every claim is re-tried below against live bytes. Eight named claims; **3 CONFIRMED, 4 REFUTED, 1 CONFIRMED-with-correction.**

### C1 · `:3` — "Source-only", SHA `9b5cbe86…` → **CONFIRMED**

`shasum -a 256` on the live file returns `9b5cbe86976967d366a7386980f4eb94fd5d1795a160fd2a87c098b9393dbdd2` — byte-exact. The r1 file's receipt discipline is genuinely good and should not be tarred by the rest.

### C2 · `:9` — "Imports are `vue` and `@lucide/vue`; there is no glass-ui alert, toast, live-region, motion, or button primitive" → **CONFIRMED, but non-probative**

Literally true (`:20-21`, the file's only two imports). It is also the file's *strength*, not its weakness — see **S-1**. The clause establishes that certain imports are absent without establishing that any of them ought to be present; and its "motion" member is rhetorically misleading, since the motion family this component drives *is* producer-owned (see C5). All six sibling files in the folder import `@lucide/vue` identically, so the icon reach is the folder's consistent idiom, not a deviation.

### C3 · `:10` — "`type: "success" | "error"` is too small…" → **CONFIRMED in substance, REFUTED as written**

**There is no prop named `type`.** The prop is `variant` (`:26`). The misquote matters, because the *actual* name is the defect: glass-ui seals the tone axis at `dist/components/_shared/axes.d.ts` with the comment

> `/** The tone axis — the semantic status register (--<tone> token cohort); NEVER a 'variant' member. */`
> `TONES = ["neutral","success","warning","info","destructive"]`

So the leaf violates the producer's sealed axis three ways at once — in the prop's **name** (`variant` carrying tone), its **vocabulary** (`error` ∉ TONES; the producer's word is `destructive`), and its **rendering** (see **L-1**). r1's "too small" is true but is the least interesting of the three. Re-founded and sharpened as **L-1**.

### C4 · `:11` — "Visibility and lifetime are controlled internally…; ownership is split" → **CONFIRMED in conclusion, one half false**

"Visibility … controlled internally" is **false**: `visible` is a prop (`:27`), parent-owned at `PaletteCard.vue:236`; the child can only *request* closure via `emit("update:visible", false)` (`:44`). The accurate statement is narrower and worse: **lifetime is child-owned, visibility/message/severity are all parent-owned, and no party owns verdict identity.** The conclusion ("replacement/queue policy impossible to reason about") is correct and I have now *measured* the consequence — see **L-4**, where a second verdict lives 701 ms instead of 2500 ms.

### C5 · `:12` — "The transition class family is globally named and not scoped to a producer motion token or reduced-motion policy" → **REFUTED**

Two disjuncts.

*"globally named"* — **CONFIRMED**. `vj-celebrate` is a global Vue transition-name family (`demo/styles/animations.css:140-165`), not scoped to the SFC.

*"not scoped to a producer motion token or reduced-motion policy"* — **REFUTED on both counts**, `evidence-r2/af-L-r2-prm-refutation.mjs`:

| token consumed by `.vj-celebrate-*` | defined in | defined in demo? |
|---|---|---|
| `--duration-fast`, `--duration-normal` | glass-ui `dist/styles/tokens/scheme-motion.css` | none |
| `--ease-decelerate`, `--ease-accelerate` | glass-ui `dist/styles/theme/bridges.css` | none |
| `--spring-bouncy`, `--spring-bouncy-duration` | glass-ui `dist/styles/tokens/scheme-spring.css` | none |

**6 of 6 producer-defined, 0 demo-defined**, all six resolving live on `:root`. And the reduced-motion policy is not merely present but *deliberate* — measured on the chip itself:

```
transition-duration  no-preference: 0.2s, 0.57s, 0.3s
transition-duration  reduce       : 0.1s
transition-property  no-preference: opacity, transform, max-height
transition-property  reduce       : opacity, color, background-color, border-color, box-shadow
```

Under PRM the producer policy (glass-ui `dist/styles/utilities/a11y-overrides.css`) clamps 0.57 s → 0.1 s **and strikes `transform` and `max-height` from `transition-property`**, so the bouncy spring and the height morph are surgically removed and a non-jarring 100 ms fade remains. A second, app-wide guard sits at `demo/styles/animations.css:184-193`.

*Correction to the record:* the prior provenance audit attributes the collapse to the demo guard's `transition-duration: 0.01ms`. It does not win — the measured value is **0.1 s**, from the glass-ui rule. The refutation stands; the mechanism cited for it was wrong.

### C6 · `:16` — "The input should bind an operation/result identity rather than three independent props" → **CONFIRMED**

The strongest line in the r1 file, and now measured. See **L-4**.

### C7 · `:16` — "this is a local duplicate" → **REFUTED**

Duplicate of *what*? `grep -rln "text-green-600\|bg-green-500/10\|green-400" demo/` returns **exactly one file — this one.** There is no second hand-rolled verdict chip in the demo. It is a **singleton fork of the producer tone register**, not a duplicate of a sibling. The distinction changes the routing entirely: nothing needs deduplicating, one class attribute needs re-tokenizing.

### C8 · `:5` — Verdict "SOURCE-RED … outside the producer's alert/toast/result contracts" → **REFUTED as reasoned**

glass-ui 7.0.0 *does* export `./toast` — and it is the **wrong** primitive here. `dist/components/toast/Toaster.vue.d.ts` types its only prop as `ToasterPosition = "top-left" | … | "bottom-right"`: a viewport-anchored global toaster. ActionFeedback is an *in-card, in-flow* chip that unfurls inside the card body (`PaletteCard.vue:123`, between the rename row and the swatch drawer). Routing it to Toast would relocate every palette verdict to a screen corner and sever it from the card it describes.

The producer atom that actually fits is **`Chip`** (`dist/components/chip/`), which ships `mode:"static"`, `tone`, `size`, `shape:"pill"` and a `chipVariants` geometry whose `sm` rung is `"gap-1 px-2.5 py-1 text-caption"` — a near-transcription of what this file hand-rolls at `:7`. See **L-6**.

The RED grade survives; every reason given for it does not.

---

## §2 · Findings

### L-1 · **MAJOR** — the success rung forks the producer tone register; the error rung, one line away, does not

`ActionFeedback.vue:8-9`:

```
variant === 'success' && 'bg-green-500/10 text-green-600 dark:text-green-400',
variant === 'error'   && 'bg-destructive/10 text-destructive',
```

Line 9 is token-backed. Line 8 is raw Tailwind palette literals. Measured live (`evidence-r2/af-L-r2-tone-fork.mjs`):

| rung | rendered ink | producer token | match |
|---|---|---|---|
| error (light) | `rgb(219, 36, 36)` | `--destructive` = `rgb(219, 36, 36)` | **exact** |
| success (light) | `oklch(0.627 0.194 149.214)` | `--success` = `oklch(0.72 0.192 149.5)` | **ΔL = 0.093** |
| success (dark) | `oklch(0.792 0.209 151.711)` | `--success` dark arm = `oklch(0.805 0.186 151.6)` | **ΔC = 0.023** |

The fork is not forced. glass-ui bridges the token to Tailwind at `dist/styles/theme/bridges.css` — `--color-success: var(--success)` — so `bg-success/10 text-success` is available and would have worked. Worse, `--success` is already `light-dark(oklch(0.720 0.192 149.5), oklch(0.805 0.186 151.6))`: it carries its **own** dark arm, so the hand-rolled `dark:text-green-400` is a *second, redundant, and divergent* dark-mode mechanism for a token that never needed one.

Honest scoping: this is not a contrast regression — the forked ink is *darker* in light mode, so it reads slightly stronger. The defect is ownership. The repo now has two sources of truth for "success", and only one of them moves when the design system moves.

**Repro** `node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-tone-fork.mjs`
**Witness** `AF-L-r2-01-both-tones.png`, `AF-L-r2-02-success-chip.png`, `AF-L-r2-03-error-chip.png`
**Route** local, one line. `bg-success/10 text-success`, drop the `dark:` variant. Rename `variant` → `tone` and `"error"` → `"destructive"` to land on the sealed axis.

### L-2 · **MAJOR** — the barrel seam that hides this leaf is enforced by prose only (blast radius: the whole feature)

`demo/palettes/browser/index.ts:6-7` asserts:

> "External consumers reach the feature through THIS seam … never a raw internal `.vue` file — the G-DEMO-3b boundary (eslint.config.js) enforces it standing."

**It enforces nothing.** `evidence-r2/af-L-r2-boundary-inert.sh`:

1. G-DEMO-3b's `files` globs (`eslint.config.js:232-238`) name `demo/@/components/**`, `demo/@/lib/**`, `demo/@/composables/**` — **`demo/@` does not exist.** The feature actually lives at `demo/palettes/browser/`, matched by no glob.
2. Its banned specifier `@components/custom/palette-browser/**/*.vue` is unresolvable: `grep -rn 'from "@components' demo/ src/` returns **0**. `vite.config.ts:68` records why — *"W43 (RF-15) killed the demo `@…` path aliases."*
3. Resolved rule, per file:

```
demo/palettes/BrowsePane.vue                              no-restricted-imports: UNSET
demo/palettes/PalettesPane.vue                            no-restricted-imports: UNSET
demo/palettes/browser/card/PaletteCard/ActionFeedback.vue no-restricted-imports: UNSET
demo/palettes/browser/index.ts                            no-restricted-imports: UNSET
```

The one surviving glob (`demo/color-picker/**`) *does* load the rule — guarding a dead address.

This lands on the L seat directly: ActionFeedback is exported by **no** barrel (correctly — it is a true internal), and the mechanism cited as keeping it internal has been inert since the W43 restructure. The invariant is real and worth keeping; only its enforcement died. A standing structural claim that silently stopped holding is worse than no claim, because the next author reads `index.ts:6-7` and believes it.

**Repro** `bash docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-boundary-inert.sh`
**Route** feature-level, not local: re-point G-DEMO-3b's globs at `demo/palettes/**` and its pattern at the relative raw-`.vue` reach (`**/browser/**/*.vue`). Until then, delete or downgrade the `index.ts:6-7` assertion — do not let it keep claiming a guarantee it lost.

### L-3 · **MAJOR** — the imperative channel has no teardown contract; verdicts addressed to unmounted cards are silently lost

ActionFeedback's only drive path is a hand-rolled template-ref registry:

```
PalettesPane.vue:84   :ref="(el: any) => el && (cardRefs[palette.id] = el)"
BrowsePane.vue:94     :ref="(el: any) => el && (cardRefs[palette.slug] = el)"
```

Vue calls a function ref with `null` on unmount. **The `el &&` guard swallows that null call**, so the entry is never deleted. Measured (`evidence-r2/af-L-r2-registry-leak.mjs`) — seed two local palettes, filter one out through the pane's own search box:

```
BEFORE filter : cardRefKeys ["af-probe-1","af-probe-2"]  mountedCards 2
AFTER  filter : cardRefKeys ["af-probe-1","af-probe-2"]  mountedCards 1  retainedDead ["af-probe-2"]
LOST verdict  : threw null · chipsOnScreen 0 · bodyMentionsVerdict false · console/page errors []
```

**L-3a** the registry grows monotonically and retains unmounted component instances — unbounded over a session of searching, filtering, deleting and paging.
**L-3b** calling `showFeedback` on a retained-dead instance — exactly what `PalettesPane.vue:207` and `BrowsePane.vue:249` do after an `await` — **throws nothing, renders nothing, logs nothing.** The outcome of the user's publish/save/delete/fork simply vanishes.

The live sequence: filter your palettes, hit Publish, let the request land after the card scrolls out of the filtered set — the verdict is addressed to a corpse. `BrowsePane.vue:249` and `:264` do not even null-check (`cardRefs[palette.slug]?.showFeedback(...)` guards *absence*, not *deadness*).

The `(el: any)` annotation compounds it: the registry's declared type is `Record<string, InstanceType<typeof PaletteCard>>`, but the write site accepts anything, so the one place the contract could be checked is cast away.

**Repro** `node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-registry-leak.mjs`
**Witness** `AF-L-r2-04-verdict-lost.png`
**Route** the registry is the wrong shape. A verdict belongs in pane-level state keyed by palette identity and passed *down* as a prop, so an unmounted card cannot be addressed and a remounted one re-renders the pending verdict. That deletes `defineExpose`, both registries, and both `(el: any)` casts.

### L-4 · **MAJOR** — the public surface carries no verdict identity, so a second verdict inherits the first one's clock

Ownership is split across the seam: visibility state in the parent (`PaletteCard.vue:234-236`), dismissal clock in the child (`ActionFeedback.vue:37-47`). The child's only re-arm trigger is a change-watcher on a **boolean**:

```
watch(() => props.visible, (v) => { if (timer) clearTimeout(timer); if (v && props.autoDismissMs > 0) … })
```

`showFeedback` (`PaletteCard.vue:238-242`) sets `feedbackVisible.value = true` unconditionally. When a second verdict arrives while the first chip is up, `visible` does not *change* — the watcher never fires, and the 2500 ms clock is never re-armed. Measured (`evidence-r2/af-L-r2-no-verdict-identity.mjs`):

```
t≈ 102ms  chip "VERDICT-A"      (clock armed for 2500ms)
t≈2158ms  chip "VERDICT-B"      (arrives; watcher does NOT fire)
t≈2859ms  chip null             (A's clock expires — takes B with it)
t≈3859ms  chip null

L-4 CONFIRMED — VERDICT-B lived ~701ms, not its own 2500ms.
```

B gets **28 % of its designed lifetime**. The faster the user acts, the less time each successive verdict gets — the failure scales precisely with the traffic it is meant to report on. This is C6 vindicated: three orthogonal props (`message`, `variant`, `visible`) cannot express "this is a *new* verdict", so the child cannot distinguish a fresh result from the one already on screen.

**Repro** `node docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/af-L-r2-no-verdict-identity.mjs`
**Route** bind one identity-carrying object — `verdict: { id, tone, message } | null` — and key the transition on `verdict.id`. `visible` becomes `verdict !== null`, and the re-arm becomes a watch on identity. This also fixes L-3 if the object lives in pane state.

### L-5 · **MINOR** — name, location and coupling disagree about what this component is

Domain coupling across the six-file folder (`grep -c "Palette\b\|palette"`):

| file | lines | palette-refs |
|---|---:|---:|
| `PaletteCard.vue` | 364 | 55 |
| `PaletteCardMenu.vue` | 228 | 23 |
| `PaletteCardMeta.vue` | 64 | 17 |
| `PaletteRenameInput.vue` | 66 | 1 |
| `PaletteCardSwatches.vue` | 96 | 1 |
| **`ActionFeedback.vue`** | **58** | **0** |

It is the only file in the folder with **zero** domain coupling and the only one without a `Palette*` prefix. By its name it claims app-wide generality; by its location it claims card-locality; by its content it is domain-free with exactly one consumer.

On the six-file decomposition itself, the split is **along real seams, not a distributed god module** — each child owns a distinct concern and the two thinnest (`PaletteRenameInput`, `ActionFeedback`) are genuine presentational leaves. The parent is still doing a lot at 364 lines and 17 emits, but that is a `PaletteCard` finding, not this seat's.

Per the owner's KISS edict (`feedback_kiss_no_contrivance`), the cure is **not** relocation to `demo/shared/ui/` — a single-consumer leaf does not earn a shared home. Rename to `PaletteCardFeedback.vue` so the name matches the folder that owns it. If a second consumer ever appears, *then* it graduates.

### L-6 · **MINOR** — a producer atom exists and is hand-rolled here instead

`ActionFeedback.vue:7` hand-rolls `flex items-center gap-2 px-3 py-1.5 rounded-panel text-xs`. glass-ui `Chip` (`dist/components/chip/`) ships `mode:"static"` + `tone` + `size` + `shape:"pill"`, with `chipVariants` `sm = "gap-1 px-2.5 py-1 text-caption"` — the same recipe. Repo-wide, `Chip` has **one** adopter (`demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue:14`), so this is a live under-adoption, not a one-off.

*Producer relay (BJ ask):* `Chip`'s tone is typed `tone?: string` (`dist/components/chip/types.d.ts`), not `Tone`. The producer seals the axis in `_shared/axes.d.ts` and then declines to use it on its own chip — which is part of why consumers keep inventing their own tone vocabularies. Ask: narrow `ChipVisualProps["tone"]` to `Tone`.

### L-7 · **INFO** — 25 % of the public prop surface is dead

`autoDismissMs` (`:28`, default 2500) is bound by no consumer — `PaletteCard.vue:123-128` passes `message`, `variant`, `visible` and `@update:visible` only. It is a configuration point with zero configurers. It should either be deleted (fold 2500 into the component) or become load-bearing when the verdict object of L-4 lands.

---

## §3 · Superlatives

### S-1 · **The dependency direction is exemplary — a pure sink**

Two imports, both external (`:20-21`); **zero relative imports**; zero reach into `../`, into the palette domain, into a composable, or into a sibling. It cannot participate in a cycle and cannot be broken by a refactor above it. This is the cleanest import graph of any file in the folder, and — read correctly — it is precisely what r1's C2 documented while presenting it as a fault.

### S-2 · **The motion family is fully producer-governed, and its reduced-motion policy is genuinely well designed**

6/6 motion tokens producer-defined, 0 demo-defined (C5 table). Under PRM the chip does not merely slow down — glass-ui's policy rewrites `transition-property` to strip `transform` and `max-height`, so the bouncy spring and the height morph *disappear* while a 100 ms opacity fade survives. That is the correct reading of "reduce, don't abolish", and it is doing real work on this component without this component knowing about it. The `<style scoped>` block (`:50-57`) participates correctly: it sets only the family's geometry vars (`--vj-celebrate-collapse/-expanded/-scale`) and comments *why* scale stays 1 ("so the row never jitters horizontally"). Local geometry, producer choreography — the right division.

### S-3 · **The barrel discipline around this leaf is correct**

`card/index.ts` uses named re-exports only, with the reason stated in-file (PI-6: an SFC's scoped `<style>` is a side-effecting import, so star re-exports defeat per-consumer tree-shaking). ActionFeedback is deliberately **not** exported — a true internal, correctly hidden. The intent of the seam is right; only its enforcement (L-2) rotted.

### S-4 · **The error rung proves the team knows the idiom**

`bg-destructive/10 text-destructive` resolves to `rgb(219, 36, 36)` — **byte-identical** to `--destructive`. The correct pattern is already in the file, one line below the wrong one. That makes L-1 a one-line, near-zero-risk fix rather than a migration.

---

## §4 · Routing

| # | Severity | Fix locus | Cost |
|---|---|---|---|
| L-1 | MAJOR | local — `:8` | one line |
| L-2 | MAJOR | feature — `eslint.config.js` globs + `browser/index.ts:6-7` | small; blast radius is the whole palette-browser |
| L-3 | MAJOR | pane — retire `cardRefs`/`defineExpose` for pane-held verdict state | medium; deletes code |
| L-4 | MAJOR | seam — one identity-carrying `verdict` prop | medium; folds into L-3 |
| L-5 | MINOR | rename → `PaletteCardFeedback.vue` | trivial |
| L-6 | MINOR | adopt `Chip mode="static"`; + BJ relay to narrow `tone` to `Tone` | small |
| L-7 | INFO | delete `autoDismissMs` or make it load-bearing | trivial |

L-3 and L-4 are one repair: hoist the verdict into pane state as an identity-carrying object keyed by palette, pass it down as a prop, delete the imperative channel. That single change removes both `(el: any)` casts, both registries, the `defineExpose`, the retention leak, the silent-loss path and the clock bug. L-1, L-5, L-6, L-7 are independent and cheap.

A11y note, out of seat but observed live and worth carrying: the chip renders `role: null, aria-live: null` (measured in every probe run). Verdicts for publish/save/delete/fork are never announced. That belongs to the D axis; recording it here so it is not lost.

## §5 · Evidence index

All under `docs/tranches/V/megatranche/audit/components/ActionFeedback/evidence-r2/`. Every script is self-contained, seeds its own fixtures via `localStorage` (no repo bytes touched), and prints its own falsifier.

| artifact | proves |
|---|---|
| `af-L-r2-tone-fork.mjs` | L-1 (light + dark arms); C3, C7 |
| `af-L-r2-boundary-inert.sh` | L-2; the `index.ts:6-7` claim |
| `af-L-r2-registry-leak.mjs` | L-3a, L-3b |
| `af-L-r2-no-verdict-identity.mjs` | L-4; C6 |
| `af-L-r2-prm-refutation.mjs` | C5 refutation (6/6 tokens, PRM clamp + property strike); S-2 |
| `AF-L-r2-01-both-tones.png` | both rungs rendered on live cards |
| `AF-L-r2-02-success-chip.png` / `-03-error-chip.png` | per-rung ink |
| `AF-L-r2-04-verdict-lost.png` | the filtered pane at the moment a verdict is dropped |

Prerequisite for the `.mjs` probes: dev stack up on :9000. `af-L-r2-boundary-inert.sh` needs no server.
