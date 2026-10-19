SERVED MODEL: claude-opus-5[1m]

# X-W3 · Repair 1 — the rows RETURNED, not taken

**Date**: 2026-09-18 · **Seat**: REPAIR 1 (Track A, round 1) · **Wave**: X-W3

Every row below has its cure **outside** `W3.md` §4 File Bounds (as widened by X.W3.7's dated
addendum-beside to `demo/platform/transport/**`). A write to any of them is an ESCALATION under the
standing law, so none was taken — not one byte, not even in the working tree. Each carries the
measured reason and the exact bytes owed, so the ruling seat is handed a decision, not a hunt.

⟨cmd⟩ `git status --porcelain api/ demo/` at this seat's close → the SAME ten
`demo/palettes/**` · `demo/picker/**` · `demo/shell/dock/layers/SlugEditLayer.vue` rows it showed at
this seat's crash-recovery sweep, **X-W4 unit `a`'s**, byte-unchanged and never touched; **zero
`api/` rows**, because every byte this seat wrote is committed.

---

## 1. `ESC-W3.3-DEMO-WRITE-CONTRACT` — **WIDENED** by Repair 1. Still a §3a MANDATORY TRIUMVIRATE.

**Status**: FIRED at X.W3.3, booked `R-3` by the close, **UNDISCHARGED**. Repair 1 adds a second
break to the same row and returns it unchanged in kind.

`W3.md` §3a (`:103-106`) names the trigger verbatim:

> the `Idempotency-Key` requirement (G-10) **breaking an existing consumer of `POST /:slug/fork`**

**What X.W3.3 measured** — the shipped client sends neither header:

⟨cmd⟩ `grep -c 'idempotencyKey\|ifMatch' demo/palettes/api/versions.ts` → **0**

**What Repair 1 adds** — G-12 retires the singular path the same client posts to, with no alias and
no redirect (the no-legacy law forbids one), so the fork button's break moves from `400` to `404`:

⟨cmd⟩ `grep -n 'palettes/\${encodeURIComponent(slug)}/fork' demo/palettes/api/versions.ts` →
`:48` — still singular.
⟨cmd⟩ `grep -c 'forksRouter.post("/:slug/fork"' api/src/modules/palette/routes/forks.ts` → **0**
(the singular mount is gone); `…/forks"` → **1**.

| consumer | call site | before X-W3 | after Repair 1 |
|---|---|---|---|
| version-drawer revert | `BrowsePane.vue` → `useVersionHistory.ts:88` → `api/versions.ts:34` | `200` | **`400`** (no key) → `428` (no `If-Match`) |
| fork / remix | `useVersionHistory.ts:97` → `api/versions.ts:43` | `201` | **`404`** (retired path), then `400` (no key) |

**Why it is not locally recoverable.** `demo/palettes/api/versions.ts`,
`demo/palettes/useVersionHistory.ts` and `demo/palettes/BrowsePane.vue` are in **no** X-W3 unit's
writable set and in **no** row of §4's table; §4's `Do NOT touch` line binds *"any `demo/` path not
named above"*, and `X-W3-FOLD.md` §BoundsDelta records `demo/palettes/api/*.ts` as deliberately not
proposed. The api cure is landed **exactly as specified** — no allowlist, no user-agent exemption,
no warn-only mode, no grace window, no singular alias — because a requirement that exempts the one
client which does not satisfy it is not a requirement.

**Bytes owed**: the three hunks banked verbatim at `W3-3-ESC-DEMO-AND-TESTS.md` §2.1–§2.2, **plus**
`/fork` → `/forks` on `api/versions.ts:48`. `RequestOptions` already carries `ifMatch` and
`idempotencyKey` and already emits both headers (`demo/platform/transport/client.ts:96-116`), so no
transport byte changes. **Do not** default `If-Match` to `"*"` — that turns the fence off.

**Asked**: the **triumvirate** §3a names (research + plan augment + redress). Per §3a and
`ORCHESTRATION.md §Triumvirate Auto-Triggers`, the orchestrator may **NOT** redispatch X.W3.3 alone
on this row.

