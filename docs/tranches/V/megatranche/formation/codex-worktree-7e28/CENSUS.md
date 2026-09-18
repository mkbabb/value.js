# 7e28 Worktree Census — M-21 C-11 (codex-provenance ledger row 28)

**Ruled:** 2026-08-03, Fable ruler (2 Opus census halves → 1 Fable ruler, per M-23 compliance note in SCOPE.md).
**Subject:** every untracked file in the Codex-owned worktree `/Users/mkbabb/.codex/worktrees/7e28/value.js`
(detached HEAD `e01d0065`, reachable from `tranche-u`) — the "second, divergent megatranche corpus" of
sessions.md D5, upheld as C-11 BLOCKER and dispositioned VERIFY-THEN-ADOPT at ledger row 28.
**Law:** M-21 §2 — every Codex artifact is an audit subject requiring a per-file terminal disposition.
Nothing under `~/.codex/**` was modified (read/hash only). No product source, no git mutation in either tree.

## 1. Counts

| Metric | Value |
|---|---:|
| Files censused (both halves, reconciled) | **126** |
| ADOPT-COPY | **90** (89 plain + 1 collision variant) |
| LEAVE-IN-PLACE | **36** |
| Adopted bytes (with headers) | ~20 MB (dominated by the v3 substrate, ~19.8 MB) |
| Left-in-place bytes | ~240 MB (dominated by the regenerable css-drei V5–V11 manifests) |
| Copy verification | 90/90 payload tails re-hash to the original sha256 (byte-exact) |

**Copy convention.** Adopted copies land under
`docs/tranches/V/megatranche/formation/codex-worktree-7e28/<path relative to the worktree's docs/tranches/V/megatranche/>`,
each PREPENDED with an HTML-comment provenance header (original absolute path, original mtime,
sha256 + byte-count of the ORIGINAL bytes, ruling + date + M-21 C-11). The header makes each copy's
own sha256 differ from the original's; both digests are recorded here (§2 originals, §3 copies).
The original bytes are recoverable as exactly the last `original-bytes` bytes of each copy
(`tail -c <original-bytes> <copy>` re-hashes to `original-sha256`). Copies carry the original mtimes.

