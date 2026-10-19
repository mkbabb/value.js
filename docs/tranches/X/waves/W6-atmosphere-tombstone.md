SERVED MODEL: claude-opus-5[1m]

# W6 — The DR-01 supersession tombstone (aurora derive-from-color)

**Row**: CC-065 · DR-01 · *mandate 13 / Ae-11 / A-02 / Dc-1..3 / CH-2 / D-1*
**Authority**: `docs/tranches/X/waves/W6.md:298` (*"**FIRST ACT is the supersession tombstone**"*) ·
`:362` (§8 artefact row) · `CARRY-CUT-LEDGER.md:167` · `DISEASE-REGISTRY.md:111-117`
**Written at**: X-W6 **Repair 1**, wall clock **2026-09-19**, branch `tranche-u`.
**Why here and not at `.i`'s dispatch**: Check 1's CRITICAL names this act as the one limb of the
defect that *"can go first and alone: its tombstone is a docs-only first act needing no live cell and
no product byte, which retires DR-01's eighteenth carry immediately."* It is written now; the rest of
`.i` (i1/i2/i3) remains undispatched and is returned as an escalation, not smoothed.

---

## Verdict

**The A-vintage aurora derive-from-color mandate is RETIRED AS LANDED at N.W5 `e32111c7`
(2026-06-11).** It is not carried, not re-booked, not re-chartered, and it does not appear in any
successor wave. The only claim that survived its landing — *response visibility* — is a **different
claim**, and it is re-minted below under a new id with **carry 0**.

This is the row's **eighteenth close**. It is the first one that ends the chain, because it is the
first that quotes the predicate it is closing, cites the commit that satisfied it, and refuses to
re-verify an upstream block (the A–H failure mode), re-run a wave with zero commits (K/M), reframe
the row as already-fine (S), mutate the predicate into something an agent's eye can judge
(V-prime), or invert derive→keep silently (vnext). *(Failure-mode enumeration: `DISEASE-REGISTRY.md:115`.)*

---

## 1. The original predicate, quoted verbatim

Origin: **A.W6**, executed at **B.W0 Lane B, 2026-05-19**, commit **`065c6fe`**
(⟨cmd⟩ `git log --format='%H %ad %s' --date=short -1 065c6fe` →
`065c6fe6f0aa455080b5a3d8664ad5a0f993ac41 2026-05-19 docs(tranche-a/w6): formal re-scope — glass-ui APIs unshipped; routed to named successor`).

⟨`docs/tranches/A/audit/W6-deferred.md:22`⟩, verbatim, the table row that IS the mandate:

> | Aurora `deriveAuroraPalette(baseColor, opts)` | NOT SHIPPED | `grep -rln 'deriveAuroraPalette' glass-ui/src` → 0 |

⟨`:49-51`⟩, verbatim, the consequence the mandate was written to remove:

> - **`AuroraPane.vue` keeps its honest "under rework" state** and the atmosphere
>   keeps W0's static `AuroraConfig` — no `deriveAuroraPalette` to make the
>   atmosphere track the picker colour. The W0 "pane under rework" deferral persists.

⟨`:72`⟩, verbatim, the routing that became the thirteen-name carry:

