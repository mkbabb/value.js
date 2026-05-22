#!/usr/bin/env node
// Codifies the no-`:deep()` precept across demo/ + src/.
//
// Ported from speedtest's scripts/check-deep.mjs (AD.W2.T7). `:deep()` /
// `::v-deep` punch through Vue's scoped-CSS barrier and couple a consumer to
// a primitive's internal class names — exactly the cross-boundary contract
// glass-ui's custom-prop cascade pattern replaced. value.js inherits the
// precept (PaletteCard.vue's D.W4 Lane A §3 retired its last `:deep(svg)`
// reach) but had no CI gate; G.W3 Lane J (FOLD-S1) installs one.
//
// Block comments are stripped before matching so narrative citations of the
// retired `:deep()` pattern (CSS `/* ... */` and Vue `<!-- ... -->` blocks)
// do not false-positive — only live selectors fault the gate.
//
// Exit 0 → clean; Exit 1 → one or more live :deep() / ::v-deep selectors.
//
// Run: node scripts/proof-no-deep.mjs
// npm:  npm run proof:no-deep

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCAN_ROOTS = ["demo", "src"].map((d) => join(ROOT, d));
const SKIP_DIRS = new Set(["node_modules", "dist", ".git"]);
const SOURCE_FILE_RE = /\.(vue|css|scss)$/;
const DEEP_RE = /::v-deep|:deep\s*\(/;

function* walkSource(dir) {
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) {
            if (!SKIP_DIRS.has(entry)) yield* walkSource(full);
        } else if (SOURCE_FILE_RE.test(entry)) {
            yield full;
        }
    }
}

function isCommentLine(line) {
    const t = line.trimStart();
    return t.startsWith("//") || t.startsWith("*") || t.startsWith("/*");
}

// Blank out `/* ... */` (CSS/JS) and `<!-- ... -->` (Vue template) block
// comments, preserving newlines so line numbers stay aligned with the source.
function stripBlockComments(text) {
    let out = "";
    for (let i = 0; i < text.length; ) {
        const open = text.startsWith("/*", i)
            ? ["*/", 2]
            : text.startsWith("<!--", i)
              ? ["-->", 3]
              : null;
        if (open) {
            const end = text.indexOf(open[0], i + open[1]);
            const span = end === -1 ? text.length - i : end - i + open[0].length;
            for (let k = 0; k < span; k++) out += text[i + k] === "\n" ? "\n" : " ";
            i += span;
        } else {
            out += text[i++];
        }
    }
    return out;
}

const violations = [];
for (const root of SCAN_ROOTS) {
    for (const file of walkSource(root)) {
        const text = readFileSync(file, "utf8");
        if (!DEEP_RE.test(text)) continue;
        const stripped = stripBlockComments(text).split("\n");
        const raw = text.split("\n");
        for (let i = 0; i < stripped.length; i++) {
            if (!DEEP_RE.test(stripped[i])) continue;
            if (isCommentLine(stripped[i]) || isCommentLine(raw[i])) continue;
            violations.push({ file: relative(ROOT, file), line: i + 1, text: raw[i].trim() });
        }
    }
}

if (violations.length === 0) {
    console.log("[proof:no-deep] PASS — zero :deep() / ::v-deep in demo/ + src/");
    process.exit(0);
}

console.error(
    `[proof:no-deep] FAIL — found ${violations.length} :deep() / ::v-deep selector(s):`,
);
for (const v of violations) console.error(`  ${v.file}:${v.line}  ${v.text}`);
console.error(
    "\nFix: replace with glass-ui's custom-prop cascade — declare a CSS custom " +
        "prop on the consumer ancestor; the scoped primitive reads it via the cascade.",
);
process.exit(1);
