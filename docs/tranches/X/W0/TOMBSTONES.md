SERVED MODEL: claude-opus-5[1m]

# X-W0 — TOMBSTONES

**Unit**: X-W0.f — The Tombstone Set (CC-015, CC-016, CC-017, CC-018, CC-022)
**Wave**: X-W0 — Formation: Rulings, Tombstones, Track-or-Archive, Graph Authority
**Track**: A · X·V (value.js) · group 3
**Seat**: Opus (`claude-opus-5[1m]`) · 2026-09-17
**Spec sections executed**: `docs/tranches/X/waves/W0.md` §Agent Units "X-W0.f" `:179–184` · §Scope 6 `:29` · HG-12 `:282–298` · §Commit Plan row 6 `:376` · §File Bounds Do-NOT-touch `:101`
**Rulings consumed**: COHESION `§0j.A` `:517` (DR-14 = **DELETE**, routed to X-W1's config carve) · `§0j.A` `:518` (DR-16 = **RETIRE**, option a, no fresh bracket set at X-W10) · `§0j` preamble (the owner's begin-word, 2026-09-17)
**Gate**: **HG-12**, the five executable rows. The four owner-ruled rows (CC-019 · CC-020 · CC-021 · CC-023) are **X-W0.g's** and are deliberately **not** pre-written here — see §4.
**HEAD at open**: `a0d392dc` ⟨`git log --oneline -1`⟩. **HEAD at the final probe re-run**: `ca5b7441`, 2026-09-17 13:40:24 EDT (sibling Track seats commit concurrently; every probe below was re-run and double-run at that clock).

---

## §0 — What a tombstone is, and the law of this file

HG-12 `:283` states the three required parts, and this file carries them in that order for every row:

> `docs/tranches/X/W0/TOMBSTONES.md` carries one entry per RETIRE row: original mandate quoted verbatim, probe pasted with its output, terminal disposition named.

and names its own falsifier at `:298`:

> *Falsifier*: a tombstone whose pasted probe does not reproduce when re-run at wave close.

Three standing rules govern what follows.

1. **A tombstone records a death; it does not perform an execution.** Where a row's terminal act
   writes bytes outside this unit's writable set — `vite.config.ts` (CC-016), the `docs/precepts`
   gitlink (CC-017) — the tombstone names the ruling, names the act, names its owner, and performs
   **nothing**. `W0.md:101` forbids those paths to this wave; a seat that wrote them would be
   curing the row by breaking the wave.
2. **Every quotation is verbatim, including its defects.** Where the owner's own bytes carry a
   spelling the later record silently corrected, this file carries **the owner's spelling**, so the
   anchor resolves to the owner's bytes and not merely to the correcting file. (The mechanism is
   X-W0.b's B7 finding, measured on this same corpus: a search for a corrected spelling reaches the
   corrector and nothing else.)
3. **E-3 — this file is append-open.** §4 is reserved. X-W0.g appends its four ruled tombstones as
   a **dated addendum beside** these five; nothing in §1–§3 is rewritten to accommodate them.

**Probe discipline.** Every probe below was run twice at the final clock and both runs are
byte-identical; the pasted output is the run, not a transcription. Where a gate probe answers its
question but does not *settle* the row, a second, named probe is pasted beside it and labelled as
such — never substituted for the gate's own.

---

## §1 — The five executable tombstones

---

### TS-1 · CC-015 / DR-02 — Blob-facility extirpation

**Ledger row** ⟨`sed -n '72p' docs/tranches/V/megatranche/registry/CARRY-CUT-LEDGER.md`⟩:

> | CC-015 | DR-02 (blob-facility extirpation) | reg | removal mandate LANDED at N.W5 `e32111c7`, later inverted with no tombstone | **RETIRE** — tombstone at X-W0 quoting the original mandate + `e32111c7` + the HEAD `glass-ui/blob` import; residual lifecycle is DR-03 (CC-035), the split six closes failed to make | DISEASE-REGISTRY:121 |

#### §1.1 — The original mandate, verbatim

The owner's own bytes, `docs/tranches/D/D-PROMPTS.md:25` (the D-opening directive; the mandate's
A-era alias is *turn-1 mandate 13*). Quoted **exactly**, including `faciilities` and `glob`:

> Full validation and extirpation of the blob faciilities — align, update, and augment the glass-ui glob facilities to be what we require, and then remove the hard-coded bespoke versions herein to leverage that. Perfect and refine our extant and basal implementations to be better encapsulated, generalized, beautiful — same for aurora. Two research agents in parallel to accomplish this, too.

The adjudicated statement of the row, `registry/DISEASE-REGISTRY.md:123`:

> **What.** Blob-facility extirpation — a removal mandate that landed at N.W5 and has since been inverted into a preservation mandate with no tombstone.

and its wave shape, `:127`:

> **Wave shape.** Write the tombstone in W.W0: quote the original mandate, cite e32111c7, verify the HEAD import, close the row. The residual lifecycle asks (settled seam, HERO preset consume, 0px chassis) are NOT this row — they are DR-03, booked separately, which is the split six closes failed to make.

#### §1.2 — The landing, cited

⟨`git log -1 --format='%H %ad %s' --date=iso e32111c7`⟩:

```
e32111c736b3242a9de8cb1ab8633f913439ff34 2026-06-11 23:05:51 -0400 feat(demo): N.W5.A/B/C/E — blob fork (1270 LoC) → glass-ui goo-blob with live-palette paletteStops; deriveAurora wired picker→atmosphere + AuroraPane rebuilt; watercolor fork + global #watercolor-filter extirpated; 5 phantom classes real (inv-N-4, inv-N-7)
```

⟨`git merge-base --is-ancestor e32111c7 HEAD && echo ANCESTOR-OF-HEAD`⟩ → `ANCESTOR-OF-HEAD`. The
landing is reachable from this wave's HEAD; it is history, not a claim.