**LEAVE-IN-PLACE rationale classes** (every left file remains untouched, hash-recorded below):
- the 32 superseded css-drei iteration files (contract drafts V1–V10, their per-round review/ruling
  intakes C4–C7 and A/B rounds, and ALL bulk JSON manifests incl. V11's 67.6 MB) — the terminal V11
  round (contract + two-review owner intake) is adopted; the iteration chain is preserved by hash;
- the 4 artifact-less capture attempts (`mobile-safari-source-closure/`, `-v2/`) — red-matrices §10
  retires the 0/5 gate framing; v3 is the adopted substrate.

## 2. The census table

Paths are relative to `docs/tranches/V/megatranche/` in the worktree. SHA-256 is of the ORIGINAL bytes.

| Path | sha256 (original) | Bytes | mtime | Ruling | Rationale |
|---|---|---:|---|---|---|
| `VALUE-FORMATION-PACKET-2026-07-29.md` | `d07b6ddc5cf0d673b37d696c8e940fec974227a129d2f614f89f7b305ffb14e6` | 63572 | 2026-08-02T05:26:10 | ADOPT-COPY | Corpus keystone; live validator input (tooling.md:348). ADOPTED AS-FOUND with the K-13/K-14 caveat: current bytes (mtime 08-02, ~3.5 d post-seal) match neither recorded seal digest |
| `audit/cross-repo/VALUE-CSS-DREI-C4-OWNER-INTAKE-AND-C5-SOURCE-RULING-2026-08-02.md` | `3f481c933d973282a770da6d3ad621ed73626546750a0cf164bd8f990bcbc919` | 10826 | 2026-08-02T00:18:42 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-C5-OWNER-INTAKE-AND-C6-SOURCE-RULING-2026-08-02.md` | `b88784b5f8931d4c473831bf9e9acaaf9fc6082f1474f960f830de2c93033173` | 9399 | 2026-08-02T00:43:37 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-C6-OWNER-INTAKE-AND-C7-SOURCE-RULING-2026-08-02.md` | `bb7b7a99c7924957dabfade4e3dc02b3ea00326efb84469078800d7d3fec67d3` | 13891 | 2026-08-02T01:05:50 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-C7-ABSENT-ROOT-OWNER-INTAKE-2026-08-02.md` | `66f6a30565219d657d92e8e61f3425d2f8f4f1e34d0b4f2950f5d4485df027e8` | 6293 | 2026-08-02T01:20:26 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-2026-08-02.md` | `4a025f3e42b2d8260c6fc487c425b98ab28a892ac7841260f9cb5c9006723d38` | 15695 | 2026-08-02T01:29:32 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-MANIFEST-2026-08-02.json` | `1e9632aa93b0f2b6b481c811c2f560568cbc5cd2c5f88304637c06244039b804` | 32382 | 2026-08-02T01:27:32 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V10-2026-08-02.md` | `f3d5fcd0c0b856a9e5832d9bc4227bb6589ab0e08a0d2cf63adb8d12b5111656` | 11451 | 2026-08-02T05:41:08 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V10-MANIFEST-2026-08-02.json` | `71be78ab75334631839fd0a6f9f1c0ba060049e18fdb0cc03595edf0ada3f783` | 65695825 | 2026-08-02T05:41:08 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-2026-08-02.md` | `abf2c70c9cd87fd0caecb1071bc7365fb6d655d3f1eaa65a48aaf0014018e2dd` | 7996 | 2026-08-02T06:13:25 | ADOPT-COPY | Terminal (V11) css-drei design contract — the round the pinned two-review intake rules on |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-MANIFEST-2026-08-02.json` | `e53ab2a1b3e75917b881da275d9c481656bf693b03e0dbd9338e13dc6be26b15` | 67631782 | 2026-08-02T06:13:25 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V2-2026-08-02.md` | `1d0080f0a9f761f84c25f2479155788e25f80ff2468de4c60ebcdab8920d2130` | 14170 | 2026-08-02T01:48:19 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V2-MANIFEST-2026-08-02.json` | `0bbe6d22f6c3fbdbfd60a52646a6e7f06fb4082686752fb5f80a3240251f8dcf` | 39344 | 2026-08-02T01:45:53 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V3-2026-08-02.md` | `253a4fcc951ecaa4d2b974b656bfc637260d40497e24617f5ccab451a36bab7d` | 15160 | 2026-08-02T02:05:11 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V3-MANIFEST-2026-08-02.json` | `248a548eaaa8cbfe8a1c71b66d420b120d6b6ecc66dcf79accebb49b5985a913` | 51121 | 2026-08-02T02:01:36 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V4-2026-08-02.md` | `23e99e65c71a5a33850ba8a0996d4d1ec30f789fd263d086123b8a3542f4603b` | 17135 | 2026-08-02T02:58:47 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V4-MANIFEST-2026-08-02.json` | `10f02f3b59ec70cad85a6327d043ce3a4a010d6a9e9e87be9f637dfc4dd3c04c` | 81167 | 2026-08-02T02:58:26 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V5-2026-08-02.md` | `780c8a122cd74a87c67ce09ebc98ff78935868fab4feb6c21d80297c53acade4` | 13834 | 2026-08-02T03:27:49 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V5-MANIFEST-2026-08-02.json` | `81a67717305ac837362949fb273ef28dbcf9995dde6e381ebe5aa7385d0ca71a` | 545075 | 2026-08-02T03:25:12 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V6-2026-08-02.md` | `64836576d00e9dde8cb1c998f094390f7d9de240a484ae90244ea3595417b3ab` | 24619 | 2026-08-02T03:59:48 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V6-MANIFEST-2026-08-02.json` | `a5a39f60f502b57d7d01217a6ecdfea90565bc6d9024fa7a233ac20a96c38abe` | 2683437 | 2026-08-02T04:02:41 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V7-2026-08-02.md` | `f29afb45da62a100f435917e9799af286dc9ac584add67a66859729d637a3c93` | 9180 | 2026-08-02T04:16:00 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V7-MANIFEST-2026-08-02.json` | `9b4e7031333550d5a02a9dc2f25651f8ecddc24ac91df2e108c58478dc4dd7a7` | 30297364 | 2026-08-02T04:26:32 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V8-2026-08-02.md` | `46870cb30dafd05a63a966bd16a02525860d8883b87a2256c872a88586311592` | 7603 | 2026-08-02T04:42:15 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V8-MANIFEST-2026-08-02.json` | `2f13ac398821d3fe31529cef55431b2895babeb6236644fc53170869be2a8f6a` | 36454133 | 2026-08-02T04:57:26 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V9-2026-08-02.md` | `272ee4cdf2e64062461f4a115a4dfd7b715b4bfec2cc561f149c29668e08496e` | 10654 | 2026-08-02T05:12:40 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V9-MANIFEST-2026-08-02.json` | `99f3952b4c906c9e1b1c6bef96028ad69f5a12a3dc99f4ebea70dafc60542949` | 37527796 | 2026-08-02T05:12:40 | LEAVE-IN-PLACE | Regenerable bulk manifest of a superseded css-drei iteration (up to 67.6 MB); unreferenced by live docs; preserved by hash |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-REVIEW-A-OWNER-INTAKE-2026-08-02.md` | `2c9462909cbb81cf043a4ba1e8e7e3a4e2fad1e2087e59b363b519bc2046b07e` | 8478 | 2026-08-02T01:38:07 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-REVIEW-B-OWNER-INTAKE-2026-08-02.md` | `6de6f495efca185181d8def8a736a56a15f56ece07fb0b7ba1dbd5d0003a30f5` | 10982 | 2026-08-02T01:40:29 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-V2-REVIEW-A2-OWNER-INTAKE-2026-08-02.md` | `6e299660cfc1fd26b5453014eb856611501959f47d42780d520b84d62a25619f` | 8043 | 2026-08-02T01:53:53 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-V2-REVIEW-B2-OWNER-INTAKE-2026-08-02.md` | `12356ecacd94d8560ef4e3bf309958e4253b109730a88216ffb243d8fe259048` | 7359 | 2026-08-02T01:57:55 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-V3-REVIEW-A3-OWNER-INTAKE-2026-08-02.md` | `8165833532cc52d11d66ff37867846decfeb708bded11f60d7c61b7a5d2724a2` | 6875 | 2026-08-02T02:12:57 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-V3-REVIEW-B3-OWNER-INTAKE-2026-08-02.md` | `6513b430f77dad0b9a487076d29eb60fed84558b79559b0d043021125bd26867` | 9372 | 2026-08-02T02:14:20 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-V4-REVIEWS-A4-B4-OWNER-INTAKE-AND-V5-RULING-2026-08-02.md` | `99faa80691bf160f4206308d1ee7dc6d86cf8d6dc495bbc87fbb86f77e529ba6` | 4853 | 2026-08-02T03:12:53 | LEAVE-IN-PLACE | Superseded css-drei iteration chain (terminal V11 round adopted); preserved by hash, original left in place |
| `audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md` | `aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767` | 7558 | 2026-08-02T06:45:53 | ADOPT-COPY | Pinned by PARSER-CSS-PAUSE-HANDOFF-2026-08-02:108 and red-matrices.md:162 |
| `audit/formation/FORMATION-CLEAN-AUDIT-1-2026-07-29.md` | `eea9ee13c9fdf79ed8b31be2e9c6850ba62e09a96cb64cc036975cbc0b90d5fd` | 6323 | 2026-07-29T17:36:29 | ADOPT-COPY | Formation-audit lineage: clean audits and blind hostile reviews feeding NON-PARSER-LATER-AGGLOMERATION |
| `audit/formation/FORMATION-CLEAN-AUDIT-2-2026-07-29.md` | `4638420279de8155df1757aeea3cc2b48836bf1795c9926da732246d8aac584e` | 6016 | 2026-07-29T17:42:03 | ADOPT-COPY | Formation-audit lineage: clean audits and blind hostile reviews feeding NON-PARSER-LATER-AGGLOMERATION |
| `audit/formation/NON-PARSER-HOSTILE-REVIEW-A-2026-07-30.md` | `addc98e525eb67ce8350eaf1fb837f94960cd04a9e2df599e723c2e033aac052` | 5097 | 2026-07-30T14:42:36 | ADOPT-COPY | Formation-audit lineage: clean audits and blind hostile reviews feeding NON-PARSER-LATER-AGGLOMERATION |
| `audit/formation/NON-PARSER-HOSTILE-REVIEW-B-2026-07-30.md` | `214f032198c8aef0a7d87792f80822ca847f1a9ff7aaf819202aac7854f0fdd6` | 4790 | 2026-07-30T14:42:36 | ADOPT-COPY | Formation-audit lineage: clean audits and blind hostile reviews feeding NON-PARSER-LATER-AGGLOMERATION |
| `coordination/CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md` | `29303183bf1ecc2afcf87f0246ccf5c91ff9b3ca8f5ed5f94a645447d9787456` | 4275 | 2026-07-30T20:13:24 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF-2026-07-31 §4 (the dependency-only AMEND intake; digest verified) |
| `coordination/FORMATION-CLEAN-A-DISPATCH-2026-07-29.md` | `b3c5198ca8d8c3ad1bf52d3e832124983d333d366ef16f40fe3045953cf01dc3` | 4260 | 2026-07-29T19:29:43 | ADOPT-COPY | Commissioning dispatch of the Clean-A/Clean-B/full-subject admission lanes (SESSION-CONSTELLATION-2026-07-29 lineage) |
| `coordination/FORMATION-CLEAN-A-REPLACEMENT-DISPATCH-2026-07-29.md` | `088584824bd049abe3033a2a78292dfae1292012f80572460b3348ab7c965518` | 6662 | 2026-07-29T20:11:22 | ADOPT-COPY | Commissioning dispatch of the Clean-A/Clean-B/full-subject admission lanes (SESSION-CONSTELLATION-2026-07-29 lineage) |
| `coordination/FORMATION-CLEAN-B-DISPATCH-2026-07-29.md` | `ef4aeb2782fef855542946ac7c745932d0cbe10e09accad973ad8056e5e778cb` | 7465 | 2026-07-29T20:38:19 | ADOPT-COPY | Commissioning dispatch of the Clean-A/Clean-B/full-subject admission lanes (SESSION-CONSTELLATION-2026-07-29 lineage) |
| `coordination/FULL-SUBJECT-P2-LUNA-DISPATCH-2026-07-29.md` | `c675a73b4107971e0392be5b93ba9ef964d3f9b396d19f795018ef8c0353d205` | 2395 | 2026-07-29T18:38:02 | ADOPT-COPY | Commissioning dispatch of the Clean-A/Clean-B/full-subject admission lanes (SESSION-CONSTELLATION-2026-07-29 lineage) |
| `coordination/FULL-SUBJECT-P3-SOL-DISPATCH-2026-07-29.md` | `55a6405d6e5a5dfdab93e0915bab8410c1478e80364895ba00de9286454e84c1` | 2936 | 2026-07-29T18:55:11 | ADOPT-COPY | Commissioning dispatch of the Clean-A/Clean-B/full-subject admission lanes (SESSION-CONSTELLATION-2026-07-29 lineage) |
| `coordination/KEYFRAMES-VALUE-SURFACE-2026-07-29.md` | `f9a98d7df6addf6e0d61d2adfad7340e667f503486668da0403f1861c3965b96` | 16421 | 2026-07-29T20:03:50 | ADOPT-COPY | Cross-repo consumer-surface record for the keyframes edge; formation-grade |
| `coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md` | `973799e4967aba0ffdb30745e97f6094edb5aecbdd2692b0eddfb3e2b98c408d` | 3765 | 2026-07-30T14:46:14 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF-2026-07-31 §4 (digest verified) |
| `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` | `91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e` | 3463 | 2026-07-29T17:34:04 | ADOPT-COPY-AS-VARIANT | THE COLLISION — same name, different bytes in both trees; copied as .WORKTREE-VARIANT.md; the repo-of-record variant governs (§4) |
| `coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md` | `0cc044228f902c0f7c95c817643aff655240c0afce4c184c6bf53d596d8f76ab` | 6875 | 2026-08-01T13:02:56 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF-2026-07-31 §4; cited by parser-verify.md:169 (digest verified) |
| `formation/API-POLICY-V-API-01-2026-07-29.md` | `46a88fa27beb1487365cc05aa0195b7651c483c1b66b4891b9931f39b7b8538a` | 22147 | 2026-07-29T17:36:53 | ADOPT-COPY | Named by provenance ledger row 28; the 9/9 API policy classes of the formation corpus |
| `formation/COMPONENT-WORKFLOW-MATRIX-2026-07-29.md` | `3efc8638b765f0cb7bef019ff3d3b6a2f47664b1f66b6b9c6ff3fb9dd301c6a9` | 19982 | 2026-07-30T14:45:28 | ADOPT-COPY | The 88/88 workflow corpus definition behind RESURRECTION-HANDOFF §4 counts |
| `formation/FORMATION-AUTHORITY-STATUS-2026-07-29.md` | `713ae753738af09985f9e5d63e96182b953c4cc62dd8daff1815b1f8e0dae1ea` | 64871 | 2026-07-30T20:12:29 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF-2026-07-31 §4 (digest verified) — the dependency and credit boundary |
| `formation/FORMATION-AUTHORITY-STATUS-R1-SUPERSEDED-2026-07-29.md` | `6be15f28a66392a061711ea4563e20d2940f7470205a3a583e12f570dc4434f9` | 7766 | 2026-07-29T21:25:35 | ADOPT-COPY | Supersession lineage of FORMATION-AUTHORITY-STATUS |
| `formation/FORMATION-AUTHORITY-STATUS-R2-AMEND-SUPERSEDED-2026-07-29.md` | `bece159ef6dfc87468b86e64915ef58e1fe66215710f58bae13ce7098ee93628` | 3331 | 2026-07-29T21:39:28 | ADOPT-COPY | Supersession lineage of FORMATION-AUTHORITY-STATUS |
| `formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md` | `a911162502a5a32cb512c00af266004e1d5d3f56ed2a963256b75caa3ee6c883` | 25198 | 2026-07-30T14:42:25 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/NON-PARSER-LATER-AGGLOMERATION-2026-07-30.md` | `d30cd8ce6c48b2c5a0fb364f07460602167c030371a3bc1325884585e3682e39` | 7638 | 2026-07-30T14:43:37 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md` | `d51e0d3056ec4b3bdebc1bad2119d453de291189dadfce8e9dd2e2bcc5ae8eff` | 20243 | 2026-07-30T14:40:02 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/PI-DELTA-MANIFEST-2026-07-29.json` | `7db1a144b038203417e405b9180041baedc0fb6229dcab3cf7a326aeff20487e` | 2495 | 2026-07-29T17:40:26 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/RESEARCH-PASSES-AND-BROWSER-AUDIT-2026-07-29.md` | `df91b6c383e6f2d37c9a69b7b62d70fac04f0e22febdef9c3ec0bc0ae9e00fd5` | 11050 | 2026-07-29T17:40:26 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/TYPED-DAGS-AND-DISPOSITIONS-2026-07-29.md` | `5736d6da2451a3b558952736038b5d2b382ede79aadecbf3709491d6edd2a6cd` | 17897 | 2026-07-29T17:38:46 | ADOPT-COPY | Formation corpus definition (contracts / DAG planes / routes) behind RESURRECTION-HANDOFF §4 counts |
| `formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md` | `18f8ac83045496e6553d10d21e5cea26d2da43304952d4c67940aecb2e7a72ef` | 34851 | 2026-08-01T14:41:45 | ADOPT-COPY | Referenced by RESURRECTION-HANDOFF-2026-07-31:87 |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md` | `0a81da8ccbf6a36cbc91b3ebe174d3e8e92d8803e195fcc9527b63dba8ab4065` | 12782 | 2026-08-01T20:45:10 | ADOPT-COPY | Owner-intake lineage of the source-closure program (v3 = the adopted substrate) |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V4-OWNER-INTAKE-AND-V5-SOURCE-RULING-2026-08-02.md` | `26e3bbc50a14f06a2b2cfcd1e692f99efce3489ddc3ff68914ce3f44ab2e9921` | 10162 | 2026-08-02T14:01:59 | ADOPT-COPY | Owner intake/ruling lineage of the mobile-safari source-closure program |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V5-HOSTILE-ORDER-OWNER-CORRECTION-2026-08-02.md` | `b9febba9ee253299b5917005b1f882974c9858007d1391015fad4576bb50c485` | 6522 | 2026-08-02T14:33:53 | ADOPT-COPY | Owner intake/ruling lineage of the mobile-safari source-closure program |
| `formation/VALUE-MOBILE-SAFARI-V7-44-CONTROL-REGISTRY-OWNER-DECISION-2026-08-02.json` | `7994587aacd548c724be75e3b3756f21bfa6e326e4856cd50675c8c73c280e5e` | 41990 | 2026-08-02T21:24:05 | ADOPT-COPY | Referenced by CONSTELLATION-NEXT-SOURCE-WAVE-OWNER-DECISIONS:20 and red-matrices.md:60 (digest verified) |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-OWNER-RELEASE-2026-08-02.json` | `32da65a2a831d4d335f3a23664ca33ef5f78709662826117dc8da8bed0dc7bf3` | 26173 | 2026-08-02T21:40:24 | ADOPT-COPY | Referenced by VALUE-V7-QUIESCENT-CAPTURE-TERMINAL-MECHANICS-RED-INTAKE:15 |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-CURRENT-TUPLE-REBIND-2026-08-02.json` | `695358c08b33d6826abf3e82ea8d0605db9d2338cce97da1f613965b46583882` | 8660 | 2026-08-02T22:24:04 | ADOPT-COPY | Companion of the R2 owner ruling (sessions.md: Capture R2 rebound to the current stable root tuple) |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-OWNER-RULING-2026-08-02.json` | `ea5eed7a6f43c8c61ed32a3f0c4f4487afa43043c48e83c39ae7b2addbbf033a` | 12484 | 2026-08-02T21:54:04 | ADOPT-COPY | Referenced by VALUE-V7-QUIESCENT-CAPTURE-R2-OWNER-DECISION-DRIFT-INTAKE:11 |
| `formation/VALUE-MOBILE-SAFARI-V7-SOURCE-ONLY-OWNER-DECISION-2026-08-02.md` | `e1522725a855a1f413bea7a62e4bfc2c6897668f4b6f26d3a22d69c404325486` | 11474 | 2026-08-02T20:32:50 | ADOPT-COPY | Referenced by CONSTELLATION-OWNER-SLOT-ADMISSION-OVERLAY:77 |
| `formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md` | `717bf1e36e11fb9b702dc95b26be82c26bffce48c9c8a78c8a7cc3bb614435c5` | 7588 | 2026-07-30T20:12:00 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF-2026-07-31 §4 (digest verified) — 11/11 formation-only cells |
| `formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md` | `244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7` | 30242 | 2026-07-30T20:12:10 | ADOPT-COPY | SHA-pinned in RESURRECTION-HANDOFF §4, PARSER-CSS-PAUSE-HANDOFF:48, red-matrices.md:225 (digest verified) |
| `formation/full-subject/CLEAN-A-ABSORPTION-MANIFEST-2026-07-29.json` | `fa2c4959937338465abc7609f4e631c77b01112035f2497ce5bad0cf1caa312e` | 2294 | 2026-07-29T20:05:09 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/CLEAN-A-AUTHORIZED-COORDINATE-RULING-2026-07-29.md` | `d31238f7785aa9bf83971c0d92ea213e57590612de1c1103b9a30ff0345d5494` | 2045 | 2026-07-29T19:57:20 | ADOPT-COPY | Referenced by CROSS-REPO-DECISION-LEDGER-2026-07-29:86 (digest verified) |
| `formation/full-subject/CLEAN-A-CA01-ABSORPTION-RECEIPT-2026-07-29.md` | `6521250dc250a7ea45a3b06fba48a1193404fd16ebe23ae9a1ec7e2bf6c7a2b6` | 4643 | 2026-07-29T20:07:27 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FORMATION-CLEAN-A-REPLACEMENT-OWNER-INTAKE-2026-07-29.md` | `56afeefd065edc26b7f4da75d7723f57a4f56faced41b95a432f80e3f8b82bc4` | 4697 | 2026-07-29T20:33:32 | ADOPT-COPY | Cited by SESSION-CONSTELLATION-2026-07-29:15 as owner intake 56afeefd… (digest verified) |
| `formation/full-subject/FORMATION-CLEAN-A-ROOT-REBIND-2026-07-29.md` | `c714359be1ac31da3f138620e796c1b2267c79dd48d5f5c1d35bde2976c2a3f2` | 1840 | 2026-07-29T20:36:58 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FORMATION-CLEAN-B-OWNER-INTAKE-2026-07-29.md` | `0c57bbb5dcb32f21278c26dc37a53558812b495d74d0b6cbaaffea79931eeed6` | 6084 | 2026-07-29T21:07:44 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-FAMILY-DENOMINATOR-2026-07-29.json` | `1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85` | 5186 | 2026-07-29T18:37:26 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P1-REGISTRY-2026-07-29.json` | `b3929ebf6f0718c24d5c27cd9c2a14f41dd1067d0f25221250021fa9ca6c657b` | 17396 | 2026-07-29T18:37:47 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P1-SOL-2026-07-29.md` | `c92f40faa27e8b0e1dea88f4c41d438631e14de1e08fe8eeabf9d4a0e81d589d` | 2798 | 2026-07-29T18:38:02 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P2-INTAKE-2026-07-29.md` | `b94d0687e374386f4d2e84a50c3a04c7ad996fa28386d42d37e235cc38e29bc6` | 3293 | 2026-07-29T18:55:11 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P3-FINAL-OWNER-INTAKE-2026-07-29.md` | `a08857a2d0a9f65fccdb5d66b72f638967324db8a959aa22729ffb78cb1d7af0` | 5048 | 2026-07-29T19:39:46 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P3-INTAKE-2026-07-29.md` | `7b5522ea06a830b1cf624b4aa9006b27f384d3df69cc9f710df26f3698dafda6` | 4941 | 2026-07-29T19:29:43 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P3-INTAKE-INVALIDATION-2026-07-29.md` | `a6aecec332c9bea64b0e9fd3d0c6500fb4ccee74817dde76fdfdb94a5bc25679` | 1913 | 2026-07-29T19:35:49 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P3-POST-INTAKE-CORRECTION-2026-07-29.md` | `d342d0c711693490f2cfe9dcc9494de4187a87e116250c8602f6bf7aa59ecff5` | 1874 | 2026-07-29T19:34:54 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/FULL-SUBJECT-P3-ROOT-REBIND-2026-07-29.md` | `bc5b4b127390000bd0312f8a0c0f05d84dd215a5b2a5bda16f81bdc66fc5d2e3` | 1547 | 2026-07-29T19:42:08 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/VALUE-FORMATION-FULL-SUBJECT-ADMISSION-RECEIPT-2026-07-29.md` | `4aac44577b95459dcfe977161549289a6ad1e13b33c9f4f5abef4bebcf619a2a` | 6892 | 2026-07-29T21:11:48 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/VALUE-FORMATION-ROOT-REBIND-R2-OWNER-VERIFICATION-2026-07-29.md` | `7865862a0dcee19f2609bae1adcb981d93e8241cc5f48f1786abfd55e8f0a6cb` | 4588 | 2026-07-29T21:39:17 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/VALUE-PACKET-CANDIDATE-EVIDENCE-CORRECTION-2026-07-29.md` | `4afa88ef3e545ffab0d7fba5ca4a99573f2a00600d0ba1d0d3691b24b7a7ff97` | 2963 | 2026-07-29T21:50:42 | ADOPT-COPY | Referenced by CONSTELLATION-ROOT-DAG-R2-FALSE-GREEN-AUDIT-2026-07-29:59 |
| `formation/full-subject/validate-clean-a-absorption.mjs` | `838c01c1f6137289b31b009daa0cdc6039ecace712133372903119b66a3c603b` | 3492 | 2026-07-29T20:05:09 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/full-subject/validate-full-subject.mjs` | `26993d7f6dbde46c136b4e1f5905140375fbb3e90c6783d4a9e01395e28a2ea6` | 3574 | 2026-07-29T18:39:48 | ADOPT-COPY | Full-subject admission chain (P1/P2/P3, Clean A/B): intakes, rebinds, receipts, registries, validators |
| `formation/mobile-safari-source-closure-v2/README.md` | `51753857a7fda3ccf71a5eb2147d54b888d197368d3c2ef988fb06f55de02286` | 1765 | 2026-08-01T20:17:23 | LEAVE-IN-PLACE | Artifact-less capture attempt (README + tools only); red-matrices §10 retires the 0/5 framing; superseded by v3 |
| `formation/mobile-safari-source-closure-v2/tools/freeze-source-snapshot.mjs` | `bc55444924964bedd54f5f1fb3d0eef59105502daa4db140d3c309abd0493c20` | 11422 | 2026-08-01T20:18:10 | LEAVE-IN-PLACE | Artifact-less capture attempt (README + tools only); red-matrices §10 retires the 0/5 framing; superseded by v3 |
| `formation/mobile-safari-source-closure-v3/COMPONENT-INVENTORY.json` | `9061128872ed32b6b03646d06592734b731b4f08860f2b3674cfef1fb06a9232` | 179807 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/DESIGN-BRIEFS.json` | `8f555260b94508f0f42ac737cfc4416babf98365d760ebad28e6d2417c1790e7` | 713516 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/EQUIVALENCE.json` | `3bde71acd37db6c145f3e52ec851caaad9d7ac260d6d7cc7cc8d30deb9d94ae3` | 1052133 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/GENERATION-VALIDATION.json` | `ab4d8938d600e5b1b850f8a6b4151cc1fb1f0adea1265a781a0be1f95c035d5b` | 1741 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/KRONECKER-REGISTRY.json` | `ffd9b4a14e69be644826a8bd5bbe072f33a7ebbfd2363a170f49a54eef076e0d` | 4285839 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/MOUNT-GRAPH.json` | `4597ddcc4d9ca15040684197f7b9e389d2f4bf8cc6335f415436f439f346d0c0` | 644122 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/PAGE-INVENTORY.json` | `d00edb047e1d38da64bd83e74ff62e3aa1ac7d3a6b3fff3e9021a4c3b9dfa3aa` | 75684 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/README.md` | `a930ae57021c3da90e83258d70f45818e2a2be8dd9558b60736eee3009d8532d` | 1103 | 2026-08-01T20:21:13 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/SOURCE-SNAPSHOT.json` | `cf812c05539c6fd0b0975870fa24c173936401cad0dd7b6d1953ebc6c70618b4` | 4398524 | 2026-08-01T20:21:19 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/STATE-REGISTRY.json` | `588bc82387d2ffa89fa9b3f3f821b864df271646383297740ae60a7f26f5472f` | 3100241 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/VALIDATION.json` | `e099ea40a71cb90f948da6de4407089011e9d837d875dc9df9e30613ea15de6e` | 4133 | 2026-08-01T20:33:11 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/COMPONENT-PARSE-RAW.json` | `9dfaeb5b5551e5d558449105ed895a4b7adb55b82e774a63cb6c8309d2e6331a` | 60147 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/DESIGN-INPUTS-RAW.json` | `3ed23ab6962d7703fa33824b9046b313e05beb65dfdd96bfe8ba74f7ace795b4` | 34539 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/KRONECKER-FACTORS-RAW.json` | `8e9e1560fa498b6fcddacb5da772a34fd23c3b7767e1508709fb4e25560230f0` | 4486911 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/MOUNT-PARSE-RAW.json` | `51fa8202710fbd8022a2948f62856e5f2e282cbb6f1ad0c3d0074a23f3e71a8f` | 613951 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/ROUTE-PARSE-RAW.json` | `09b13fd8d86d76817062c1cf8eb3e38386b761096198e2ba7aa64434cec437ae` | 8215 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/SOURCE-READ-RAW.json` | `0487b2e76054e12471bb641ac5379208ccea6552ec3b7a5945419b932e93548a` | 66870 | 2026-08-01T20:21:19 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/STATE-ORIGINS-RAW.json` | `f669eef3e904d0d161c402f448ed2d0f2b0e93c63df3e901988a44dbd0bac39b` | 48097 | 2026-08-01T20:31:35 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/raw/VALIDATOR-RAW.json` | `e099ea40a71cb90f948da6de4407089011e9d837d875dc9df9e30613ea15de6e` | 4133 | 2026-08-01T20:33:11 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/tools/freeze-source-snapshot.mjs` | `f280cea40f604b73b0c07276bdf38c3df3b707104b6730f58e2810bced94da50` | 10591 | 2026-08-01T20:21:13 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/tools/generate-source-closure.mjs` | `a4067cdb4f50265e941c35d5abd7e2acd9f0a787d86a59396ee1b6aa5f76eedf` | 46105 | 2026-08-01T20:31:08 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v3/tools/validate-source-closure.mjs` | `811d96ee9a87a294795c9374942f2f30b28752b9a7b8bd6e5fe47a2da732f755` | 12050 | 2026-08-01T20:33:02 | ADOPT-COPY | The honest substrate — red-matrices §10–11 rules ADOPT of the v3 census; produced real product evidence |
| `formation/mobile-safari-source-closure-v4-source/SOURCE-READY.md` | `407450d70e9d7207ad3a369963bc246cd06d8127f9d52a4c8132b874a936ef99` | 9286 | 2026-08-02T03:41:59 | ADOPT-COPY | Directory referenced by CONSTELLATION-REMAINING-AUDIT-PLAN:583; never-run preflight preserved as-authored |
| `formation/mobile-safari-source-closure-v4-source/preflight-value-mobile-v4.mjs` | `8b345aa5cca0ca0125bebc6809515c579dc10b8d13f22be4f895c9377e3e34fa` | 49846 | 2026-08-02T03:41:59 | ADOPT-COPY | Directory referenced by CONSTELLATION-REMAINING-AUDIT-PLAN:583; never-run preflight preserved as-authored |
| `formation/mobile-safari-source-closure-v5-source/SOURCE-READY.md` | `c176fe28af0df1302b576b4c6b2c5d75db9e1bbdd3b05dfdcbb0d8f15677f89d` | 6371 | 2026-08-02T14:17:57 | ADOPT-COPY | Directory referenced by CONSTELLATION-NEXT-SOURCE-WAVE-RULING:26; never-run preflight preserved as-authored |
| `formation/mobile-safari-source-closure-v5-source/preflight-value-mobile-v5.mjs` | `33bf743458517b53f469d35684c994e6d0a449b002a59c32a53929fdb53d8421` | 524158 | 2026-08-02T14:17:57 | ADOPT-COPY | Directory referenced by CONSTELLATION-NEXT-SOURCE-WAVE-RULING:26; never-run preflight preserved as-authored |
| `formation/mobile-safari-source-closure/README.md` | `f5863ade7c9e1374535371838364a1619a1d496f2d00cf4d7826782caad30524` | 2574 | 2026-08-01T20:07:15 | LEAVE-IN-PLACE | Artifact-less capture attempt (README + tools only); red-matrices §10 retires the 0/5 framing; superseded by v3 |
| `formation/mobile-safari-source-closure/tools/freeze-source-snapshot.mjs` | `aacf024229638486cc79f1caf946ab3d2b89d4c39f27e593197004d8b6967569` | 9188 | 2026-08-01T20:07:15 | LEAVE-IN-PLACE | Artifact-less capture attempt (README + tools only); red-matrices §10 retires the 0/5 framing; superseded by v3 |
| `formation/mobile-safari-v7-control-map/CONTROL-MAP.json` | `25f9545ac62f914ef2188f8260ab56f53835e74d2a3a3e7683772fa28cd39f45` | 57602 | 2026-08-02T20:54:42 | ADOPT-COPY | Directory referenced by VALUE-V7-CONTROL-MAP-HOLD-INTAKE:13 |
| `formation/mobile-safari-v7-control-map/RECEIPT.md` | `3c00fa4dd2a4f60ab277a020a0b974fe2e6aa2455b78abe0242fb5521fba2223` | 3549 | 2026-08-02T20:54:42 | ADOPT-COPY | Directory referenced by VALUE-V7-CONTROL-MAP-HOLD-INTAKE:13 |
| `formation/mobile-safari-v7-control-map/checksums.sha256` | `d784658d2c1cb4c6f13cf82373975d3462f6a17eacadb7eb6ed400fd2c9c4767` | 160 | 2026-08-02T20:55:45 | ADOPT-COPY | Directory referenced by VALUE-V7-CONTROL-MAP-HOLD-INTAKE:13 |
| `prototypes/value-boundary/README.md` | `c736facd1405b2852529771fb7089996ad2b5f5f21c55dd02cb48ff21960efa0` | 997 | 2026-07-29T17:23:23 | ADOPT-COPY | Isolated formation prototype (never product source) encoding the folded P2/P3 boundary constraints |
| `prototypes/value-boundary/contract.ts` | `f943d9f74b1266155606e57819d1b5d25070377c404e4ed2d0e897299a4f13d2` | 7735 | 2026-07-29T17:34:49 | ADOPT-COPY | Isolated formation prototype (never product source) encoding the folded P2/P3 boundary constraints |

## 3. Adopted-copy digests

The copy's own sha256 (header + original bytes), for every adopted file, path relative to
`formation/codex-worktree-7e28/`:

| Adopted copy | sha256 (copy) |
|---|---|
| `VALUE-FORMATION-PACKET-2026-07-29.md` | `534976f9722ec71f1cbcee45f8905f1c59e3d8b26ab5ccf20d55eb2b11a81409` |
| `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-2026-08-02.md` | `695eb4a61baa554d47607921a20d291c9fd43908f98578a26b905278ee7a13c4` |
| `audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md` | `8f50fdddae5ecd878f26cc9a029c436059b2cd8c0db09573c6ccc3355c0f7821` |
| `audit/formation/FORMATION-CLEAN-AUDIT-1-2026-07-29.md` | `db79fe748acb20372c83e6b733c303559e02d06b5f13f426a819599558c2ca03` |
| `audit/formation/FORMATION-CLEAN-AUDIT-2-2026-07-29.md` | `e44eb22f1e2c80f13f7917ad737a173a9749d65907857b28cb91e25717d25bf5` |
| `audit/formation/NON-PARSER-HOSTILE-REVIEW-A-2026-07-30.md` | `4b8064a287d1d69a6855d404a9e3ace3ecb875d100f3d393cf3bb09027edc65c` |
| `audit/formation/NON-PARSER-HOSTILE-REVIEW-B-2026-07-30.md` | `807dfccc6dc9d01f4f98d6a26da7309b7cc6d36b312a7677dbd9d39818d7578d` |
| `coordination/CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md` | `397092327e99bb197fc95741cec48891ca9275a0473174f1253f723ffc7eb80e` |
| `coordination/FORMATION-CLEAN-A-DISPATCH-2026-07-29.md` | `f3b2f7a3709d35dca5f494ce7d7c01f285b774456112b02501af6e0f8652c3c9` |
| `coordination/FORMATION-CLEAN-A-REPLACEMENT-DISPATCH-2026-07-29.md` | `e3d5f63db3994ed089a66c72d561a339a0965dd3f3275c27f0d15db1ee0471ad` |
| `coordination/FORMATION-CLEAN-B-DISPATCH-2026-07-29.md` | `b7853d106ef3169d8dc44abd66929a269e89b338ffbfa953c92e6782e2f1dea6` |
| `coordination/FULL-SUBJECT-P2-LUNA-DISPATCH-2026-07-29.md` | `85582c254eeb74472d06525a8554cece04cb0a00bb21e207d9e5c5b79c46cc71` |
| `coordination/FULL-SUBJECT-P3-SOL-DISPATCH-2026-07-29.md` | `0ee7b5ca53027b4df8a0f383d72ef72db26c3777eede14eb74ff080c2d4444d0` |
| `coordination/KEYFRAMES-VALUE-SURFACE-2026-07-29.md` | `2e7a63bcb1ab8a2f1b8bfefad2d9c2b63c2ad18d7b611da98584462154e9eaa7` |
| `coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md` | `a3e69c41318bcb959aa2b3a6b8f1e3f94299a98036c0588f4cf27e076f98a5de` |
| `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md` | `b56b064e68a727f65b47b209d3c1d639d57112f26c45cc65c12596325f73c1b3` |
| `coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md` | `79272f4e50947f08de3a6ad0b3205af6ebcc892bce0828100a515863033c549f` |
| `formation/API-POLICY-V-API-01-2026-07-29.md` | `797b5eb28a65f7284fc728dfa03c294cd1981d416e8ab404195d51984ffbeae4` |
| `formation/COMPONENT-WORKFLOW-MATRIX-2026-07-29.md` | `b441d8ab1ef69654aba168caba2ad0c05e538e84604ba7bcb13ece9c02e57492` |
| `formation/FORMATION-AUTHORITY-STATUS-2026-07-29.md` | `23f4388fe7016862b87443fe358c4064e3a3fbcc75401ce2689a58e0476f1876` |
| `formation/FORMATION-AUTHORITY-STATUS-R1-SUPERSEDED-2026-07-29.md` | `e14478cb107e7109423127d44652713c2f65682085d23ab82cee8cc835102168` |
| `formation/FORMATION-AUTHORITY-STATUS-R2-AMEND-SUPERSEDED-2026-07-29.md` | `9d00e186bb2e142d05b9a28dd57b8b846e5b58eafd69d73da1b634c56fd4b77a` |
| `formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md` | `08eac0f4a15e828a59d99bd5d961be90733e65ac00d6c43014db043c7a995814` |
| `formation/NON-PARSER-LATER-AGGLOMERATION-2026-07-30.md` | `80c828eee6fde53ecc0b491500dc6ca3c6751fda99491baf068d10f3746421ec` |
| `formation/NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md` | `a36f84036f447f7fbe4a40940c4ad56212b52f34f613c46989368aeef411f2a3` |
| `formation/PI-DELTA-MANIFEST-2026-07-29.json` | `d920b9ce61875d746729346f2ef6611dbc198743e1f7f7f264ac336e35277119` |
| `formation/RESEARCH-PASSES-AND-BROWSER-AUDIT-2026-07-29.md` | `02a1e21ec5fabd25f5aec7884b70096d3526288e841280e23e8c19a0a9109993` |
| `formation/TYPED-DAGS-AND-DISPOSITIONS-2026-07-29.md` | `feefff645a09525d14b5d1e3a65b0e1f6a89d52229c9124bc857ded1e73c971e` |
| `formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md` | `8d2d3183ae0b41647082509ae6e2f03866ac6e42f16ea87de5b01061d490afcf` |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md` | `822adb94b0da5e3b74d7c2161067492ebbbc68223c2b04ba4fdd686055c7f66d` |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V4-OWNER-INTAKE-AND-V5-SOURCE-RULING-2026-08-02.md` | `0c46aa3a4b370c98ef03dd0a068d631b3e8fc0f4f92f196105d1d12bdd17c275` |
| `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V5-HOSTILE-ORDER-OWNER-CORRECTION-2026-08-02.md` | `aef79dff2d6883173c22094be036a261aed4905336ae85d83385a12d2fb4b7eb` |
| `formation/VALUE-MOBILE-SAFARI-V7-44-CONTROL-REGISTRY-OWNER-DECISION-2026-08-02.json` | `54a27b331ab977a238c0677d08baa67b2a8cb5c7d4dfd828b7e30b5e9197c022` |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-OWNER-RELEASE-2026-08-02.json` | `e45e55b4ad7ab95fafee5fa5d2a85ed17b779d55134798f0682d50ccb7042cda` |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-CURRENT-TUPLE-REBIND-2026-08-02.json` | `c0fb7a38efe8ca38c5e5a1d2be1ac29f248cf504f44324f9a22eee3b0b710605` |
| `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-OWNER-RULING-2026-08-02.json` | `25a460c64b21dd51587b94d75f89294c75183c184cab6d597d4a5fde59bd37f5` |
| `formation/VALUE-MOBILE-SAFARI-V7-SOURCE-ONLY-OWNER-DECISION-2026-08-02.md` | `bbeeade2ad03e42ac8f2b9bf070cfb09e60eeccdc20d27bc74498ed6d78c1f53` |
| `formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md` | `48999c87efec34f7c5ba6810fc5f245479e9bd565a20f00e0ec10b55e9c6328e` |
| `formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md` | `0002ed933f7628797792c28258c37b150b2eb10a767eb5113db20225757d0f50` |
| `formation/full-subject/CLEAN-A-ABSORPTION-MANIFEST-2026-07-29.json` | `5d0c8f43e90b521080c9dd4399df00762cc4c1bca36935bfeb82cf681485d9c1` |
| `formation/full-subject/CLEAN-A-AUTHORIZED-COORDINATE-RULING-2026-07-29.md` | `5897fbb4af7b55bb842ffca86220dfa7b28771b49f01f52eac04cfc44ee073d7` |
| `formation/full-subject/CLEAN-A-CA01-ABSORPTION-RECEIPT-2026-07-29.md` | `01aae229b40e57d3d7a8d5d292214117b3b7e58fa90d9ab56c7f8afdf9e7dec0` |
| `formation/full-subject/FORMATION-CLEAN-A-REPLACEMENT-OWNER-INTAKE-2026-07-29.md` | `5c1a5cceb8f54eeb3a3e27cdde633f3907ee622b345078b66ca4e7b9067e84f7` |
| `formation/full-subject/FORMATION-CLEAN-A-ROOT-REBIND-2026-07-29.md` | `bde1a737672dbbae2a519ee9ad051e45bf1b3ff60ee681942477bac349c35d19` |
| `formation/full-subject/FORMATION-CLEAN-B-OWNER-INTAKE-2026-07-29.md` | `fcb2d0f14e46890fddfbd32ba206aafa410c5f22a8c8dfb2bbf55f5496d85195` |
| `formation/full-subject/FULL-FAMILY-DENOMINATOR-2026-07-29.json` | `4b11876679ee174ed7f472211e5816dfe7707387955b45c0b23d1a56510aece6` |
| `formation/full-subject/FULL-SUBJECT-P1-REGISTRY-2026-07-29.json` | `3f97ecc29dc20ac6d707acc3009197f0360776dfe2cc97b60eb69cf691a0f3ea` |
| `formation/full-subject/FULL-SUBJECT-P1-SOL-2026-07-29.md` | `6f1750f61745327a9c1bf8cdd835cb494388cb33d759098b4c6420af74540f54` |
| `formation/full-subject/FULL-SUBJECT-P2-INTAKE-2026-07-29.md` | `aade4a8f4b54efc2123efc2264d9db1dd522a77d8d3d35b906a69e439979a3c5` |
| `formation/full-subject/FULL-SUBJECT-P3-FINAL-OWNER-INTAKE-2026-07-29.md` | `3d33bb917329deb3e4df27d11632e45aec0188d4917cbfba431e851908a3ce12` |
| `formation/full-subject/FULL-SUBJECT-P3-INTAKE-2026-07-29.md` | `a22732d3a542d0f1c424d28b846cef7fc806fcd1cf6e8d8127f9f726de229ff6` |
| `formation/full-subject/FULL-SUBJECT-P3-INTAKE-INVALIDATION-2026-07-29.md` | `8d418dc9b2f857e87d7adb5c9e5c12c9b3a69411fc3134869206d653cec265d8` |
| `formation/full-subject/FULL-SUBJECT-P3-POST-INTAKE-CORRECTION-2026-07-29.md` | `319ed5b5534a498599aafaa80a68eba08438c03d874cc8a5dc4a2e79ca533993` |
| `formation/full-subject/FULL-SUBJECT-P3-ROOT-REBIND-2026-07-29.md` | `390f3e6169b0a15ac580f6db8342be59394d41cd0ebd0f226898e13f409ce71c` |
| `formation/full-subject/VALUE-FORMATION-FULL-SUBJECT-ADMISSION-RECEIPT-2026-07-29.md` | `f0b17a158aaa2c8c9c812c1559991156af514c7e25adc41d51cae07cb358fc52` |
| `formation/full-subject/VALUE-FORMATION-ROOT-REBIND-R2-OWNER-VERIFICATION-2026-07-29.md` | `2b2152f6b7eef89f1af77de2ecaa712f1de3f6040272fe0ab911f312783e1414` |
| `formation/full-subject/VALUE-PACKET-CANDIDATE-EVIDENCE-CORRECTION-2026-07-29.md` | `3d382faca4bc9ceef35d73749e763cfad6ab2ae460cf93eb02883915d42f0969` |
| `formation/full-subject/validate-clean-a-absorption.mjs` | `8b898478e5fad357644d58772790720a7b232dd26eac940fb119fc46876ebbe5` |
| `formation/full-subject/validate-full-subject.mjs` | `018f70a4ffe158bac844e39d5c915c5cea2143ac00e550c9653db6a43b788850` |
| `formation/mobile-safari-source-closure-v3/COMPONENT-INVENTORY.json` | `6fa7ea2bd2d72db6fa6cf2761e7d23b1d899b5219b0f27f785f981d9cfa8f4a1` |
| `formation/mobile-safari-source-closure-v3/DESIGN-BRIEFS.json` | `2da1969333c68ef6576b1572434ca53fd614353ec3493396e5443f4666cba337` |
| `formation/mobile-safari-source-closure-v3/EQUIVALENCE.json` | `da082cd2320920933e16773da97f8ff9c6683fa2a116ed4ba2aa128063a06c44` |
| `formation/mobile-safari-source-closure-v3/GENERATION-VALIDATION.json` | `ab6f78d33bba3e78de485b8ce4bcf4be8a882ae4cf8e381bdc0ffa1b0a738835` |
| `formation/mobile-safari-source-closure-v3/KRONECKER-REGISTRY.json` | `1e8f668fde537d94553576a5257c5b5239eff2769b4f977052e6923d9bfabcee` |
| `formation/mobile-safari-source-closure-v3/MOUNT-GRAPH.json` | `5726f61f92705b60b8aa148bd8d6bb5557442e4663fcfe41d065aaf1e6075a31` |
| `formation/mobile-safari-source-closure-v3/PAGE-INVENTORY.json` | `b23be7748f53eaee09a27a30f444d444ee4e80cee5fd0b64f92ba663457dd5a3` |
| `formation/mobile-safari-source-closure-v3/README.md` | `cee082ed172550a69851f3b1f5c196408a80ae23e53ea24b8af9ca66dde228d2` |
| `formation/mobile-safari-source-closure-v3/SOURCE-SNAPSHOT.json` | `1963a247e7628f324d6de180d3de98e73055ea24779ca4c72df8ecaa59adadbc` |
| `formation/mobile-safari-source-closure-v3/STATE-REGISTRY.json` | `f0874d34c0ac94bc7a1bd026f644cf041cb971c4b5a2afa2e33f1d2be3932375` |
| `formation/mobile-safari-source-closure-v3/VALIDATION.json` | `d33e728864eeb6511779539445a8ff37bdc6ad22940e500cbef0f35935f21040` |
| `formation/mobile-safari-source-closure-v3/raw/COMPONENT-PARSE-RAW.json` | `65d0b3aba3891f6e04064df41732e8ed2d703dd69761211152ed66539a7f8e8f` |
| `formation/mobile-safari-source-closure-v3/raw/DESIGN-INPUTS-RAW.json` | `9d149e63ec1e351736edef27c0fec435d7e07f58f36377e23b999370bec08b59` |
| `formation/mobile-safari-source-closure-v3/raw/KRONECKER-FACTORS-RAW.json` | `a021e28a6a0394bfe9be8c9a3bd4789a5a8b435db87b58ccbc87d500ef51d217` |
| `formation/mobile-safari-source-closure-v3/raw/MOUNT-PARSE-RAW.json` | `47c7327507b664c1487ae82b6c7c7cc8d03679f8b30333e5491eb8cd1f74b90d` |
| `formation/mobile-safari-source-closure-v3/raw/ROUTE-PARSE-RAW.json` | `238c2e7b82d4df883761907440fc5828f6f1b7ecfcfdbfb3eb54594cd7e18c4d` |
| `formation/mobile-safari-source-closure-v3/raw/SOURCE-READ-RAW.json` | `c52caa89c0eecdd3340cdc2caa657dbffa127610187ce45b33488d06ab0daf2f` |
| `formation/mobile-safari-source-closure-v3/raw/STATE-ORIGINS-RAW.json` | `bae692e2c97fb835f88d97240e83c6daeaeca1f648a55ebbaed5515c939f8be1` |
| `formation/mobile-safari-source-closure-v3/raw/VALIDATOR-RAW.json` | `7d5d1ae53273fec269d84a72f21aa0d3c7e692e103fed343b3dc83dae0c7b02f` |
| `formation/mobile-safari-source-closure-v3/tools/freeze-source-snapshot.mjs` | `5f1c1158e6089baad841cf5943403c390c5d77389e5e29be7799e58ed150fd59` |
| `formation/mobile-safari-source-closure-v3/tools/generate-source-closure.mjs` | `20433705b33c117f4eb78958dffae6397d7437bc8c5044c939299b86060fe492` |
| `formation/mobile-safari-source-closure-v3/tools/validate-source-closure.mjs` | `c3b93cf207c518f3413e3eb7be6ff264d57634f484f63c967abba4358c94d1a6` |
| `formation/mobile-safari-source-closure-v4-source/SOURCE-READY.md` | `3c498887578cf0c92d8e23e58e0d951148b499af464ec9a7ca20e2887da3c045` |
| `formation/mobile-safari-source-closure-v4-source/preflight-value-mobile-v4.mjs` | `9ed86da52f1486e51675b6fd1cd49a1298e91cb0776ccb306a0a7236b6fafbf2` |
| `formation/mobile-safari-source-closure-v5-source/SOURCE-READY.md` | `3009a57ac94b868181ad49bf8ea5ae301e9e967aa02f7fe03c70d68e910ded5a` |
| `formation/mobile-safari-source-closure-v5-source/preflight-value-mobile-v5.mjs` | `116050ced22d5db4d80c674244a28c78a4d40f91a64dfac4f691d2032112b184` |
| `formation/mobile-safari-v7-control-map/CONTROL-MAP.json` | `0cb679c834241fe500826ee479bf68b2abddc54b050f7885240e1d895226c966` |
| `formation/mobile-safari-v7-control-map/RECEIPT.md` | `410060f9b948bfbbc60a86cbc326fc4aa0a96db53987d920983b3ff1872c7a74` |
| `formation/mobile-safari-v7-control-map/checksums.sha256` | `cf9c9f9df8d7ed66506ff63bc5e6b8f4c7ee0c70e6dd25d46573525a527fb1b5` |
| `prototypes/value-boundary/README.md` | `9aa96ac0b03d50f5cd06d042a6335c1df46a9c014369e2a5789488f26007795d` |
| `prototypes/value-boundary/contract.ts` | `3d4d2a9d5a61465be36e330a04601a4ffa677bb69f3d71556d412a22d9aad31a` |

## 4. THE COLLISION — `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md`

Two documents share this name with different bytes:

| Tree | Title | Bytes | sha256 |
|---|---|---:|---|
| Repo of record (tracked) | "Producer artifact boundary — Glass, Value, and Keyframes" | 5661 | `1450204640b34362dca019a3e6cb6721c7f0bdf7c208aec6ce7ddb2462c9e4e9` |
| 7e28 worktree (untracked) | "Producer Artifact Boundary — Value Receiver" | 3463 | `91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e` |

**RULING: the repo-of-record variant governs.** Grounds: (1) the worktree variant's own header
(line 5) names the repo-of-record path as its "Upstream durable evidence" — by its own testimony it
is derivative; (2) the record variant is the fuller upstream terminal-findings packet (isolated watch
reproduction, exact dependency census, acceptance delta) from which the receiver digest condenses;
(3) under M-21 §2 the Codex-authored receiver's forward bindings (its V.H1/V.G1 wave-receiver
assignments, its Glass-8 candidate-pack admissibility language) are audit subjects, not standing
authority. The worktree variant is preserved as
`coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md` (copy sha256
`b56b064e68a727f65b47b209d3c1d639d57112f26c45cc65c12596325f73c1b3`) — a distinct derivative
document under a disambiguated name, NOT a competing version of the record file. Nothing unique to
it binds until re-ruled by a live formation.

