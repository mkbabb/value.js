// V · pass-4 · Charter ε — THE style.css COHESION CENSUS (durable instrument)
// ---------------------------------------------------------------------------
// The owner's clause-3 ("same for styles") + the glass-ui COLOCATE-IFF-SINGLE-OWNER
// law: a style block whose selector is owned by exactly ONE component colocates into
// that component's <style>; cross-family registers + design tokens + the a11y
// modality layer stay in the central sheet with their cascade-ORDER authority
// preserved (glass-ui's §index.css precedent). This instrument parses style.css into
// top-level blocks, classifies each, greps the demo tree for each class's owners, and
// reports the before/after byte + block census.
//
// THE OBJECTIVE (NG-3): COLOCATE-IFF-SINGLE-OWNER. A rule is a colocation candidate
// ONLY when exactly one component family references its class AND the rule is not
// cascade-coupled to a global layer (a token override / an a11y modality escape).
// The alternative (colocate every single-owner block regardless of cascade coupling)
// is named where it would break the a11y-layer/media-override cascade.
//
// Re-runnable from the value.js repo root against any tree:
//   node docs/tranches/V/design/pass-4/instruments/style-census.mjs

import { readdirSync, readFileSync, existsSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

const CSS = resolve("demo/@/styles/style.css");
const DEMO = resolve("demo");
if (!existsSync(CSS)) { console.error("style-census: style.css not found — run from repo root."); process.exit(2); }
const src = readFileSync(CSS, "utf8");
const totalBytes = Buffer.byteLength(src, "utf8");

// ---- demo source files (for the owner scan) ----
function walk(dir, acc = []) {
    for (const e of readdirSync(dir)) {
        const p = join(dir, e); const s = statSync(p);
        if (s.isDirectory()) { if (["node_modules", "public", "dist"].includes(e)) continue; walk(p, acc); }
        else if (/\.(vue|ts|mts)$/.test(e)) acc.push(p);
    }
    return acc;
}
const files = walk(DEMO);
// family of a demo file (the cross-family grain)
function familyOf(f) {
    const rel = relative(DEMO, f);
    let m;
    if ((m = rel.match(/^@\/components\/custom\/([^/]+)\//))) return "feat:" + m[1];
    if (rel.startsWith("color-picker/")) return "app";
    if (rel.startsWith("@/composables/")) return "composables";
    if (rel.startsWith("@/lib/")) return "lib";
    if (rel.startsWith("@/components/ui/")) return "ui";
    return "other";
}
// owners (families) that reference a given class token in a class="" / :class / template context
function ownersOfClass(cls) {
    const fams = new Set(); const owners = [];
    const re = new RegExp(`\\b${cls.replace(/[-]/g, "\\-")}\\b`);
    for (const f of files) {
        const s = readFileSync(f, "utf8");
        if (re.test(s)) { fams.add(familyOf(f)); owners.push(relative(DEMO, f)); }
    }
    return { fams: [...fams], owners };
}

// ---- brace-aware top-level block splitter ----
// A block = an optional leading comment run + one top-level statement (a rule or at-rule
// with its balanced braces, or a semicolon-terminated at-rule like @import).
function splitBlocks(text) {
    const blocks = [];
    let i = 0, n = text.length;
    while (i < n) {
        // skip whitespace
        while (i < n && /\s/.test(text[i])) i++;
        if (i >= n) break;
        const start = i;
        // consume leading comment(s)
        while (text.startsWith("/*", i)) {
            const end = text.indexOf("*/", i);
            i = end === -1 ? n : end + 2;
            while (i < n && /\s/.test(text[i])) i++;
        }
        if (i >= n) { if (text.slice(start).trim()) blocks.push({ text: text.slice(start, n) }); break; }
        // now a statement: read until matching top-level ; or { … }
        let depth = 0; let j = i;
        for (; j < n; j++) {
            const c = text[j];
            if (c === "/" && text[j + 1] === "*") { j = text.indexOf("*/", j); if (j === -1) { j = n; break; } j++; continue; }
            if (c === '"' || c === "'") { // skip string literal (braces/semicolons inside are literal, e.g. @source "…{vue,ts}")
                const q = c; j++;
                while (j < n && text[j] !== q) { if (text[j] === "\\") j++; j++; }
                continue;
            }
            if (c === "{") depth++;
            else if (c === "}") { depth--; if (depth === 0) { j++; break; } }
            else if (c === ";" && depth === 0) { j++; break; }
        }
        blocks.push({ text: text.slice(start, j), stmtStart: i - start });
        i = j;
    }
    return blocks;
}
const blocks = splitBlocks(src);

// classify a block
function classify(b) {
    const t = b.text;
    const stmt = t.slice(b.stmtStart || 0).trimStart();
    const head = stmt.slice(0, 200).replace(/\s+/g, " ").trim();
    const bytes = Buffer.byteLength(t, "utf8");
    // at-rules
    if (/^@import/.test(stmt)) return { kind: "INFRA", disp: "STAY", head, bytes };
    if (/^@source/.test(stmt)) return { kind: "INFRA", disp: "STAY", head, bytes };
    if (/^@theme/.test(stmt)) return { kind: "TOKENS", disp: "STAY", head, bytes };
    if (/^@property/.test(stmt)) return { kind: "TOKENS", disp: "STAY", head, bytes };
    if (/^@layer\s+base/.test(stmt)) return { kind: "INFRA", disp: "STAY", head, bytes };
    if (/^@media\s+print/.test(stmt)) return { kind: "A11Y", disp: "STAY", head, bytes };
    if (/^@media\s*\(\s*forced-colors|^@media\s*\(\s*prefers-contrast|^@media\s*\(\s*prefers-reduced-transparency/.test(stmt))
        return { kind: "A11Y", disp: "STAY", head, bytes };
    if (/^@media/.test(stmt)) {
        // token override (:root inside) vs shell layout media
        if (/:root/.test(stmt)) return { kind: "TOKEN-OVERRIDE", disp: "STAY", head, bytes };
        return { kind: "SHELL", disp: "COLOCATE→App.vue (cascade-coupled)", head, bytes };
    }
    if (/^@supports/.test(stmt)) return { kind: "SHELL", disp: "COLOCATE→App.vue (cascade-coupled)", head, bytes };
    // rules
    if (/^:root|^\.dark\b/.test(stmt)) return { kind: "TOKENS", disp: "STAY", head, bytes };
    if (/^::selection|^::-moz-selection/.test(stmt)) return { kind: "GLOBAL", disp: "STAY", head, bytes };
    // plain selector rule — extract lead classes and count owners
    const sel = stmt.slice(0, stmt.indexOf("{")).trim();
    const classes = [...sel.matchAll(/\.([a-zA-Z][\w-]*)/g)].map((m) => m[1]);
    const primary = classes[0];
    if (!primary) return { kind: "GLOBAL", disp: "STAY", head, bytes };
    // shell classes are single-owner-App but cascade-coupled to the a11y/media layer
    if (/^(app-layout|pane-|dock-|dock-band)/.test(primary))
        return { kind: "SHELL", disp: "COLOCATE→App.vue (cascade-coupled)", head, bytes, primary };
    const { fams, owners } = ownersOfClass(primary);
    if (fams.length === 0) return { kind: "DEAD", disp: "DELETE (0 owners — clean break)", head, bytes, primary };
    if (fams.length === 1) return { kind: "SINGLE-OWNER", disp: `COLOCATE→${owners[0]}`, head, bytes, primary, fams, owners };
    return { kind: "CROSS-FAMILY", disp: `STAY (${fams.length} families)`, head, bytes, primary, fams };
}

const classified = blocks.map(classify);

// ---- report ----
console.log("=== style.css COHESION CENSUS ===\n");
console.log(`file bytes: ${totalBytes}  ·  top-level blocks: ${blocks.length}\n`);
console.log("kind\tbytes\tdisposition\thead");
const byKind = {};
for (const c of classified) {
    byKind[c.kind] = byKind[c.kind] || { n: 0, bytes: 0 };
    byKind[c.kind].n++; byKind[c.kind].bytes += c.bytes;
    console.log(`${c.kind}\t${c.bytes}\t${c.disp}\t${c.head.slice(0, 60)}`);
}
console.log("\n--- by disposition class ---");
let stayBytes = 0, colocateBytes = 0, deadBytes = 0;
for (const [k, v] of Object.entries(byKind)) {
    console.log(`  ${k}: ${v.n} blocks, ${v.bytes} bytes`);
    if (k === "DEAD") deadBytes += v.bytes;
    else if (k === "SINGLE-OWNER" || k === "SHELL") colocateBytes += v.bytes;
    else stayBytes += v.bytes;
}
console.log(`\nBEFORE: ${totalBytes} bytes / ${blocks.length} blocks`);
console.log(`  STAY (tokens + a11y + cross-family + infra): ${stayBytes} bytes`);
console.log(`  COLOCATE (single-owner + shell→App.vue):     ${colocateBytes} bytes`);
console.log(`  DELETE (dead):                                ${deadBytes} bytes`);
console.log(`AFTER (central sheet, if all colocations taken): ~${totalBytes - colocateBytes - deadBytes} bytes`);

console.log("\n=== DEAD (delete) ===");
for (const c of classified.filter((c) => c.kind === "DEAD")) console.log(`  .${c.primary}  — ${c.head.slice(0, 50)}`);
console.log("\n=== SINGLE-OWNER (colocate) ===");
for (const c of classified.filter((c) => c.kind === "SINGLE-OWNER")) console.log(`  .${c.primary}  → ${c.owners[0]}`);
console.log("\n=== SHELL (single-owner App.vue, cascade-coupled) ===");
for (const c of classified.filter((c) => c.kind === "SHELL")) console.log(`  ${c.primary ? "." + c.primary : c.head.slice(0, 40)}  (${c.bytes}b)`);
console.log("\n=== CROSS-FAMILY (stay global) ===");
for (const c of classified.filter((c) => c.kind === "CROSS-FAMILY")) console.log(`  .${c.primary}  (${c.fams.join(", ")})`);