#### §1.3 — The inversion, quoted at its byte

`docs/tranches/V/apotheosis/probe/vf/waves/G-D.md:89`, row **D18**, the vnext-era disposition that
replaced the removal mandate with a preservation mandate:

> | D18 | KEEP and refine the complete Blob instrument as stage-first progressive disclosure. | … | … | … | `/blob` always Blob; **all 49 leaves remain live/owned**; 47 semantic leaves URL-round-trip; canvasSize/quality local; … | … |

⟨`grep -rn "extirpat" docs/tranches/V/vnext/ | wc -l`⟩ → **0** (double-run **0**). The registry's
finding — *"The word 'extirpat' appears ZERO times in the entire vnext corpus"* — reproduces at this
clock. **The inversion is real and it is silent: that silence is the disease, and this tombstone is
its cure.**

#### §1.4 — The probe, pasted with its output

HG-12's probe, ⟨`grep -rn "glass-ui/blob" demo/`⟩ (run twice, identical):

```
demo/scenes/blob/BlobPane.vue:12:import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
demo/scenes/blob/BlobPane.vue:13:import type { BlobConfig } from "@mkbabb/glass-ui/blob";
demo/picker/visual/HeroBlob.vue:34:import { Blob, BLOB_CONFIG_KEY } from "@mkbabb/glass-ui/blob";
demo/picker/visual/HeroBlob.vue:35:import type { BlobConfig } from "@mkbabb/glass-ui/blob";
demo/color-picker/composables/boot/useAtmosphere.ts:36:import { BLOB_CONFIG_KEY, BLOB_CONFIG_DEFAULTS } from "@mkbabb/glass-ui/blob";
```

**5 hits · 3 files** ⟨`… | wc -l`⟩ → `5`, ⟨`grep -rln … | wc -l`⟩ → `3`; both double-run identical.
This reproduces the spec's born-RED figure exactly (`W0.md:288` — *"5 hits … (+2 type imports)"*).

**A second probe, run because the gate's probe answers the wrong question if read alone.** The
mandate's verb was *"remove the hard-coded bespoke versions herein to leverage that"* — a **producer
import is compliance with the mandate, not a violation of it.** So the mandate's actual predicate
was measured directly:

| what the mandate ordered removed | probe ⟨cmd⟩ | output |
|---|---|---|
| the bespoke blob WebGL fork (1270 LoC) | `find demo -iname '*metaball*' -o -iname '*WatercolorDot*' -o -iname '*useMetaballRenderer*'` | *(empty)* |
| its shader/GL plumbing | `grep -rln "createQuadVAO\|compileShader\|metaball.frag" demo/ src/` | `demo/picker/seat.css` **only** (a CSS file — no GL call site survives) |
| the global `#watercolor-filter` | `grep -rn "watercolor-filter" demo/` | **1** hit: `demo/picker/controls/SpectrumCanvas/SpectrumCanvas.vue:266` — `<filter> (glass-ui superset) — no global #watercolor-filter override here.` *(a comment asserting its own absence)* |
| the producer surface the mandate said to leverage | `node -p "Object.keys(require('./node_modules/@mkbabb/glass-ui/package.json').exports).filter(k=>/blob/.test(k)).join(',')"` | `./blob-config,./blob` |

#### §1.5 — Terminal disposition

**RETIRED — SATISFIED AT `e32111c7`, THEN INVERTED IN THE RECORD AND NEVER IN THE TREE.**

Stated precisely, because the row died three different deaths in three different documents and none
of them said so:

1. **The mandate was executed.** The 1270-LoC bespoke fork, the watercolor fork and the global
   `#watercolor-filter` are gone; the four probes above find no survivor. The removal half is
   **DONE** and has been since 2026-06-11.
2. **The five HEAD imports are the mandate's second clause, not its violation.** *"…and then remove
   the hard-coded bespoke versions herein to leverage that"* — consuming `@mkbabb/glass-ui/blob` is
   the leveraging. A tombstone that read the five hits as a live extirpation debt would re-open a
   satisfied mandate, which is FM-09's shape.
3. **What the vnext D18 row inverted was the mandate's *future*, not its past.** D18 rules KEEP-and-
   refine over the producer instrument. That ruling is **not disturbed here** and is not this row's
   to disturb; the defect DR-02 registered was that the inversion landed **with no tombstone**, so
   the arc read as an unsatisfied seven-tranche carry. This file is that tombstone.
4. **The residual lifecycle asks are NOT this row.** Per `DISEASE-REGISTRY:127` and the ledger row —
   the settled/park-from-quiescence seam, the HERO preset consume and the 0px chassis are **DR-03 /
   CC-035**, booked separately. This tombstone makes the split the six closes failed to make.

**The row does not appear in a successor ledger.** Its origin (`D-PROMPTS.md:25` / turn-1 mandate 13)
is discharged; its live successor is CC-035, already banked under its own id.

---

### TS-2 · CC-016 / DR-14 — `siblingFsAllowTransient`

**Ledger row** ⟨`sed -n '73p' …/CARRY-CUT-LEDGER.md`⟩:

> | CC-016 | DR-14 (CH-9 `siblingFsAllowTransient`) | reg | "transient" carve-out unre-evaluated across 14+ closes | **RETIRE** — evaluate the trigger ONCE at X-W0 against installed glass 7.0.0: delete, or rename with owner-recorded rationale; a variable named "transient" may not survive X | DISEASE-REGISTRY:241 |

#### §2.1 — The original mandate, verbatim

The carve-out was minted with its own retirement trigger written into the same decision. The
orchestrator's decision, `docs/tranches/D/audit/D.W1-contract-v2.md:204`:

> **Orchestrator decision**: restore a **narrowly-scoped, inline-rationaled** `fs.allow` widening on the dev and hero-lab modes only, named `siblingFsAllowTransient` in `vite.config.ts`. This is the consumer-side reciprocal of the publisher-side gap; it is the "befitting graceful" exception under invariant D3 — **explicit and time-boxed, not silent**.

