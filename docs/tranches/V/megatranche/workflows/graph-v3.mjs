#!/usr/bin/env node
// SERVED MODEL: claude-opus-5[1m]
//
// graph-v3.mjs — the typed multi-domain frontend graph and SCC oracle (X-W0.h).
//
// WHY THIS EXISTS (L-17 / L-19). `MECHANISM-CUT-FORMATION-MAP-2026-07-29.md:126`
// recorded the v2 graph's defect verbatim: "graph lacks typed multi-domain edges
// and honest SCC classes". A graph with one untyped edge kind can only answer
// "does A reach B"; the questions X-W8 must answer are "which cluster owns this
// file", "is this cycle load-bearing or a type lattice", and "does removing this
// resolver alias dissolve a cycle". Those need EDGE TYPE and SCC CLASS.
//
// This is X-W8's INPUT, not a proof farm (L-19). X-W8 binds CC-078's file bounds
// and CC-079's four SCC owners from `GRAPH-V3/sccs.json`; it does not re-derive
// them. Nothing here proves anything about product behaviour — it reports the
// shape of the source tree, typed, deterministically, twice.
//
// DETERMINISM CONTRACT (HG-14). Roster comes from `git ls-files` (sorted,
// tracked-only — no filesystem iteration order, no untracked noise). Every
// array is sorted by a total key before it is hashed. Every object is
// serialized through `canon()`, which sorts keys recursively. `--verify` builds
// the graph twice in one process and compares digests, then compares against the
// committed artifacts. Non-determinism is a TOOL DEFECT and a triumvirate
// trigger (W0.md §Triumvirate Dispatch bullet 2) — never an edit to the output.
//
// USAGE
//   node docs/tranches/V/megatranche/workflows/graph-v3.mjs            # emit
//   node docs/tranches/V/megatranche/workflows/graph-v3.mjs --verify   # round-trip
//   node .../graph-v3.mjs --print-sccs        # SCC roster to stdout
//   node .../graph-v3.mjs --print-census      # the frontend denominator to stdout
//
// EXIT CODES: 0 ok · 1 verify failure (digest mismatch) · 2 usage/IO error.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, posix, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
// workflows → megatranche → V → tranches → docs → <repo root>
const REPO = resolve(HERE, "../../../../..");
const OUT_DIR = resolve(REPO, "docs/tranches/X/W0/GRAPH-V3");

// ── §1 The subject set ───────────────────────────────────────────────────────
//
// SUBJECT_ROOTS is the frontend denominator's scope: the demo application, the
// library it consumes through its own published subpaths, and the two test
// surfaces that bind to them. Each root carries a BAND, which is what the
// package/build/test boundary domain types its crossings against.

const BANDS = [
    { band: "demo", root: "demo" },
    { band: "library", root: "src" },
    { band: "test", root: "test" },
    { band: "e2e", root: "e2e" },
    { band: "asset", root: "assets" },
];

// The DENOMINATOR bands — the frontend source roster HG-15 gates. `e2e` is a
// separate Playwright harness and `asset`/`build` are not source members; they
// are in the GRAPH (edges must be able to leave the denominator) but not in the
// census count. See census().predicate for why this line sits exactly here.
const DENOMINATOR_BANDS = new Set(["demo", "library", "test"]);

// Build/config files are nodes too: they mint resolver aliases, and an alias is
// an edge type. A graph that cannot see `vite.config.ts` cannot see why
// `@mkbabb/value.js/color` resolves anywhere at all.
const BUILD_FILES = [
    "vite.config.ts",
    "vitest.config.ts",
    "package.json",
    "tsconfig.json",
    "tsconfig.demo.json",
    "tsconfig.lib.json",
    "playwright.config.ts",
];

// Node ids the graph MINTS rather than reads off disk. `areaOf` gives each its
// own area; `SINK_PREFIXES` is the subset an edge cannot return from, so a cycle
// is never claimed across the subject set's boundary. `route:` and `public:` are
// synthetic but NOT sinks: a route node binds back into a pane, and a public
// asset is repo-owned.
const SYNTHETIC_PREFIXES = ["pkg:", "api:", "worker:", "route:", "public:", "outside:", "unresolved:"];
const SINK_PREFIXES = ["pkg:", "api:", "worker:", "outside:", "unresolved:"];

const SOURCE_EXT = new Set([".vue", ".ts", ".js", ".mjs", ".css", ".glsl", ".html"]);
// `assets/**` enters the graph only as import TARGETS (the reference pages
// `AboutPane.vue` embeds), never as source members.
const ASSET_EXT = new Set([".md", ".json", ".svg", ".png", ".woff2", ".txt"]);

// ── §2 Primitives ────────────────────────────────────────────────────────────

const sha256 = (s) => createHash("sha256").update(s).digest("hex");

/** Canonical JSON: keys sorted recursively, so the digest is order-free. */
const canon = (v) => {
    if (Array.isArray(v)) return `[${v.map(canon).join(",")}]`;
    if (v && typeof v === "object") {
        const keys = Object.keys(v).sort();
        return `{${keys.map((k) => `${JSON.stringify(k)}:${canon(v[k])}`).join(",")}}`;
    }
    return JSON.stringify(v === undefined ? null : v);
};

const git = (...args) =>
    execFileSync("git", args, { cwd: REPO, encoding: "utf8", maxBuffer: 64 << 20 });

const ext = (p) => {
    const i = p.lastIndexOf(".");
    return i < 0 ? "" : p.slice(i);
};

/** Sort by a string key; the ONLY ordering primitive used before hashing. */
const byKey = (fn) => (a, b) => {
    const ka = fn(a);
    const kb = fn(b);
    return ka < kb ? -1 : ka > kb ? 1 : 0;
};

// ── §3 Roster ────────────────────────────────────────────────────────────────

function roster() {
    const tracked = git("ls-files", "-z", "--", ...BANDS.map((b) => b.root))
        .split("\0")
        .filter(Boolean);
    const files = [];
    for (const path of tracked) {
        const band = BANDS.find((b) => path === b.root || path.startsWith(b.root + "/")).band;
        const keep = band === "asset" ? ASSET_EXT.has(ext(path)) : SOURCE_EXT.has(ext(path));
        if (!keep) continue;
        files.push({ path, band });
    }
    for (const path of BUILD_FILES) {
        if (existsSync(resolve(REPO, path))) files.push({ path, band: "build" });
    }
    files.sort(byKey((f) => f.path));
    return files;
}

// ── §4 Resolver aliases — read from the build files, never hard-coded ────────
//
// `vite.config.ts` derives the value.js self-alias set from `package.json#exports`
// (it says so at :23-36). We read the same source, so the alias table can never
// drift from the exports map — the identical guarantee the config itself claims.

function aliasTable() {
    const pkg = JSON.parse(readFileSync(resolve(REPO, "package.json"), "utf8"));
    const table = [
        { find: "@src", kind: "alias.src", replacement: "src", minter: "vite.config.ts" },
    ];
    for (const [subpath, conditions] of Object.entries(pkg.exports ?? {})) {
        table.push({
            find: "@mkbabb/value.js" + subpath.slice(1),
            kind: "alias.self",
            replacement: conditions.import,
            minter: "package.json#exports → vite.config.ts",
            anchored: true,
        });
    }
    table.sort(byKey((a) => a.find));
    return table;
}

// ── §5 Block extraction ──────────────────────────────────────────────────────

const RE_SFC_SCRIPT = /<script\b[^>]*>([\s\S]*?)<\/script>/g;
const RE_SFC_STYLE = /<style\b[^>]*>([\s\S]*?)<\/style>/g;
const RE_SFC_TEMPLATE = /^<template[^>]*>([\s\S]*)^<\/template>/m;

/**
 * A block is a MASK over the whole file, not a slice of it: every byte outside
 * the block becomes a space, every newline is kept. Two consequences, both
 * load-bearing:
 *
 *  1. a match index inside a block IS the file offset, so `lineOf` is exact.
 *     The slice-and-`indexOf` idiom it replaces returns the FIRST occurrence of
 *     the matched text anywhere in the file, which silently mis-cites every
 *     repeated statement — and a witness citation that points at the wrong line
 *     is worse than none, because X-W8 subtracts against it.
 *  2. the mask cannot leak: a specifier written in the template can never be
 *     read as a script import, and vice versa.
 */