---

## 2. `ESC-W3-G21` — the handoff row, carried unchanged

**Status**: the wave's **one honest-RED**, adjudicated as such by Check 1 §4 (*"THE HONEST-RED SET
IS `{G-21}`"*). Unmoved by Repair 1, and unmovable from it.

§6 **G-21** requires the `Stub`-render handoff row to exist by name in
`docs/tranches/X/waves/W5.md` (or the X-W5 authoring brief) citing the 14-record baseline.

⟨cmd⟩ `grep -c Stub docs/tranches/X/waves/W5.md` → **0** ·
⟨cmd⟩ `grep -c Stub docs/tranches/X/refinement/X-W5-FOLD.md` → **0** ·
⟨cmd⟩ `grep -c "component: Stub" demo/color-picker/router/index.ts` → **14** (D-4's baseline, exact).

**Why out of bounds**: neither candidate home appears in §4's table. §4 grants this wave
`docs/tranches/X/waves/W3.md` alone among wave specs, and E-3 makes another wave's dated spec
immutable to this one besides.

**Bytes owed**: one row in X-W5's spec naming D-4's handoff and citing the 14-record baseline.
**Owner**: the X-W5 authoring seat / the sitting.

---

## 3. `ESC-W3.5-MODERATION-REQUIRED` — one line, one file, out of bounds

**Status**: NEW at Repair 1. MINOR.

`Palette.moderation` is minted as **optional at the TYPE** (`api/src/modules/palette/model.ts`) and
is required in every other sense: the migration writes it onto every at-rest row, both
palette-domain inserts write it explicitly at birth, `migrations/check.ts` rejects any at-rest value
outside the closed enum, and the read predicate's `?? "clear"` default is the SAME answer the
two-field model gives, so no reader depends on absence.

**Why not required**: exactly one construction site builds a whole `Palette` literal outside this
wave's bounds —

⟨cmd⟩ `grep -rn ": Palette = {\|palettes.insert({" api/src --include='*.ts' | grep -v __tests__` →
`service/crud.ts:104` (§4 row) · `service/forks.ts:74` (§4 row) ·
`admin/service/import.ts:45` — **not in §4**; §4 grants `admin/policy.ts` and
`admin/service/palettes.ts` only.

Making the field required would break that file's compile (so `npm run typecheck` and G-22 with it)
or force an out-of-bounds write. Loosening the model to keep a compile quiet is the shape X.W3.2
refused on `payloadHash`; naming the gap is the honest alternative.

**Bytes owed** (one line, `api/src/modules/admin/service/import.ts:53`):

```diff
                 visibility: "public",
+                moderation: "clear",
                 tier: "standard",
```

then `moderation?: PaletteModeration` → `moderation: PaletteModeration` on `Palette`, and the
`!("moderation" in d)` arm may be dropped from `migrations/check.ts`.

---

## 4. Recorded, not escalated — three facts a successor should not re-discover

- **`routes/publish.ts` prose is now stale.** Its docstring records the read→write window as *"an
  accepted narrow TOCTOU window (ledger #16)"*; Repair 1's G-8 fence closes it. The file is named in
  X.W3.3's §5 Files but is **absent from §4's table** (Check 1 §2 measured the same seam), so the
  sentence stands. One comment, one file, whichever wave takes §4's next widening.
- **`demo/palettes/types.ts:40`** still declares `visibility?: "public" | "unlisted" | "private"`.
  It is a demo-side type compiled independently of the api model, so the narrowing breaks nothing
  (⟨cmd⟩ `npm run typecheck` → exit 0, four bands); it is a wider union that will simply never be
  inhabited. `demo/**` beyond §4's six named paths is X-W7's.
- **`api/test/conformance/crud.test.ts`** pins the CRUD-CONTRACT v2 envelope key set and is **not**
  in §4. It is why `moderation` is not emitted on the wire — a reason L-19 supplies independently
  (no named consumer reads it), and the reason is written at `format.ts` beside the field it omits.