and the trigger itself, the last bullet of that decision, `:210`:

> - Will be retired when glass-ui ships a contract-v2-compliant Tailwind-source distribution (filed in coord/Q.md §3).

carried forward verbatim into the tranche's close record, `docs/tranches/D/FINAL.md:201`:

> - **Contract-v2 §2.1 keystone gap on glass-ui's `./styles` subpath** (filed at D.W1 Step 1; `coordination/Q.md §3`). value.js's `vite.config.ts:siblingFsAllowTransient` is the consumer-side reciprocal; retires when glass-ui ships a contract-v2-compliant Tailwind-source distribution.

The adjudicated statement of the row, `registry/DISEASE-REGISTRY.md:243`:

> **What.** CH-9 — vite.config.ts's siblingFsAllowTransient, a carve-out with 'transient' in its identifier and a named retirement trigger that no close has re-evaluated in 14+ closes.

#### §2.2 — The probe, pasted with its output

HG-12's probe, ⟨`grep -n siblingFsAllowTransient vite.config.ts`⟩ (run twice, identical):

```
139:const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
287:                fs: { allow: siblingFsAllowTransient },
```

⟨`node -p "require('./node_modules/@mkbabb/glass-ui/package.json').version"`⟩ → `7.0.0`
⟨`grep -n '"@mkbabb/glass-ui"' package.json`⟩ → `83:        "@mkbabb/glass-ui": "^7.0.0",`

**2 sites, one file; installed 7.0.0 against a pin minted at glass-ui 1.x — six majors past the
D-era trigger.** All three reproduce the spec's born-RED at `W0.md:289` exactly.

#### §2.3 — The trigger, evaluated ONCE — and the finding that it fired four months ago

The ledger's verb is *"evaluate the trigger ONCE at X-W0"*. Evaluated, at the bytes, in both
directions:

**(a) The producer half — the trigger FIRED at glass-ui `9275584`, and a value.js audit said so at
the time.** `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md:41`, verbatim:

> | `9275584` | 2026-05-19 17:54 | `feat(exports): add ./styles.css → dist/glass-ui.css for SFC-scoped surface` | substrate | **Closes the contract-v2 §2.1 keystone gap.** value.js D FINAL §8 explicitly named this gap … **value.js can now retire its `siblingFsAllowTransient` transient carve-out.** |

**The trigger was observed firing on 2026-05-19, in value.js's own tracked canon, and the carve-out
was nevertheless carried through E, F, G, H and I..V.** That — not the carve-out — is the disease
DR-14 names, and it is the FM-19 shape ("the gate fired and no close observed it") a second time.

**(b) The consumer half — the rationale has already narrowed to one asset class, in the file's own
comment.** ⟨`awk 'NR>=130 && NR<=139' vite.config.ts`⟩ (read-only; **not** modified):

```
130:// `url("../fonts/fira-code/...woff2")` refs resolve RELATIVE to the symlinked
131:// `dist/styles/` — they walk OUT of the package into glass-ui's repo-root
132:// `fonts/` directory. That walk is why `server.fs.allow` must reach glass-ui's
133:// parent (`path.resolve(__dirname, "..")`). This is NOT a source-resolution
134:// band-aid (the SFC-scoped component-CSS half closed at E.W0); only font-asset
135:// resolution remains. Retiring it entirely requires glass-ui to inline the
136:// fonts as data URLs in the compiled surface, or the demo to drop the
137:// Tailwind-source `./styles` import (forfeiting the design-system tokens +
138:// Tailwind `@source` class-scanning) — a glass-ui-owned successor concern.
139:const siblingFsAllowTransient = [path.resolve(import.meta.dirname, "..")];
```

So the trigger as **written** (a contract-v2-compliant Tailwind-source distribution) fired at E; the
trigger as the file **now reasons about itself** (fonts inlined as data URLs in the compiled
surface) has not. A carve-out whose retirement condition silently migrated across fourteen closes
is exactly the thing that may not survive X.

#### §2.4 — The ruling, transcribed and cited — never re-opened

**COHESION `§0j.A:517`**, verbatim, dated 2026-09-17:

> | **DR-14** `siblingFsAllowTransient` | **DELETE**, routed to X-W1's config carve (two sites, one file: `vite.config.ts`) | a transient carve-out is a compat shim by another name (no-backwards-compat law); the name may not survive X either way |

#### §2.5 — Terminal disposition

**RETIRED — the trigger is evaluated ONCE, here, and is not re-armed. The row's verb is DELETE
(COHESION §0j.A), and the deleting act is X-W1's, not this unit's.**

**This unit performed no delete and wrote no byte of `vite.config.ts`.** `W0.md:101` lists
`vite.config.ts` under **Do NOT touch** for the whole of X-W0; a delete here would cure a row by
invalidating the wave that owns the row. The two live sites are pasted above precisely so the
receiving seat inherits a measurement and not a memory.

**Residual returned, measured, not settled** — see §3, **RS-1**: the ruling's *route* ("X-W1's config
carve") does not resolve to `vite.config.ts` at X-W1's authored bytes. This is recorded as a receipt
beside the ruling, never as a correction of it (E-3).

---

### TS-3 · CC-017 / DR-15 — the precepts-submodule pin drift

**Ledger row** ⟨`sed -n '74p' …/CARRY-CUT-LEDGER.md`⟩:

> | CC-017 | DR-15 (CH-10 precepts-submodule pin drift) | reg | divergence real, cited SHAs historical fiction | **RETIRE** — rebase or owner-accepted divergence at X-W0; the event-bound trigger is dead by six-close demonstration | DISEASE-REGISTRY:251 |

#### §3.1 — The original mandate, verbatim

