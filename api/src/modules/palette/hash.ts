import { createHash } from "node:crypto";
import type { PaletteColor } from "./model.js";

// ---------------------------------------------------------------
// Domain-separated, length-framed hashing (X-W3 · X.W3.2 · G-7)
// ---------------------------------------------------------------

/** The domain under which palette CONTENT is hashed (`payloadHash`). */
const PAYLOAD_DOMAIN = "value.js/palette/payload/v1";

/** The domain under which a RELEASE EVENT is hashed (`palette_versions._id`). */
const RELEASE_DOMAIN = "value.js/palette/release/v1";

/**
 * One framed field: `domain ‖ 0x00 ‖ uint64be(len) ‖ bytes`.
 *
 * The domain label separates hash universes (a payload digest can never be
 * replayed as a release digest, and neither can be replayed as an atom
 * digest). The `0x00` terminates the label — no label is a prefix of another
 * once it is NUL-terminated. The explicit `uint64be` length makes the byte
 * stream self-delimiting, so no two different field tuples can serialize to
 * the same bytes: `("ab","c")` and `("a","bc")` collide under naive
 * concatenation and cannot collide here.
 */
function frame(domain: string, payload: Buffer): Buffer {
    const len = Buffer.alloc(8);
    len.writeBigUInt64BE(BigInt(payload.length));
    return Buffer.concat([
        Buffer.from(domain, "utf8"),
        Buffer.from([0x00]),
        len,
        payload,
    ]);
}

const frameText = (domain: string, value: string): Buffer =>
    frame(domain, Buffer.from(value, "utf8"));

const frameUInt64 = (domain: string, value: number): Buffer => {
    const n = Buffer.alloc(8);
    n.writeBigUInt64BE(BigInt(value));
    return frame(domain, n);
};

/**
 * A nullable hash reference. `null` frames as a ZERO-LENGTH payload, which no
 * real reference can produce (every reference is a 64-char hex digest), so
 * "absent" and "present" are distinguishable at the bytes rather than by
 * convention.
 */
const frameRef = (domain: string, value: string | null): Buffer =>
    frame(domain, value === null ? Buffer.alloc(0) : Buffer.from(value, "utf8"));

/**
 * Compute a palette's **payload hash** — the deterministic identity of WHAT a
 * palette IS: its name and the full content of every color stop, including
 * each stop's human-readable `name`.
 *
 * This is the value stored as `PaletteVersion.payloadHash` and as
 * `Palette.currentHash`. It is deliberately NOT the version row's `_id`:
 * before X-W3, payload identity WAS membership identity (`_id` was this hash),
 * which made every version row a content-addressed door between palettes —
 * the defect G-6 closes. Release identity is `computeReleaseHash` below.
 *
 * Framing is `domain ‖ 0x00 ‖ uint64be(len) ‖ bytes` per field (see `frame`).
 * Normalization: `name` and `css` are trimmed + lower-cased (the palette
 * layer's long-standing case-insensitive identity, matching `computeAtomHash`);
 * `position` is quantized to 1e-6 and rendered canonically.
 */
export function computeContentHash(name: string, colors: PaletteColor[]): string {
    const h = createHash("sha256");
    h.update(frameText(PAYLOAD_DOMAIN, name.trim().toLowerCase()));
    h.update(frameUInt64(`${PAYLOAD_DOMAIN}#colors`, colors.length));
    for (const c of colors) {
        h.update(frameText(`${PAYLOAD_DOMAIN}#color/css`, c.css.trim().toLowerCase()));
        h.update(
            frameText(
                `${PAYLOAD_DOMAIN}#color/name`,
                (c.name ?? "").trim().toLowerCase(),
            ),
        );
        h.update(
            frameText(
                `${PAYLOAD_DOMAIN}#color/position`,
                String(Math.round(c.position * 1e6) / 1e6),
            ),
        );
    }
    return h.digest("hex");
}

/**
 * The facts a release event commits to. `paletteSlug` is the MEMBERSHIP fact
 * (which object this release belongs to) and `authorSlug` the ATTRIBUTION
 * fact — the two policy facts a revision read is joined and audited on.
 * `revisionNo` is the palette-scoped ordinal that makes two releases of the
 * same payload distinct events.
 */
export interface ReleaseIdentity {
    paletteSlug: string;
    revisionNo: number;
    payloadHash: string;
    parentHash: string | null;
    forkedFromHash: string | null;
    authorSlug: string;
}

/**
 * Compute a version row's **release hash** — the deterministic identity of an
 * EVENT: "palette `paletteSlug` reached revision `revisionNo`, carrying
 * `payloadHash`, from `parentHash`, authored by `authorSlug`".
 *
 * This is `palette_versions._id`. Because the palette slug is inside the
 * digest, a release id is not guessable from content alone and cannot address
 * a row in a different palette — but the service layer still JOINS on
 * `paletteSlug` (`findByPaletteAndHash`) rather than trusting that property:
 * identity is a defence, membership is the check.
 */
export function computeReleaseHash(identity: ReleaseIdentity): string {
    const h = createHash("sha256");
    h.update(frameText(RELEASE_DOMAIN, identity.paletteSlug));
    h.update(frameUInt64(`${RELEASE_DOMAIN}#revision`, identity.revisionNo));
    h.update(frameText(`${RELEASE_DOMAIN}#payload`, identity.payloadHash));
    h.update(frameRef(`${RELEASE_DOMAIN}#parent`, identity.parentHash));
    h.update(frameRef(`${RELEASE_DOMAIN}#forked-from`, identity.forkedFromHash));
    h.update(frameText(`${RELEASE_DOMAIN}#author`, identity.authorSlug));
    return h.digest("hex");
}

/**
 * Content hash of a single palette atom (a color stop). Canonicalizes the
 * atom's CONTENT — `(css, name)` — but NOT its `position`: position is the
 * atom KEY (its stable identity in the ladder), not part of what the atom IS.
 * A recolor at a fixed slot changes this hash; a re-order does not. The
 * per-atom basis of the WAVE-D atom-diff layer (J.W2).
 */
export function computeAtomHash(atom: PaletteColor): string {
    const canonical = JSON.stringify({
        css: atom.css.trim().toLowerCase(),
        name: (atom.name ?? "").trim().toLowerCase(),
    });
    return createHash("sha256").update(canonical).digest("hex");
}

/**
 * Order-independent set-hash over a palette's per-atom hashes, keyed by
 * position. Two palettes carrying the same atoms in ANY array order produce
 * the same set-hash — the atom-layer dedup fingerprint.
 *
 * Distinct from `computeContentHash`, which folds `name` into the palette
 * identity; the set-hash is the COLORS-ONLY identity. It is emitted on the
 * palette envelope as `atomSetHash` (the dedup hint). (The `/diff` read + the
 * atom-diff algebra that once also consumed it were excised at T.W1 — TA-4.)
 */
export function computeAtomSetHash(atoms: PaletteColor[]): string {
    const entries = atoms
        .map((a) => `${Math.round(a.position * 1e6) / 1e6}:${computeAtomHash(a)}`)
        .sort();
    return createHash("sha256").update(entries.join("|")).digest("hex");
}
