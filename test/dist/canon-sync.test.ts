import { readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * G-CANON-2 (U-F21 + U-F69) — the regenerable canon-sync gate.
 *
 * The tree must tell the truth about itself. Every canon document — root + api
 * + demo `CLAUDE.md`, `README.md`, `demo/DESIGN.md` facilities, the parse-that
 * pin prose — is asserted to be REGENERABLY in sync with the landed tree (the
 * CLAUDE.md LoC-precept pattern: documented counts DERIVE from the tree via
 * enumeration, never a hand-typed number that drifts each wave). Nothing here
 * is hardcoded: the color-space count is grepped from `spaces.ts`, the parse-
 * that pin is read from `package.json`, the DB index/collection counts from
 * `db.ts`/`collections.ts`, the DESIGN.md section count from DESIGN.md itself,
 * and every documented Structure-block path is resolved against the filesystem.
 *
 * BORN-RED against the live lies at wave-open (T/FINAL §5:305 remainder):
 *   (a) root `CLAUDE.md` Structure `parsing/` block predates the T.W1 cluster
 *       reorg — `src/parsing/color.ts` etc. are dead (now `parsing/color/`).
 *   (b) api/`CLAUDE.md`'s ENTIRE Structure section is invalid — all documented
 *       paths gone (the `modules/`+`platform/` transposition).
 *   (c) `README.md` says "15 color spaces" ×3 while the tree ships 17
 *       (the ICtCp/Jzazbz S.W1 additions un-counted).
 *   (d) `CLAUDE.md` parse-that prose says "shipped 2.0.1 a7eabcc" while the pin
 *       is `^1.0.0` and the caret FORBIDS 2.x (U-F69 — the prose lies).
 *   (e) root+api DB index counts (27 vs 26) disagree with the tree's 22; the
 *       root `docs/` line omits 3 real artefacts; `demo/DESIGN.md` cites a moved
 *       `readoutReservation.ts`; `demo/CLAUDE.md` under-counts DESIGN.md's
 *       sections (10 vs 11).
 *
 * Flips GREEN only when every doc regenerates from the tree.
 */

const repoRoot = path.resolve(import.meta.dirname, "..", "..");

const read = (rel: string): string =>
    readFileSync(path.join(repoRoot, rel), "utf8");

/**
 * Parse the FIRST fenced code block after "## Structure" in a canon doc and
 * reconstruct every documented file/dir path from the ASCII tree indentation.
 * Depth is (leading tree-prefix width / 4); a stack of names-by-depth rebuilds
 * the full path. Inline `# comment`s are stripped. Multi-segment leaf names
 * (e.g. `lib/palette/`) are preserved. Returns repo-relative paths.
 */
function structurePaths(docRel: string): string[] {
    const text = read(docRel);
    const structIdx = text.indexOf("## Structure");
    if (structIdx < 0) throw new Error(`no "## Structure" heading in ${docRel}`);
    const after = text.slice(structIdx);
    const fenceOpen = after.indexOf("```");
    const fenceClose = after.indexOf("```", fenceOpen + 3);
    if (fenceOpen < 0 || fenceClose < 0)
        throw new Error(`no fenced Structure block in ${docRel}`);
    const block = after.slice(fenceOpen + 3, fenceClose);

    const paths: string[] = [];
    const stack: string[] = [];
    for (const raw of block.split("\n")) {
        const line = raw.replace(/\r$/, "");
        const noComment = line.split("#")[0];
        // The leading run of whitespace + box-drawing chars is the tree prefix.
        const m = /^([\s│├└─]*)(.*)$/u.exec(noComment);
        if (!m) continue;
        const prefix = m[1];
        const rest = m[2].trim();
        if (!rest) continue;
        const name = rest.split(/\s/)[0];
        if (!name || name.startsWith("```")) continue;
        // Each nesting level is 4 columns wide (`│   ` or `├── `).
        const depth = Math.floor(prefix.length / 4);
        const clean = name.replace(/\/$/, "");
        stack[depth] = clean;
        stack.length = depth + 1;
        paths.push(stack.join("/"));
    }
    return paths;
}

function assertStructurePathsExist(docRel: string): void {
    const paths = structurePaths(docRel);
    expect(paths.length, `${docRel} Structure block parsed no paths`).toBeGreaterThan(5);
    const missing = paths.filter((p) => !existsSync(path.join(repoRoot, p)));
    expect(
        missing,
        `${docRel} Structure block documents paths that DO NOT exist in the tree (drift): ${missing.join(", ")}`,
    ).toEqual([]);
}

// ── Tree-derived truths (the source of truth — never hardcoded) ──────────────

/** The concrete `*Color` subclasses shipped in the color system. */
function colorSpaceCount(): number {
    const spaces = read("src/units/color/spaces.ts");
    return (spaces.match(/export class \w+Color</g) ?? []).length;
}

/** Explicit DB indexes created in db.ts (implicit `_id` excluded). */
function dbIndexCount(): number {
    return (read("api/src/platform/db/db.ts").match(/\.createIndex\(/g) ?? [])
        .length;
}

/** Canonical MongoDB collections (the typed accessors). */
function dbCollectionCount(): number {
    return (
        read("api/src/platform/db/collections.ts").match(/db\.collection</g) ??
        []
    ).length;
}

/** Top-level `## ` sections in demo/DESIGN.md. */
function designSectionCount(): number {
    return (read("demo/DESIGN.md").match(/^## /gm) ?? []).length;
}

describe("G-CANON-2 · canon-sync regenerable-count gate (U-F21 + U-F69)", () => {
    // (c) README color-space count ≡ the tree's concrete *Color subclass count.
    it("README color-space count matches the tree's concrete *Color subclasses", () => {
        const n = colorSpaceCount();
        expect(n, "spaces.ts must define ≥ 17 *Color subclasses").toBeGreaterThanOrEqual(17);
        const readme = read("README.md");
        const hits = [...readme.matchAll(/(\d+)\s+(?:color\s+)?spaces\b/g)];
        expect(hits.length, "README must state a color-space count").toBeGreaterThan(0);
        for (const h of hits) {
            expect(
                Number(h[1]),
                `README says "${h[0]}" but the tree ships ${n} color spaces`,
            ).toBe(n);
        }
    });

    // (d) parse-that pin PROSE ≡ the pinned version (U-F69).
    it("root CLAUDE.md parse-that prose matches the package.json pin (no phantom 2.0.1)", () => {
        const pkg = JSON.parse(read("package.json")) as {
            dependencies: Record<string, string>;
        };
        const pin = pkg.dependencies["@mkbabb/parse-that"];
        expect(pin, "package.json must pin @mkbabb/parse-that").toBeTruthy();
        const claude = read("CLAUDE.md");
        expect(
            claude,
            "CLAUDE.md must cite the real parse-that pin",
        ).toContain(`@mkbabb/parse-that@${pin}`);
        // The FALSE "shipped 2.0.1 a7eabcc" prose (the caret ^1.0.0 forbids 2.x).
        expect(claude, "CLAUDE.md must not claim parse-that shipped 2.0.1").not.toMatch(
            /shipped\s+2\.0\.1/,
        );
        expect(claude, "CLAUDE.md must not cite the phantom a7eabcc SHA").not.toContain(
            "a7eabcc",
        );
    });

    // (a,b,e) doc Structure ≡ tree Structure — every documented path resolves.
    it("root CLAUDE.md Structure block paths all exist in the tree", () => {
        assertStructurePathsExist("CLAUDE.md");
    });
    it("api/CLAUDE.md Structure block paths all exist in the tree", () => {
        assertStructurePathsExist("api/CLAUDE.md");
    });
    it("demo/CLAUDE.md Structure block paths all exist in the tree", () => {
        assertStructurePathsExist("demo/CLAUDE.md");
    });

    // (e) DB index + collection counts ≡ the tree, in BOTH root and api docs.
    it("root + api CLAUDE.md DB index/collection counts match db.ts/collections.ts", () => {
        const idx = dbIndexCount();
        const coll = dbCollectionCount();
        expect(idx, "db.ts must create ≥ 1 index").toBeGreaterThan(0);
        expect(coll, "collections.ts must define the 9 collections").toBe(9);
        // Regex-extract the documented counts (tolerant of prose qualifiers like
        // "22 explicit indexes") and compare to the tree-derived values.
        const apiHit = /(\d+)\s+collections,\s+(\d+)(?:\s+\w+)?\s+indexes/.exec(
            read("api/CLAUDE.md"),
        );
        expect(apiHit, 'api/CLAUDE.md must state "<N> collections, <M> indexes"').not.toBeNull();
        expect(Number(apiHit![1]), "api collections count").toBe(coll);
        expect(Number(apiHit![2]), "api index count").toBe(idx);
        const rootHit = /(\d+)\s+collections\s*\/\s*(\d+)\s+indexes/.exec(
            read("CLAUDE.md"),
        );
        expect(rootHit, 'root CLAUDE.md must state "<N> collections / <M> indexes"').not.toBeNull();
        expect(Number(rootHit![1]), "root collections count").toBe(coll);
        expect(Number(rootHit![2]), "root index count").toBe(idx);
    });

    // (e) demo/CLAUDE.md's DESIGN.md section count ≡ DESIGN.md's actual sections.
    it("demo/CLAUDE.md's DESIGN.md section count matches DESIGN.md", () => {
        const n = designSectionCount();
        expect(n, "DESIGN.md must have ## sections").toBeGreaterThan(5);
        expect(
            read("demo/CLAUDE.md"),
            `demo/CLAUDE.md must state DESIGN.md has ${n} sections`,
        ).toContain(`${n} sections`);
    });

    // (e) demo/DESIGN.md facility paths resolve (the moved-helper drift).
    it("demo/DESIGN.md color-picker facility paths resolve to the landed tree", () => {
        const design = read("demo/DESIGN.md");
        const refs = [...design.matchAll(/color-picker\/[\w/-]+\.ts/g)].map(
            (m) => m[0],
        );
        expect(refs.length, "DESIGN.md must cite ≥ 1 color-picker facility").toBeGreaterThan(0);
        const missing = refs.filter(
            (r) =>
                !existsSync(
                    path.join(repoRoot, "demo/@/components/custom", r),
                ),
        );
        expect(
            missing,
            `DESIGN.md cites color-picker facility paths that moved: ${missing.join(", ")}`,
        ).toEqual([]);
    });
});