The mandate is the **event-bound trigger**, minted at E and copied verbatim through F, G and H.
`docs/tranches/F/coordination/Q.md:145`:

> | keyframes.js precept-pin drift | Re-check at keyframes.js maintainer's next submodule-rebase signal (currently divergent `458c2d1`). |

and, at its sharpest, `docs/tranches/G/audit/G-AUDIT-2-deferred-ledger.md:145` (CH-10, the alias the
registry retires):

> | **CH-10** | keyframes.js precept-pin drift | **PEER-AUTHORSHIP-REQUIRED** | peer's submodule SHA encodes maintainer's intent about which precept tree governs | Re-check at keyframes.js maintainer's next submodule-rebase signal OR at G close (whichever first). If still divergent at G close, carry forward to H with the same (c) trigger. NOT on any runtime gate; documentation-only consistency. |

The finding that minted it, `docs/tranches/E/audit/E-AUDIT-4-cross-repo-state.md:232`:

> **Critical finding for value.js E-tranche**: keyframes.js's `docs/precepts` submodule points to a separate precepts repository (or a fork) that does NOT share commits with value.js / glass-ui / speedtest. **This is a precept-pin drift of the highest severity** — keyframes.js has been running on its own precepts canon since at least `458c2d1`.

The adjudicated statement of the row, `registry/DISEASE-REGISTRY.md:253` and its wave shape `:257`:

> **What.** CH-10 — the keyframes.js precept-submodule pin drift, a chronic that has outlived both SHAs every close from B to H cites.

> **Wave shape.** In W.W0: rebase the submodule, or record an owner ruling that the divergence is accepted with its rationale. The event-bound trigger is dead by demonstration; six closes is the proof. No seventh carry.

#### §3.2 — The probe, pasted with its output

HG-12's probe, ⟨`git submodule status docs/precepts`⟩ then ⟨`git -C ../keyframes.js submodule status docs/precepts`⟩ (run twice, identical):

```
 63240e677dfd1d5b95e00710a1a4d64664624784 docs/precepts (heads/main-26-g63240e6)
 8ccf9f4da0198e02382e673f253fe96c2ed03034 docs/precepts (heads/main)
```

Reproduces the spec's born-RED at `W0.md:290` exactly: `63240e67…` vs `8ccf9f4d…`, *"divergent, on
SHAs neither of the historically cited pair"*.

#### §3.3 — A second probe, because the gate's probe cannot tell a fork from a lag

Two differing SHAs are consistent with two incompatible facts — a **fork** (the E-era finding) and a
**lag** (one tree behind the other on one line). The row has been carried for six closes on the
first reading without anyone measuring which it is. Measured here, entirely read-only, inside
value.js's own `docs/precepts` clone (**no `fetch`, no `update`, no write; `origin/main` is whatever
this clone last had**):

| ⟨cmd⟩ | output | what it settles |
|---|---|---|
| `git -C docs/precepts cat-file -t 8ccf9f4da0198e02382e673f253fe96c2ed03034` | `commit` | keyframes.js's pin **is an object in this clone** — the two trees share an object store, so "a separate precepts repository" is **refuted at the bytes** |
| `git -C docs/precepts merge-base 63240e67 8ccf9f4d` | `63240e677dfd1d5b95e00710a1a4d64664624784` | the merge-base **is value.js's own pin** — the histories are linear, not divergent |
| `git -C docs/precepts rev-list --left-right --count 63240e67...8ccf9f4d` | `0	1` | value.js **0 ahead**, keyframes.js **1 ahead**. The whole "drift" is **one commit** |
| `git -C docs/precepts merge-base --is-ancestor 8ccf9f4d origin/main` | exit `0` | keyframes.js's pin is on `mkbabb/precepts`' own line |
| `git -C docs/precepts rev-list --count 63240e67..origin/main` | `16` | **value.js is the laggard** — 16 commits behind the last-fetched upstream |
| `git -C docs/precepts log -1 --format='%h %ad %s' --date=short 63240e67` | `63240e6 2026-05-27 infra: promote tls/blob-backend-dr/deploy + new domains precept (fourier D.W2)` | value.js's pin |
| `git -C docs/precepts log -1 --format='%h %ad %s' --date=short 8ccf9f4d` | `8ccf9f4 2026-06-04 spec(π-lane): edict — every-page paired before/after capture + scripted occlusion gate` | keyframes.js's pin: value.js's pin **plus one commit** |
| `git -C docs/precepts log -1 --format='%h %ad %s' --date=short origin/main` | `b0f6134 2026-07-17 precepts: truth-up against the glass-ui 7.0.0 surface` | upstream head as this clone last saw it |
| `git -C docs/precepts merge-base --is-ancestor 458c2d1 origin/main` | exit `0` | the historically cited `458c2d1` **is on this line too** |
| `git -C docs/precepts merge-base --is-ancestor 68d9b20 63240e67` | exit `0` | and so is `68d9b20` |

**The finding, stated once.** The E-era reading — *"a separate precepts repository (or a fork) that
does NOT share commits"*, graded *"drift of the highest severity"* — **does not hold at today's
bytes.** The two pins sit on one linear history of one repository, **one commit apart**, and the
peer is the one that is *ahead*. The registry was right that *"the '458c2d1 vs 68d9b20' framing every
close repeats is now historical fiction"*; it is right for a stronger reason than it knew — both of
those SHAs are ancestors on the same line, so the pair was never a fork either.

#### §3.4 — Terminal disposition

**RETIRED — THE EVENT-BOUND TRIGGER IS DEAD, AND THE CHRONIC IT NAMED DOES NOT EXIST.**

1. **The trigger is retired, not re-armed.** *"Re-check at keyframes.js maintainer's next
   submodule-rebase signal"* is a condition with no observer and no deadline; six closes copied it
   forward without once running the check. It is evaluated here, terminally, and **does not appear
   in a seventh ledger**. That is the row's death, and it is complete at this file.