## 5. RESURRECTION-HANDOFF §4 "Exact Value authority" — pin verification

All six SHA-pinned artifacts in `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md` §4 were located
in the worktree and their digests verified against the census hashes; all six are now ADOPTED:

| §4 pin | Census match | Verdict |
|---|---|---|
| `VALUE-NON-PARSER-CONVERGENCE-MATRIX` `717bf1e3…` | identical | VERIFIED, adopted |
| `VALUE-PARSER-LAW-CONVERGENCE-MATRIX` `244c448a…` | identical | VERIFIED, adopted |
| `FORMATION-AUTHORITY-STATUS` `713ae753…` | identical | VERIFIED, adopted |
| `NON-PARSER-CONVERGENCE-OWNER-RECEIPT` `973799e4…` | identical | VERIFIED, adopted |
| dependency-only AMEND intake `29303183…` | = `CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md` | VERIFIED, adopted |
| `RESURRECTION-DEPENDENCY-SAFE-BOUNDARY` `0cc04422…` | identical | VERIFIED, adopted |

This CURES the K-14 refutation ("5+ pinned paths exist only in `~/.codex/worktrees/7e28`"): every §4
pin now resolves inside the repo of record via `formation/codex-worktree-7e28/`.

**The standing exception (K-13, unchanged):** `VALUE-FORMATION-PACKET-2026-07-29.md` — the
live-cited "immutable" formation candidate — carries current sha256 `d07b6ddc…` (mtime 2026-08-02,
~3.5 days post-seal), matching neither recorded seal digest. It is adopted AS-FOUND, sole extant
version, with this caveat travelling in its header row and here. The pinned
`validate-constellation-dag.mjs` invocation (tooling.md:348) remains historically unrunnable against
the sealed digest; it can now at least be run against the adopted as-found bytes.

