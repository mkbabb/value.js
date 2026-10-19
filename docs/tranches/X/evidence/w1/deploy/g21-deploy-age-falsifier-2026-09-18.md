SERVED MODEL: claude-opus-5[1m]

# G-21 — the standing deploy-age check, and its falsifier turned

**G-21's condition** (`W1.md:321`): *"A standing check reds when the last successful `deploy-pages`
predates the newest close."* **Its falsifier**: *"Back-date the comparison input by a day → the check
reds. A check that only reports and never fails does not satisfy G-21."*

The check is the `deploy-age` job, wired by X.W1.a inside `.github/workflows/ci.yml:296-365` — its
own job, on every push, with no `continue-on-error`. It takes the newest successful `deploy-pages`
run on master and the newest close the repository itself records (a `git log` over `docs/tranches`
whose subject announces a close — so the input cannot go stale without the close going missing), and
exits non-zero when the deploy is the older of the two.

## The instrument: the job's own bytes, executed — not a re-implementation

The step body was **extracted verbatim from `ci.yml`** by anchor, never retyped:

⟨cmd⟩ `node --input-type=module -e '<extract by the "the newest deploy vs the newest close" anchor>'`
→ `extracted 57 lines from ci.yml (step anchor line 303)`
⟨cmd⟩ `shasum -a 256 …/deploy-age-step.sh` →
`e57e3f5f32f44acfe2805b69ac2772dc9328e80ad7c02707f033c26e54fbefd2`

The two comparison inputs are injectable by design — `VJS_DEPLOY_AGE_DEPLOY_OVERRIDE` and
`VJS_DEPLOY_AGE_CLOSE_OVERRIDE`, fed from repo `vars` — which is precisely the seam G-21's falsifier
requires. Three arms were run against that one body.

## ARM 1 — no overrides: the live condition, exactly as CI reads it

```
newest successful deploy : 2026-07-07T02:19:20Z  [gh run list --workflow deploy-pages.yml --status success]
newest recorded close    : 2026-09-18T14:36:11-04:00  [git log -- docs/tranches (subject names a close)]
FAIL — production is older than the newest close by 73 day(s).
A close that has not shipped is a close that reported green on its own branch. That is DR-11.
```
→ **exit 1**

## ARM 2 — G-21's falsifier as authored: the deploy back-dated ONE DAY behind the close

```
newest successful deploy : 2026-09-17T00:00:00Z  [override]
newest recorded close    : 2026-09-18T00:00:00Z  [override]
FAIL — production is older than the newest close by 1 day(s).
A close that has not shipped is a close that reported green on its own branch. That is DR-11.
```
→ **exit 1.** A one-day back-date reds the check. The falsifier turns.

## ARM 3 — the control the falsifier does not ask for, run anyway

A check that fails on every input is not a check. Inverting the same two values:

```
newest successful deploy : 2026-09-18T00:00:00Z  [override]
newest recorded close    : 2026-09-17T00:00:00Z  [override]
OK — the deploy of record is newer than the newest close.
```
→ **exit 0.** The check DISCRIMINATES; it is not a constant-red.

## The CI witness, not just the local one

Master run **`35381701436`** (`04d2d808`, event `push`): job **`deploy-age` concluded `failure`**,
agreeing with ARM 1 at the same clock. The check is armed in the real workflow, not only under a
local shell.

## Verdict

**G-21 — GREEN as a gate: the standing check exists, runs on every push, reds for its stated reason
(ARM 1, ARM 2) and greens when the condition is met (ARM 3).**

**Its CONDITION is RED, and that is the check working**: production (2026-07-07) is 73 days older
than the newest close. That is exactly the 27-day window B15 recorded going unobserved, now
instrumented. The condition clears when a `deploy-pages` push-arm run succeeds — which this unit
could not obtain (see `g17-g19-landing-2026-09-18.md`). **The red is not softened, overridden, or
routed around; the override vars exist for the falsifier and are set in no workflow default.**