function maskTo(text, ranges) {
    const chars = new Array(text.length);
    for (let i = 0; i < text.length; i += 1) chars[i] = text[i] === "\n" ? "\n" : " ";
    for (const [s, e] of ranges) for (let i = s; i < e && i < text.length; i += 1) chars[i] = text[i];
    return chars.join("");
}

/** Inner-content range of an SFC block match: after the open tag, before close. */
const innerRange = (m) => {
    const start = m.index + m[0].indexOf(">") + 1;
    return [start, start + m[1].length];
};

const RE_HTML_COMMENT = /<!--[\s\S]*?-->/g;

/**
 * Blank every HTML comment, length- and line-preserving. A commented-out tag is
 * not a rendered tag: without this, three tags that exist only inside `<!-- … -->`
 * prose (`<Card` at `PaletteCard.vue:28`, `<EasingPicker>` in the two gradient
 * visualizers) report as template tags bound to no import — a false positive that
 * would read as three missing components.
 */
function blankComments(masked) {
    const chars = [...masked];
    for (const m of masked.matchAll(RE_HTML_COMMENT)) {
        for (let i = m.index; i < m.index + m[0].length; i += 1) {
            if (chars[i] !== "\n") chars[i] = " ";
        }
    }
    return chars.join("");
}

function blocks(path, text) {
    if (ext(path) === ".vue") {
        const scriptRanges = [...text.matchAll(RE_SFC_SCRIPT)].map(innerRange);
        const styleRanges = [...text.matchAll(RE_SFC_STYLE)].map(innerRange);
        const tm = RE_SFC_TEMPLATE.exec(text);
        return {
            script: maskTo(text, scriptRanges),
            style: maskTo(text, styleRanges),
            template: tm ? blankComments(maskTo(text, [innerRange(tm)])) : "",
        };
    }
    if (ext(path) === ".css") return { script: "", style: text, template: "" };
    return { script: text, style: "", template: "" };
}

// ── §6 Specifier extraction, typed at the statement ──────────────────────────

