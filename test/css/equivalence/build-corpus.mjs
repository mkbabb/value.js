// SERVED MODEL: claude-opus-5-5
//
// X.P.W6.h — THE REAL-CSS ARMS of the differential corpus, generated (never hand-edited):
//   demo       every declaration value and keyframe selector in value.js's tracked demo CSS
//              (`demo/**/*.css` and `<style>` blocks of `demo/**/*.vue`)
//   keyframes  the same over keyframes.js's tracked CSS (sibling checkout, READ-ONLY; its HEAD is pinned)
//   tests      every string literal of each value.js test that calls a parse entry (tables as well as
//              calls) and of the vendored WPT cases, plus the declaration values / keyframe selectors
//              inside every string handed to `parseStylesheet`
// The assay arm is `assay-corpus.json` (the retired seam's 27,021-row union, copied verbatim).
//
// Every file is read AT its repository's HEAD (the pinned commit). Extraction reads CSS with postcss (a css-syntax-3 tokenizer this repo already installs); a source
// postcss cannot read is COUNTED under `unreadable`, never guessed at. Usage (from the repo root):
//   node test/css/equivalence/build-corpus.mjs [--check]
// `--check` re-derives the arms and exits 1 if `real-corpus.json` differs.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import postcss from "postcss";

const ROOT = process.cwd();
const KEYFRAMES = path.resolve(ROOT, "..", "keyframes.js");
const OUT = path.join(ROOT, "test/css/equivalence/real-corpus.json");
const ENTRY = /\b(parseCssColor|parseCssValues?|parseCssScalar|parseKeyframeSelector|parseTimingFunction|parseStylesheet)\(\s*("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\$])*`)/g;
const ENTRY_NAME = /\b(?:parseCssColor|parseCssValues?|parseCssScalar|parseKeyframeSelector|parseTimingFunction|parseStylesheet)\b/;
const LITERAL = /"(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*'|`(?:\\.|[^`\\$])*`/g;
const STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g;

const git = (cwd, ...args) => execFileSync("git", ["-C", cwd, ...args], { encoding: "utf8" }).trim();
/** A tracked file's bytes AT HEAD — never the working tree, which sibling seats may have dirtied. */
const atHead = (cwd, file) => execFileSync("git", ["-C", cwd, "show", `HEAD:${file}`], { encoding: "utf8", maxBuffer: 1 << 26 });

/** Tracked files under `prefix` whose name ends in one of `exts` (git's plain pathspec `*` spans `/`). */
const tracked = (cwd, prefix, exts) =>
    git(cwd, "ls-files", "--", `${prefix}*`).split("\n").filter((f) => exts.some((e) => f.endsWith(e)));

/** Declaration values and keyframe selectors of one stylesheet text. */
function fromSheet(css, sink, unreadable, where) {
    let root;
    try {
        root = postcss.parse(css);
    } catch (error) {
        unreadable.push(`${where}: ${String(error.reason ?? error.message)}`);
        return;
    }
    root.walkDecls((d) => sink.add(d.value.trim()));
    root.walkAtRules(/^(-\w+-)?keyframes$/i, (at) => at.walkRules((r) => r.selectors.forEach((s) => sink.add(s.trim()))));
}

function cssArm(cwd, prefix) {
    const sink = new Set();
    const unreadable = [];
    const files = tracked(cwd, prefix, [".css", ".vue"]);
    for (const file of files) {
        const text = atHead(cwd, file);
        if (file.endsWith(".css")) fromSheet(text, sink, unreadable, file);
        else for (const m of text.matchAll(STYLE)) if (!/lang=["'](?!css)/.test(m[0].slice(0, m[0].indexOf(">")))) fromSheet(m[1], sink, unreadable, file);
    }
    return { files: files.length, sink, unreadable };
}

/** A JS string literal's value; `null` when it is not plain JSON-compatible text (counted, never guessed). */
function decode(literal) {
    const body = literal.slice(1, -1);
    if (literal[0] === "`") return body;
    const json = literal[0] === "'" ? `"${body.replace(/\\'/g, "'").replace(/"/g, '\\"')}"` : literal;
    try {
        return JSON.parse(json);
    } catch {
        return null;
    }
}

function testsArm() {
    const sink = new Set();
    const unreadable = [];
    const files = [
        ...[...tracked(ROOT, "test/", [".ts"]), ...tracked(ROOT, "demo/test/", [".ts"])]
            .filter((f) => !f.startsWith("test/css/equivalence/"))
            .filter((f) => ENTRY_NAME.test(atHead(ROOT, f))),
        // The vendored WPT cases `test/css/css-color5.test.ts` reads (their values are string literals too).
        ...tracked(ROOT, "test/css/wpt/", [".html"]),
    ];
    for (const file of files) {
        const text = atHead(ROOT, file);
        // Every string literal of a test that exercises a parse entry — its tables as well as its calls.
        for (const m of text.matchAll(LITERAL)) {
            const literal = decode(m[0]);
            if (literal === null) unreadable.push(`${file}: ${m[0].slice(0, 60)}`);
            else if (literal.trim() !== "") sink.add(literal);
        }
        // A sheet handed to `parseStylesheet` also contributes its declaration values and keyframe selectors.
        for (const m of text.matchAll(ENTRY)) {
            const literal = m[1] === "parseStylesheet" ? decode(m[2]) : null;
            if (literal !== null) fromSheet(literal, sink, unreadable, file);
        }
    }
    return { files: files.length, sink, unreadable };
}

const arms = {
    demo: cssArm(ROOT, "demo/"),
    keyframes: cssArm(KEYFRAMES, ""),
    tests: testsArm(),
};
const byInput = new Map();
for (const [id, arm] of Object.entries(arms)) for (const s of arm.sink) if (s !== "") byInput.set(s, [...(byInput.get(s) ?? []), id]);
const rows = [...byInput].map(([s, from]) => ({ s, arms: from })).sort((a, b) => (a.s < b.s ? -1 : a.s > b.s ? 1 : 0));
const corpus = {
    schema: "x-p-w6-h/real-corpus@1",
    note: "Generated by test/css/equivalence/build-corpus.mjs; never hand-edited. Distinct non-empty sources, sorted; each row names every arm it came from.",
    provenance: {
        valueJs: git(ROOT, "rev-parse", "HEAD"),
        keyframesJs: git(KEYFRAMES, "rev-parse", "HEAD"),
    },
    arms: Object.fromEntries(
        Object.entries(arms).map(([id, a]) => [id, { files: a.files, distinct: a.sink.size, unreadable: a.unreadable }]),
    ),
    rows,
    rowsSha256: createHash("sha256").update(JSON.stringify(rows)).digest("hex"),
};

if (process.argv.includes("--check")) {
    const pinned = JSON.parse(readFileSync(OUT, "utf8"));
    const same = pinned.rowsSha256 === corpus.rowsSha256;
    console.log(`real-corpus ${same ? "AGREES" : "DIFFERS"}: pinned ${pinned.rowsSha256} · derived ${corpus.rowsSha256} (${rows.length} rows)`);
    process.exit(same ? 0 : 1);
}
writeFileSync(OUT, `${JSON.stringify(corpus, null, 1)}\n`);
console.log(`real-corpus: ${rows.length} rows · ${Object.entries(corpus.arms).map(([k, v]) => `${k} ${v.files} files/${v.distinct} distinct/${v.unreadable.length} unreadable`).join(" · ")} · ${corpus.rowsSha256}`);
