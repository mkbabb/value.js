# U-F41 — `duplicate-ncsu-origin` · ESCALATE record

**Wave**: U.W-SEC (Cluster 3 — EDGE / TRANSPORT) · **Disposition**: **escalate**
(no born-RED; off-repo + VPN-gated) · **Family**: U-F41 · **Ties**: the X2 residual
(the two-oldest-owner-orders NCSU-301 win, attested-not-verified).

This record exists because U **cannot** cure this defect from the tree. It presents
the structural fact, names the deploy-ceremony action item for the FINAL.md ledger,
and books the on-wire re-verify to U.W-CLOSE / U-F61 as owner-attested. It is
NOT a phantom repo fix — no headless born-RED gate is authored, because a headless
assertion of an off-repo, VPN-gated wire state would be exactly the close-class lie
the charter forbids.

---

## 1 · The structural fact (alive-on-wire, byte-identical, off-repo)

`api/apache-vhost.conf:19-27` records the disposition **honestly**:

- **DEC-9 declared the `mbabb.fi.ncsu.edu/colors/` alias RETIRED.** On paper it is gone.
- **On the wire it is NOT.** The N.W4 verification (V3) found that alias **ALIVE and
  byte-identical** to `api.color.babb.dev` — the **same upstream**, **sharing the same
  rate-limit pool** (`apache-vhost.conf:21-22`).
- **Retiring it is an ON-HOST action.** The alias lives in the **NCSU box's Apache
  config**, NOT this repository. The vhost file states it plainly at `:23-24`:
  *"Retiring it is an ON-HOST action — it lives in the NCSU box's Apache config, not
  this repo. It CANNOT be retired from this file."*
- **NCSU-VPN-gated, unverified this audit.** The wire state cannot be probed from the
  CI env or an off-VPN host.

The vhost file already carries the intended action in prose (`:24-27`):
*"The N.W8 deploy ceremony carries the action item: remove the
`mbabb.fi.ncsu.edu/colors/` proxy block from the NCSU host's vhost (and let its
DNS/cert lapse) once color.babb.dev is confirmed serving HEAD-lineage code. Until
then, both origins answer."*

**Why it cannot be a repo fix.** This repository holds `api/apache-vhost.conf` — the
vhost for `api.color.babb.dev` ONLY (the babb.dev spine's TLS terminator). The
duplicate origin is a **separate Apache instance on a separate host** (the NCSU box)
whose config is not tracked here and is not deployable from here. Editing anything in
this tree cannot retire it. Improvising a DNS/host change is out of scope (a
PROD-touching act outside U's repo-side authority).

---

## 2 · The deploy-ceremony action item (named for the FINAL.md ledger)

> **[U-F41-DEPLOY] Retire the NCSU duplicate origin (on-host, off-repo).**
> Once `color.babb.dev` is confirmed serving HEAD-lineage code, on the **NCSU host**
> (NCSU-VPN required):
> 1. Remove the `mbabb.fi.ncsu.edu/colors/` reverse-proxy block from that host's
>    Apache vhost (the `/colors/` path-prefix topology retired at K.W2 / DEC-9).
> 2. Reload Apache on the NCSU host.
> 3. Let the `mbabb.fi.ncsu.edu` DNS record / cert for that path lapse.
>
> This collapses the two-origin surface to the single canonical
> `api.color.babb.dev`, ending the shared-rate-limit-pool coupling. It is an
> operator act on a host outside this repo; it ships NO commit here.

This action item is named so U.W-CLOSE folds it into `FINAL.md` as a standing
deploy-ceremony step, not a dropped thread.

---

## 3 · The on-wire re-verify — BOOKED to U.W-CLOSE / U-F61 (owner-attested)

> **[BOOK → U.W-CLOSE / U-F61 · attested-not-verified]** After [U-F41-DEPLOY], an
> **owner-attested, VPN-gated** GET to `https://mbabb.fi.ncsu.edu/colors/` must show
> one of:
> - a **301 redirect → `https://api.color.babb.dev`** (if the operator chose to
>   redirect rather than remove), OR
> - **dead** (connection refused / NXDOMAIN / 404 — the proxy block removed and the
>   DNS/cert lapsed).
>
> Either outcome confirms the duplicate origin no longer answers as a live
> byte-identical twin. This proof is **VPN-gated and off-repo** → it is
> owner-attested at close, **never a headless CI assertion** (a headless probe of a
> VPN-gated host would be a false-green). **Ties the X2 residual** (the
> two-oldest-owner-orders NCSU-301 win).

---

## 4 · Evidence anchors

| Claim | Anchor |
|---|---|
| DEC-9 retired the alias on paper | `api/apache-vhost.conf:19-20` |
| N.W4 (V3) found it alive + byte-identical, shared upstream/rate-limit pool | `api/apache-vhost.conf:21-22` |
| Retiring it is an on-host action; it cannot be retired from this repo | `api/apache-vhost.conf:23-24` |
| The deploy-ceremony action item (remove proxy block, let DNS/cert lapse) | `api/apache-vhost.conf:24-27` |
| Registry disposition (escalate; ties X2) | `docs/tranches/U/audit/registry.md §12 (U-F41)` |
| Wave disposition (escalate; no born-RED; booked to U-F61) | `docs/tranches/U/waves/U.W-SEC.md §Dispositions · §BOOKS` |

---

## 5 · Disposition summary

- **Structural fact**: the `mbabb.fi.ncsu.edu/colors/` alias is **alive-on-wire and
  byte-identical** to `api.color.babb.dev`, but lives in the **NCSU host's Apache
  config** — off-repo, uncurable from this tree.
- **Action item**: **[U-F41-DEPLOY]** named above → rides the FINAL.md deploy ledger.
- **Re-verify**: VPN-gated GET → 301 or dead → **owner-attested, BOOKED to
  U.W-CLOSE / U-F61** (attested-not-verified; ties X2).
- **No born-RED**: correct — a headless assertion of an off-repo VPN-gated wire state
  would be a false-green the charter forbids.
- **No improvised host/DNS change**: this record is a RECORD + a named ceremony step,
  never a repo phantom-fix.