2. **The severity is corrected by measurement, in the direction that matters.** There is no rival
   precept canon. There is a **one-commit lag** between two consumers of the same canon, and
   **value.js is 16 behind upstream while the peer is 1 ahead of value.js** — so any honest framing
   of "who has drifted" names this repository first. The six-close narrative had the polarity
   backwards.
3. **No rebase was performed, and the option is not this seat's to take.** `docs/precepts` is a
   gitlink in the value.js tree and appears nowhere in `W0.md`'s §File Bounds; `../keyframes.js` is a
   sibling tree, **READ-ONLY** by standing law, and the G-era audit already ruled the peer half
   un-writable by us — `G-PEER-KEYFRAMES-JS.md:188`: *"the fix is keyframes.js-internal … Per F3,
   value.js doesn't write keyframes.js."*
4. **What survives is a new, sized, non-chronic question — and it is returned, not presumed.** *Do
   we advance value.js's own pin the 16 commits to upstream?* That is a one-command act with a
   reviewable diff, it is **not** the carried chronic, and COHESION §0j rules nothing about it.
   Returned as **RS-2** in §3, per this wave's standing law: *anything owner-gated that §0j does not
   cover is an escalation returned, not a seat decision.*

---

### TS-4 · CC-018 / DR-16 — the HG6 taste certification

**Ledger row** ⟨`sed -n '75p' …/CARRY-CUT-LEDGER.md`⟩:

> | CC-018 | DR-16 (HG6 taste certification) | reg | verdict file byte-identical empty across three closes; 19/20 brackets silently dropped, now stale | **RETIRE** — tombstone at X-W0; if taste certification is still wanted, X-W10 derives a fresh SMALL bracket set with a dated owner sitting | DISEASE-REGISTRY:261 |

#### §4.1 — The original mandate, verbatim

The gate text the registry names, `docs/tranches/T/waves/T.W8.md:240–242` — T.W8's §Hard gate row 6:

> 6. **THE OWNER'S VERDICT IS THE GATE** — the wave closes on the owner's ruling over the
>    package (approve / rule per-axis inside the brackets / file further rows). A package
>    delivered but unruled leaves the wave OPEN, honestly (never a proxy sign-off).

restated by the package itself, `docs/tranches/T/audit/w8-certification/PACKAGE.md:10`:

> further rows. **A package delivered but unruled leaves the wave OPEN, honestly** — never a proxy

and by the binding prohibition beside it, `T.W8.md:246–247`:

> - **Critique is a PRE-FILTER, never a certification** — no agent, Fable or otherwise, certifies
>   taste (the terminal authority is the owner; lesson 12).

The adjudicated statement of the row, `registry/DISEASE-REGISTRY.md:263`:

> **What.** HG6 — the owner's terminal taste certification over the 20-bracket W8 package; the verdict file has been byte-identical and empty across three closes, and 19 of the 20 brackets were silently dropped.

#### §4.2 — The probe, pasted with its output

HG-12's probe, ⟨`sed -n 30p docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md`⟩ (run
twice, identical):

```
> _(empty — the owner's verdict lands here)_
```

**A second probe, because "byte-identical across three closes" is a claim about history that the
one-line probe cannot carry.** ⟨`git log --format='%h %ad %s' --date=short -- docs/tranches/T/audit/w8-certification/VERDICT-2026-07-12.md`⟩:

```
286619e8 2026-07-12 docs(T.W8 · package): the owner certification package ASSEMBLED — frames · brackets · owner-line index · boot screencast · honest-red ledger · Q14
```

**One commit. The file has never been edited since the hour it was assembled** — 2026-07-12 to
2026-09-17, sixty-seven days and three tranche closes, ⟨`shasum -a 256`⟩ →
`7119280ad5d6a8ead76e3518f13f012acc13f4b114475041eb9500f595d7a861`. Its own §Status line `:3` still
reads:

> **Status**: **AWAITING THE OWNER.** This is the stub the owner's ruling lands into, **verbatim**.

and its own closing line `:39`:

> - **Wave close**: only on the owner's word. Until then, **OPEN, honestly**.

The bracket half reproduces too: ⟨`grep -rn "B-02" docs/tranches/U/ | wc -l`⟩ → `0`,
⟨`… "B-10" …`⟩ → `0`, ⟨`… "B-20" …`⟩ → `0`. The 20-bracket table left no trace in the successor
tranche, exactly as the registry recorded.

#### §4.3 — The ruling, transcribed and cited — never re-opened

**COHESION `§0j.A:518`**, verbatim, dated 2026-09-17:

> | **DR-16** HG6 taste certification | **RETIRE** (option a) — tombstone at X-W0.f; **no** fresh bracket set at X-W10 | (b) manufactures a second unsized sitting — the FM-21 scheduling-failure shape HG-13 exists to prevent |

#### §4.4 — Terminal disposition

**RETIRED (option a). The tombstone is this entry. No fresh bracket set is derived at X-W10.**

1. **The gate was never met and is now unmeetable, and saying so is the honest act.** T.W8's own
   text called the state correctly at the time — *"a package delivered but unruled leaves the wave
   OPEN, honestly"* — and the wave was nevertheless verdicted `complete_with_misses`, merged and
   tagged. The tombstone does not reverse that close (E-3; the T record is history). It records that
   **the gate's condition never occurred**, so no later document may cite HG6 as satisfied.
2. **The brackets are stale by a measured event, not by opinion.** `DISEASE-REGISTRY:267`: *"W43
   rewrote the demo tree wholesale and W44 adopted glass 7, so most bracket poles no longer describe
   reachable states — resurrecting them costs more than re-deriving."* The zero-hit probe above is
   that staleness measured from the other side.
