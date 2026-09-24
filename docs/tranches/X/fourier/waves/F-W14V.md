# F.W14V — fourier: the detached pane made distinct (owner frame 2026-09-24), the anonymous publish path, and the AUDIT-2 fourier register

## State
**Opens after**: F.W14U CLOSED. **Minted by**: COHESION §0cz (2026-09-24). **Model**: Opus 5.5 every seat; design seats at effort high.
**Units**: serial — [`.s2`] → [`.p`] → [`.au0`] → the AUDIT-2 family units the open seat groups (`.au1`…, by surface, the way F.W14U grouped its UIA rows). **Record**: `docs/tranches/X/execution/C/F-W14V.md`.
**Repo**: fourier-analysis (`web/**`, `api/**` only for `.p` if the server half needs it). Glass is READ-ONLY; asks go to O-75/O-74 and the live glass session.

## Authority — the owner's words, verbatim (2026-09-24)
*"the background area between the two elements is not right--this should not be displayed--they should be distincitly there"* (frame: `docs/tranches/X/fourier/evidence/W14/owner-2026-09-24-configurator-shell-band.png`, READ it).
Earlier, the same day: *"the side controls pane in fourier should be seperated, not totally attached, like it is now"* · *"All issues should be fixed at the glass-ui root"* · *"Ensure proper design hierarchy and usage of space in all UIs hereof"*.

## §1 Units
### F.W14V.s2 (Opus, effort high) — the stage and the pane as two distinct elements (F.W14U `.s` landed incomplete)
1. **The cause** (O-75): glass `Configurator`'s shell (`Configurator.vue:169-199`) is one plate around both `#stage` and the aside. `.s` (`10c8e1a`) placed a detached `Card` inside it, so the gutter shows the plate. Read the frame, then measure at lg+ (1440×900 and 1024×768), light and dark: sample the pixels in the gutter between the stage's edge and the pane's edge. **Goal: the gutter reads the page ground** (the same pixels as the page outside the Configurator), and the stage and the pane each show their own surface edge.
2. **Consumer-owned contributors, cured at the root:** read the `glass-opaque` class on `.viz-configurator` (`VisualizationView.vue:342`) and every consumer rule that paints the shell or the stage. A consumer choice that makes the band opaque is corrected. Nothing may restyle glass's shell classes.
3. **The glass half:** if glass publishes O-75's detached placement (possibly in the early 10.x minor with O-68 `#actions`), pin it exactly, adopt it, and delete the `.s` `Card` wrap and its placement rule (`:528`). If not, record honest-RED **CONFIGURATOR-DETACHED** with the before frame and the measured gutter pixels. Paint no consumer copy over the shell.
4. **Gates:** the gutter-ground falsifier (a committed `web/e2e/f-w14v-detached.spec.ts`, headed, real GPU) is RED on the before bytes and GREEN ×2 after adoption, or honest-RED as above; mobile (< lg) is unchanged, with the sheet form GREEN.

### F.W14V.p (Opus) — the anonymous publish path (seen in the same frame)
1. The frame shows a raw toast, "Error · A session is required to publish." (`api/routers/visualizations.py:176` answers `owner_required`), overlapping the controls pane.
2. **Cure:** a signed-out Publish never ends in a raw error. It opens the inline sign-in (the shell's existing login surface) and resumes the publish after sign-in, or it is presented as needing sign-in before the click (a glass `Tooltip` or a DialogDescription). The typed 401/403 stays as the server contract. Toasts never cover the controls pane: their placement uses glass's Toaster offset, not a consumer overlay.
3. **Gates:** an e2e that publishes while signed out reaches the sign-in (never the raw toast) ×2; the api contract test for `owner_required` is unchanged and GREEN.

### F.W14V.au0 … — the AUDIT-2 fourier register (re-homed from F-W14U.md addendum (e))
F-W14U.md addendum (e) was written after F.W14U opened, so its plan never carried it (§0cz). **Its whole text is this wave's scope**, including:
- `docs/tranches/X/audit/AUDIT-2-fourier.md` (62 rows, `9c7552d3`; the "Routing § F.W14U" consumer-half list, 56 rows);
- the re-baseline to fourier HEAD (the register audited `798c98f` plus uncommitted edits; F.W14U has moved the tree since);
- the views Lens 3 never read, including the Audit Log and tablet 768×1024 and 1024×768;
- the cross-app rows (useSafeStorage, AdminFlaggedPanel, the four search inputs, the easing pickers per O-74a E-3);
- the §11 type rows, HELD for glass's ruling (O-74a E-2).

`.au0` re-baselines and measures. The open seat groups the rows into family units after it. A row F.W14U already cured by its UIA twin is cited, not redone. Safe areas are measured with the CDP override.

## §2 Close
Every unit's rows are CURED (falsifier GREEN ×2 on the served page, :3100 against the API on :8000), ADOPT-AT-LANDING (with the O-74 or O-75 row), or honest-RED with a relayed id. `vue-tsc` 0, vitest GREEN, full e2e `--workers=1` GREEN except the named honest-RED set. The row flips CLOSED on a CONFORMANT check.