const RE_IMPORT_FROM = /^[ \t]*import\s+(?:(type)\s+)?([\s\S]*?)from\s*["']([^"']+)["']/gm;
const RE_IMPORT_BARE = /^[ \t]*import\s*["']([^"']+)["']/gm;
const RE_EXPORT_FROM = /^[ \t]*export\s+(?:(type)\s+)?(\*(?:\s+as\s+\w+)?|\{[\s\S]*?\})\s*from\s*["']([^"']+)["']/gm;
const RE_DYNAMIC = /\bimport\(\s*["']([^"']+)["']\s*\)/g;
const RE_NEW_URL = /new\s+URL\(\s*["']([^"']+)["']\s*,\s*import\.meta\.url\s*\)/g;
const RE_CSS_IMPORT = /@import\s+(?:url\(\s*)?["']([^"')]+)["']/g;
const RE_REQUIRE = /\brequire\(\s*["']([^"']+)["']\s*\)/g;

/** Line number of a match offset — 1-indexed, for witness citations. */
const lineOf = (text, index) => text.slice(0, index).split("\n").length;

/** Parse the binding clause of an import statement into local names. */
function bindings(clause) {
    const out = [];
    const ns = /\*\s+as\s+([A-Za-z_$][\w$]*)/.exec(clause);
    if (ns) out.push({ local: ns[1], kind: "namespace", typeOnly: false });
    const def = /^\s*([A-Za-z_$][\w$]*)\s*(?:,|$)/.exec(clause.replace(/\{[\s\S]*?\}/g, ""));
    if (def) out.push({ local: def[1], kind: "default", typeOnly: false });
    const named = /\{([\s\S]*?)\}/.exec(clause);
    if (named) {
        for (const raw of named[1].split(",")) {
            const piece = raw.trim();
            if (!piece) continue;
            const typeOnly = /^type\s+/.test(piece);
            const body = piece.replace(/^type\s+/, "");
            const as = /^(\S+)\s+as\s+([A-Za-z_$][\w$]*)$/.exec(body);
            const local = as ? as[2] : body;
            if (/^[A-Za-z_$][\w$]*$/.test(local)) out.push({ local, kind: "named", typeOnly });
        }
    }
    return out;
}

/**
 * Every specifier a file states, with the statement kind that states it.
 * `kind` here is the SYNTACTIC kind; §8 maps it onto the edge DOMAIN.
 */
function specifiers(path, text, b) {
    const found = [];
    const push = (o) => found.push(o);

    for (const m of b.script.matchAll(RE_IMPORT_FROM)) {
        push({
            spec: m[3],
            kind: m[1] ? "import.type" : "import.value",
            line: lineOf(text, m.index),
            bindings: m[1] ? bindings(m[2]).map((x) => ({ ...x, typeOnly: true })) : bindings(m[2]),
        });
    }
    for (const m of b.script.matchAll(RE_IMPORT_BARE)) {
        push({ spec: m[1], kind: "import.sideeffect", line: lineOf(text, m.index), bindings: [] });
    }
    for (const m of b.script.matchAll(RE_EXPORT_FROM)) {
        push({
            spec: m[3],
            kind: m[1] ? "reexport.type" : "reexport.value",
            line: lineOf(text, m.index),
            bindings: [],
        });
    }
    for (const m of b.script.matchAll(RE_DYNAMIC)) {
        push({ spec: m[1], kind: "import.dynamic", line: lineOf(text, m.index), bindings: [] });
    }
    for (const m of b.script.matchAll(RE_REQUIRE)) {
        push({ spec: m[1], kind: "import.require", line: lineOf(text, m.index), bindings: [] });
    }
    for (const m of b.script.matchAll(RE_NEW_URL)) {
        push({ spec: m[1], kind: "asset.url", line: lineOf(text, m.index), bindings: [] });
    }
    for (const m of b.style.matchAll(RE_CSS_IMPORT)) {
        push({ spec: m[1], kind: "css.import", line: lineOf(text, m.index), bindings: [] });
    }
    found.sort(byKey((f) => `${f.spec}\u0000${f.kind}\u0000${String(f.line).padStart(6, "0")}`));
    return found;
}

// ── §7 Resolution ────────────────────────────────────────────────────────────

const CANDIDATE_SUFFIXES = ["", ".ts", ".vue", ".js", ".mjs", ".css", ".glsl", ".md", "/index.ts", "/index.vue", "/index.js"];

function makeResolver(rosterSet, aliases) {
    const probe = (base) => {
        for (const suffix of CANDIDATE_SUFFIXES) {
            const cand = posix.normalize(base + suffix);
            if (rosterSet.has(cand)) return cand;
        }
        // NodeNext/ESM extension mapping: `./client.js` names `./client.ts` on
        // disk. `verbatimModuleSyntax` + `moduleResolution: bundler` make this
        // the repo's own idiom, so the graph must follow it or it invents
        // twenty unresolved specifiers that resolve perfectly at build time.
        if (base.endsWith(".js")) {
            const stem = base.slice(0, -3);
            for (const suffix of [".ts", ".tsx", ".vue", ".mts"]) {
                const cand = posix.normalize(stem + suffix);
                if (rosterSet.has(cand)) return cand;
            }
        }
        return null;
    };

    /** Same suffix walk, against the working tree instead of the roster. */
    const offRosterProbe = (base) => {
        for (const suffix of CANDIDATE_SUFFIXES) {
            const cand = posix.normalize(base + suffix);
            if (!cand.startsWith("..") && existsSync(resolve(REPO, cand))) return cand;
        }
        return null;
    };

    return function resolveSpec(fromPath, rawSpec) {
        const [bare, query = ""] = rawSpec.split("?");
        const spec = bare;

        if (spec.startsWith(".")) {
            const base = posix.normalize(posix.join(posix.dirname(fromPath), spec));
            const hit = probe(base);
            if (hit) return { target: hit, via: "relative", query, external: false };
            // A relative specifier that misses the roster is one of two very
            // different things, and conflating them makes the census lie: a file
            // that EXISTS but sits outside the five subject roots (vite's own
            // plugin modules at the repo root), or a path that resolves to
            // nothing at all (the two e2e fixtures naming a `demo/@/lib` tree
            // that no longer exists). Only the second is a defect.
            const onDisk = offRosterProbe(base);
            return onDisk
                ? { target: `outside:${onDisk}`, via: "relative", query, external: true, offRoster: true }
                : { target: `unresolved:${base}`, via: "relative", query, external: false, unresolved: true };
        }
        if (spec.startsWith("/")) {
            const hit = probe(spec.replace(/^\/+/, ""));
            return hit
                ? { target: hit, via: "absolute", query, external: false }
                : { target: `public:${spec}`, via: "absolute", query, external: true };
        }

        for (const a of aliases) {
            if (a.anchored ? spec === a.find : spec === a.find || spec.startsWith(a.find + "/")) {
                if (a.kind === "alias.src") {
                    const rest = spec.slice(a.find.length).replace(/^\//, "");
                    const hit = probe(posix.join(a.replacement, rest));
                    return hit
                        ? { target: hit, via: a.kind, query, external: false, alias: a.find, minter: a.minter }
                        : { target: `unresolved:${a.replacement}/${rest}`, via: a.kind, query, external: false, alias: a.find, minter: a.minter, unresolved: true };
                }
                // alias.self: the value.js published subpath. It resolves to a
                // BUILD ARTEFACT (dist/…), not to a tracked source file — that
                // is the point of the self-alias, and the graph says so.
                return {
                    target: `pkg:${spec}`,
                    via: a.kind,
                    query,
                    external: true,
                    alias: a.find,
                    minter: a.minter,
                    resolvesTo: a.replacement,
                    artefactPresent: existsSync(resolve(REPO, a.replacement)),
                };
            }
        }

        const scoped = spec.startsWith("@");
        const parts = spec.split("/");
        const name = scoped ? parts.slice(0, 2).join("/") : parts[0];
        const subpath = spec.slice(name.length);
        const sibling = existsSync(resolve(REPO, "node_modules", name, "package.json"))
            ? JSON.parse(readFileSync(resolve(REPO, "node_modules", name, "package.json"), "utf8")).version
            : null;
        return {
            target: `pkg:${name}${subpath}`,
            via: "package",
            query,
            external: true,
            packageName: name,
            packageSubpath: subpath || ".",
            installedVersion: sibling,
        };
    };
}

// ── §8 Edge domains ──────────────────────────────────────────────────────────
//
// The seven domains the spec names (W0.md:195), each with its own typed kinds:
//
//   resolver alias  → alias.src · alias.self
//   CSS             → css.import · css.module
//   render          → render.tag · render.dynamic · render.mount
//   DI              → di.provide · di.inject · di.flow
//   route           → route.record · route.pane
//   state           → state.module
//   API             → api.transport · api.endpoint
//   worker/asset    → asset.url · asset.query · worker.spawn
//   package/build/
//     test boundary → boundary.package · boundary.build · boundary.test
//
// plus the module domain itself (import.value / import.type / import.dynamic /
// import.sideeffect / reexport.*), which is what the three SCC classes read.

const DOMAIN_OF = {
    "import.value": "module",
    "import.type": "module",
    "import.dynamic": "module",
    "import.sideeffect": "module",
    "import.require": "module",
    "reexport.value": "module",
    "reexport.type": "module",
    "css.import": "css",
    "css.module": "css",
    "asset.url": "asset",
    "asset.query": "asset",
    "worker.spawn": "worker",
    "render.tag": "render",
    "render.dynamic": "render",
    "render.mount": "render",
    "di.provide": "di",
    "di.inject": "di",
    "di.flow": "di",
    "route.record": "route",
    "route.pane": "route",
    "state.module": "state",
    "api.transport": "api",
    "api.endpoint": "api",
    "boundary.package": "boundary",
    "boundary.build": "boundary",
    "boundary.test": "boundary",
    "alias.src": "alias",
    "alias.self": "alias",
};

/** Edges that a bundler must load to run the app — the runtime SCC class. */
const RUNTIME_KINDS = new Set([
    "import.value",
    "import.sideeffect",
    "import.require",
    "reexport.value",
    "css.import",
    "css.module",
]);

/** Everything a type-checker / module graph traverses — the load SCC class. */
const LOAD_KINDS = new Set([...RUNTIME_KINDS, "import.type", "reexport.type", "import.dynamic"]);

// ── §9 Build ─────────────────────────────────────────────────────────────────

const RE_PROVIDE = /\bprovide\(\s*([A-Za-z_$][\w$]*)\s*,/g;
const RE_INJECT = /\binject\(\s*([A-Za-z_$][\w$]*)\b/g;
const RE_INJECTION_KEY = /\b(?:export\s+const\s+)?([A-Z][A-Z0-9_]*)\s*:\s*InjectionKey</g;
const RE_MODULE_STATE = /^(?:export\s+)?const\s+([A-Za-z_$][\w$]*)\s*=\s*(ref|shallowRef|reactive|shallowReactive|computed|readonly)\(/gm;
const RE_WORKER = /new\s+(?:Shared)?Worker\(/;
const RE_TELEPORT = /<Teleport\b/g;
const RE_DYN_IS = /:is=/g;
const RE_ROUTE_RECORD = /\{\s*path:\s*"([^"]+)"(?:\s*,\s*name:\s*"([^"]+)")?/g;
const RE_FETCH = /\bfetch\(/;
const PASCAL_TAG = /<([A-Z][A-Za-z0-9_]*)\b/g;
const KEBAB_TAG = /<([a-z][a-z0-9]*(?:-[a-z0-9]+)+)\b/g;
const RE_CREATE_APP = /\bcreateApp\(\s*([A-Za-z_$][\w$]*)\s*\)/g;
const RE_ASYNC_COMPONENT = /\bconst\s+([A-Za-z_$][\w$]*)\s*=\s*defineAsyncComponent\(\s*\(\)\s*=>\s*import\(\s*["']([^"']+)["']\s*\)/g;
const RE_COMPONENT_FOR = /name\s*===\s*"([^"]+)"\s*\)\s*return\s+([A-Za-z_$][\w$]*)\s*;/g;
// The pane registry's second arm: one prefix standing for a whole route family.
// `usePaneRouter.ts:93` — `if (name.startsWith("admin-")) return AdminPane;` —
// is the ONLY mount `AdminPane.vue` has. A registry reader that sees only the
// `===` arm reports a mounted pane as an unmounted harness, which is exactly the
// false positive HG-15's harness figure exists to exclude.
const RE_COMPONENT_FOR_PREFIX = /name\.startsWith\(\s*"([^"]+)"\s*\)\s*\)\s*return\s+([A-Za-z_$][\w$]*)\s*;/g;
// Barrel forwarding, both idioms this tree uses:
//   export { default as Dock } from "./Dock.vue";   → Dock      → ./Dock.vue
//   export { GlassDock } from "@mkbabb/glass-ui/dock";
const RE_EXPORT_CLAUSE = /^[ \t]*export\s+(?:type\s+)?\{([\s\S]*?)\}\s*from\s*["']([^"']+)["']/gm;

/**
 * Vue's own template surface. A tag from this set is not a missing import —
 * it is the framework. Counted separately so `renderTagsUnbound` means what it
 * says (a tag bound to nothing this graph can see) rather than "Vue exists".
 */
const VUE_BUILTIN_TAGS = new Set([
    "Component", "KeepAlive", "RouterLink", "RouterView", "Suspense",
    "Teleport", "Transition", "TransitionGroup",
]);

const pascal = (kebab) => kebab.split("-").map((p) => p[0].toUpperCase() + p.slice(1)).join("");

const TRANSPORT_PREFIX = "demo/platform/transport/";

function build() {
    const files = roster();
    const rosterSet = new Set(files.map((f) => f.path));
    const aliases = aliasTable();
    const resolveSpec = makeResolver(rosterSet, aliases);

    const nodes = new Map();
    const edges = [];
    const facts = {
        sfc: [],
        teleports: 0,
        dynamicIsSites: 0,
        routes: [],
        wildcardRoutes: [],
        injectionKeys: [],
        moduleStateModules: [],
        workers: [],
        barrels: [],
        unresolved: [],
        renderUnbound: [],
        renderBuiltinTags: 0,
        appRoots: [],
    };

    const node = (id, attrs) => {
        if (!nodes.has(id)) nodes.set(id, { id, ...attrs });
        else Object.assign(nodes.get(id), attrs);
        return nodes.get(id);
    };

    const edge = (from, to, kind, attrs = {}) => {
        edges.push({ from, to, kind, domain: DOMAIN_OF[kind] ?? "module", ...attrs });
    };

    // ── pass 1: nodes, specifiers, module/alias/css/asset/boundary edges ──
    const parsed = new Map();

    for (const f of files) {
        const bytes = readFileSync(resolve(REPO, f.path));
        const text = bytes.toString("utf8");
        const b = blocks(f.path, text);
        const specs = specifiers(f.path, text, b);
        parsed.set(f.path, { text, blocks: b, specs });

        const isSfc = ext(f.path) === ".vue";
        const isBarrel = /(^|\/)index\.ts$/.test(f.path);
        node(f.path, {
            kind: isSfc ? "sfc" : ext(f.path) === ".css" ? "stylesheet" : f.band === "build" ? "buildfile" : "module",
            band: f.band,
            area: areaOf(f.path),
            bytes: bytes.length,
            sha256: sha256(bytes),
            barrel: isBarrel,
        });
        if (isSfc) facts.sfc.push(f.path);
        if (isBarrel) facts.barrels.push(f.path);
        if (RE_WORKER.test(b.script)) facts.workers.push(f.path);

        RE_TELEPORT.lastIndex = 0;
        facts.teleports += (b.template.match(RE_TELEPORT) ?? []).length;
        facts.dynamicIsSites += (b.template.match(RE_DYN_IS) ?? []).length;

        for (const key of b.script.matchAll(RE_INJECTION_KEY)) {
            facts.injectionKeys.push({ key: key[1], file: f.path });
        }
        const stateSymbols = [...b.script.matchAll(RE_MODULE_STATE)].map((m) => m[1]).sort();
        if (stateSymbols.length && !isSfc) {
            facts.moduleStateModules.push({ file: f.path, symbols: stateSymbols });
            node(f.path, { moduleState: true });
        }

        for (const s of specs) {
            const r = resolveSpec(f.path, s.spec);
            if (r.unresolved) facts.unresolved.push({ from: f.path, spec: s.spec });

            if (r.external) {
                node(r.target, {
                    kind: r.via === "alias.self"
                        ? "self-subpath"
                        : r.target.startsWith("public:")
                          ? "public-asset"
                          : r.offRoster
                            ? "off-roster"
                            : "package",
                    band: "external",
                    area: r.via === "alias.self"
                        ? "pkg:@mkbabb/value.js"
                        : r.offRoster
                          ? "outside"
                          : r.packageName
                            ? `pkg:${r.packageName}`
                            : "public",
                    ...(r.installedVersion ? { installedVersion: r.installedVersion } : {}),
                    ...(r.resolvesTo ? { resolvesTo: r.resolvesTo, artefactPresent: r.artefactPresent } : {}),
                });
            } else if (!rosterSet.has(r.target)) {
                node(r.target, { kind: "unresolved", band: "unresolved", area: "unresolved" });
            }

            // the module/css/asset edge itself
            edge(f.path, r.target, s.kind, { line: s.line, spec: s.spec, via: r.via });

            // the resolver-alias edge, stated SEPARATELY as its own domain —
            // this is the class HG-14's falsifier removes to test the graph
            if (r.via === "alias.src" || r.via === "alias.self") {
                edge(f.path, r.target, r.via, { line: s.line, spec: s.spec, alias: r.alias, minter: r.minter });
            }
            // the package/build/test boundary crossing
            if (r.via === "package") {
                edge(f.path, r.target, "boundary.package", {
                    line: s.line,
                    spec: s.spec,
                    packageName: r.packageName,
                    installedVersion: r.installedVersion,
                });
            }
            if (!r.external && rosterSet.has(r.target)) {
                const fromBand = f.band;
                const toBand = files.find((x) => x.path === r.target).band;
                if (fromBand !== toBand) {
                    const kind = fromBand === "build" ? "boundary.build"
                        : fromBand === "test" || fromBand === "e2e" ? "boundary.test"
                        : "boundary.package";
                    edge(f.path, r.target, kind, { line: s.line, spec: s.spec, fromBand, toBand });
                }
            }
            // worker/asset — the query suffix IS the mechanism in this tree:
            // there is no `new Worker(` call site anywhere; `?worker` at
            // `useImageQuantize.ts:11` is how the quantize worker is spawned.
            if (r.query) {
                const kind = r.query === "worker" ? "worker.spawn" : "asset.query";
                edge(f.path, r.target, kind, { line: s.line, spec: s.spec, query: r.query });
                if (kind === "worker.spawn") facts.workers.push(f.path);
            } else if (ASSET_EXT.has(ext(String(r.target)))) {
                edge(f.path, r.target, "asset.url", { line: s.line, spec: s.spec });
            }
        }
    }

    // ── the barrel forwarding table ──
    //
    // A render edge whose target is a barrel names the barrel, not the component:
    // `PaletteCardGrid.vue` writes `<PaletteCard>` against an import from
    // `./PaletteCard`, and the concrete SFC sits one `export { default as … }`
    // behind it. Without this table 25 of 88 SFCs read as unmounted — the alias
    // barrel class (19 barrels) is precisely what hides them, which is why the
    // class is TYPED here rather than counted.
    const forwards = new Map(); // barrel path → (exported name → resolved target)
    for (const f of files) {
        const p = parsed.get(f.path);
        if (!p || ext(f.path) !== ".ts") continue;
        const table = new Map();
        for (const m of p.blocks.script.matchAll(RE_EXPORT_CLAUSE)) {
            const to = resolveSpec(f.path, m[2]).target;
            for (const raw of m[1].split(",")) {
                const piece = raw.trim();
                if (!piece) continue;
                const as = /^(\S+)\s+as\s+([A-Za-z_$][\w$]*)$/.exec(piece.replace(/^type\s+/, ""));
                const name = as ? as[2] : piece.replace(/^type\s+/, "");
                if (/^[A-Za-z_$][\w$]*$/.test(name)) table.set(name, to);
            }
        }
        if (table.size) forwards.set(f.path, table);
    }

    /** The concrete module a rendered NAME lands on, one barrel hop resolved. */
    const throughBarrel = (target, name) => {
        const table = forwards.get(target);
        const hit = name ? table?.get(name) : undefined;
        return hit && hit !== target ? hit : null;
    };

    // ── pass 2: render, DI, state, API, route, worker ──
    for (const f of files) {
        const p = parsed.get(f.path);
        if (!p) continue;
        const localToTarget = new Map();
        for (const s of p.specs) {
            if (!s.bindings?.length) continue;
            const r = resolveSpec(f.path, s.spec);
            for (const bnd of s.bindings) localToTarget.set(bnd.local, { r, spec: s, binding: bnd });
        }
        // A lazily-bound component is a binding like any other. Scoping this to
        // `usePaneRouter` alone lost every in-component lazy mount — `HeroBlob`
        // is bound exactly this way at `ColorPicker.vue:157` and is the tree's
        // only WebGL surface.
        for (const m of p.blocks.script.matchAll(RE_ASYNC_COMPONENT)) {
            localToTarget.set(m[1], {
                r: resolveSpec(f.path, m[2]),
                spec: { spec: m[2] },
                binding: { local: m[1], kind: "async", typeOnly: false },
            });
        }

        // render — a template tag bound to an import in scope
        if (ext(f.path) === ".vue" && p.blocks.template) {
            const tags = new Set();
            for (const m of p.blocks.template.matchAll(PASCAL_TAG)) tags.add(m[1]);
            for (const m of p.blocks.template.matchAll(KEBAB_TAG)) tags.add(pascal(m[1]));
            for (const tag of [...tags].sort()) {
                const hit = localToTarget.get(tag);
                if (!hit) {
                    if (VUE_BUILTIN_TAGS.has(tag)) facts.renderBuiltinTags += 1;
                    else facts.renderUnbound.push({ file: f.path, tag });
                    continue;
                }
                edge(f.path, hit.r.target, "render.tag", { tag, spec: hit.spec.spec });
                const concrete = throughBarrel(hit.r.target, tag);
                if (concrete) {
                    edge(f.path, concrete, "render.mount", { tag, viaBarrel: hit.r.target });
                }
            }
            if (/:is=/.test(p.blocks.template)) {
                for (const [local, hit] of [...localToTarget.entries()].sort()) {
                    if (new RegExp(`:is="[^"]*\\b${local}\\b`).test(p.blocks.template)) {
                        edge(f.path, hit.r.target, "render.dynamic", { binding: local, spec: hit.spec.spec });
                        const concrete = throughBarrel(hit.r.target, local);
                        if (concrete) edge(f.path, concrete, "render.mount", { tag: local, viaBarrel: hit.r.target });
                    }
                }
            }
        }

        // DI — provide/inject against an imported InjectionKey
        const provides = [...p.blocks.script.matchAll(RE_PROVIDE)].map((m) => m[1]);
        const injects = [...p.blocks.script.matchAll(RE_INJECT)].map((m) => m[1]);
        for (const sym of [...new Set(provides)].sort()) {
            const owner = localToTarget.get(sym);
            const target = owner ? owner.r.target : f.path;
            edge(f.path, target, "di.provide", { key: sym });
        }
        for (const sym of [...new Set(injects)].sort()) {
            const owner = localToTarget.get(sym);
            const target = owner ? owner.r.target : f.path;
            edge(f.path, target, "di.inject", { key: sym });
        }

        // state — an import that lands on a module holding module-scope reactive state
        for (const s of p.specs) {
            if (!RUNTIME_KINDS.has(s.kind)) continue;
            const r = resolveSpec(f.path, s.spec);
            if (!r.external && nodes.get(r.target)?.moduleState) {
                edge(f.path, r.target, "state.module", { line: s.line, spec: s.spec });
            }
        }

        // API — the transport cone plus raw fetch call sites
        for (const s of p.specs) {
            const r = resolveSpec(f.path, s.spec);
            if (!r.external && typeof r.target === "string" && r.target.startsWith(TRANSPORT_PREFIX) && !f.path.startsWith(TRANSPORT_PREFIX)) {
                edge(f.path, r.target, "api.transport", { line: s.line, spec: s.spec });
            }
        }
        if (RE_FETCH.test(p.blocks.script)) {
            node("api:http", { kind: "api-surface", band: "external", area: "api" });
            edge(f.path, "api:http", "api.endpoint", { mechanism: "fetch()" });
        }

        // worker
        if (RE_WORKER.test(p.blocks.script)) {
            node("worker:runtime", { kind: "worker-surface", band: "external", area: "worker" });
            edge(f.path, "worker:runtime", "worker.spawn", {});
        }

        // render.root — `createApp(App)` is a mount, and the only one the whole
        // tree has. Without this edge `App.vue` reads as an unmounted harness.
        for (const m of p.blocks.script.matchAll(RE_CREATE_APP)) {
            const hit = localToTarget.get(m[1]);
            if (hit) {
                edge(f.path, hit.r.target, "render.tag", { tag: m[1], mechanism: "createApp()", spec: hit.spec.spec });
                facts.appRoots.push({ entry: f.path, root: hit.r.target });
            }
        }

        // route — the route table is a node set of its own
        if (/\/router\/index\.ts$/.test(f.path)) {
            for (const m of p.blocks.script.matchAll(RE_ROUTE_RECORD)) {
                const path_ = m[1];
                const name = m[2] ?? null;
                const id = `route:${path_}`;
                const wildcard = /\(\.\*\)/.test(path_) || path_.includes(":pathMatch");
                node(id, { kind: "route", band: "route", area: "route", routeName: name, wildcard });
                edge(f.path, id, "route.record", { path: path_, name });
                (wildcard ? facts.wildcardRoutes : facts.routes).push({ path: path_, name });
            }
        }
    }

    // route.pane — routes bind to panes through the pane router, not through the
    // route record (every record mounts the same `Stub`). The binding is the
    // route NAME matched against a pane registry entry; we type it as its own
    // edge so a later wave can subtract against it.
    const paneRouter = files.find((f) => /usePaneRouter\.ts$/.test(f.path));
    if (paneRouter) {
        const p = parsed.get(paneRouter.path);
        // Local binding → target, for BOTH idioms the registry uses: a static
        // import (`ColorPicker`) and a `defineAsyncComponent(() => import(…))`
        // lazy binding (every pane but the picker).
        const localToTarget = new Map();
        for (const s of p.specs) {
            const r = resolveSpec(paneRouter.path, s.spec);
            for (const bnd of s.bindings ?? []) localToTarget.set(bnd.local, r.target);
        }
        for (const m of p.blocks.script.matchAll(RE_ASYNC_COMPONENT)) {
            localToTarget.set(m[1], resolveSpec(paneRouter.path, m[2]).target);
        }
        // `componentFor(name)` is the name→component map; each arm is a
        // route.pane edge. This is the binding the route RECORDS cannot carry,
        // because every record mounts the same `Stub` (router/index.ts:18-22).
        const viewToComponent = new Map();
        for (const m of p.blocks.script.matchAll(RE_COMPONENT_FOR)) {
            const target = localToTarget.get(m[2]);
            if (!target) continue;
            viewToComponent.set(m[1], target);
            edge(paneRouter.path, target, "route.pane", { viewName: m[1], binding: m[2] });
            // the picker binds through `demo/picker/index.ts`, so the registry
            // edge alone names the barrel and `ColorPicker.vue` — the tree's
            // default pane — reads as an unmounted harness. Resolve the hop.
            const concrete = throughBarrel(target, m[2]);
            if (concrete) edge(paneRouter.path, concrete, "render.mount", { tag: m[2], viaBarrel: target });
        }
        // the prefix arm — one entry standing for a whole route family
        const prefixArms = [];
        for (const m of p.blocks.script.matchAll(RE_COMPONENT_FOR_PREFIX)) {
            const target = localToTarget.get(m[2]);
            if (!target) continue;
            prefixArms.push({ prefix: m[1], target, binding: m[2] });
            edge(paneRouter.path, target, "route.pane", { viewNamePrefix: m[1], binding: m[2] });
            const concrete = throughBarrel(target, m[2]);
            if (concrete) edge(paneRouter.path, concrete, "render.mount", { tag: m[2], viaBarrel: target });
        }
        prefixArms.sort(byKey((a) => a.prefix));
        for (const r of facts.routes) {
            const name = r.name ?? "";
            const view = viewToComponent.get(name) ?? prefixArms.find((a) => name.startsWith(a.prefix))?.target;
            if (view) edge(`route:${r.path}`, view, "route.pane", { routeName: r.name });
        }
    }

    // ── normalize ──
    for (const n of nodes.values()) if (!n.area) n.area = areaOf(n.id);
    const nodeList = [...nodes.values()].sort(byKey((n) => n.id));
    const edgeList = dedupe(edges).sort(
        byKey((e) => `${e.from}\u0000${e.to}\u0000${e.kind}\u0000${String(e.line ?? 0).padStart(6, "0")}\u0000${e.spec ?? e.tag ?? e.key ?? ""}`),
    );

    return { files, nodeList, edgeList, facts, aliases };
}

function dedupe(edges) {
    const seen = new Map();
    for (const e of edges) {
        const k = canon(e);
        if (!seen.has(k)) seen.set(k, e);
    }
    return [...seen.values()];
}

/**
 * The AREA of a node — the ownership domain's granularity.
 *
 * Depth-2 under `demo/` is the tranche's own unit of ownership: the adjudication
 * corpus and AP-19 both speak of "a bidirectional AREA edge" between feature
 * directories, and CPE L-24 speaks of "palettes ↔ shell". This is the granularity
 * at which those two adjudicated cycles are visible at all — at file granularity
 * both are acyclic, which is exactly why a file-only graph could not see them and
 * why G-E exists.
 */
function areaOf(id) {
    if (SYNTHETIC_PREFIXES.some((p) => id.startsWith(p))) return id.split("/")[0];
    const parts = id.split("/");
    if (parts[0] === "demo") return parts.slice(0, 2).join("/");
    if (parts.length === 1) return "build";
    return parts[0];
}

// ── §10 SCCs — three classes, computed separately (L-17) ─────────────────────

function tarjan(nodeIds, adj) {
    const index = new Map();
    const low = new Map();
    const onStack = new Set();
    const stack = [];
    const out = [];
    let counter = 0;

    // Iterative Tarjan — the tree is small, but recursion depth is not a thing
    // a determinism contract should depend on.
    for (const root of nodeIds) {
        if (index.has(root)) continue;
        const work = [{ v: root, i: 0 }];
        index.set(root, counter);
        low.set(root, counter);
        counter += 1;
        stack.push(root);
        onStack.add(root);

        while (work.length) {
            const frame = work[work.length - 1];
            const succs = adj.get(frame.v) ?? [];
            if (frame.i < succs.length) {
                const w = succs[frame.i];
                frame.i += 1;
                if (!index.has(w)) {
                    index.set(w, counter);
                    low.set(w, counter);
                    counter += 1;
                    stack.push(w);
                    onStack.add(w);
                    work.push({ v: w, i: 0 });
                } else if (onStack.has(w)) {
                    low.set(frame.v, Math.min(low.get(frame.v), index.get(w)));
                }
            } else {
                work.pop();
                if (work.length) {
                    const parent = work[work.length - 1].v;
                    low.set(parent, Math.min(low.get(parent), low.get(frame.v)));
                }
                if (low.get(frame.v) === index.get(frame.v)) {
                    const comp = [];
                    for (;;) {
                        const w = stack.pop();
                        onStack.delete(w);
                        comp.push(w);
                        if (w === frame.v) break;
                    }
                    comp.sort();
                    out.push(comp);
                }
            }
        }
    }
    out.sort(byKey((c) => c.join("\u0000")));
    return out;
}

function adjacency(nodeIds, edges, keep, project = (x) => x) {
    const ids = [...new Set(nodeIds.map(project))].sort();
    const adj = new Map(ids.map((id) => [id, new Set()]));
    for (const e of edges) {
        if (!keep(e)) continue;
        const a = project(e.from);
        const b = project(e.to);
        if (!adj.has(a) || !adj.has(b) || a === b) continue;
        adj.get(a).add(b);
    }
    return { ids, adj: new Map([...adj].map(([k, v]) => [k, [...v].sort()])) };
}

function sccClasses(nodeList, edgeList) {
    const ids = nodeList.map((n) => n.id);
    // A cycle may only be claimed over nodes the repo owns. Synthetic targets —
    // packages, the API/worker surfaces, off-roster and unresolved paths — are
    // sinks: an edge into one leaves the subject set and cannot come back.
    const internal = (e) => !SINK_PREFIXES.some((p) => String(e.to).startsWith(p));

    // runtime: what the bundler must load
    const runtime = adjacency(ids, edgeList, (e) => RUNTIME_KINDS.has(e.kind) && internal(e));
    // load: everything a type-checker / module graph traverses
    const load = adjacency(ids, edgeList, (e) => LOAD_KINDS.has(e.kind) && internal(e));
    // ownership: EVERY domain, projected onto areas
    const areaOfId = new Map(nodeList.map((n) => [n.id, n.area]));
    const proj = (id) => areaOfId.get(id) ?? areaOf(id);
    const ownership = adjacency(ids, edgeList, (e) => internal(e), proj);

    const classes = [
        { cls: "runtime", ...runtime, comps: tarjan(runtime.ids, runtime.adj) },
        { cls: "load", ...load, comps: tarjan(load.ids, load.adj) },
        { cls: "ownership", ...ownership, comps: tarjan(ownership.ids, ownership.adj) },
    ];

    // ── the ownership class's MUTUAL PAIRS ──
    //
    // An area-level SCC is coarse by construction: a lattice of features with
    // any two-way coupling collapses into one component, and both adjudicated
    // cycles then hide inside it. The records themselves speak at pair
    // granularity — AP-19's exact words are "a bidirectional AREA edge" — so the
    // pair set is emitted as its own SCC class. This is the refinement that
    // makes G-E's falsifier answerable: a graph that can only print one big
    // ownership component "proves only what the graph was shaped to show".
    const pairs = [];
    for (const a of ownership.ids) {
        for (const b of ownership.adj.get(a) ?? []) {
            if (a >= b) continue;
            if ((ownership.adj.get(b) ?? []).includes(a)) pairs.push([a, b]);
        }
    }
    pairs.sort(byKey((p) => p.join("\u0000")));
    classes.push({ cls: "ownership.pair", ids: ownership.ids, adj: ownership.adj, comps: pairs });

    const out = [];
    for (const c of classes) {
        for (const members of c.comps) {
            if (members.length < 2) continue;
            const inSet = new Set(members);
            const areaClass = c.cls === "ownership" || c.cls === "ownership.pair";
            const witnesses = edgeList
                .filter((e) => {
                    const a = areaClass ? proj(e.from) : e.from;
                    const b = areaClass ? proj(e.to) : e.to;
                    if (!inSet.has(a) || !inSet.has(b) || a === b) return false;
                    return c.cls === "runtime" ? RUNTIME_KINDS.has(e.kind) : c.cls === "load" ? LOAD_KINDS.has(e.kind) : internal(e);
                })
                .map((e) => ({ from: e.from, to: e.to, kind: e.kind, domain: e.domain, line: e.line ?? null, spec: e.spec ?? e.tag ?? e.key ?? null }))
                .sort(byKey((w) => `${w.from}\u0000${w.to}\u0000${w.kind}\u0000${String(w.line ?? 0).padStart(6, "0")}`));
            out.push({ class: c.cls, size: members.length, members, witnessEdges: witnesses.length, witnesses });
        }
    }
    out.sort(byKey((s) => `${s.class}\u0000${String(1e6 - s.size).padStart(8, "0")}\u0000${s.members.join(",")}`));
    return out;
}

// ── §11 Named SCCs and owners (G-E: every SCC, an owner or a written reason) ──

const SCC_REGISTRY = [
    {
        name: "Dock",
        classes: ["runtime", "load"],
        match: (s) => s.members.includes("demo/shell/dock/Dock.vue") && s.members.includes("demo/shell/dock/index.ts"),
        owner: "X.W8.c",
        record: "registry/adjudicated/Dock.md · waves/W8.md G-7",
        note: "CC-079's first named SCC. `Dock.vue:4` imports `GlassDock, DockLayerGroup, DockLayer` from \"./\", the barrel that re-exports `Dock.vue` itself. Cure per W8.md:172 — the dock kit comes from `@mkbabb/glass-ui/dock` directly; the barrel exports only `Dock`.",
    },
    {
        name: "Markdown",
        classes: ["load"],
        match: (s) => s.members.some((m) => m.endsWith("scenes/about/markdown/Markdown.vue")) && s.members.some((m) => m.endsWith("scenes/about/markdown/index.ts")),
        owner: "X.W8.c",
        record: "waves/W8.md G-7",
        note: "CC-079's second. Type-only: `Markdown.vue` imports type `DocModule` from its own barrel. Cure per W8.md:174 — `DocModule`/`DocItem` move below the component into a types module both sides import.",
    },
    {
        name: "Gradient",
        classes: ["load"],
        match: (s) => s.members.some((m) => m.endsWith("gradientParse.ts")) && s.members.some((m) => m.endsWith("useGradientModel.ts")),
        owner: "X.W8.c",
        record: "waves/W8.md G-7 · X-W6.a/.c riders",
        note: "CC-079's third. Type-only trio. Cure per W8.md:175 — `linearInterval` and the shared result types move to a leaf both `gradientParse` and `useGradientModel` sit above. W8.md:131 allows for this SCC already reading zero when X.W8.c opens.",
    },
    {
        name: "Admin/provider",
        classes: ["load"],
        match: (s) => s.members.some((m) => m.includes("palettes/admin/") || m.includes("browser/admin/")) && s.members.some((m) => m.endsWith("usePalettePorts.ts")),
        owner: "X.W8.c",
        record: "waves/W8.md G-7 (7 nodes) · registry/adjudicated/Admin*.md",
        note: "CC-079's fourth: the seven-node admin cluster (`AdminTagsPanel` · `AdminFlaggedPanel` · `AdminAuditPanel` · `AdminUsersPanel` · `browser/admin/index.ts` · `useAdminUsers.ts` · `usePalettePorts.ts`). Cure per W8.md:176 — the cluster's shared types move to one owner, no forwarding directory.",
    },
    {
        name: "CPE L-24 · palettes ↔ shell",
        classes: ["ownership.pair"],
        match: (s) => s.members.join("|") === "demo/palettes|demo/shell",
        owner: "X-W8 (SCC subtraction) — adjudicated CONFIRMED",
        record: "registry/adjudicated/CurrentPaletteEditor.md:71",
        note: "ADJUDICATED CYCLE OUTSIDE CC-079's FOUR. `usePalettePorts.ts:19` type-imports `ViewId` up from `../shell/useViewManager`; five `SESSION_PORT_KEY` value-imports come back down into `shell/dock/**`. The record's own words: \"lattice cycle, not load-time\" — which is why it is an OWNERSHIP SCC here and appears in neither the runtime nor the load class.",
    },
    {
        name: "AuroraPane AP-19 · atmosphere ↔ boot",
        classes: ["ownership.pair"],
        match: (s) => s.members.join("|") === "demo/color-picker|demo/scenes",
        reasonForNoOwner:
            "NO-WAVE-OWNER, adjudicated. `registry/adjudicated/AuroraPane.md:83` rules it MAJOR and states the reason in its own words: \"The aurora concept has no home … No X wave mints `demo/atmosphere/` (X-W8 is subtraction-only for `demo/ui`). Recorded for the next formation boundary; interim guard: no new edge in either direction.\" This graph is the register that carries it into X-W8 unforgotten; it does not re-home it.",
        record: "registry/adjudicated/AuroraPane.md:83 (AP-19 · L/L-1 · MAJOR)",
        note: "ADJUDICATED CYCLE OUTSIDE CC-079's FOUR, AND OUTSIDE EVERY X WAVE. Both cited edges reproduce here at the bytes: `color-picker/composables/boot/useAtmosphere.ts` → `scenes/atmosphere/aurora-atoms.ts` (value import + the `AURORA_ATOMS_KEY` di.provide) and `scenes/atmosphere/aurora-harmony-stops.ts:23` → `color-picker/composables/boot/atmosphere-calibration.ts` — \"a bidirectional area edge, both edges aurora's\".",
    },
    // ── the rest of the closure (G-E): every remaining SCC, reasoned ──
    {
        name: "demo feature lattice (coarse ownership component)",
        classes: ["ownership"],
        match: (s) => s.members.includes("demo/palettes") && s.members.includes("demo/shell") && s.size > 2,
        reasonForNoOwner:
            "NOT A CYCLE ANY WAVE CAN OWN — it is the transitive closure of the five ownership PAIRS below it, and owning it would mean owning the whole demo. Area-level Tarjan collapses a lattice with any two-way coupling into one component, so this component's membership is an artefact of granularity, not a finding. The load-bearing statements are the `ownership.pair` rows, which is why that refinement class exists and why G-E's falsifier (\"a graph that can only print one big ownership component proves only what the graph was shaped to show\") is answered by emitting both.",
        record: "this tool §10 (the ownership.pair refinement) · G-E",
        note: "Members are the eight areas mutually reachable over ALL domains: assets · demo/color-picker · demo/palettes · demo/picker · demo/scenes · demo/shell · demo/workbenches · route. Two of the five pairs inside it are adjudicated (CPE L-24 · AP-19); the other three are reasoned below.",
    },
    {
        name: "About reference-page lattice · assets ↔ scenes",
        classes: ["ownership.pair"],
        match: (s) => s.members.join("|") === "assets|demo/scenes",
        reasonForNoOwner:
            "NO OWNER NEEDED — not load-time and not a defect. `demo/scenes/about/AboutPane.vue` reaches the eleven `assets/docs/*.md` reference pages by `import()` ONLY (import.dynamic + asset.url), and each page imports the one shared `demo/scenes/about/katex` barrel back. The cycle therefore exists in the ownership class alone: it is absent from both the runtime and the load class, because no static edge closes it. No adjudicated record raises it and no X wave claims it; it is recorded here so a later wave meets it as a known shape rather than a discovery.",
        record: "measured — 11 pages × (import.dynamic + asset.url) out, 11 × import.value back",
        note: "Content lattice: the reference pages are authored documents that render a component the About scene owns. Guard of record: `assets/**`'s only edge into `demo/**` stays the Katex barrel.",
    },
    {
        name: "Picker DI inversion · color-picker ↔ picker",
        classes: ["ownership.pair"],
        match: (s) => s.members.join("|") === "demo/color-picker|demo/picker",
        reasonForNoOwner:
            "NO OWNER NEEDED — this is the provide/inject inversion working as designed. `demo/color-picker/App.vue:164` imports the picker barrel downward; `demo/picker/ColorPicker.vue` injects `OVERTURE_KEY`, whose InjectionKey module lives in the boot cone it was mounted by. A DI key is owned above and consumed below BY CONSTRUCTION, so the area edge closes whenever the consumer is also a child — the alternative (keys in a third leaf area) is a new directory no X wave mints. Recorded, not routed.",
        record: "measured — App.vue:164 · usePaletteWiring.ts:21 down; ColorPicker.vue di.inject OVERTURE_KEY up",
        note: "Absent from the runtime and load classes at file granularity; visible only once areas are projected.",
    },
    {
        name: "Pane DI inversion · picker ↔ shell",
        classes: ["ownership.pair"],
        match: (s) => s.members.join("|") === "demo/picker|demo/shell",
        reasonForNoOwner:
            "NO OWNER NEEDED — same mechanism as the pair above, one level out. `demo/shell/usePaneRouter.ts:21` imports the picker barrel (the picker is the one eagerly-bound pane); `demo/picker/ColorPicker.vue` injects `VIEW_MANAGER_KEY` from `demo/shell/useViewManager.ts`. The pane registry must know its panes and a pane must reach the view manager that mounted it; that is the router contract, not a cycle to subtract.",
        record: "measured — usePaneRouter.ts:21 down; ColorPicker.vue di.inject VIEW_MANAGER_KEY up",
        note: "Absent from the runtime and load classes at file granularity; visible only once areas are projected.",
    },
];

/**
 * G-E's closure, executed. Every SCC the graph finds carries EITHER an owner OR
 * a written reason for having none; an SCC matching no registry entry comes back
 * `UNNAMED`, and `--verify` fails on a non-zero UNNAMED count. That is what makes
 * the roster "a set with a stated closure, not a list of four".
 */
function nameSccs(sccs) {
    return sccs.map((s) => {
        const hit = SCC_REGISTRY.find((r) => r.classes.includes(s.class) && r.match(s));
        if (!hit) {
            return { ...s, name: null, owner: null, reasonForNoOwner: null, record: null, note: null, ownerState: "UNNAMED" };
        }
        return {
            ...s,
            name: hit.name,
            owner: hit.owner ?? null,
            reasonForNoOwner: hit.reasonForNoOwner ?? null,
            record: hit.record,
            note: hit.note,
            ownerState: hit.owner ? "OWNED" : "NO-OWNER-WITH-REASON",
        };
    });
}

// ── §12 The frontend denominator census ──────────────────────────────────────

function census(files, nodeList, edgeList, facts) {
    const sfc = nodeList.filter((n) => n.kind === "sfc").map((n) => ({ path: n.id, bytes: n.bytes, sha256: n.sha256 }));
    // MOUNTED = the target of a render or pane-registry edge, with the barrel hop
    // resolved (`render.mount`). Anything left is an SFC the tree exports and
    // never mounts — the "exported-unmounted harness" the V3 source closure named
    // (`VALUE-MOBILE-SAFARI-SOURCE-CLOSURE-V3-OWNER-INTAKE-2026-08-01.md:110`:
    // "88 SFC workflows, with 86 mounted and two exported-unmounted harnesses").
    const MOUNT_KINDS = new Set(["render.tag", "render.dynamic", "render.mount", "route.pane"]);
    const rendered = new Set(edgeList.filter((e) => MOUNT_KINDS.has(e.kind)).map((e) => e.to));
    const harnesses = sfc.filter((s) => !rendered.has(s.path)).map((s) => s.path).sort();
    // The DENOMINATOR is the three source bands, not every node in the graph:
    // `e2e/` is a separate Playwright harness, `assets/**` are import targets, and
    // the seven build files are alias minters. All three are IN the graph so that
    // edges can leave the denominator; none of them is a source member.
    const denominator = files.filter((f) => DENOMINATOR_BANDS.has(f.band));
    const barrelEdges = edgeList.filter((e) => nodeList.find((n) => n.id === e.to)?.barrel && /^demo\/ui\//.test(e.to));
    const uiBarrels = facts.barrels.filter((b) => b.startsWith("demo/ui/")).sort();

    return {
        predicate:
            "source member = a git-TRACKED file in one of the three DENOMINATOR bands — demo/ (band demo), src/ (band library), test/ (band test) — whose extension is one of .vue .ts .js .mjs .css .glsl .html. Out of the denominator but IN the graph: e2e/ (a separate Playwright harness), assets/** (import targets only), and the seven build/config files that mint the resolver aliases. Stated because the inherited figure (310) carries no predicate and cannot be re-derived from its own record.",
        sourceMembers: denominator.length,
        graphMembers: files.length,
        byBand: Object.fromEntries(
            [...new Set(files.map((f) => f.band))].sort().map((b) => [b, files.filter((f) => f.band === b).length]),
        ),
        sfcCount: sfc.length,
        sfc,
        routes: facts.routes.length,
        routeList: facts.routes.slice().sort(byKey((r) => r.path)),
        wildcardRoutes: facts.wildcardRoutes.length,
        wildcardRouteList: facts.wildcardRoutes.slice().sort(byKey((r) => r.path)),
        dynamicIsSites: facts.dynamicIsSites,
        teleports: facts.teleports,
        harnesses: harnesses.length,
        harnessList: harnesses,
        aliasBarrels: uiBarrels.length,
        aliasBarrelList: uiBarrels,
        aliasBarrelEdges: barrelEdges.length,
        injectionKeys: facts.injectionKeys.slice().sort(byKey((k) => `${k.file}\u0000${k.key}`)),
        moduleStateModules: facts.moduleStateModules.slice().sort(byKey((m) => m.file)),
        workerSites: [...new Set(facts.workers)].sort(),
        unresolvedSpecifiers: facts.unresolved.slice().sort(byKey((u) => `${u.from}\u0000${u.spec}`)),
        renderTagsUnboundToAnImport: facts.renderUnbound.slice().sort(byKey((u) => `${u.file} ${u.tag}`)),
    };
}

// ── §13 Assemble, digest, emit ───────────────────────────────────────────────

function graph() {
    const { files, nodeList, edgeList, facts, aliases } = build();
    const sccs = nameSccs(sccClasses(nodeList, edgeList));
    const cen = census(files, nodeList, edgeList, facts);

    const domainCounts = {};
    const kindCounts = {};
    for (const e of edgeList) {
        domainCounts[e.domain] = (domainCounts[e.domain] ?? 0) + 1;
        kindCounts[e.kind] = (kindCounts[e.kind] ?? 0) + 1;
    }

    const digests = {
        nodes: sha256(canon(nodeList)),
        edges: sha256(canon(edgeList)),
        sccs: sha256(canon(sccs)),
        census: sha256(canon(cen)),
        graph: sha256(canon({ nodes: nodeList, edges: edgeList, sccs, census: cen })),
    };

    return {
        version: 3,
        tool: "docs/tranches/V/megatranche/workflows/graph-v3.mjs",
        consumer: "X-W8 (CC-078 file bounds · CC-079 SCC owners)",
        aliases,
        counts: {
            nodes: nodeList.length,
            edges: edgeList.length,
            domains: Object.fromEntries(Object.entries(domainCounts).sort()),
            kinds: Object.fromEntries(Object.entries(kindCounts).sort()),
            sccs: {
                runtime: sccs.filter((s) => s.class === "runtime").length,
                load: sccs.filter((s) => s.class === "load").length,
                ownership: sccs.filter((s) => s.class === "ownership").length,
                "ownership.pair": sccs.filter((s) => s.class === "ownership.pair").length,
                total: sccs.length,
                owned: sccs.filter((s) => s.ownerState === "OWNED").length,
                reasonedNoOwner: sccs.filter((s) => s.ownerState === "NO-OWNER-WITH-REASON").length,
                unnamed: sccs.filter((s) => s.ownerState === "UNNAMED").length,
            },
        },
        digests,
        nodes: nodeList,
        edges: edgeList,
        sccs,
        census: cen,
    };
}

function emit(g) {
    mkdirSync(OUT_DIR, { recursive: true });
    const write = (name, obj) => writeFileSync(resolve(OUT_DIR, name), JSON.stringify(obj, null, 2) + "\n");
    write("nodes.json", { digest: g.digests.nodes, count: g.nodes.length, nodes: g.nodes });
    write("edges.json", { digest: g.digests.edges, count: g.edges.length, domains: g.counts.domains, kinds: g.counts.kinds, edges: g.edges });
    write("sccs.json", { digest: g.digests.sccs, counts: g.counts.sccs, sccs: g.sccs });
    write("census.json", { digest: g.digests.census, census: g.census });
    write("digests.json", { tool: g.tool, consumer: g.consumer, counts: g.counts, digests: g.digests, aliases: g.aliases });
}

// ── §14 CLI ──────────────────────────────────────────────────────────────────

const argv = process.argv.slice(2);
const has = (f) => argv.includes(f);

if (has("--print-sccs")) {
    const g = graph();
    for (const s of g.sccs) {
        const disposition = s.owner ? `owner=${s.owner}` : s.reasonForNoOwner ? "owner=NONE (reason recorded)" : "owner=(none) UNNAMED";
        console.log(`[${s.class}] size=${s.size} ${s.name ?? "(UNNAMED)"} ${disposition}`);
        for (const m of s.members) console.log(`    · ${m}`);
    }
    process.exit(0);
}

if (has("--print-census")) {
    const g = graph();
    console.log(JSON.stringify(g.census, null, 2));
    process.exit(0);
}

if (has("--verify")) {
    const a = graph();
    const b = graph();
    const keys = ["nodes", "edges", "sccs", "census", "graph"];
    let fail = 0;
    console.log("graph-v3 --verify · round-trip over two independent in-process builds");
    for (const k of keys) {
        const ok = a.digests[k] === b.digests[k];
        if (!ok) fail += 1;
        console.log(`  run1 vs run2  ${k.padEnd(7)} ${ok ? "MATCH" : "DIFFER"}  ${a.digests[k]}`);
    }
    const committed = resolve(OUT_DIR, "digests.json");
    if (existsSync(committed)) {
        const prev = JSON.parse(readFileSync(committed, "utf8"));
        for (const k of keys) {
            const ok = prev.digests?.[k] === a.digests[k];
            if (!ok) fail += 1;
            console.log(`  committed     ${k.padEnd(7)} ${ok ? "MATCH" : "DIFFER"}  ${prev.digests?.[k] ?? "(absent)"}`);
        }
    } else {
        console.log("  committed     (absent — nothing to compare; emit first)");
    }

    // G-E's closure, checked rather than asserted: every SCC carries an owner or
    // a written reason. An UNNAMED row means the graph found a cycle the roster
    // does not account for — the exact failure G-E names ("X-W8 binds CC-079's
    // four SCC owners from a graph that cannot see two adjudicated cycles").
    const unnamed = a.sccs.filter((s) => s.ownerState === "UNNAMED");
    if (unnamed.length) fail += unnamed.length;
    console.log(
        `  G-E closure   ${unnamed.length === 0 ? "GREEN" : "RED"}  ${a.counts.sccs.total} SCCs = ${a.counts.sccs.owned} owned + ${a.counts.sccs.reasonedNoOwner} reasoned-no-owner + ${unnamed.length} unnamed`,
    );
    for (const s of unnamed) console.log(`      UNNAMED [${s.class}] ${s.members.join(" ↔ ")}`);

    // HG-14's four, by name: the gate reads the names, not the count.
    const REQUIRED = ["Admin/provider", "Markdown", "Gradient", "Dock"];
    const present = new Set(a.sccs.map((s) => s.name));
    const missing = REQUIRED.filter((n) => !present.has(n));
    if (missing.length) fail += missing.length;
    console.log(`  HG-14 four    ${missing.length === 0 ? "GREEN" : `RED — missing ${missing.join(", ")}`}`);

    console.log(fail === 0 ? "ROUND-TRIP GREEN" : `ROUND-TRIP RED — ${fail} mismatch(es)`);
    process.exit(fail === 0 ? 0 : 1);
}

const g = graph();
emit(g);
console.log(`graph-v3 emitted → docs/tranches/X/W0/GRAPH-V3/`);
console.log(`  nodes ${g.counts.nodes} · edges ${g.counts.edges}`);
console.log(`  domains ${JSON.stringify(g.counts.domains)}`);
console.log(
    `  SCCs runtime=${g.counts.sccs.runtime} load=${g.counts.sccs.load} ownership=${g.counts.sccs.ownership} ownership.pair=${g.counts.sccs["ownership.pair"]} · ${g.counts.sccs.owned} owned / ${g.counts.sccs.reasonedNoOwner} reasoned / ${g.counts.sccs.unnamed} unnamed`,
);
console.log(`  census ${g.census.sourceMembers} source members · ${g.census.sfcCount} SFC · ${g.census.harnesses} harnesses`);
console.log(`  graph digest ${g.digests.graph}`);