3. **Option (b) is expressly declined, by the owner, with a rationale.** §0j.A rules out the fresh
   X-W10 bracket set because *"(b) manufactures a second unsized sitting — the FM-21
   scheduling-failure shape HG-13 exists to prevent"*. **X-W10 is therefore NOT to open a bracket
   set on this row's account, and CC-018's "optional fresh brackets" entry at
   `CARRY-CUT-LEDGER.md:256` is closed by this ruling** — the condition it was optional upon has been
   answered NO.
4. **`VERDICT-2026-07-12.md` stays exactly as it is.** It is a dated, sealed, honestly-empty record
   (G05 append-only; E-3). Its emptiness is now evidence rather than an open obligation, and no seat
   fills it retroactively.

---

### TS-5 · CC-022 / DR-25 — PRM-expand (keyframes `springPlay`) at kf 6

**Ledger row** ⟨`sed -n '79p' …/CARRY-CUT-LEDGER.md`⟩:

> | CC-022 | DR-25 (PRM-expand, kf springPlay) | reg | retirement gate FIRED (kf ^6.0.0 pinned) and no close observed it | **RETIRE** — one re-probe at kf 6 in X-W0: fixed → tombstone with the probe pasted; not fixed → one dated §D letter. The row dies in X either way | DISEASE-REGISTRY:351 |

#### §5.1 — The original mandate, verbatim

Two bytes make the mandate: the **defect**, root-caused at S.W7, and the **retirement gate**, booked
at U as B1.

The defect and the cure that discharges it, `docs/tranches/S/audit/w7-furniture-records.md:24–29`
and `:42–48`:

> 1. **keyframes.js** `physics/spring/managed-play.ts` `springPlay()`: under PRM
>    (`respectReducedMotion: true` + active query) the gate's snap arm calls
>    `spring.snap()` → `_snapSettled()`, which `emit()`s **only to `subscribe()`
>    subscribers** — it never invokes the `onFrame` callback that `.play(onFrame)`
>    just bound. The non-PRM already-settled arm DOES call `onFrame` — the PRM arm
>    is asymmetric, and the function's own docstring promises "one emit, no loop".

> **The one-line producer cure** (keyframes.js, `springPlay` PRM arm):
> `() => { spring.snap(); onFrame?.(spring.value, spring.velocity); }` — the dock
> orchestrator's `onFrame` then receives value 1 → writes the scalar → its
> `tValue >= 1` arrival branch runs `settleAll()` → attrs drop → the TRUE expanded
> box seats in one frame (exactly the producer's own PRM contract: jump, no
> motion frames).

The retirement gate, `docs/tranches/U/FINAL.md:274` — book **B1**:

> | **B1** | U-F28 keyframes next-tag retire (ADOPT) | keyframes tags to `v5.2.0`, no tag past it; 0 direct value.js kf imports | **STILL-BOOKED (WATCH)** — gate: a kf tag > 5.2.0. |

and its ledger form, `docs/tranches/U/DISPOSITION-LEDGER.md:57`:

> | U-F28 | kf-prm-expand-fixed-unreleased | U.W-ADOPT | **retire** (on their next tag) | The one keyframes ask is FIXED at HEAD but unreleased; value.js has zero direct kf imports — a cross-repo watch row, no work. |

The adjudicated statement of the row, `registry/DISEASE-REGISTRY.md:353` and its wave shape `:357`:

> **What.** PRM-expand — the keyframes springPlay subscribers-only emit (the dock never expands under prefers-reduced-motion); its named retirement gate FIRED and nobody noticed.

> **Wave shape.** Re-probe once at kf 6 in W.W0. Fixed → tombstone with the probe pasted. Not fixed → one dated letter in §D. Either way the row dies in W; it does not become a fourth carry.

#### §5.2 — The gate probe, pasted with its output

HG-12's probe, ⟨`node -p "require('./node_modules/@mkbabb/keyframes.js/package.json').version"`⟩
(run twice, identical):

```
6.0.0
```

⟨`grep -n '"@mkbabb/keyframes.js"' package.json`⟩ → `84:        "@mkbabb/keyframes.js": "^6.0.0"`

**The gate — *"a kf tag > 5.2.0"* — is FIRED and has been since the 6.0.0 pin landed.** Reproduces
`W0.md:292` exactly.

#### §5.3 — The owed re-probe, run against the installed bytes

The ledger's act is not the version read; it is *"one re-probe at kf 6"* against the defect itself.
Run read-only over the installed package — the bytes value.js actually consumes — not over a sibling
tree.

**Subject** ⟨`shasum -a 256 node_modules/@mkbabb/keyframes.js/dist/sequence-BvpIpCGp.js`⟩:

```
d13cab1bd6e1879acba3cde570656f3da1463c19c87a8fdf9d2c57c4e0cb9c56  node_modules/@mkbabb/keyframes.js/dist/sequence-BvpIpCGp.js
```

The bundle preserves its source-region markers, so the defect's exact file is locatable in the
shipped artifact. ⟨`grep -n "managed-play.ts\|managed-stepper.ts" …/sequence-BvpIpCGp.js`⟩ →
`137://#region src/animation/physics/managed-stepper.ts` and
`229://#region src/animation/physics/spring/managed-play.ts`.

**`springPlay` — `//#region src/animation/physics/spring/managed-play.ts`, `:230–235`:**

```js
229://#region src/animation/physics/spring/managed-play.ts
230:function D(e) {
231:	x(e);
232:}
233:function O(e, t) {
234:	S(e, t);
235:}
```

`O` (the exported `springPlay`) delegates to `S` in the managed-stepper region.

**The PRM arm itself — `:141–147`:**

```js
141:function S(e, t) {
142:	e.disposed || (e._onFrame = t, y(e.respectReducedMotion, () => {
143:		e.snap(), e._emitManagedFrame();
144:	}, () => {
145:		e.settled ? e._emitManagedFrame() : x(e);
146:	}));
147:}
```

where `y` is the PRM gate ⟨`awk 'NR>=85 && NR<=87'`⟩:

