# Tranche V — Palette Contract (honest core)

This is the live, product-proportionate palette authority. It folds the eight formation-era
palette documents into one honest core:

- `PALETTE-DOMAIN.md`, `PALETTE-FACILITIES.md`, `PALETTE-WIRE-CONTRACT.md`,
  `PALETTE-CURSOR-CONTRACT.md`, `PALETTE-OPERATIONS-REPLAY-CONTRACT.md`,
  `PALETTE-LOCAL-RAIL.md`, `LEGACY-PALETTE-SOURCE-CONTRACT.md` — their speculative armor
  (~70% of ~350KB with no consumer at this product's scale) is **RETIRED-AS-SPECULATIVE**
  per RF-9/24 and owner bracket **B2**. The full register is preserved VERBATIM at
  `archive/palette-armor-register.md` — a register, **not a bank**: a future multi-tenant
  product re-derives it from scratch.
- `PALETTE-EXPORT-CONTRACT.md` — its byte-exact contract transfers VERBATIM into the
  **Appendix W51** below. That appendix is W51's byte authority and **may not be
  prose-compressed**.

**Ownership.** `W45` (Palette honest core) is the executing wave for §1–§4 below.
`W51` (Palette export) is the executing wave for the appendix. `ARCHITECTURE.md §5` owns the
api topology and deployment edge; the running api + `CHANGELOG.md` are the wire ledger of
record. The immutable Value4 `/color` `toRgba8` (W8) is the sole Color→byte authority the
export appendix consumes.

**What is retired (bracket B2, register at `archive/palette-armor-register.md`).** Workspace /
PalettePolicy / ReleasePolicy separation, the Principal-bitmask + PrincipalAuthority +
AuthFence + AuthorityGuard authority ontology, AdminGrant delegation, RankEpoch /
CatalogBuildState catalog projection, the AEAD cursor envelope, the command-binding replay
ring, the mTLS/PROXY-v2 edge, the 20-route admin surface, and the encrypted legacy cut. The
immutable-release **concept** survives, right-sized (it replaces the legacy `versions`/`hash`
rail); the armor ontology around it does not.

## 1. Honest route surface (~a dozen + a small admin set)

The honest core is the current-conformant Hono + MongoDB substrate (cookie session, nine
collections), hardened — not re-derived (RF-24: the honest fix is ~9–11 files / ~7–10 of the
mounted routes, ~15–20% of the surface the formation plan tore down). Every mutation is
idempotent where honest; every list uses a real index; the mounted surface is the OpenAPI
source of truth (§4.6). Routes are shown at their honest target shape.

### Platform

| Method / path | Purpose |
|---|---|
| `GET /health` | real readiness — Mongo reachable **and** primary elected (not a bare Mongo ping) |
| `GET /openapi.json` | generated from the mounted typed surface (replaces the drifted hand-kept route table) |

### Session (cookie auth — see §2)

| Method / path | Auth | Purpose |
|---|---|---|
| `POST /sessions` | — | register (creates the account + issues the session cookie) |
| `POST /sessions/login` | — | log in with an existing handle + recovery secret |
| `GET /sessions/me` | cookie | current session/user (the client-recovery read, RF-24 item 7) |
| `POST /sessions/recovery-credentials` | cookie | rotate the recovery secret (old + new both required) |
| `DELETE /sessions` | cookie | log out |

### Palettes

| Method / path | Auth | Purpose |
|---|---|---|
| `GET /palettes` | — | list (cursor **or** offset; sort newest / popular / most-forked; color-distance filter; visibility-filtered) |
| `GET /palettes/mine` | cookie | my palettes |
| `GET /palettes/:slug` | — | get by slug |
| `POST /palettes` | cookie | create |
| `PATCH /palettes/:slug` | cookie + owner | edit (`If-Match`) |
| `DELETE /palettes/:slug` | cookie + owner | delete / trash |
| `PUT /palettes/:slug/votes` · `DELETE /palettes/:slug/votes` | cookie | vote / unvote (declarative, idempotent) |
| `POST /palettes/:slug/flag` | cookie | flag / report for moderation |
| `POST /palettes/:slug/fork` | cookie | fork (cross-collection write) |
| `GET /palettes/:slug/forks` | — | list direct forks |
| `GET /palettes/:slug/provenance` | — | ancestry chain (visibility-filtered; hidden/purged ancestors become non-correlatable steps — RF-24 item 4) |
| `GET /palettes/:slug/versions` · `GET /palettes/:slug/versions/:hash` | — | immutable-release history (the right-sized release concept — RF-24 item 1) |
| `POST /palettes/:slug/revert` | cookie + owner | restore a prior release |

### Colors

| Method / path | Auth | Purpose |
|---|---|---|
| `GET /colors/approved` | — | list approved color names |
| `GET /colors/search` | — | search approved names (a real index, not a regex fallback — RF-24 item 2) |
| `GET /colors/tags` | — | list color tags |
| `POST /colors/propose` | cookie | propose a color name |

### Admin (small honest set — bearer `ADMIN_TOKEN`, timing-safe; every action emits an `admin_audit` event)

| Method / path | Purpose |
|---|---|
| `GET /admin/audit` | audit-log entries |
| `GET /admin/queue` · `POST …/:id/approve` · `POST …/:id/reject` | color-name proposal review |
| `GET /admin/users` · `POST …/:slug/status` · `GET …/:slug/palettes` | user moderation |
| `GET /admin/tags` · `POST /admin/tags` · `DELETE /admin/tags/:name` | tag CRUD |
| `GET /admin/flagged` · `DELETE /admin/flags/:paletteSlug` | flagged-palette review |
| `POST /admin/palettes/:slug/feature` · `DELETE /admin/palettes/:slug` | feature / remove |

The maximal admin surface (grants, principal lifecycle, policy CAS, release-policy moderation,
report review windows, principal-authority reconciliation) is retired armor (B2). The first
admin is minted by a deployment-only, DB-direct bootstrap, never an HTTP route.

## 2. Cookie login (the honest auth core)

Browser sessions use one HttpOnly, same-origin cookie — the wire contract's exact
`__Host-value-session` — through relative `/api`. Session responses return **no bearer**; there
is no cross-origin `Authorization` / `X-Session-Token` / `localStorage` / `sessionStorage` auth
path in the browser. The cookie is HttpOnly and same-origin only with a fixed **30-day** server
horizon and **no sliding renewal**.

- **Register / recover.** `POST /sessions` (and `/sessions/login`) take an exact
  `{publicHandle, recoverySecret}`; secret-bearing JSON is unknown-field-free and ≤ 1 KiB. The
  `RecoverySecret` is `rs1_` + canonical unpadded base64url of 32 CSPRNG bytes; only its
  versioned, secret-manager-keyed HMAC-SHA-256 verifier persists. Failed proof is rate-budgeted
  without allowing attacker lockout; malformed/wrong/closed/suspended share one generic 401.
- **The session token** is `st1_` + base64url of 32 CSPRNG bytes; only its frozen SHA-256 domain
  digest persists.
- **Rotate.** `POST /sessions/recovery-credentials` always carries both current and new fields;
  rotation installs the new verifier, revokes the old, and invalidates existing sessions
  atomically, issuing a replacement cookie.
- **Read / logout.** `GET /sessions/me` returns the current-session DTO with no token/grant
  witness; a revoked/absent cookie is a generic 401 with **no `Set-Cookie` mutation** (so a
  cross-tab lease can re-derive auth without deleting a newer cookie). `DELETE /sessions`
  revokes the session and returns non-secret completion.

Attribution is **server-derived from the session** — never a caller-controlled contributor
field (RF-24 item 3).

## 3. OKLCH validation — canonical palette content

A palette's content is exactly **1–50** `CanonicalNamedColor` atoms, each an integer-encoded
OKLCH color `{l, c, h, a}` plus an optional human `name`:

- `l` is an integer in thousandths of a percent (`l/1000`%); `c` is millionths (`c/1000000`);
  `h` is thousandths of a degree (`h/1000`); `a` is millionths (`a/1000000`). The canonical CSS
  spelling is `oklch(<l/1000 fixed 3>% <c/1000000 fixed 6> <h/1000 fixed 3> / <a/1000000 fixed
  6>)` — no exponent, plus sign, negative zero, omitted alpha, or trimmed digit.
- The canonical content bytes are `UTF8(RFC8785({colors:[{a,c,h,l,name},...],
  schema:"value.palette-colors/v1"}))`; the `contentDigest` is
  `lowerhex(SHA-256("value.js/palette-content/v1" || 0x00 || uint32be(len) || contentBytes))`,
  checked against the ordered colors rather than trusted from a stored object.
- `slug` is a canonical 3–48-byte ASCII palette spelling under the one reserved-word/decoding
  law; `displayName` is the normalized 1–100-scalar / ≤400-byte value. Unknown keys, explicit
  null outside `name`, noncanonical slug/text, or out-of-bound numbers reject.

Color→byte conversion is owned solely by the immutable Value4 `/color` `toRgba8` (W8); no
palette-local converter, coefficient copy, or canvas path exists.

## 4. The RED remediations (RF-24 — the W45 surgical set)

Seven verified-RED reproductions turn green, re-using the conformant substrate:

1. **Right-sized release** — restore/versions/hash/revert fold into the immutable-release
   concept (retires the legacy `versions`/`hash` rail).
2. **Indexed search** — `GET /colors/search` uses a real index (retires the regex fallback).
3. **Session-derived attribution** — contributor identity comes from the session, not the
   request body.
4. **Visibility-filtered provenance** — `GET /palettes/:slug/provenance` rechecks each hop's
   access predicate.
5. **Real readiness** — `GET /health` requires primary-elected, not just a Mongo ping.
6. **Generated OpenAPI** — `GET /openapi.json` is generated from the mounted surface (retires
   the hand-kept route table that provably drifted).
7. **`/sessions/me` client recovery + idempotency where honest.**

Gate (W45): the api suite is green; every mounted route appears in the generated OpenAPI; the
seven RED reproductions turn green.

---

## Appendix W51 — Export byte contract (VERBATIM; W51 authority — DO NOT prose-compress)

The following is the byte-exact export contract, transferred verbatim from the folded
`PALETTE-EXPORT-CONTRACT.md`. It is W51's sole byte authority for JSON / CSS / Tailwind / SVG /
PNG. The five serializers consume one immutable `ExportSnapshot`; identical full-file hashes
must hold across Chromium / Firefox / Safari.

This is the closed W23 authority for JSON, CSS, Tailwind, SVG and PNG. Every export consumes one immutable `ExportSnapshot` from `PALETTE-FACILITIES.md §6`; it performs no network read after capture, no later Workspace merge and no server export. The five serializers share the ordered fixed-point colors and one formatter. A serializer either yields the bytes below or a visible terminal/retryable operation state—never a partial download or `console.warn`-only result.

## 1. Canonical snapshot bytes and identity

The persisted source is not an implementation object. `ExportSnapshot` is this closed RFC 8785 JSON value:

```text
{
  schema:"value.export-snapshot/v1",
  source: one of
    {sourceKind:"device-draft",deviceDraftId,deviceDraftRevision}
    {sourceKind:"workspace",paletteId,slug,workspaceId,workspaceRevision,basedOnReleaseId?}
    {sourceKind:"release",paletteId,slug,releaseId,releaseNo},
  displayName,
  orderedNamedColors:[{name:string|null,l:uint,c:uint,h:uint,a:uint},...],
  canonicalTags:[{tagId,label},...],
  contentDigest
}
```

The atom grammar is closed. `deviceDraftId` and `workspaceId` are canonical lowercase UUIDv7. `paletteId`, `releaseId`, `basedOnReleaseId` and `tagId` are the Wire's cut-capable `ResourceId` (canonical UUIDv5 or v7). Every revision is a JSON safe integer in `[1,9007199254740991]`; `releaseNo` is an integer in `[1,2147483647]`. `slug` is the Domain's already-canonical 3–48-byte ASCII palette spelling. `displayName` is the Domain-normalized 1–100-scalar/400-byte value. `contentDigest` is exactly 64 lowercase hex. Unknown keys, explicit null outside `name`, wrong version/variant, noncanonical slug/text, out-of-bound number or extra source-arm field rejects capture/reload.

The color array is exactly 1–50 `CanonicalNamedColor` atoms from the Wire contract. Before persisting, capture independently rebuilds the Domain's exact canonical content bytes `UTF8(RFC8785({colors:[{a,c,h,l,name},...],schema:"value.palette-colors/v1"}))`, computes `lowerhex(SHA-256(ASCII("value.js/palette-content/v1") || 0x00 || uint32be(byteLength(contentBytes)) || contentBytes))`, and requires equality with `contentDigest`. A mismatch is visible terminal snapshot corruption; it never serializes or “repairs” the digest. Thus content identity is checked against the ordered colors rather than trusted because a stored object supplied both.

`canonicalTags` is an `ExportTag[]`: zero to ten unique `ResourceId` values sorted by ascending ASCII, with each `label` under the Domain display law. Device Draft and Workspace capture require every selected tag projection to be current `state:"active"` and copy the complete selected set; a retired/unresolved/duplicate tag is a visible capture failure, never silently dropped. Release capture maps every frozen `{tagId,labelAtPublish}` to `{tagId,label:labelAtPublish}` even when the current definition later retires. Workspace and Release use `paletteId`, never the storage/model synonym `handleId`. No serializer repeats those source-specific derivations.

Capture has one source transaction per union arm; a self-consistent mixture is not sufficient. A DeviceDraft starts at `deviceDraftRevision=1`, and every committed display/color/tag mutation increments it exactly once in the same IndexedDB readwrite transaction as the canonical fixed colors, content digest and complete selected-tag projection. Before DeviceDraft capture, the client refreshes the public active TagDefinition set through r29; offline/incomplete resolution is retryable and any selected ID absent from that complete observation is a visible capture failure. One readonly IndexedDB transaction then reads the DeviceDraft and that committed observation. A Workspace capture copies exactly one saved `WorkspaceDetail` from W16, including its revision, digest, `basedOnReleaseId` and complete tag projections; a dirty WorkspaceReplica may only **Save then capture** or **copy the overlay to a new DeviceDraft then capture**. It may neither label overlay bytes with the saved revision nor silently export the saved base behind the visible overlay. A Release capture copies exactly one immutable `ReleaseDetail`; its frozen tag labels are not joined to current TagDefinitions. The capture copies one arm into an isolated value, performs the content/tag checks above, then persists `snapshotBytes` and identity before any serializer runs. A later source edit, tag retirement or network response cannot modify that operation.

`snapshotBytes=UTF8(RFC8785(ExportSnapshot))` with no BOM, whitespace or trailing LF. The non-secret outbox persists those exact bytes, not a later reserialization, and computes:

```text
snapshotDigest = lowerhex(SHA-256(
  ASCII("value.js/export-snapshot/v1") || 0x00 ||
  uint64be(byteLength(snapshotBytes)) || snapshotBytes
))
```

`uint64be` is one unsigned eight-byte big-endian integer. Reload rejects duplicate keys, validates the closed atom/source union above, recomputes content bytes/digest from `orderedNamedColors`, requires canonical reserialization to equal the stored bytes, and then verifies the domain-separated snapshot digest before use; any mismatch is terminal failure. The operation key is exactly `(snapshotDigest,format)`, where `format` is `json | css | tailwind | svg | png`.

## 2. Shared names, color spelling and bytes

Source filename stems are exact:

- Device Draft: `palette-draft--<canonical deviceDraftId>`.
- Workspace: `<canonical slug>--w<workspaceRevision>`.
- Release: `<canonical slug>--r<releaseNo>`.

Extensions are JSON `.json`, CSS `.css`, Tailwind `.tailwind.json`, SVG `.svg`, and PNG `.png`. The client download filename assigned to `HTMLAnchorElement.download` is exactly the stem plus extension; this client-only facility has no HTTP `Content-Disposition`. Display/color names never enter the filename. The export identifier prefix is the canonical slug for Workspace/Release and `palette-<full lowercase contentDigest>` for Device Draft.

Identifiers are deliberately positional: color `i` is `color-` plus its 1-based index padded to three decimals (`color-001`…`color-050`). A human name remains escaped data/metadata and never becomes a CSS/Tailwind/XML identifier. Duplicate, empty, Unicode-only and punctuation names therefore cannot collide or silently rename another token.

One canonical CSS color spelling is used everywhere:

```text
oklch(<l/1000 fixed 3>% <c/1000000 fixed 6> <h/1000 fixed 3> / <a/1000000 fixed 6>)
```

There is no exponent, plus sign, negative zero, omitted alpha or trimmed fractional digit; examples are `oklch(92.000% 0.012345 88.800 / 1.000000)` and `oklch(0.000% 0.000000 0.000 / 0.000000)`. All text files are UTF-8 without BOM and end in exactly one LF. JSON uses RFC 8785 canonical serialization before that LF. MIME/extension pairs are exact: `application/json;charset=utf-8`/`.json`, `text/css;charset=utf-8`/`.css`, `application/json;charset=utf-8`/`.tailwind.json`, `image/svg+xml;charset=utf-8`/`.svg`, and `image/png`/`.png`.

## 3. JSON

The exact value before RFC 8785 serialization is:

```text
{
  schema:"value.palette-export/v1",
  source: one of
    {sourceKind:"device-draft",deviceDraftId,deviceDraftRevision}
    {sourceKind:"workspace",paletteId,slug,workspaceId,workspaceRevision,basedOnReleaseId?}
    {sourceKind:"release",paletteId,slug,releaseId,releaseNo},
  displayName,
  contentDigest,
  colors:[{id:"color-001",name:string|null,oklch:{l,c,h,a},css:"oklch(...)"},...],
  canonicalTags:[{tagId,label},...]
}
```

`source` copies the snapshot source union without renaming `sourceKind` or substituting another palette identity. `colors` retain semantic order; each `oklch` member is the exact fixed integer from `orderedNamedColors`, and `css` is derived once by the shared formatter. `canonicalTags` copies the snapshot array byte-for-byte at the value level; no serializer looks up labels or tag state. No policy, owner, session, mutable count, alternate float or private provenance enters the file.

## 4. CSS

The exact line grammar is:

```css
:root {
  --<prefix>-color-001: <canonical color>;
  ...
}
```

There is one two-space-indented declaration per color in order, no comment/name interpolation, and no minified/pretty dual mode. The prefix already satisfies the target namespace/digest grammar; no generic slugifier or `CSS.escape` branch exists.

## 5. Tailwind

Tailwind export is data, not executable JavaScript. The exact RFC 8785 JSON value is:

```text
{
  schema:"value.palette-tailwind/v1",
  contentDigest,
  colors:{"color-001":"<canonical color>",...}
}
```

Color object keys occur canonically under RFC 8785; the ordinal makes lexical and semantic order identical through 050. Consumers import/merge this object explicitly. V emits no CommonJS/ESM function, comment, plugin, `require`, `eval` or configuration side effect.

## 6. SVG

SVG is a font-free swatch strip with exact logical geometry. XML escaping is one scalar pass with exactly five substitutions: `&→&amp;`, `<→&lt;`, `>→&gt;`, `"→&quot;`, and `'→&apos;`; all other Domain-permitted Unicode scalars are copied as UTF-8. The shared input law rejects `U+FFFE/U+FFFF` before capture, so the no-declaration document is valid XML 1.0 without a replacement or numeric-reference alias. Apply the escape pass to every dynamic text or attribute value after Domain normalization. Empty-element tags end `/>` and there is no XML declaration.

The exact byte construction is below. `+` concatenates bytes/UTF-8 strings and `concat(i=0..N-1,...)` emits one line for every index in ascending order; the metavariables and concatenation operators themselves never enter the file.

```text
UTF8(
  "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 " + dec(N) + " 1\" width=\"1200\" height=\"240\" role=\"img\" aria-labelledby=\"title desc\" shape-rendering=\"crispEdges\">\n" +
  "  <title id=\"title\">" + xmlEscape(displayName) + "</title>\n" +
  "  <desc id=\"desc\">" + dec(N) + "-color palette</desc>\n" +
  concat(i=0..N-1,
    "  <rect x=\"" + dec(i) + "\" y=\"0\" width=\"1\" height=\"1\" fill=\"" +
    xmlEscape(canonicalColor(i)) + "\"/>\n"
  ) +
  "</svg>\n"
)
```

Thus every line, including the final `</svg>`, ends in one LF; there are no blank lines, tabs, trailing spaces or CR bytes.

`N` is the canonical decimal color count with no leading zero; rect `x` is the zero-based canonical decimal integer. `xmlEscape(displayName)` is the five-character-escaped snapshot display name, and `canonicalColor(i)` is the shared canonical spelling before that same escaping pass. Title uses the display-normalized snapshot name; desc uses canonical decimal N. There is no text rendering, font, external reference, CSS, metadata, script, event attribute, animation, filter, image, `foreignObject` or embedded data URL. Attribute and element order are exactly as constructed. A conforming XML parser, CSP scanner and pixel strip comparison prove the bytes.

## 7. PNG

PNG is deterministic client-side rasterization, not browser canvas serialization. The logical raster is 1200×240 RGBA8. For color `i` among `N`, its half-open horizontal span is `[floor(i·1200/N), floor((i+1)·1200/N))`; all 240 rows repeat it and the final span ends at 1200.

Palette export owns no color conversion program. For each canonical atom `{l,c,h,a}`, construct the typed `/color` value `oklch(l/100000,c/1000000,h/1000,a/1000000)` and invoke exactly one packed value 4 operation, `toRgba8(color,{gamut:"clip"})`. W8 is the sole matrix, transfer, clipping, ties-even quantization and alpha authority; a typed `ColorIssue` becomes terminal `serializer_contract`. No CSS-string reparse, copied coefficient, trigonometric/table program, canvas/platform converter, alternate helper or fallback survives. Pixels are the returned straight, non-premultiplied `RGBA8` tuples. Chromium/V8, Firefox/SpiderMonkey and Safari/WebKit/JavaScriptCore must match W8's committed tuples and every full PNG byte; a mismatch reopens W8 rather than authorizing a palette-local conversion path.

The in-repo encoder is a frozen algorithm rather than a version-floating image library:

1. PNG signature.
2. `IHDR` for width 1200, height 240, bit depth 8, color type 6, compression/filter/interlace 0.
3. `sRGB` rendering intent 0 and `gAMA` integer 45455, in that order.
4. One `IDAT` containing a zlib stream with CMF/FLG `0x78 0x01`. Its raw payload is exactly 1,152,240 bytes: 240 repetitions of filter byte `0x00` followed by 4,800 row bytes. Greedy maximal stored-block partitioning yields exactly eighteen DEFLATE blocks: seventeen 65,535-byte blocks and one 38,145-byte remainder. The first seventeen headers are byte `0x00` (`BFINAL=0,BTYPE=00` plus zero alignment), `LEN=ff ff`, `NLEN=00 00`; the final header is byte `0x01` (`BFINAL=1,BTYPE=00` plus zero alignment), `LEN=01 95`, `NLEN=fe 6a`. Adler-32 of the entire raw payload follows in network byte order.
5. `IEND`.

Chunk lengths are unsigned big-endian; CRC-32 is IEEE 802.3 over type+data. There are no ancillary time, text, ICC, physical-size or software chunks. The sole authored encoder source is `demo/palettes/export/png.ts`; it owns only raster layout and the frozen PNG/DEFLATE/chunk/checksum framing above. The packed value artifact hash owns `toRgba8`, and each export vector owns its full PNG SHA-256. Changing color tuples reopens W8; changing framing regenerates and reviews the PNG goldens as a contract change, never an encoder “upgrade.” Decoding must reproduce every expected RGBA pixel and reject a CRC mutation.

## 8. Capture, handoff, failure and proof

The IndexedDB record is keyed by `(snapshotDigest,format)`. Its closed fields are `{schema:"value.export-operation/v1",snapshotBytes:Uint8Array,snapshotDigest,format,serializer:"value.export-serializer/v1",state,serializedBytes?,serializedSha256?,mime?,filename?,failureCode?}`. `state` is exactly `captured | ready | retryable-failure | terminal-failure | handoff-initiated`. `failureCode` is exactly `storage_quota | serialization_resource | handoff_unavailable | snapshot_corrupt | serializer_contract`. `retryable-failure` requires one of the first three; `terminal-failure` requires one of the last two; every nonfailure state omits it. `ready` and `handoff-initiated` require all four prepared fields; `serializedSha256=lowerhex(SHA-256(serializedBytes))`. A `handoff_unavailable` retryable failure requires the four prepared fields and may only retry handoff; every other failure omits them. Unknown state/field combinations are corrupt storage under W15 rather than a compatibility decode.

IndexedDB unavailable is necessarily outside this record: before an ExportOperation exists, W22 places the export seat in its explicit storage-recovery state and offers retry after storage is available. It never fabricates a persisted `storage_unavailable` operation. If a later failure-state transaction itself cannot commit, the durable record remains at its last valid state and the same outer storage-recovery state owns the interruption; memory-only failure truth is not presented as persisted operation state.

The first **Prepare FORMAT** activation performs the atomic source capture above and commits `captured` before serialization. Preparation occurs outside that transaction; the durable state remains `captured` if the page dies. A success transaction rechecks the operation key and snapshot bytes, then atomically writes the exact serialized `Uint8Array`, its plain SHA-256, MIME, filename and `ready`. A quota/write failure cannot hand off uncommitted bytes. Reload validates the snapshot, prepared-byte hash and derived MIME/filename but never reserializes a `ready`/`handoff-initiated` operation. “Export latest” is a new capture; retry means the stored bytes. Acknowledgement or explicit discard deletes the whole client-only operation.

Only after the verified bytes are resident in memory does the same action seat expose **Download FILENAME**; it is a fresh user activation, not an asynchronous continuation of Prepare. In that task construct `new Blob([serializedBytes],{type:mime})`, call `URL.createObjectURL(blob)`, register that URL in the page's live-export lease set, create an `<a>`, assign only `href=objectURL` and `download=filename`, append it to `document.body`, invoke `click()` synchronously, and remove the anchor immediately. After the click, schedule one 60,000 ms timer. Revoke the URL and remove its lease exactly once on the first of that timer or the page's `pagehide` event; `pagehide` drains every live lease. If Blob/URL/anchor construction, append or synchronous click throws, remove any anchor, revoke any URL immediately and retain the prepared bytes with visible `retryable-failure`. Blob URLs and anchors are never persisted; retry creates a fresh URL over the same verified bytes.

The platform exposes no accepted-download or filesystem-success signal. A nonthrowing `click()` records only `handoff-initiated`; it cannot be described as a saved/accepted file. Failure to persist that state leaves the earlier durable `ready` record and a visible storage failure, never a false saved claim. Browser refusal after click is not masked as verified success, and the prepared operation remains available until explicit acknowledgement/discard.

W23 proves for all five formats: the three atomic source arms and dirty-overlay decision; retired/unresolved/mixed tag failure; canonical snapshot bytes/domain digest; exact prepared bytes, filename and Blob MIME; full byte hash; two independent preparations with identical bytes; reload without reserialization; fresh Prepare→Download activation; the 60-second/pagehide/retry URL lifecycle; every name-escaping vector including terminal `U+FFFE/U+FFFF`; 1/50 colors, alpha, out-of-gamut clipping and visible failure. SVG additionally parses under a no-network resolver and proves all five escaping substitutions plus exact line bytes. PNG consumes W8's committed `RGBA8` tuples, decodes to the same golden buffer in Chromium, Firefox and Safari, and proves every block header/BFINAL, Adler-32 and CRC mutation. No format's success may be inferred from another format's serializer.
