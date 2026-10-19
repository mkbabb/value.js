SERVED MODEL: claude-fable-5-1

# ADDENDUM 2026-09-22 (dated, beside — E-3) — gate **A2**'s BLOB ARM, STRUCK and RE-AUTHORED (L-18 / ESC-W5-1)

**What stands**: `W5.md` §6 A2's marks arm (`deeplinkGenerate.marks ⊇ {b3,b4}`) is unchanged and GREEN of record
(`green/A2-app-shell-truth-2026-09-19.json`, 15/15). **What is struck**: the blob arm as authored — *"blob present
across `/#/generate,/#/browse,/#/gradient,/#/extract,/#/atmosphere`"* — read through the probe's `blob:
!!document.querySelector(".hero-blob-anchor")` (`app-shell-truth-probe.mjs:11`). `.hero-blob-anchor` is rendered by
`demo/picker/ColorPicker.vue:104` alone, and `viewSchema.ts:170-214` places no `color-picker` pane on any of those
five scenes; the arm could never be green and never red for its intended reason (ESC-W5-1, upheld at three closes:
"unfalsifiable as authored"). Under `W5.md` §12 (L-18) such a gate *"is struck and re-authored"* — by the
triumvirate, which this seat sits (COHESION §0aq).

**What the arm was FOR** (the RED-of-record, 2026-07-27): a deep-linked boot terminated the overture at b2 for
the session, and the Picker's ornament — the hero blob — was absent afterwards. The intent is "a deep-linked
session still gets its blob", not "every scene has a blob".

## The re-authored blob arm — three limbs, each falsifiable, one instrument (`triumvirate/a2-blob-arm.mjs`)

| limb | assertion | falsifier (how it fails for its intended reason) |
|---|---|---|
| **I — schema truth** | On every one of the fifteen `VIEW_MAP` routes, COLD-loaded in a fresh context: `blobPresent === pickerPanePresent` (the region labelled "Picker" is present ⇔ `.hero-blob-anchor` is present), and when present the anchor sits inside `.pane-wrapper--stage`. | RED if the ornament is missing where the picker mounts (the original defect class) OR present where no picker exists (a cross-scene leak / a stale ornament surviving a swap). Both directions bite. |
| **II — deep link → home** | From a cold deep link on each of the five picker-less scenes the struck arm named (generate · browse · gradient · extract · atmosphere), after the overture reaches b3 AND b4, a hash hop to `/#/` mounts the anchor inside the stage with a `<canvas>` of non-zero CSS box within an 8 s bounded window. | RED if a deep-linked boot leaves the session in a state where the picker's later mount has no blob (the b2-terminal wedge), or if the anchor mounts but its canvas has no box, or if the window elapses. |
| **III — the canvas is sized** | On every picker-bearing route the anchor's canvas has non-zero `clientWidth × clientHeight`. | RED on a present-but-boxless canvas: presence is not the assertion, a rendered ornament is. |

Instrument discipline learned while authoring it (recorded so the next seat does not re-learn it): `performance
.mark`s live for the DOCUMENT, so a second route in the same page reads the first boot's `b4` instantly; and under
the default (simultaneous) transition mode a sequential hop reads the LEAVING Picker mid-transition as a blob on a
picker-less route. Limb I therefore cold-loads every route in a fresh browser context; limb II is the one place a
same-document hop is the subject.

## Reading (WRITE-THEN-MEASURE, ×2, BUILT bundle at HEAD on 127.0.0.1:8093)

See `A2-blob-arm-run1-2026-09-22.json` · `A2-blob-arm-run2-2026-09-22.json` (banked beside this addendum; the
verdict line is appended below once both runs settled).

**Verdict (both runs, `pass: true`, EXIT 0 ×2)**: limb I **15/15** (`blobPresent === pickerPanePresent` on every
route; the anchor is present exactly on `/` · `/palettes` · `/mix` · `/blob` and inside `.pane-wrapper--stage`,
absent on the eleven picker-less scenes) · limb II **5/5** (from each deep link the hop home mounts the anchor with
a 180×180 canvas in 0.3–1.3 s) · limb III **4/4** (180×180 on every picker route). **The re-authored blob arm is
GREEN, measured** — and it is now RED-capable in both directions, which the struck arm never was. The old arm's
five-route sentence is not re-asserted anywhere; this addendum is the reading of record beside `W5.md` §6 A2.
