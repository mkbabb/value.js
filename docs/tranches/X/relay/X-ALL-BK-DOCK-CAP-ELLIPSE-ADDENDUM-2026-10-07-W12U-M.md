SERVED MODEL: claude-opus-5-5

# O-83a — DOCK-CAP-ELLIPSE addendum from X.W12U `.m`: where value.js's 8 px `/atmosphere` overflow came from (2026-10-07)

Beside O-83 (`X-ALL-BK-DOCK-CAP-ELLIPSE.md`, 2026-09-25); O-83 is not rewritten (E-3). value.js is on glass **10.1.0** (exact pin). O-83's own asks (a length `--dock-cap-rest`, the vertical twin, gating, a born-RED witness) stand unchanged; this letter adds the cause of the overflow that engaged the cap on value.js `/atmosphere`, and one ask.

## 1 · The measurement

O-83 read, on `/atmosphere` at 1440×900 (light, DPR 2, reached through the app router), `.dock-run` `scrollWidth 291` / `clientWidth 283`, and the plate at 307×61 with `border-start-start-radius: 50%`. X.W12U `.m` served the exact tree of that reading (value.js `c8a4959dd`, the 10.1.0 repin, in a detached worktree on `:9141`) and walked the active run with `W12U-evidence/m/probe-runseats.mjs`:

```
run  w 283.03  sw 291  cw 283  display flex  gap 8px
face active=false op=0 pos=absolute sw=283 cw=283 | Save edit:40 Cancel edit:40
face active=false op=0 pos=absolute sw=291 cw=283 | Slug or admin toke:160 Switch to slug:24 Generate new slug:24 Cancel:24
face active=true  op=1 pos=relative sw=283 cw=283 | Select view:60 Toggle action bar:104.5 Menu:0 Login:94.5 @mbabb:76.6
```

The 8 px is the **resting, invisible slug-edit face**. Its content (291 px) is wider than the active main face (283 px). The face is `position: absolute; inset: 0; opacity: 0` (`crossfade.css`: `.dock-crossfade > .dock-face`), so it takes the active face's box, and its `.dock-face-content` (`display: flex; white-space: nowrap`) overflows that box visibly. Visible overflow of an absolutely positioned descendant counts toward the scrollable overflow of the nearest scroll container, which is `.dock-run` (`overflow-x: auto`). The run then reads as overflowing, the scroll-driven cut-cap engages, and the `50%` rest paints the ellipse O-83 describes.

Only `/atmosphere` showed it because its main face is the narrowest (the view trigger is icon-only there): every other route's main face was wider than 291 px.

## 2 · The two halves

- **Consumer (value.js), cured at HEAD.** X.W12U `.s1` `6bd9ff799` rebuilt the slug-edit layer as a login form and removed its "Generate new slug" seat (24 px + an 8 px gap). The slug face now fits inside the main face on every route. Measured at HEAD with the same instrument (`W12U-evidence/m/route-sweep.mjs`, a copy of the W7L sweep): `ovf 0` and `border-start-start-radius 9999px` on all nine routes by router push (light with the admin token, dark without it), and on `/atmosphere` by hard load (light at DPR 2, dark at DPR 1).
- **Producer (glass), still latent.** Any consumer whose hidden layer is wider than its visible one reproduces this: an invisible face sets the run's scroll width, the cap engages, and with the run scrolled the user can pan into blank space where no visible seat is. The overflow comes from a face that is neither shown nor interactive.

## 3 · The ask (folds into O-83 / O-88)

A resting crossfade face (not `.is-active`, not `.is-leaving`) must not contribute to its scroll container's scrollable overflow. For example, give `.dock-crossfade > .dock-face:not(.is-active):not(.is-leaving)` `overflow: clip` (or `contain: paint`, or `visibility: hidden` at rest). The born-RED witness: a two-layer dock whose hidden layer is wider than the visible one, reading `run.scrollWidth === run.clientWidth` and a non-percentage cap radius.

value.js changes nothing in glass and ships no local override. **DOCK-CAP-ELLIPSE** stays honest-RED on the consumer side until the repin that carries O-83's `--dock-cap-rest` length.