> | The demo-side blob/aurora abstraction (delete `useMetaballRenderer.ts`'s lifecycle half; route through the glass-ui hook; picker-derived atmosphere) | **A value.js demo-abstraction tranche, opened once glass-ui ships.** … |

**The predicate, stated as a falsifiable sentence**: *the atmosphere derives its palette from the
picker's colour rather than from a static `AuroraConfig`.*

---

## 2. The commit that satisfied it

⟨cmd⟩ `git log --format='%H %ad %s' --date=short -1 e32111c7` →

> `e32111c736b3242a9de8cb1ab8633f913439ff34 2026-06-11 feat(demo): N.W5.A/B/C/E — blob fork (1270 LoC) → glass-ui goo-blob with live-palette paletteStops; **deriveAurora wired picker→atmosphere + AuroraPane rebuilt**; watercolor fork + global #watercolor-filter extirpated; 5 phantom classes real (inv-N-4, inv-N-7)`

**Measured at HEAD by this seat, not inherited** — ⟨cmd⟩ `grep -rn deriveAurora demo/ | wc -l` → **8**,
including `demo/color-picker/composables/boot/useAtmosphere.ts:142`
(`deriveAurora(atmosphereColor.value)`) and `:243` (`return deriveAurora(seed, { scheme: "dark" })`).
The mechanism is live, on the boot path, consuming the picker's colour. `AuroraPane.vue`'s
*"under rework"* state — the exact consequence `A.W6:49-51` names — is gone.

**S's independent confirmation**, cited as `DISEASE-REGISTRY.md:117` requires,
⟨`docs/tranches/S/S.md:227`⟩ verbatim:

> | aurora-derive-audit | 2×P1 | W6-2/L2 · W6-3/L2 (non-findings recorded: wiring INTACT — do not rebuild) |

S audited the wiring adversarially in a dedicated lane and returned **non-findings**. That reading is
cited here as corroboration of the *mechanism*, and **not** as a close: S's own error was to let
"already-fine" stand in for a tombstone, which is why the row rode on for five more tranches. This
document supplies the tombstone S did not write.

---

## 3. RF-26's misdating, corrected

⟨`docs/tranches/V/audit/REFORMATION-2026-07-16.md:85`⟩ registers the rider as:

> RF-26 | **THE DISEASE REGISTER + EXECUTION-GATE LAW** — … D-1 aurora-derive (**Tranche D**→K→N→T→U→V) …

**That origin is wrong.** The chain begins at **A.W6 `065c6fe` (2026-05-19)**, three closes earlier —
**A → B → D** — as `DISEASE-REGISTRY.md:115` reconstructs it (*"A.W6 065c6fe (2026-05-19)
'deriveAuroraPalette | NOT SHIPPED' → B 'opened once glass-ui ships' → D Dc-1/2/3 'ROUTED —
precept-§10 blocked' → …"*) and as two independent seats confirm:
⟨`docs/tranches/V/megatranche/excavation/TRUTH-TABLE.md:162`⟩ — *"ROOT-FINDINGS RF-26 misdates the
aurora origin as 'Tranche D' — the chain starts at **A.W6 `065c6fe` (2026-05-19)**; DR-01(3) already
books this correction; the A–M seat confirms it independently"* — and the 22-tranche history audit,
which records that **G's and H's own ledgers cite `A research/Ae Ae-11` correctly** while V's register
does not.

**Corrected chain of record**: **A.W6 `065c6fe` → B → D (Dc-1/2/3) → E → F → G (CH-2/CH-11) → H →
K.W4 → N.W5 `e32111c7` → S → T → U → V-prime W54 → vnext D17 → X-W6 (this tombstone).**
RF-26 under-counted its own oldest row **by three closes**.

**E-3**: `REFORMATION-2026-07-16.md` is a dated authority and is **not edited**. This section is the
dated addendum-beside that corrects it; ⟨cmd⟩
`git diff --stat -- docs/tranches/V/audit/REFORMATION-2026-07-16.md` prints nothing at this seat.

---

## 4. What is retired, and what is not

| claim | disposition |
|---|---|
| *The atmosphere derives its palette from the picker's colour* (the A-vintage mandate: mandate 13 / Ae-11 / A-02 / Dc-1..3 / CH-2 / D-1) | **RETIRED AS LANDED** at N.W5 `e32111c7`. Carry ends at **18**. It may not be re-chartered, re-amended or re-booked; RF-26's own execution-gate law forbids exactly that, and the only lawful successor state was a landing, which it has had since 2026-06-11. |
| *The derived response is **visible** — the rendered atmosphere's named atoms actually move when the seed moves* | **NOT retired. Re-minted as `X:ATMO-1`, carry 0** — a new id, a new predicate, no inherited ride. |

**`X:ATMO-1` — the re-mint, in full.**

- **Claim**: for each of N seeds, the rendered atmosphere's **named atoms move by ≥ a stated
  ΔE2000**.
- **Oracle**: measured from **committed frames**, never from an agent's description. The falsifier
  `W6.md:308` states is binding: *"i1 fails if the atoms do not move, **and equally if it can be
  passed by an agent's description rather than a frame diff**."*
- **Carry**: **0**. It inherits no close count from DR-01, because it is not DR-01's predicate.
- **State at this writing**: **RED by absence, honestly.** ⟨cmd⟩
  `ls e2e/smoke/oracles/o25-atmosphere-response.spec.ts` → No such file or directory; no committed
  frames exist under `docs/tranches/X/waves/W6-evidence/atmosphere/`. Gate **i1** is therefore
  **owed by `.i`**, which is undispatched. This tombstone discharges `.i`'s *first act* and
  `W6.md`'s §8 tombstone artefact row; it discharges **no gate**, and nothing here may be read as
  i1/i2/i3 relief.

---

## 5. The §11 Archaeology guardrail, answered on its own terms

`W6.md:459` states the species this document exists to end:

> **DR-01** carried **17 closes under 13 names** while its mandate had been satisfied since N.W5
> `e32111c7`. Every prior close failed by re-verifying an upstream block, running a wave with zero
> commits, reframing the row as already-fine, or mutating the predicate to something an executing
> agent could judge with its own eye. **New guardrail**: the tombstone is the unit's **first act**,
> and the surviving claim gets a new id, carry 0, and an oracle that reads committed frames — an
> agent's description cannot pass i1.

Checked against this document, clause by clause:

| the guardrail's clause | this tombstone |
|---|---|
| does not re-verify an upstream block | the producer is not consulted; the predicate is checked at **our** bytes (8 `deriveAurora` sites, measured) |
| is not a wave with zero commits | it lands as a commit with its own pathspec, named in §Repair 1 |
| does not reframe the row as already-fine | it **names the landing commit** and quotes the predicate that commit satisfied |
| does not mutate the predicate | the predicate is quoted **verbatim** from `A.W6` and closed as written; the *different* surviving claim is given a **different id** |
| surviving claim: new id, carry 0, committed-frame oracle | `X:ATMO-1`, carry 0, oracle specified above and **declared RED at this writing** |

**Carry closed at 18. The eighteenth is the last.**