```js
85:function y(e, t, n) {
86:	return !e && e !== 0 || !_() ? n() : e === !0 || e === 0 ? t() : n();
87:}
```

(`t` = the PRM arm, `n` = the normal arm, `_()` = the live `prefers-reduced-motion` match), and
`_emitManagedFrame` on the spring class is ⟨`awk 'NR>=371 && NR<=373'`⟩:

```js
371:	_emitManagedFrame() {
372:		this._onFrame?.(this.value, this.velocity);
373:	}
```

**Read against the cure S.W7 named, term for term:**

| S.W7's named cure (`w7-furniture-records.md:43`) | installed kf 6.0.0 |
|---|---|
| `spring.snap();` | `e.snap()` — `:143` |
| `onFrame?.(spring.value, spring.velocity);` | `e._emitManagedFrame()` → `this._onFrame?.(this.value, this.velocity)` — `:143` → `:372` |

**The cure is present.** The 2026-07-06 asymmetry is gone: the PRM arm and the normal arm both route
through `_emitManagedFrame()`, so the `onFrame` bound by `.play(onFrame)` is invoked under PRM in
exactly one frame — *"jump, no motion frames"*, the producer's own contract.

**And the original mechanism is still visible beside it, which is why this is a cure and not a
coincidence.** `emit()` on the same class, ⟨`awk 'NR>=447 && NR<=449'`⟩:

```js
447:	emit() {
448:		if (this.subscribers.size !== 0) for (let e of this.subscribers) e(this.currentValue, this.currentVelocity);
449:	}
```

`emit()` **is still subscribers-only** — S.W7's diagnosis was and remains correct. What changed is
that the managed-play PRM arm no longer *depends* on `emit()` to reach `onFrame`: it calls
`_emitManagedFrame()` explicitly. The producer fixed the arm, not the emitter, which is precisely
the one-line shape the letter asked for.

#### §5.4 — Terminal disposition

**RETIRED — FIXED AT kf 6.0.0. The "fixed → tombstone with the probe pasted" branch is the live
branch, and the probe is pasted above.**

1. **No §D letter is owed.** The ledger's alternative branch — *"not fixed → one dated §D letter"* —
   is not reached. Nothing is dispatched to the keyframes inbox on this row, and **no fourth carry is
   created**.
2. **The gate fired and is now observed.** DR-25's actual complaint was FM-19 — *"its named
   retirement gate FIRED and nobody noticed"* — across S, T, U and V. It is noticed here, on a dated
   run, against installed bytes, with the artifact's sha256 recorded so the reading is re-runnable.
3. **The value.js-side consequence is nil and was always nil**, which is why the row could rot
   unobserved: U-F28 recorded *"0 direct value.js kf imports"* and the defect's blast radius is the
   glass-ui dock's PRM expansion. The row dies with its truth recorded, not with a new obligation
   attached.

---

## §2 — Gate HG-12, the five-row half

HG-12 `:283` requires, per RETIRE row: *"original mandate quoted verbatim, probe pasted with its
output, terminal disposition named."* Read back from the settled bytes of this file.

