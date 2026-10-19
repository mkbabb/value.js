SERVED MODEL: claude-opus-5[1m]

# FINAL-KF — X·KF, the sub-tranche close ledger

**Wave**: X.KF.W10 (Fold Discharge and Close) · unit `.f` · **owner SS-2** (`COHESION.md` §0t).
**Sitting of record**: 2026-09-17 (the owner's begin-word, COHESION §0j). **Written**: 2026-09-19.
**Verdict**: **CLOSED — `complete_with_misses`.** Six of seven gates GREEN; **G-7 LAND-stamped but
RED-HONEST** on two CI-dependent clauses, whose exact precondition is named below and is out of every
unit's bounds.

**What this file is, and what it refuses to be (L-6).** It is **commits and pasted commands**. It cites
**no document this close authored** — not a spec, not an addendum, not an execution record — because a
close that proves itself by pointing at its own prose has proved nothing. Every artifact appears **as a
commit**; every letter appears **as a `git cat-file -e` that resolves**; every figure is a command's
output. Two repositories are involved and are named at every line: **V** = `/Users/mkbabb/Programming/value.js`,
**K** = `/Users/mkbabb/Programming/keyframes.js`.

---

## 1 · THE SEVEN COMMITS OF THE CLOSE

```
⟨K⟩ git log -1 --format="%h %ad %s" --date=short 025e894c
    025e894c 2026-09-18 docs(X·KF W10): FOLD-FORWARD §B 15-row discharge + 4-record carry-forward block
⟨V⟩ git log -1 --format="%h %ad %s" --date=short 15da439f
    15da439f 2026-09-18 docs(X·KF W10): NO-WAVE-OWNER set-difference, ∅ both directions
⟨K⟩ git log -1 --format="%h %ad %s" --date=short 27ec9c37
    27ec9c37 2026-09-18 docs(X·KF W10): owner block + never-cite register (7 entries)
⟨K⟩ git log -1 --format="%h %ad %s" --date=short b50a23de
    b50a23de 2026-09-19 docs(X·KF W10): four doc-truth addenda (E-3, originals byte-unchanged)
⟨K⟩ git log -1 --format="%h %ad %s" --date=short 0a329c57
    0a329c57 2026-09-19 chore(X·KF W10): v/w9-staging LANDED @ b920b190 — 7 of 8 units land, 2 deletes
                        vetoed by the re-derived census
⟨K⟩ git log -1 --format="%h %ad %s" --date=short dd28da55
    dd28da55 2026-09-19 docs(X·KF W10 close): both keyframes coordination ledgers terminal
                        (G-6, the kf half of commit 6)
⟨V⟩ git log -1 --format="%h %ad %s" --date=short -- docs/tranches/X/keyframes/close/FINAL-KF.md
    <the value half of commit 6 — this file + the terminal INBOX + the ten row stamps, in ONE commit.
     A file cannot print the hash of the commit that creates it, so the command that resolves it is
     printed instead; it is the same act as K's dd28da55.>
```

**Commit 6 is ONE meaning carried by TWO commits, and the split is declared rather than hidden**: its
writable set spans both repositories, and a commit cannot cross a repository boundary. `dd28da55` (K) and
this file's commit (V) are the same act.

**Two commits that precede the units and are not theirs**, named so the close's own preconditions are
traceable: `f7dae874` (V, 2026-09-18) — *"docs(X): §0t — KF.W10 ownership CURED by assignment to SS-2"*,
the root session's act that turned OP-6 green; and `f208ff31` (V, 2026-09-18) — *"docs(X·KF): KF.W11 ·
KF.W12 · KF.W13 AUTHORED"*, which moved a premise this close consumed and did **not** confer a verb on
those three.

---

## 2 · THE SEVEN GATES, EACH READ BY ITS OWN COMMAND

```
G-1  FOLD-FORWARD §B 15-row discharge
     ⟨K⟩ git show --numstat 025e894c -- docs/tranches/V/FOLD-FORWARD.md
         (one path, append-only: 0 deletions)
     GREEN.

G-2  NO-WAVE-OWNER ∅ both directions
     ⟨V⟩ git show --stat 15da439f   →  1 file changed, 260 insertions(+)
     ⟨V⟩ ls docs/tranches/V/megatranche/registry/adjudicated/kf-*.md | wc -l              → 58
     GREEN.

G-3 / G-4  owner block + never-cite register (7 entries)
     ⟨K⟩ git show --stat 27ec9c37   →  1 file changed, 226 insertions(+)
     GREEN (OD-V3 / OD-V5 closed `complete_with_misses` on their exact preconditions — §4 below).

G-5  four doc-truth addenda, originals byte-unchanged
     ⟨K⟩ git show --stat b50a23de   →  4 files changed, 363 insertions(+), 0 deletions(-)
     GREEN — zero deletions IS the E-3 proof.

G-6  both coordination ledgers terminal                            ← this unit
     ⟨V⟩ grep -cE '^\| [IO]-[0-9]+ \|' docs/tranches/V/coordination/INBOX.md        → 74   (×2)
     ⟨V⟩ per-row Status-cell classification, cell taken by position                 → 0 UNREAD (×2)
     ⟨K⟩ git diff --numstat dd28da55^..dd28da55
         53   0   docs/tranches/V/coordination/INBOUND-LEDGER.md
         126  0   docs/tranches/V/DISPOSITIONS.md
     ⟨K⟩ grep -cE '^\| IN-' docs/tranches/V/coordination/INBOUND-LEDGER.md          → 9    (before ≡ after)
     ⟨K⟩ grep -cE '^\| [^-|]' docs/tranches/V/DISPOSITIONS.md                       → 58
     ⟨K⟩ grep -cE '^\| Row \|' docs/tranches/V/DISPOSITIONS.md                      → 6  (58 − 6 = 52)
     GREEN.

G-7  v/w9-staging land-or-kill
     ⟨K⟩ git push origin master                → 69095552..0a329c57
     ⟨K⟩ git merge-base --is-ancestor b920b190 origin/master
         → origin/master CONTAINS b920b190 — LANDED
     ⟨K⟩ gh run view 35421021299 --log-failed
         → "npm ci can only install packages when your package.json and package-lock.json are in sync …
            Missing: @vue/test-utils@2.5.1 from lock file"
     ⟨K⟩ git log --oneline -1 origin/master -- package.json        → 3a01e362
     ⟨K⟩ git log --oneline -1 origin/master -- package-lock.json   → fb509edd   (earlier)
     LAND STAMPED · RED-HONEST on two clauses (§4).
```

---

## 3 · THE FRONTIER AFTER THE CLOSE

```
⟨K⟩ git rev-list --left-right --count HEAD...origin/master   → 0    0
⟨K⟩ git log -1 --format=%H origin/master                     → dd28da555c33611ef23f9c290c176e66b4216b5c
⟨K⟩ git push origin master                                   → 0a329c57..dd28da55
⟨K⟩ git status --porcelain
    ?? docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-24-parser-totality-exposure.md
    ?? docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-27-library-band-r1-widened-k1-k4.md
    (the two untracked value-authored letters — the §B-12 reset's survivors; left in place by every unit)
```

**Every letter this close relies on resolves (L-6):**

```
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/coordination/VALUEJS-INBOUND-2026-09-17-o8-o11-amendment-addendum.md   → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-17-wl-verdicts.md                 → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/coordination/VALUEJS-INBOUND-2026-07-17-formation-exchange.md          → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/FOLD-FORWARD.md                                                        → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/OWNER-DECISIONS.md                                                     → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/coordination/INBOUND-LEDGER.md                                         → PRESENT
⟨K⟩ git cat-file -e origin/master:docs/tranches/V/DISPOSITIONS.md                                                        → PRESENT
⟨V⟩ git cat-file -e HEAD:docs/tranches/V/coordination/value-inbox-2026-09-17-o8-o11-amendment-addendum.md                 → PRESENT
⟨V⟩ git cat-file -e HEAD:docs/tranches/V/coordination/value-inbox-2026-07-24-parser-totality-exposure.md                  → PRESENT
⟨V⟩ git cat-file -e HEAD:docs/tranches/V/coordination/value-inbox-2026-07-27-library-band-r1-widened-k1-k4.md             → PRESENT
⟨V⟩ git cat-file -e HEAD:docs/tranches/V/coordination/keyframes-inbox-2026-09-18-value-4.1-cut-notice.md                  → PRESENT
⟨V⟩ git cat-file -e HEAD:docs/tranches/V/coordination/keyframes-inbox-2026-07-17-glass7-consumed-wl-marked.md             → PRESENT
```

---

## 4 · THE MISSES, NAMED WITH THEIR EXACT PRECONDITIONS

A `complete_with_misses` close that does not print its preconditions is a close by assertion. These are
the three, each with the command that measures it:

1. **G-7's two CI-dependent clauses — MR4's red-once witness at landing, and the MR2 runner-parity
   observation.** Exact precondition: `npm ci` must resolve at K `origin/master`. It does not —
   `git log --oneline -1 origin/master -- package.json` → `3a01e362` (the manifest add) is **newer** than
   `git log --oneline -1 origin/master -- package-lock.json` → `fb509edd`, so the lock never took the add.
   The CI colour and failure step are **identical at the pre-landing SHA** (control run `35413127952` vs
   landing run `35421021299`): **the landing neither caused nor worsened it.** `package-lock.json` is in
   no unit's writable set; regenerating it is the manifest owner's act. **Named and routed, never patched**
   — no `|| true`, no `continue-on-error`, no allowlist.
2. **OD-V3 — the transport-home ruling.** Exact precondition, quoted from the capture receipt's own row:
   *"**THE OD-V3 CAPTURE PACKET — INCOMPLETE · 0 of 16 required cells**"* (4 scenes × 2 transport homes ×
   2 viewports). **Nothing is proxied and nothing is defaulted**; the `complete_with_misses` shape was
   authorized in advance at `COHESION.md` §0j.C.
3. **OD-V5 — the at-rest reopen question.** Exact precondition: glass's dock mark, still outstanding.
   The vehicle is the successor SS-6 batch; **glass-ui is READ-ONLY always**, so the row waits rather than
   being cured demo-side.

**One further honest RED, carried not closed**: `CH-05`'s cadence relabel at K —
`grep -c 'nightly' .github/workflows/ci.yml` → **4** against a `dow=1` cron. Folded forward with its count
printed, because a row closed on its wave's name while the bytes still say otherwise is the defect this
sub-tranche convicted five times.

---

## 5 · THE VERB STAMPS THIS CLOSE SET (R-A), AND THE THREE IT REFUSED

```
⟨V⟩ git diff --numstat -- docs/tranches/X/keyframes/waves/
    1  1  KF-W0.md      1  1  KF-W1.md      1  1  KF-W10.md     1  1  KF-W2.md
    1  1  KF-W3.md      1  1  KF-W4.md      1  1  KF-W5.md      1  1  KF-W7.md
    1  1  KF-W8.md      1  1  KF-W9.md
    → 10 files changed, 10 insertions(+), 10 deletions(-)   — ONE row edit each, no prose reflowed
```

**Nine advanced to VERIFIED** (W0 · W1 · W2 · W4 · W5 · W7 · W8 · W9 · W10), each carrying the close's
basis by commit and its own ledger status — including, printed rather than smoothed, the honest-RED gate
ids of the five waves that closed with them and KF.W9's `PARTIAL — 6 of 13`.

**Two of the eleven take no advance, and the reasons are measurements, not opinions:**

```
⟨V⟩ KF.W3 — execution/LEDGER.md status cell → "GATE-KEYED … never scheduled; opens or it does not"
    R-A advances FROM IMPLEMENTED. This wave never opened, so its row records the gate-key instead.
⟨V⟩ grep -cE '^\| (SPECIFIED|IMPLEMENTED|VERIFIED) ' docs/tranches/X/keyframes/waves/KF-W6.md   → 0
    KF.W6 carries NO four-verb table at its bytes. Its stamp is recorded HERE rather than fabricated
    into a sibling spec: KF.W6 is VERIFIED at this close on the same basis as its nine siblings
    (ledger: CLOSED 2026-09-17, honest-RED G-W6-2 · G-W6-10 · G-W6-11 · G-W6-12, CHECK 1
    CONFORMANT-HONEST-RED). Inserting a table would exceed "a row edit … nothing more".
```

**The three successor formations take NO verb from this close** — not IMPLEMENTED, not VERIFIED, not
ACCEPTED. Their authoring commit `f208ff31` changes nothing about that: they were never required to be
IMPLEMENTED and never gated this close.

**ACCEPTED is not conferred by anything in this file.** Two challenging gestalt passes — quartets of
Opus 5 agents assuming the close is wrong, at all three altitudes — and a singular fresh-Fable apotheosis
come first.

---

## 6 · WHAT A READER SHOULD NOT TAKE FROM THIS CLOSE

- **`LANDED in a wave` is an ownership word, not a shipping word.** The NO-WAVE-OWNER condition is cured;
  forty of the fifty-seven rows land at successor waves that are **authored and unexecuted**. The cures are
  not done, and this close never says they are.
- **A VERIFIED stamp is a statement about G-1, G-2 and G-7 at the sub-tranche close** — never a re-verdict
  on a wave's own gates. Five waves closed honest-RED and their RED ids are printed inside their own stamps.
- **Terminal mail is not discharged work.** Three inbound rows advanced from `UNREAD` to a terminal mail
  verb because the letters were read in full and the reading is on the record; the work they route to
  (`X-W0.j` / `X-EXT-1`) is untouched and still owed.