## 6. Dangling-reference resolution

`grep -rn "7e28" docs/tranches/V/megatranche --include='*.md'` returns 43 match lines; 1
(`registry/HYDRATION-LEDGER.md:221`) is a FALSE POSITIVE (the substring `97e28e` inside an unrelated
sha256), leaving **42 true references across 21 files** (the audit's "~45 across ~21"). Resolution:

| Referencing doc (lines) | Referenced artifact | Resolution |
|---|---|---|
| `SCOPE.md:388`, `CONSTELLATION-COMMISSION-2026-08-03.md:156` | the census program itself | RESOLVED — this document |
| `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:87` | KRONECKER-AUDIT-PLAN | RESOLVED — adopted |
| `CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md:151` | worktree root | RESOLVED — whole-tree census (§2) |
| `coordination/CONSTELLATION-OWNER-SLOT-ADMISSION-OVERLAY:77` | V7-SOURCE-ONLY-OWNER-DECISION | RESOLVED — adopted |
| `coordination/CROSS-REPO-DECISION-LEDGER:86` | full-subject/CLEAN-A-AUTHORIZED-COORDINATE-RULING (`d31238f7…`) | RESOLVED — adopted, digest verified |
| `coordination/VALUE-V7-QUIESCENT-CAPTURE-TERMINAL-MECHANICS-RED-INTAKE:15` | V7-QUIESCENT-CAPTURE-OWNER-RELEASE.json | RESOLVED — adopted |
| `coordination/CONSTELLATION-NEXT-SOURCE-WAVE-OWNER-DECISIONS:20` | V7-44-CONTROL-REGISTRY.json (`7994587a…`) | RESOLVED — adopted, digest verified |
| `coordination/CONSTELLATION-NEXT-SOURCE-WAVE-RULING:26` | `mobile-safari-source-closure-v5-source/` | RESOLVED — dir adopted |
| `coordination/CONSTELLATION-REMAINING-AUDIT-PLAN:583` | `mobile-safari-source-closure-v4-source/` | RESOLVED — dir adopted |
| `coordination/VALUE-V7-QUIESCENT-CAPTURE-R2-OWNER-DECISION-DRIFT-INTAKE:11` | V7-QUIESCENT-CAPTURE-R2-OWNER-RULING.json | RESOLVED — adopted |
| `coordination/VALUE-V7-CONTROL-MAP-HOLD-INTAKE:13` | `mobile-safari-v7-control-map/` | RESOLVED — dir adopted (3/3 incl. checksums) |
| `coordination/SESSION-CONSTELLATION-2026-07-29:15` | worktree root + owner intake `56afeefd…` | RESOLVED — census + adopted intake, digest verified |
| `coordination/PARSER-CSS-PAUSE-HANDOFF:48,108` | PARSER-LAW matrix (`244c448a…`); DREI V11 two-review intake | RESOLVED — both adopted, matrix digest verified |
| `audit/codex-provenance/CODEX-PROVENANCE-AUDIT:36,91,101,167,209,252,297` | the corpus / this census program | RESOLVED — this document discharges C-11 / row 28 |
| `audit/codex-provenance/tooling.md:348,357` | VALUE-FORMATION-PACKET (validator input) | RESOLVED-WITH-CAVEAT — adopted as-found (K-13 mutation stands) |
| `audit/codex-provenance/supersession.md:21,416,429,444` | worktree root, §4 table, formation/ dir, this census | RESOLVED — §5 above + this document |
| `audit/codex-provenance/sessions.md:59,153,239,313,389` | worktree root / lane descriptions | RESOLVED — descriptive; census makes the corpus reachable |
| `audit/codex-provenance/parser-verify.md:145,147,169` | PARSER-LAW matrix; DREI V11 intake; RESURRECTION-DEPENDENCY-SAFE-BOUNDARY | RESOLVED — all three adopted, digests verified |
| `audit/codex-provenance/red-matrices.md:60,162,225,410` | V7-44 registry; DREI V11 intake; PARSER-LAW matrix; formation/ closure attempts | RESOLVED — first three adopted; the five capture attempts ruled (v3/v4/v5 adopted, v1/v2 LEFT as retired) |
| `audit/cross-repo/VALUE-FORMATION-ADMISSION-RECEIPT:12` | worktree root | RESOLVED — census |
| `audit/cross-repo/CONSTELLATION-ROOT-DAG-R2-FALSE-GREEN-AUDIT:59` | full-subject/VALUE-PACKET-CANDIDATE-EVIDENCE-CORRECTION | RESOLVED — adopted |

**Net:** 42/42 true references now resolve — 38 to adopted copies / the census itself, 3 descriptive
references resolved by the census making the corpus reachable, 1 (tooling.md validator pin)
resolved WITH the standing K-13 caveat. The five-attempt `formation/` listing resolves by explicit
ruling (v1/v2 LEFT as retired attempts, hash-recorded in §2).

---

## 7. RE-VERIFICATION 2026-09-17 — X-W0.d (CC-026 / C-11), gate HG-9

**SERVED MODEL: claude-opus-5[1m]**

*This section is a dated **addendum-beside** (E-3). §1–§6 above are IMMUTABLE and not one of their bytes
was altered; the ruling of 2026-08-03 stands as ruled. Nothing outside this file was written: the 90
adopted copies are immutable by `waves/W0.md` §File Bounds `:101` (read/hash only), and `~/.codex/**` is
read/hash only by M-21 §2. HG-9 is this wave's **re-verification and regression check, not a cure**
(`waves/W0.md:268`).*

**Unit**: X-W0.d — Worktree-7e28 Corpus Closure.
**Spec sections executed**: `docs/tranches/X/waves/W0.md` §Agent Units "X-W0.d" `:165–170` · §Scope 4 `:27`
· HG-9 `:266–269` · §Commit Plan row 3 `:373` · §File Bounds Do-NOT-touch `:101`.
**Run**: 2026-09-17, branch `tranche-u`. Repo HEAD at measurement open **`c0d70599`**
⟨`git log --oneline -1`⟩. Three Track-B/C/D seats committed concurrently during the run
(`30110269`, `4ffa4f59`); **neither touches this tree** ⟨`git diff-tree --no-commit-id --name-only -r <h> | grep -c 'codex-worktree-7e28'`⟩ → **0**, **0**, and the tree re-measured 91/91/clean afterwards.

### 7.1 Verdict — **HG-9 GREEN**, four limbs, every count double-run from settled bytes

| # | HG-9 limb (`:267`) | measured 2026-09-17 | verdict |
|---|---|---|---|
| 1 | 126/126 files accounted (90 ADOPT-COPY + 36 LEAVE-IN-PLACE) | §2 carries **126** rows = **89** `ADOPT-COPY` + **1** `ADOPT-COPY-AS-VARIANT` + **36** `LEAVE-IN-PLACE`; each of the 126 given its own row below | **GREEN** |
| 2 | all 90 copies re-hash to their recorded original digests | **90/90 MATCH · 0 DRIFT** ⟨`tail -c <original-bytes> <copy> \| shasum -a 256`⟩ vs §2; and, as a second independent axis, **90/90** whole-copy sha256 MATCH vs §3 | **GREEN** |
| 3 | the `PRODUCER-ARTIFACT-BOUNDARY-2026-07-29` collision holds two distinct tracked names | **2** distinct tracked paths, distinct basenames, distinct titles, distinct bytes; all three §4 digests reproduce exactly | **GREEN** |
| 4 | `~/.codex/**` unmodified | **126/126** originals re-hash **and** re-count byte-for-byte in place in the source worktree; tree still **3,967** files; still detached at `e01d0065` | **GREEN** |

**Falsifier state** (`:269` — *"any copy whose `tail -c <original-bytes>` digest drifts from `CENSUS.md` §2"*): **no copy drifts.** §1's *"Copy verification — 90/90 payload tails re-hash to the original sha256 (byte-exact)"* reproduces at 90/90 forty-five days after it was written.

### 7.2 Method, quote-by-command

Every figure below is read from settled bytes and **double-run**; both runs are byte-identical
⟨`cmp -s`⟩. Portable BSD commands only; `shasum -a 256` is the digest tool (the census's `sha256sum`
notation and `shasum -a 256` produce the same SHA-256).

| probe | output |
|---|---|
| ⟨`find docs/tranches/V/megatranche/formation/codex-worktree-7e28 -type f \| wc -l`⟩ | **91** (double-run **91**) — 90 copies + this `CENSUS.md` |
| ⟨`git ls-files …/codex-worktree-7e28 \| wc -l`⟩ | **91** (double-run **91**) — every file tracked |
| ⟨`git ls-files --others --exclude-standard …/codex-worktree-7e28 \| wc -l`⟩ | **0** |
| ⟨`git status --porcelain -- …/codex-worktree-7e28 \| wc -l`⟩ | **0**; ⟨`git diff --quiet`⟩ worktree CLEAN, ⟨`git diff --cached --quiet`⟩ index CLEAN |
| §2 row parse ⟨`awk -F'\|' 'NF>=7 && $6 ~ /ADOPT-COPY\|LEAVE-IN-PLACE/'`⟩ | **126** rows (double-run **126**); `cut -f1 \| sort \| uniq -c` → 89 ADOPT-COPY · 1 ADOPT-COPY-AS-VARIANT · 36 LEAVE-IN-PLACE |
| per copy ⟨`tail -c <original-bytes> <copy> \| shasum -a 256`⟩ vs §2 | **90 MATCH / 0 DRIFT** (double-run identical) |
| per copy ⟨`shasum -a 256 <copy>`⟩ vs §3 | **90 MATCH / 0 DRIFT** (double-run identical) |
| per original ⟨`shasum -a 256 <original>`⟩ + ⟨`wc -c`⟩ vs §2 | **126 MATCH / 0 DRIFT** (double-run identical) |

**Three-way set equality** — the §2-derived copy-path set, the §3 listed set, and the on-disk file set
(minus `CENSUS.md`) are **the same 90 paths**: ⟨`diff`⟩ → **0** lines on both comparisons. No copy
exists that the census does not name; no census row names a copy that does not exist.

**Provenance-header integrity** (§ "Copy convention", `:21–27`) — re-measured for all 90 by taking
`header_length = copy_bytes − original_bytes` and reading only those bytes: **90/90** headers name the
`~/.codex/worktrees/7e28/value.js` origin path, the original sha256, and the original byte-count. Two
counts exceed one line, and both belong solely to the collision variant, whose header restates the
record variant's `5661` / `1450204640b3…` and its own `3463` inside its COLLISION RULING prose — a
self-documenting header, not a drift.

### 7.3 The 90 adopted copies, re-hashed — one row each

Paths are relative to `docs/tranches/V/megatranche/formation/codex-worktree-7e28/`, in §2 order.
`bytes` = §2's recorded `original-bytes`; the digest column is the **measured**
⟨`tail -c <bytes> <copy> \| shasum -a 256`⟩; `§2` compares it to the recorded original digest; `§3`
compares the measured whole-copy sha256 to §3's recorded copy digest.

| # | Adopted copy | bytes | measured `tail -c <bytes>` sha256 | §2 | §3 |
|---:|---|---:|---|---|---|
| 1 | `VALUE-FORMATION-PACKET-2026-07-29.md` | 63572 | `d07b6ddc5cf0d673b37d696c8e940fec974227a129d2f614f89f7b305ffb14e6` | MATCH | MATCH |
| 2 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-2026-08-02.md` | 7996 | `abf2c70c9cd87fd0caecb1071bc7365fb6d655d3f1eaa65a48aaf0014018e2dd` | MATCH | MATCH |
| 3 | `audit/cross-repo/VALUE-CSS-DREI-V11-TWO-REVIEW-OWNER-INTAKE-2026-08-02.md` | 7558 | `aa891714b3b6bb3386afda45201b203ac5aa1f2ef028466f303831197e992767` | MATCH | MATCH |
| 4 | `audit/formation/FORMATION-CLEAN-AUDIT-1-2026-07-29.md` | 6323 | `eea9ee13c9fdf79ed8b31be2e9c6850ba62e09a96cb64cc036975cbc0b90d5fd` | MATCH | MATCH |
| 5 | `audit/formation/FORMATION-CLEAN-AUDIT-2-2026-07-29.md` | 6016 | `4638420279de8155df1757aeea3cc2b48836bf1795c9926da732246d8aac584e` | MATCH | MATCH |
| 6 | `audit/formation/NON-PARSER-HOSTILE-REVIEW-A-2026-07-30.md` | 5097 | `addc98e525eb67ce8350eaf1fb837f94960cd04a9e2df599e723c2e033aac052` | MATCH | MATCH |
| 7 | `audit/formation/NON-PARSER-HOSTILE-REVIEW-B-2026-07-30.md` | 4790 | `214f032198c8aef0a7d87792f80822ca847f1a9ff7aaf819202aac7854f0fdd6` | MATCH | MATCH |
| 8 | `coordination/CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md` | 4275 | `29303183bf1ecc2afcf87f0246ccf5c91ff9b3ca8f5ed5f94a645447d9787456` | MATCH | MATCH |
| 9 | `coordination/FORMATION-CLEAN-A-DISPATCH-2026-07-29.md` | 4260 | `b3c5198ca8d8c3ad1bf52d3e832124983d333d366ef16f40fe3045953cf01dc3` | MATCH | MATCH |
| 10 | `coordination/FORMATION-CLEAN-A-REPLACEMENT-DISPATCH-2026-07-29.md` | 6662 | `088584824bd049abe3033a2a78292dfae1292012f80572460b3348ab7c965518` | MATCH | MATCH |
| 11 | `coordination/FORMATION-CLEAN-B-DISPATCH-2026-07-29.md` | 7465 | `ef4aeb2782fef855542946ac7c745932d0cbe10e09accad973ad8056e5e778cb` | MATCH | MATCH |
| 12 | `coordination/FULL-SUBJECT-P2-LUNA-DISPATCH-2026-07-29.md` | 2395 | `c675a73b4107971e0392be5b93ba9ef964d3f9b396d19f795018ef8c0353d205` | MATCH | MATCH |
| 13 | `coordination/FULL-SUBJECT-P3-SOL-DISPATCH-2026-07-29.md` | 2936 | `55a6405d6e5a5dfdab93e0915bab8410c1478e80364895ba00de9286454e84c1` | MATCH | MATCH |
| 14 | `coordination/KEYFRAMES-VALUE-SURFACE-2026-07-29.md` | 16421 | `f9a98d7df6addf6e0d61d2adfad7340e667f503486668da0403f1861c3965b96` | MATCH | MATCH |
| 15 | `coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md` | 3765 | `973799e4967aba0ffdb30745e97f6094edb5aecbdd2692b0eddfb3e2b98c408d` | MATCH | MATCH |
| 16 | `coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md` | 3463 | `91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e` | MATCH | MATCH |
| 17 | `coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md` | 6875 | `0cc044228f902c0f7c95c817643aff655240c0afce4c184c6bf53d596d8f76ab` | MATCH | MATCH |
| 18 | `formation/API-POLICY-V-API-01-2026-07-29.md` | 22147 | `46a88fa27beb1487365cc05aa0195b7651c483c1b66b4891b9931f39b7b8538a` | MATCH | MATCH |
| 19 | `formation/COMPONENT-WORKFLOW-MATRIX-2026-07-29.md` | 19982 | `3efc8638b765f0cb7bef019ff3d3b6a2f47664b1f66b6b9c6ff3fb9dd301c6a9` | MATCH | MATCH |
| 20 | `formation/FORMATION-AUTHORITY-STATUS-2026-07-29.md` | 64871 | `713ae753738af09985f9e5d63e96182b953c4cc62dd8daff1815b1f8e0dae1ea` | MATCH | MATCH |
| 21 | `formation/FORMATION-AUTHORITY-STATUS-R1-SUPERSEDED-2026-07-29.md` | 7766 | `6be15f28a66392a061711ea4563e20d2940f7470205a3a583e12f570dc4434f9` | MATCH | MATCH |
| 22 | `formation/FORMATION-AUTHORITY-STATUS-R2-AMEND-SUPERSEDED-2026-07-29.md` | 3331 | `bece159ef6dfc87468b86e64915ef58e1fe66215710f58bae13ce7098ee93628` | MATCH | MATCH |
| 23 | `formation/NON-PARSER-FRONTEND-SPEC-CLOSURE-2026-07-30.md` | 25198 | `a911162502a5a32cb512c00af266004e1d5d3f56ed2a963256b75caa3ee6c883` | MATCH | MATCH |
| 24 | `formation/NON-PARSER-LATER-AGGLOMERATION-2026-07-30.md` | 7638 | `d30cd8ce6c48b2c5a0fb364f07460602167c030371a3bc1325884585e3682e39` | MATCH | MATCH |
| 25 | `formation/NON-PARSER-LIBRARY-API-DAG-CLOSURE-2026-07-30.md` | 20243 | `d51e0d3056ec4b3bdebc1bad2119d453de291189dadfce8e9dd2e2bcc5ae8eff` | MATCH | MATCH |
| 26 | `formation/PI-DELTA-MANIFEST-2026-07-29.json` | 2495 | `7db1a144b038203417e405b9180041baedc0fb6229dcab3cf7a326aeff20487e` | MATCH | MATCH |
| 27 | `formation/RESEARCH-PASSES-AND-BROWSER-AUDIT-2026-07-29.md` | 11050 | `df91b6c383e6f2d37c9a69b7b62d70fac04f0e22febdef9c3ec0bc0ae9e00fd5` | MATCH | MATCH |
| 28 | `formation/TYPED-DAGS-AND-DISPOSITIONS-2026-07-29.md` | 17897 | `5736d6da2451a3b558952736038b5d2b382ede79aadecbf3709491d6edd2a6cd` | MATCH | MATCH |
| 29 | `formation/VALUE-MOBILE-SAFARI-KRONECKER-AUDIT-PLAN-2026-08-01.md` | 34851 | `18f8ac83045496e6553d10d21e5cea26d2da43304952d4c67940aecb2e7a72ef` | MATCH | MATCH |
| 30 | `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md` | 12782 | `0a81da8ccbf6a36cbc91b3ebe174d3e8e92d8803e195fcc9527b63dba8ab4065` | MATCH | MATCH |
| 31 | `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V4-OWNER-INTAKE-AND-V5-SOURCE-RULING-2026-08-02.md` | 10162 | `26e3bbc50a14f06a2b2cfcd1e692f99efce3489ddc3ff68914ce3f44ab2e9921` | MATCH | MATCH |
| 32 | `formation/VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V5-HOSTILE-ORDER-OWNER-CORRECTION-2026-08-02.md` | 6522 | `b9febba9ee253299b5917005b1f882974c9858007d1391015fad4576bb50c485` | MATCH | MATCH |
| 33 | `formation/VALUE-MOBILE-SAFARI-V7-44-CONTROL-REGISTRY-OWNER-DECISION-2026-08-02.json` | 41990 | `7994587aacd548c724be75e3b3756f21bfa6e326e4856cd50675c8c73c280e5e` | MATCH | MATCH |
| 34 | `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-OWNER-RELEASE-2026-08-02.json` | 26173 | `32da65a2a831d4d335f3a23664ca33ef5f78709662826117dc8da8bed0dc7bf3` | MATCH | MATCH |
| 35 | `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-CURRENT-TUPLE-REBIND-2026-08-02.json` | 8660 | `695358c08b33d6826abf3e82ea8d0605db9d2338cce97da1f613965b46583882` | MATCH | MATCH |
| 36 | `formation/VALUE-MOBILE-SAFARI-V7-QUIESCENT-CAPTURE-R2-OWNER-RULING-2026-08-02.json` | 12484 | `ea5eed7a6f43c8c61ed32a3f0c4f4487afa43043c48e83c39ae7b2addbbf033a` | MATCH | MATCH |
| 37 | `formation/VALUE-MOBILE-SAFARI-V7-SOURCE-ONLY-OWNER-DECISION-2026-08-02.md` | 11474 | `e1522725a855a1f413bea7a62e4bfc2c6897668f4b6f26d3a22d69c404325486` | MATCH | MATCH |
| 38 | `formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md` | 7588 | `717bf1e36e11fb9b702dc95b26be82c26bffce48c9c8a78c8a7cc3bb614435c5` | MATCH | MATCH |
| 39 | `formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md` | 30242 | `244c448a90059002be1194e6a512191c96881a9413ceb021f3b8fe7b62b504a7` | MATCH | MATCH |
| 40 | `formation/full-subject/CLEAN-A-ABSORPTION-MANIFEST-2026-07-29.json` | 2294 | `fa2c4959937338465abc7609f4e631c77b01112035f2497ce5bad0cf1caa312e` | MATCH | MATCH |
| 41 | `formation/full-subject/CLEAN-A-AUTHORIZED-COORDINATE-RULING-2026-07-29.md` | 2045 | `d31238f7785aa9bf83971c0d92ea213e57590612de1c1103b9a30ff0345d5494` | MATCH | MATCH |
| 42 | `formation/full-subject/CLEAN-A-CA01-ABSORPTION-RECEIPT-2026-07-29.md` | 4643 | `6521250dc250a7ea45a3b06fba48a1193404fd16ebe23ae9a1ec7e2bf6c7a2b6` | MATCH | MATCH |
| 43 | `formation/full-subject/FORMATION-CLEAN-A-REPLACEMENT-OWNER-INTAKE-2026-07-29.md` | 4697 | `56afeefd065edc26b7f4da75d7723f57a4f56faced41b95a432f80e3f8b82bc4` | MATCH | MATCH |
| 44 | `formation/full-subject/FORMATION-CLEAN-A-ROOT-REBIND-2026-07-29.md` | 1840 | `c714359be1ac31da3f138620e796c1b2267c79dd48d5f5c1d35bde2976c2a3f2` | MATCH | MATCH |
| 45 | `formation/full-subject/FORMATION-CLEAN-B-OWNER-INTAKE-2026-07-29.md` | 6084 | `0c57bbb5dcb32f21278c26dc37a53558812b495d74d0b6cbaaffea79931eeed6` | MATCH | MATCH |
| 46 | `formation/full-subject/FULL-FAMILY-DENOMINATOR-2026-07-29.json` | 5186 | `1d6df52abdd89dcc2e56b0aaaca6cc7d4a516eb5e8493dd4547adeebd070dd85` | MATCH | MATCH |
| 47 | `formation/full-subject/FULL-SUBJECT-P1-REGISTRY-2026-07-29.json` | 17396 | `b3929ebf6f0718c24d5c27cd9c2a14f41dd1067d0f25221250021fa9ca6c657b` | MATCH | MATCH |
| 48 | `formation/full-subject/FULL-SUBJECT-P1-SOL-2026-07-29.md` | 2798 | `c92f40faa27e8b0e1dea88f4c41d438631e14de1e08fe8eeabf9d4a0e81d589d` | MATCH | MATCH |
| 49 | `formation/full-subject/FULL-SUBJECT-P2-INTAKE-2026-07-29.md` | 3293 | `b94d0687e374386f4d2e84a50c3a04c7ad996fa28386d42d37e235cc38e29bc6` | MATCH | MATCH |
| 50 | `formation/full-subject/FULL-SUBJECT-P3-FINAL-OWNER-INTAKE-2026-07-29.md` | 5048 | `a08857a2d0a9f65fccdb5d66b72f638967324db8a959aa22729ffb78cb1d7af0` | MATCH | MATCH |
| 51 | `formation/full-subject/FULL-SUBJECT-P3-INTAKE-2026-07-29.md` | 4941 | `7b5522ea06a830b1cf624b4aa9006b27f384d3df69cc9f710df26f3698dafda6` | MATCH | MATCH |
| 52 | `formation/full-subject/FULL-SUBJECT-P3-INTAKE-INVALIDATION-2026-07-29.md` | 1913 | `a6aecec332c9bea64b0e9fd3d0c6500fb4ccee74817dde76fdfdb94a5bc25679` | MATCH | MATCH |
| 53 | `formation/full-subject/FULL-SUBJECT-P3-POST-INTAKE-CORRECTION-2026-07-29.md` | 1874 | `d342d0c711693490f2cfe9dcc9494de4187a87e116250c8602f6bf7aa59ecff5` | MATCH | MATCH |
| 54 | `formation/full-subject/FULL-SUBJECT-P3-ROOT-REBIND-2026-07-29.md` | 1547 | `bc5b4b127390000bd0312f8a0c0f05d84dd215a5b2a5bda16f81bdc66fc5d2e3` | MATCH | MATCH |
| 55 | `formation/full-subject/VALUE-FORMATION-FULL-SUBJECT-ADMISSION-RECEIPT-2026-07-29.md` | 6892 | `4aac44577b95459dcfe977161549289a6ad1e13b33c9f4f5abef4bebcf619a2a` | MATCH | MATCH |
| 56 | `formation/full-subject/VALUE-FORMATION-ROOT-REBIND-R2-OWNER-VERIFICATION-2026-07-29.md` | 4588 | `7865862a0dcee19f2609bae1adcb981d93e8241cc5f48f1786abfd55e8f0a6cb` | MATCH | MATCH |
| 57 | `formation/full-subject/VALUE-PACKET-CANDIDATE-EVIDENCE-CORRECTION-2026-07-29.md` | 2963 | `4afa88ef3e545ffab0d7fba5ca4a99573f2a00600d0ba1d0d3691b24b7a7ff97` | MATCH | MATCH |
| 58 | `formation/full-subject/validate-clean-a-absorption.mjs` | 3492 | `838c01c1f6137289b31b009daa0cdc6039ecace712133372903119b66a3c603b` | MATCH | MATCH |
| 59 | `formation/full-subject/validate-full-subject.mjs` | 3574 | `26993d7f6dbde46c136b4e1f5905140375fbb3e90c6783d4a9e01395e28a2ea6` | MATCH | MATCH |
| 60 | `formation/mobile-safari-source-closure-v3/COMPONENT-INVENTORY.json` | 179807 | `9061128872ed32b6b03646d06592734b731b4f08860f2b3674cfef1fb06a9232` | MATCH | MATCH |
| 61 | `formation/mobile-safari-source-closure-v3/DESIGN-BRIEFS.json` | 713516 | `8f555260b94508f0f42ac737cfc4416babf98365d760ebad28e6d2417c1790e7` | MATCH | MATCH |
| 62 | `formation/mobile-safari-source-closure-v3/EQUIVALENCE.json` | 1052133 | `3bde71acd37db6c145f3e52ec851caaad9d7ac260d6d7cc7cc8d30deb9d94ae3` | MATCH | MATCH |
| 63 | `formation/mobile-safari-source-closure-v3/GENERATION-VALIDATION.json` | 1741 | `ab4d8938d600e5b1b850f8a6b4151cc1fb1f0adea1265a781a0be1f95c035d5b` | MATCH | MATCH |
| 64 | `formation/mobile-safari-source-closure-v3/KRONECKER-REGISTRY.json` | 4285839 | `ffd9b4a14e69be644826a8bd5bbe072f33a7ebbfd2363a170f49a54eef076e0d` | MATCH | MATCH |
| 65 | `formation/mobile-safari-source-closure-v3/MOUNT-GRAPH.json` | 644122 | `4597ddcc4d9ca15040684197f7b9e389d2f4bf8cc6335f415436f439f346d0c0` | MATCH | MATCH |
| 66 | `formation/mobile-safari-source-closure-v3/PAGE-INVENTORY.json` | 75684 | `d00edb047e1d38da64bd83e74ff62e3aa1ac7d3a6b3fff3e9021a4c3b9dfa3aa` | MATCH | MATCH |
| 67 | `formation/mobile-safari-source-closure-v3/README.md` | 1103 | `a930ae57021c3da90e83258d70f45818e2a2be8dd9558b60736eee3009d8532d` | MATCH | MATCH |
| 68 | `formation/mobile-safari-source-closure-v3/SOURCE-SNAPSHOT.json` | 4398524 | `cf812c05539c6fd0b0975870fa24c173936401cad0dd7b6d1953ebc6c70618b4` | MATCH | MATCH |
| 69 | `formation/mobile-safari-source-closure-v3/STATE-REGISTRY.json` | 3100241 | `588bc82387d2ffa89fa9b3f3f821b864df271646383297740ae60a7f26f5472f` | MATCH | MATCH |
| 70 | `formation/mobile-safari-source-closure-v3/VALIDATION.json` | 4133 | `e099ea40a71cb90f948da6de4407089011e9d837d875dc9df9e30613ea15de6e` | MATCH | MATCH |
| 71 | `formation/mobile-safari-source-closure-v3/raw/COMPONENT-PARSE-RAW.json` | 60147 | `9dfaeb5b5551e5d558449105ed895a4b7adb55b82e774a63cb6c8309d2e6331a` | MATCH | MATCH |
| 72 | `formation/mobile-safari-source-closure-v3/raw/DESIGN-INPUTS-RAW.json` | 34539 | `3ed23ab6962d7703fa33824b9046b313e05beb65dfdd96bfe8ba74f7ace795b4` | MATCH | MATCH |
| 73 | `formation/mobile-safari-source-closure-v3/raw/KRONECKER-FACTORS-RAW.json` | 4486911 | `8e9e1560fa498b6fcddacb5da772a34fd23c3b7767e1508709fb4e25560230f0` | MATCH | MATCH |
| 74 | `formation/mobile-safari-source-closure-v3/raw/MOUNT-PARSE-RAW.json` | 613951 | `51fa8202710fbd8022a2948f62856e5f2e282cbb6f1ad0c3d0074a23f3e71a8f` | MATCH | MATCH |
| 75 | `formation/mobile-safari-source-closure-v3/raw/ROUTE-PARSE-RAW.json` | 8215 | `09b13fd8d86d76817062c1cf8eb3e38386b761096198e2ba7aa64434cec437ae` | MATCH | MATCH |
| 76 | `formation/mobile-safari-source-closure-v3/raw/SOURCE-READ-RAW.json` | 66870 | `0487b2e76054e12471bb641ac5379208ccea6552ec3b7a5945419b932e93548a` | MATCH | MATCH |
| 77 | `formation/mobile-safari-source-closure-v3/raw/STATE-ORIGINS-RAW.json` | 48097 | `f669eef3e904d0d161c402f448ed2d0f2b0e93c63df3e901988a44dbd0bac39b` | MATCH | MATCH |
| 78 | `formation/mobile-safari-source-closure-v3/raw/VALIDATOR-RAW.json` | 4133 | `e099ea40a71cb90f948da6de4407089011e9d837d875dc9df9e30613ea15de6e` | MATCH | MATCH |
| 79 | `formation/mobile-safari-source-closure-v3/tools/freeze-source-snapshot.mjs` | 10591 | `f280cea40f604b73b0c07276bdf38c3df3b707104b6730f58e2810bced94da50` | MATCH | MATCH |
| 80 | `formation/mobile-safari-source-closure-v3/tools/generate-source-closure.mjs` | 46105 | `a4067cdb4f50265e941c35d5abd7e2acd9f0a787d86a59396ee1b6aa5f76eedf` | MATCH | MATCH |
| 81 | `formation/mobile-safari-source-closure-v3/tools/validate-source-closure.mjs` | 12050 | `811d96ee9a87a294795c9374942f2f30b28752b9a7b8bd6e5fe47a2da732f755` | MATCH | MATCH |
| 82 | `formation/mobile-safari-source-closure-v4-source/SOURCE-READY.md` | 9286 | `407450d70e9d7207ad3a369963bc246cd06d8127f9d52a4c8132b874a936ef99` | MATCH | MATCH |
| 83 | `formation/mobile-safari-source-closure-v4-source/preflight-value-mobile-v4.mjs` | 49846 | `8b345aa5cca0ca0125bebc6809515c579dc10b8d13f22be4f895c9377e3e34fa` | MATCH | MATCH |
| 84 | `formation/mobile-safari-source-closure-v5-source/SOURCE-READY.md` | 6371 | `c176fe28af0df1302b576b4c6b2c5d75db9e1bbdd3b05dfdcbb0d8f15677f89d` | MATCH | MATCH |
| 85 | `formation/mobile-safari-source-closure-v5-source/preflight-value-mobile-v5.mjs` | 524158 | `33bf743458517b53f469d35684c994e6d0a449b002a59c32a53929fdb53d8421` | MATCH | MATCH |
| 86 | `formation/mobile-safari-v7-control-map/CONTROL-MAP.json` | 57602 | `25f9545ac62f914ef2188f8260ab56f53835e74d2a3a3e7683772fa28cd39f45` | MATCH | MATCH |
| 87 | `formation/mobile-safari-v7-control-map/RECEIPT.md` | 3549 | `3c00fa4dd2a4f60ab277a020a0b974fe2e6aa2455b78abe0242fb5521fba2223` | MATCH | MATCH |
| 88 | `formation/mobile-safari-v7-control-map/checksums.sha256` | 160 | `d784658d2c1cb4c6f13cf82373975d3462f6a17eacadb7eb6ed400fd2c9c4767` | MATCH | MATCH |
| 89 | `prototypes/value-boundary/README.md` | 997 | `c736facd1405b2852529771fb7089996ad2b5f5f21c55dd02cb48ff21960efa0` | MATCH | MATCH |
| 90 | `prototypes/value-boundary/contract.ts` | 7735 | `f943d9f74b1266155606e57819d1b5d25070377c404e4ed2d0e897299a4f13d2` | MATCH | MATCH |

**90 rows · 90 MATCH · 0 DRIFT**, against §2 and against §3 alike.

### 7.4 The 36 LEAVE-IN-PLACE files, re-hashed in place — one row each

The left files were never copied, so their re-verification is at the original: paths relative to
`docs/tranches/V/megatranche/` **in the source worktree** `/Users/mkbabb/.codex/worktrees/7e28/value.js`,
read/hash only. The digest column is the measured ⟨`shasum -a 256 <original>`⟩; the verdict requires
**both** the digest and ⟨`wc -c`⟩ to equal §2's record.

| # | Left-in-place original | bytes | measured sha256 | §2 |
|---:|---|---:|---|---|
| 1 | `audit/cross-repo/VALUE-CSS-DREI-C4-OWNER-INTAKE-AND-C5-SOURCE-RULING-2026-08-02.md` | 10826 | `3f481c933d973282a770da6d3ad621ed73626546750a0cf164bd8f990bcbc919` | MATCH |
| 2 | `audit/cross-repo/VALUE-CSS-DREI-C5-OWNER-INTAKE-AND-C6-SOURCE-RULING-2026-08-02.md` | 9399 | `b88784b5f8931d4c473831bf9e9acaaf9fc6082f1474f960f830de2c93033173` | MATCH |
| 3 | `audit/cross-repo/VALUE-CSS-DREI-C6-OWNER-INTAKE-AND-C7-SOURCE-RULING-2026-08-02.md` | 13891 | `bb7b7a99c7924957dabfade4e3dc02b3ea00326efb84469078800d7d3fec67d3` | MATCH |
| 4 | `audit/cross-repo/VALUE-CSS-DREI-C7-ABSENT-ROOT-OWNER-INTAKE-2026-08-02.md` | 6293 | `66f6a30565219d657d92e8e61f3425d2f8f4f1e34d0b4f2950f5d4485df027e8` | MATCH |
| 5 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-2026-08-02.md` | 15695 | `4a025f3e42b2d8260c6fc487c425b98ab28a892ac7841260f9cb5c9006723d38` | MATCH |
| 6 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-MANIFEST-2026-08-02.json` | 32382 | `1e9632aa93b0f2b6b481c811c2f560568cbc5cd2c5f88304637c06244039b804` | MATCH |
| 7 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V10-2026-08-02.md` | 11451 | `f3d5fcd0c0b856a9e5832d9bc4227bb6589ab0e08a0d2cf63adb8d12b5111656` | MATCH |
| 8 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V10-MANIFEST-2026-08-02.json` | 65695825 | `71be78ab75334631839fd0a6f9f1c0ba060049e18fdb0cc03595edf0ada3f783` | MATCH |
| 9 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V11-MANIFEST-2026-08-02.json` | 67631782 | `e53ab2a1b3e75917b881da275d9c481656bf693b03e0dbd9338e13dc6be26b15` | MATCH |
| 10 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V2-2026-08-02.md` | 14170 | `1d0080f0a9f761f84c25f2479155788e25f80ff2468de4c60ebcdab8920d2130` | MATCH |
| 11 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V2-MANIFEST-2026-08-02.json` | 39344 | `0bbe6d22f6c3fbdbfd60a52646a6e7f06fb4082686752fb5f80a3240251f8dcf` | MATCH |
| 12 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V3-2026-08-02.md` | 15160 | `253a4fcc951ecaa4d2b974b656bfc637260d40497e24617f5ccab451a36bab7d` | MATCH |
| 13 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V3-MANIFEST-2026-08-02.json` | 51121 | `248a548eaaa8cbfe8a1c71b66d420b120d6b6ecc66dcf79accebb49b5985a913` | MATCH |
| 14 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V4-2026-08-02.md` | 17135 | `23e99e65c71a5a33850ba8a0996d4d1ec30f789fd263d086123b8a3542f4603b` | MATCH |
| 15 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V4-MANIFEST-2026-08-02.json` | 81167 | `10f02f3b59ec70cad85a6327d043ce3a4a010d6a9e9e87be9f637dfc4dd3c04c` | MATCH |
| 16 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V5-2026-08-02.md` | 13834 | `780c8a122cd74a87c67ce09ebc98ff78935868fab4feb6c21d80297c53acade4` | MATCH |
| 17 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V5-MANIFEST-2026-08-02.json` | 545075 | `81a67717305ac837362949fb273ef28dbcf9995dde6e381ebe5aa7385d0ca71a` | MATCH |
| 18 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V6-2026-08-02.md` | 24619 | `64836576d00e9dde8cb1c998f094390f7d9de240a484ae90244ea3595417b3ab` | MATCH |
| 19 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V6-MANIFEST-2026-08-02.json` | 2683437 | `a5a39f60f502b57d7d01217a6ecdfea90565bc6d9024fa7a233ac20a96c38abe` | MATCH |
| 20 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V7-2026-08-02.md` | 9180 | `f29afb45da62a100f435917e9799af286dc9ac584add67a66859729d637a3c93` | MATCH |
| 21 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V7-MANIFEST-2026-08-02.json` | 30297364 | `9b4e7031333550d5a02a9dc2f25651f8ecddc24ac91df2e108c58478dc4dd7a7` | MATCH |
| 22 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V8-2026-08-02.md` | 7603 | `46870cb30dafd05a63a966bd16a02525860d8883b87a2256c872a88586311592` | MATCH |
| 23 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V8-MANIFEST-2026-08-02.json` | 36454133 | `2f13ac398821d3fe31529cef55431b2895babeb6236644fc53170869be2a8f6a` | MATCH |
| 24 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V9-2026-08-02.md` | 10654 | `272ee4cdf2e64062461f4a115a4dfd7b715b4bfec2cc561f149c29668e08496e` | MATCH |
| 25 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-DESIGN-CONTRACT-V9-MANIFEST-2026-08-02.json` | 37527796 | `99f3952b4c906c9e1b1c6bef96028ad69f5a12a3dc99f4ebea70dafc60542949` | MATCH |
| 26 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-REVIEW-A-OWNER-INTAKE-2026-08-02.md` | 8478 | `2c9462909cbb81cf043a4ba1e8e7e3a4e2fad1e2087e59b363b519bc2046b07e` | MATCH |
| 27 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-REVIEW-B-OWNER-INTAKE-2026-08-02.md` | 10982 | `6de6f495efca185181d8def8a736a56a15f56ece07fb0b7ba1dbd5d0003a30f5` | MATCH |
| 28 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-V2-REVIEW-A2-OWNER-INTAKE-2026-08-02.md` | 8043 | `6e299660cfc1fd26b5453014eb856611501959f47d42780d520b84d62a25619f` | MATCH |
| 29 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-V2-REVIEW-B2-OWNER-INTAKE-2026-08-02.md` | 7359 | `12356ecacd94d8560ef4e3bf309958e4253b109730a88216ffb243d8fe259048` | MATCH |
| 30 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-V3-REVIEW-A3-OWNER-INTAKE-2026-08-02.md` | 6875 | `8165833532cc52d11d66ff37867846decfeb708bded11f60d7c61b7a5d2724a2` | MATCH |
| 31 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-V3-REVIEW-B3-OWNER-INTAKE-2026-08-02.md` | 9372 | `6513b430f77dad0b9a487076d29eb60fed84558b79559b0d043021125bd26867` | MATCH |
| 32 | `audit/cross-repo/VALUE-CSS-DREI-PAPER-V4-REVIEWS-A4-B4-OWNER-INTAKE-AND-V5-RULING-2026-08-02.md` | 4853 | `99faa80691bf160f4206308d1ee7dc6d86cf8d6dc495bbc87fbb86f77e529ba6` | MATCH |
| 33 | `formation/mobile-safari-source-closure-v2/README.md` | 1765 | `51753857a7fda3ccf71a5eb2147d54b888d197368d3c2ef988fb06f55de02286` | MATCH |
| 34 | `formation/mobile-safari-source-closure-v2/tools/freeze-source-snapshot.mjs` | 11422 | `bc55444924964bedd54f5f1fb3d0eef59105502daa4db140d3c309abd0493c20` | MATCH |
| 35 | `formation/mobile-safari-source-closure/README.md` | 2574 | `f5863ade7c9e1374535371838364a1619a1d496f2d00cf4d7826782caad30524` | MATCH |
| 36 | `formation/mobile-safari-source-closure/tools/freeze-source-snapshot.mjs` | 9188 | `aacf024229638486cc79f1caf946ab3d2b89d4c39f27e593197004d8b6967569` | MATCH |

**36 rows · 36 MATCH · 0 DRIFT.** With §7.3's 90, the accounting closes at **126/126**, each file
carrying its own re-measured row.

### 7.5 The collision still resolves to two distinct tracked names

⟨`git ls-files 'docs/**/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29*'`⟩ returns exactly **two** paths, and
⟨`git ls-files --error-unmatch`⟩ succeeds on both:

| role | tracked path | basename | title (`grep -m1 '^# '`) | bytes | sha256 |
|---|---|---|---|---:|---|
| repo of record (**governs**, §4) | `docs/tranches/V/megatranche/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.md` | `…-2026-07-29.md` | "Producer artifact boundary — Glass, Value, and Keyframes" | **5661** | `1450204640b34362dca019a3e6cb6721c7f0bdf7c208aec6ce7ddb2462c9e4e9` |
| derivative variant | `docs/tranches/V/megatranche/formation/codex-worktree-7e28/coordination/PRODUCER-ARTIFACT-BOUNDARY-2026-07-29.WORKTREE-VARIANT.md` | `…-2026-07-29.WORKTREE-VARIANT.md` | "Producer Artifact Boundary — Value Receiver" | **5694** (copy) | `b56b064e68a727f65b47b209d3c1d639d57112f26c45cc65c12596325f73c1b3` (copy) |
| the variant's payload | ⟨`tail -c 3463 <variant>`⟩ | — | — | **3463** | `91b9a0cee734e42229fe35d67f03c8c00b3a88552cac8b3b463cc38382d15c0e` |

All three digests equal §4's record exactly. The names are distinct at the basename, not merely at the
directory — which is what makes the disambiguation survive any future flattening. §4's ruling is
untouched and unre-opened: the repo-of-record variant governs; nothing unique to the variant binds
until re-ruled by a live formation.

### 7.6 `~/.codex/**` unmodified (M-21 §2 — read/hash only)

The strongest available read-only evidence is the corpus itself: **all 126 censused originals still
carry their recorded sha256 and their recorded byte-count in place.**

| probe | recorded (2026-08-03) | measured 2026-09-17 | verdict |
|---|---|---|---|
| ⟨`find /Users/mkbabb/.codex/worktrees/7e28/value.js -type f \| wc -l`⟩ | 3,967 (`waves/W0.md:268` — *"source worktree still holds 3,967 files, unmodified"*) | **3967** (double-run **3967**) | **unchanged** |
| the 126 originals, digest **and** byte-count | §2's table | **126 MATCH / 0 DRIFT** (double-run identical) | **unchanged** |
| ⟨`cat <worktree>/.git`⟩ | — | `gitdir: /Users/mkbabb/Programming/value.js/.git/worktrees/value.js` | — |
| the worktree's `HEAD` file | detached `e01d0065` (§Subject) | `e01d0065fa6c7c80282280566af2b9a4add809bf` | **unchanged** |
| ⟨`git merge-base --is-ancestor e01d0065 tranche-u`⟩ | *"reachable from `tranche-u`"* (§Subject) | exit 0 — **REACHABLE**; `e01d0065 docs(megatranche/archaeology): close the corrected 107-tranche evidence denominator` | **holds** |

No write, no `git` mutation, no mtime touch was performed in either tree. The HEAD reading is taken by
reading the `HEAD` file, not by running a command that could refresh an index.

### 7.7 §5's "Exact Value authority" pins, re-verified — the unit's goal, measured

`waves/W0.md:168` states this unit's goal as *"the 07-31 'Exact Value authority' pins resolve from the
repo of record, permanently."* All six §5 pins named in
`CONSTELLATION-RESURRECTION-HANDOFF-2026-07-31.md` §4 still resolve inside the repo of record, and
each resolving copy re-hashes MATCH:

| §4 pin digest | grep hits in the handoff | resolving adopted copy | re-hash |
|---|---:|---|---|
| `717bf1e3…` | 1 | `formation/VALUE-NON-PARSER-CONVERGENCE-MATRIX-2026-07-30.md` | **MATCH** |
| `244c448a…` | 1 | `formation/VALUE-PARSER-LAW-CONVERGENCE-MATRIX-2026-07-30.md` | **MATCH** |
| `713ae753…` | 1 | `formation/FORMATION-AUTHORITY-STATUS-2026-07-29.md` | **MATCH** |
| `973799e4…` | 1 | `coordination/NON-PARSER-CONVERGENCE-OWNER-RECEIPT-2026-07-30.md` | **MATCH** |
| `29303183…` | 1 | `coordination/CROSS-SESSION-DEPENDENCY-AMEND-INTAKE-2026-07-30.md` | **MATCH** |
| `0cc04422…` | 2 | `coordination/RESURRECTION-DEPENDENCY-SAFE-BOUNDARY-2026-08-01.md` | **MATCH** |

**K-14 stays cured** — 6/6 pins resolve from `formation/codex-worktree-7e28/`, none from `~/.codex/`.

**K-13's standing exception stands exactly as recorded, unchanged and not re-opened**:
`VALUE-FORMATION-PACKET-2026-07-29.md` still carries `d07b6ddc5cf0d673b37d696c8e940fec974227a129d2f614f89f7b305ffb14e6`
at 63,572 bytes (row 1 of §7.3) — matching neither recorded seal digest, adopted AS-FOUND, sole extant
version. Its being stable across 45 days is not evidence that the seal digests were wrong; it is
evidence that the as-found bytes have not moved again. The caveat travels on.

### 7.8 Findings and residuals

1. **No digest drift anywhere.** Zero rows in §7.3, §7.4 or §7.6 required a finding. The corpus is
   byte-exact on all three axes (payload tails vs §2, whole copies vs §3, originals in place vs §2).
2. **The census's own counts are exact, not approximate.** §1's `126` / `90` / `36` / *"90/90 payload
   tails"* all reproduce by independent re-derivation from the §2 table rather than by reading §1.
3. **Nothing in §1–§6 is corrected, so nothing is rewritten.** Had any row drifted, the cure would have
   been a finding stated at that row **in this section** — never an edit to §2 and never a re-hash of the
   ledger (`waves/W0.md:169`, §Agent Units X-W0.d).
4. **Residual, reported not acted on (out of this unit's bounds):** the 7e28 corpus is *frozen by rule* —
   `waves/W0.md:101` and HG-17 exclude these 90 copies from X-W0.i's `V·L5` live set precisely because
   editing one would break this gate's digest re-hash. This re-verification is the measurement that makes
   that exclusion checkable: any seat that edits a copy will be named by the next `tail -c` run. The 19
   frozen copies carrying the `V·L5` token remain correctly untouched at this run.
5. **No escalation.** Every limb of HG-9 was executable at the bytes as specified.
