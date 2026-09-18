SERVED MODEL: claude-opus-5[1m]

# §D producer note — dated 2026-09-17 — glass-ui 7.0.0 already ships the quiescence seam

**From**: X-W2 (Track A · X·V · value.js), unit `X.W2.d`, dispatched at **REPAIR 1 (round 1)**.
**To**: the glass-ui **BH/BI relay**, via the **X formation mail seat** — see §4 on routing.
**Authority**: `docs/tranches/X/waves/W2.md` §3 scope 9 · §8 (L267) · §CARRIES **CC-035**.
**Status**: **EXPLICITLY NON-GATING.** CC-035, quoted: *"Producer half = one dated §D letter, never a
gate."* §CARRIES says it in its own words: *"CC-035's producer half is **discharged on arrival**."*
This note cannot block a close and does not ask to. It is owed, and this file is the payment.

---

## 1. What is being recorded

The value.js consumer's producer ask — a quiescence seam and a config-only blob entry point — was
**already satisfied by the installed producer before this wave opened**. The ask is closed by arrival,
not by a new producer act.

Measured at this seat against the installed tree (`node_modules/@mkbabb/glass-ui`, tag-pinned):

| what the ask wanted | what 7.0.0 ships | receipt |
|---|---|---|
| a quiescence read to replace the wall clock | `settled: Readonly<Ref<boolean>>` | `<cmd>` `grep -n "settled" node_modules/@mkbabb/glass-ui/dist/components/blob/Blob.vue.d.ts` → `63: settled: Readonly<import("vue").Ref<boolean, boolean>>;` |
| the frame behind that read | `settledFrame: Readonly<Ref<BlobSettledFrame \| null>>` | same file, `:64` |
| a config-only entry point, free of the WebGL2 engine | `./blob-config` | `<cmd>` `node -e "…exports['./blob-config']"` → `{ "types": "./dist/blob-config.d.ts", "import": "./dist/blob-config.js" }` |
| the symbols the two boot-path sites import | `BLOB_CONFIG_DEFAULTS · BLOB_CONFIG_KEY · BLOB_HERO · LIGHTNESS_FLOOR_BRACKET · LIGHTNESS_FLOOR_DEFAULT · clampLightnessFloor` | `<cmd>` `cat node_modules/@mkbabb/glass-ui/dist/blob-config.js` — **245 B**, one re-export line over a `presets-*.js` chunk |
| installed version | **7.0.0** | `<cmd>` `node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"` → `7.0.0` |

**What the consumer did with it** (this wave's unit **a**, landed at `13f4ddc2`): two import specifier
swaps, `@mkbabb/glass-ui/blob` → `@mkbabb/glass-ui/blob-config`, at
`demo/color-picker/composables/boot/useAtmosphere.ts:36` and `demo/scenes/blob/BlobPane.vue:12-13`.
Three changed lines, imported symbols unmoved. **Result, measured from disk**: the WebGL2 metaball
engine left the eager module set (`smin` **0** across all six eager chunks; the sole `smin`-bearing
chunk is `HeroBlob-CK6WV_Kd.js`, which `index.html` references **0** times), and eager JS gzip fell
**32,790 B** to **280,811 B**, under the untouched 286,720 B bar. Full pair:
`docs/tranches/X/evidence/W2/DELTA.md`.

**The dead book is retired.** `demo/picker/visual/HeroBlob.vue:208-209` still carries *"the producer
`settled`/park-from-quiescence seam (GAP-L5, booked at the 5.0.0 adopt)"* — unchanged at the bytes,
because unit **b** escalated and landed nothing rather than half a family. **5.0.0 was skipped**;
V′ W44 adopted **7.0.0**, and the seam
shipped there. The book fired at that adoption and no close observed it — DR-03's disease verbatim.
This note observes it.

## 2. What this note does NOT say

It does **not** say the seam works on the hero's configuration. It does not. That is a **separate**
producer row, measured by this wave's unit **b**, and it is **not** part of this note (W2.md scope 9
charges this note with recording the seam as *shipped*; unit b's rows record it as *unreachable*).
Both are owed to the relay; they are different letters and must not be collapsed:

- **b-F1 · MAJOR · PRODUCER — `isQuiescent()` is unreachable on the hero's configuration.** It demands
  every satellite simultaneously `orbiting`, while the resting colony's merge chain
  (1,800 + ≤4,000 + 2,200 = **6,000–8,000 ms**) exceeds the global inter-event cooldown
  (`3000 × mergeRate(sleepy 1.83)` = **5,490 ms**). A gate on a cooldown shorter than the run it gates
  cannot starve. Measured across 5 runs / 2 instruments / 45–75 s windows on software-GL against the
  built origin, with PRM excluded by measurement and the cause isolated by a reverted
  `HERO_FISSION_AMP = 0` counterfactual: with fission disarmed and the mood held `sleepy`, `settled` is
  still false after 75 s.
- **b-F2 · MAJOR · PRODUCER — the fission snap enters the mood FSM through the USER-CLICK channel.**
  `satellites.onPinch(t => pointer.click(t))` makes the engine's own ornamental beat indistinguishable
  from a user click; the FSM answers `excited` (arousal 1) for 900 ms + transition, dropping
  `mergeRate` to 0.3, shortening the cooldown to 900 ms, producing more fissions. At any
  `fissionAmp > 0` the engine excites itself indefinitely. Measured: a 1 s `excited` flip every
  9–12 s with zero input, gone entirely at `fissionAmp = 0`.

Banked beside them, for the triumvirate rather than the relay: **b-F3** (the manual-mood latch as a
third starvation path), **b-F4** (the fixture cannot be re-sized from the wall clock's numbers), and
**b-F5** (`prefers-reduced-motion` skips `mood.update`, so `idleMs` never advances — a fourth
starvation path, and the one that matters most for the users PRM exists to serve).

## 3. `BLOB_HERO` — the preset this note's surface also ships

`./blob-config` exports `BLOB_HERO`, shipped at 7.0.0 with **zero consumers** across three closes.
X-W2 **tombstoned** it rather than consume it, and the ruling is carried verbatim in the wave close
(§G8). The disqualifiers were measured, not assumed: the hero's register is an overlay on the app-wide
`BLOB_CONFIG_KEY` object that `BlobPane` live-tunes, so adopting the frozen preset as its base would
sever that seam; and the residual delta (`satelliteCount` 3→4, `membrane.smoothK` .05→.06) is design
content, which M-23 makes X-W10's. **Re-trigger**: X-W10's design canon may adopt it as the hero's base
*in the same ruling that re-homes the live-tuning seam*.

## 4. Routing — why this note is filed here and not into `../glass-ui/`

**`glass-ui` is READ-ONLY always.** Producer rows ride mail; they are never written into
`../glass-ui/**` by a value.js seat, and never cured by a frontend hack in this tree. This note and
the two b-rows above are therefore **authored in-bounds** under
`docs/tranches/X/evidence/W2/` — inside X.W2.d's §4 writable set — and handed to the **X formation
mail seat** for delivery to the active glass-ui **BH/BI inbox**, per the standing BH/BI relay fond.

**Owner of the delivery**: the X formation mail seat / the X orchestrator (the close's **residual 4**,
carried unchanged). **This seat did not deliver it and does not claim to have.** What this seat
discharges is the *authoring* half that §8 names as a verification artefact.