| row | origin | mandate quoted verbatim, at its byte | probe pasted **with** output | terminal disposition named | reproduces at this clock? |
|---|---|---|---|---|---|
| **CC-015** | DR-02 | §1.1 — `D/D-PROMPTS.md:25` (owner's own bytes, spellings preserved) + `DISEASE-REGISTRY:123,127` | §1.4 — `grep -rn "glass-ui/blob" demo/` → **5 hits / 3 files**, + 4 named counter-probes | §1.5 — **RETIRED — satisfied at `e32111c7`, inverted in the record only; residuals are DR-03/CC-035** | **YES** (double-run identical) |
| **CC-016** | DR-14 | §2.1 — `D/audit/D.W1-contract-v2.md:204,210` + `D/FINAL.md:201` + `DISEASE-REGISTRY:243` | §2.2 — `grep -n siblingFsAllowTransient vite.config.ts` → **`139`, `287`**; installed **7.0.0**, pin **`^7.0.0`** | §2.5 — **RETIRED — trigger evaluated ONCE; verb DELETE (§0j.A:517), act routed, NO delete performed here** | **YES** (double-run identical) |
| **CC-017** | DR-15 | §3.1 — `F/coordination/Q.md:145` + `G-AUDIT-2:145` + `E-AUDIT-4:232` + `DISEASE-REGISTRY:253,257` | §3.2 — `git submodule status docs/precepts` ⧸ same in `../keyframes.js` → **`63240e67…`** vs **`8ccf9f4d…`**; + 10 topology probes | §3.4 — **RETIRED — the event-bound trigger is dead; the "fork" is measurably a one-commit lag with value.js the laggard** | **YES** (double-run identical) |
| **CC-018** | DR-16 | §4.1 — `T/waves/T.W8.md:240–242,246–247` + `PACKAGE.md:10` + `DISEASE-REGISTRY:263` | §4.2 — `sed -n 30p …/VERDICT-2026-07-12.md` → **`> _(empty — the owner's verdict lands here)_`**; + one-commit history + sha256 + 3 zero-hit bracket probes | §4.4 — **RETIRED (option a) per §0j.A:518; no fresh bracket set at X-W10** | **YES** (double-run identical) |
| **CC-022** | DR-25 | §5.1 — `S/audit/w7-furniture-records.md:24–29,42–48` + `U/FINAL.md:274` + `U/DISPOSITION-LEDGER.md:57` + `DISEASE-REGISTRY:353,357` | §5.2 — `node -p "…keyframes.js/package.json').version"` → **`6.0.0`**; §5.3 — the owed re-probe over the installed bytes, four code extracts + sha256 | §5.4 — **RETIRED — FIXED at kf 6.0.0; no §D letter owed** | **YES** (double-run identical) |

**SELF-COUNT, read back from this file's settled bytes**: tombstone entries `### TS-` → **5**;
rows in the table above → **5**; `#### §` mandate-quotation subsections (`§n.1`) → **5**;
terminal-disposition subsections → **5**; `SERVED MODEL: claude-opus-5[1m]` at line 1 → **1**;
pre-written CC-019/CC-020/CC-021/CC-023 tombstones → **0** (by design — §4).

**HG-12's falsifier** (`:298` — *"a tombstone whose pasted probe does not reproduce when re-run at
wave close"*) is **discharged by construction for this half**: every pasted output above is a
verbatim capture of a run at `ca5b7441`, each run twice, the two runs byte-identical. Four of the
five probes are pure reads of tracked or installed bytes that no X-W0 unit may write; the fifth
(CC-015's) reads `demo/`, which `W0.md:101` forbids to this entire wave. **No unit of X-W0 can move
any of them**, so a re-run at close is expected to reproduce unless a seat has breached §File Bounds
— which is a useful thing for this gate to be able to catch.

---

## §3 — Residuals returned, measured and not settled here

Both are recorded as **questions with their far-end bytes named**, in the idiom X-W0.a's R-2 and
X-W0.b's R-2 established this wave. Neither blocks this unit; neither is presumed into a verdict.

### RS-1 — the DR-14 route names a wave whose bounds do not contain the file

**Not a challenge to the ruling.** §0j.A's verdict (**DELETE**) is transcribed at §2.4 and is not
re-opened. What is returned is a **measured fact about its route**.

The ruling's rationale routes the act to *"X-W1's config carve"*. Measured at X-W1's authored bytes:

| ⟨cmd⟩ | output |
|---|---|
| `grep -c 'vite.config' docs/tranches/X/waves/W1.md` | **0** |
| `awk 'NR>=143 && NR<=170' docs/tranches/X/waves/W1.md` (§File Bounds + Do NOT touch) | `.github/workflows/ci.yml` · `deploy-pages.yml` · `e2e/**` · `scripts/ci/*.mjs` · `scripts/visual/*.mjs` · `playwright.config.ts` · `tsconfig.e2e.json` · `package.json` (scripts block only) · `docs/tranches/X/**` — **`vite.config.ts` absent** |
| `grep -n 'vite.config.ts' docs/tranches/X/waves/W5.md` | **`94:\| \`vite.config.ts\` \| modify-carve \|`** |

X-W1 does hold a config carve (CI workflows, `playwright.config.ts`, `tsconfig.e2e.json`, the
`package.json` scripts block) — but **not this file**. `vite.config.ts` sits in **X-W5**'s §File
Bounds as `modify-carve` (`X.W5 — One route, one scene`). The dossier the sitting ruled from states
the premise explicitly — `SITTING-DOSSIER-2026-09-17.md:139–140`: *"the act routes to **X-W1** (the
only wave holding a config carve)"* — and that parenthetical does not hold at the authored bytes.

**The word wanted, in one sentence**: *does DR-14's DELETE land at X-W1 under a dated E-3 addendum
widening its §File Bounds to `vite.config.ts`, or does it ride X-W5's existing `modify-carve` on that
same file?* Either is a one-line act for the seat that owns it; **choosing between them is a routing
decision, not a tombstone seat's.** Returned to X-W0.g's sitting packet as a docketed row, or to the
owner directly. **No wave file was edited and no route was re-written** (E-3: §0j.A's bytes are
immutable). The ruling stands either way — the name may not survive X.

### RS-2 — the precepts pin-bump is a new question, not the retired chronic

CC-017's chronic is retired at §3.4 and does not carry. What the measurement **created** is a
distinct, small, reviewable question the record has never asked, because for six closes it believed
it was looking at a fork:

> value.js's `docs/precepts` is **16 commits behind** the last-fetched `origin/main`
> (`63240e67` @ 2026-05-27 → `b0f6134` @ 2026-07-17, *"precepts: truth-up against the glass-ui 7.0.0
> surface"*). Do we advance it?

It is **not** the DR-15 carry (that was the peer's SHA and an event-bound trigger, both dead). It is
one `git -C docs/precepts checkout` + a gitlink commit, with a reviewable diff — and it touches a
path in **no** X wave's §File Bounds, including this one. **No act taken.** Returned to X-W0.g's
sitting packet as a docketed row, or to the owner directly. Note for whoever takes it: the upstream
head's own subject names the glass-ui 7.0.0 surface, which is the version this repo installs today.

---

## §4 — RESERVED · the four owner-ruled tombstones (X-W0.g)

**Deliberately empty. Do not fill from this seat.**

`W0.md:181` assigns them: *"CC-019/020/021/023 tombstones are written by X-W0.g after their
rulings."* Their rulings are made — COHESION §0j.A rules DR-19, DR-20, DR-24 and DR-31 — but
**transcribing, dating and citing them is X-W0.g's act, not this unit's**, and pre-writing them here
would let a tombstone precede the sitting that is supposed to author it (the FM-21 shape).

X-W0.g appends them **beside** §1–§3 as a **dated addendum** under a `## §5` (or later) heading,
in the same three-part idiom §0 sets out. Nothing above is rewritten to make room (E-3). The four
awaiting entries, by id, so the addendum's roster is checkable by set-difference:

| row | origin | subject | ruled at |
|---|---|---|---|
| **CC-019** | DR-19 | the vnext `proof:` sites + the structural ban in canon | COHESION §0j.A:513 |
| **CC-020** | DR-20 | the PARK set (`Color.try`) | COHESION §0j.A:514 |
| **CC-021** | DR-24 | `scripts/dev/dev.sh` commit-or-restore | COHESION §0j.A:515 |
| **CC-023** | DR-31 | the NCSU alias 301 | COHESION §0j.A:516 |

`5 + 4 = 9` — HG-12's *"nine tombstones, nine pasted probes"* is met when that addendum lands. This
file carries **five** and claims exactly five.
