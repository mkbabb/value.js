// SERVED MODEL: claude-opus-5[1m]
/**
 * X-W2 (Track A · X·V) — THE EAGER-MODULE-SET BYTE INSTRUMENT.
 *
 * ONE command that answers "what does this product cost at boot?" against the
 * BUILT artifact — `dist/gh-pages`, never a dev server (W2.md §ENV / MT-F011:
 * *"No dev-server number may appear anywhere in this wave"*). It is the command
 * gate **G2** names, and the same command unit d re-runs post-cure, so a
 * before/after pair is a pair of readings from one instrument rather than two
 * hand-transcribed prose figures.
 *
 * WHAT THE "EAGER MODULE SET" IS (W2.md §5 X.W2.c, verbatim): the
 * `<script type="module">` entry, plus every `rel="modulepreload"` href, plus
 * every render-blocking `rel="stylesheet"`. Vite emits a modulepreload link for
 * exactly the entry's STATIC import graph, so that set is the bytes a cold
 * visitor must fetch-and-parse before the app can run. A dynamically imported
 * chunk (`HeroBlob-*.js`) carries no such link and is therefore not eager.
 *
 * WHY EVERY BYTE IS READ FROM DISK, NEVER FROM THE WIRE (W2.md §ENV):
 * `e2e/smoke/perf/serve-built.mjs` is a zero-dependency static server with no
 * `Content-Encoding: gzip` and no latency, so `PerformanceResourceTiming
 * .transferSize` against it reports UNCOMPRESSED bytes and would flatter or
 * inflate the reading at random. `zlib.gzipSync` at the DEFAULT level over the
 * emitted files is the stable, environment-independent measurement.
 *
 * WHY `<noscript>` IS STRIPPED FIRST (X-W2 baseline finding F-3): the built
 * `index.html` links the glass-fonts stylesheet TWICE — once as the
 * `media="print" onload="this.media='all'"` async-swap idiom, and once again
 * inside a `<noscript>` block for the no-JS reader. A naive "a stylesheet link
 * that is not `media=print`" filter therefore counts the `<noscript>` copy as
 * render-blocking and reads 188,594 B gz of CSS where the truth is 88,177 B.
 * `<noscript>` content is inert for any JS-enabled boot, so it is removed from
 * the document BEFORE any tag is collected — the class of defect, not the one
 * instance. The async-swap copy is then excluded by its `media` attribute and
 * REPORTED under `excludedCss`, never silently dropped.
 *
 * VERDICT vs GATE. This script REPORTS the budget verdict; it never throws on
 * one. The enforcing gate is `e2e/smoke/perf/eager-payload.spec.ts` (the
 * `smoke-perf` project), so a born-RED baseline run is a successful measurement
 * and not a tool failure. Exit 2 means the artifact could not be measured.
 *
 * USAGE
 *   node scripts/perf/eager-bytes.mjs [distDir]      # default: dist/gh-pages
 *     stdout — the JSON record (pipe it: `… > BEFORE-eager.json`)
 *     stderr — the human summary
 */

import { gzipSync } from "node:zlib";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";

/**
 * W2.md §6 G2's bar: 280 KiB. **Fixed at wave-open and NOT editable by an
 * implementing seat** (§11 guardrail 1 — re-baselining is S.W3's exact failure
 * mode and a §3a triumvirate trigger, never an option here).
 */
export const EAGER_JS_GZ_MAX = 286720;

export const DEFAULT_DIST = "dist/gh-pages";

/** `<noscript>…</noscript>` — inert for any JS-enabled boot (finding F-3). */
const NOSCRIPT_RE = /<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/gi;
/** Every `<script …>` / `<link …>` open tag, attributes captured raw. */
const TAG_RE = /<(script|link)\b([^>]*?)\/?>/gi;
/** One HTML attribute: `name`, `name="v"`, `name='v'`, `name=v`. */
const ATTR_RE = /([a-zA-Z][\w:-]*)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

/** The minimal entity decode an href can need (Vite emits `&#39;` in onload only). */
function decodeEntities(value) {
    return value
        .replace(/&amp;/g, "&")
        .replace(/&#39;/g, "'")
        .replace(/&quot;/g, '"')
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
}

/** Attributes of one tag as a lower-cased map; a bare attribute reads "". */
function parseAttrs(raw) {
    const attrs = {};
    ATTR_RE.lastIndex = 0;
    let m;
    while ((m = ATTR_RE.exec(raw)) !== null) {
        const value = m[2] ?? m[3] ?? m[4] ?? "";
        attrs[m[1].toLowerCase()] = decodeEntities(value);
    }
    return attrs;
}

/** True for a same-origin emitted asset; a remote or protocol-relative URL is not on disk. */
function isLocalRef(href) {
    return href.length > 0 && !/^(?:[a-z][a-z0-9+.-]*:)?\/\//i.test(href);
}

/** `./assets/x.js` (and `/assets/x.js`) → the emitted file's path under distDir. */
function resolveRef(distDir, href) {
    const clean = href.split("?")[0].split("#")[0].replace(/^\.?\//, "");
    return path.join(distDir, clean);
}

/**
 * A `rel="stylesheet"` link blocks the first paint unless its `media` says it
 * does not. `media="print"` is the async-swap idiom's parked state (Vite pairs
 * it with `onload="this.media='all'"`), so it is measured and excluded, not
 * counted. Anything else — absent `media`, `all`, `screen`, a query — blocks.
 */
function isRenderBlockingStylesheet(attrs) {
    const media = (attrs.media ?? "").trim().toLowerCase();
    return media !== "print";
}

/** Read one emitted file and gzip it at the DEFAULT level. */
function measureFile(filePath) {
    const buf = readFileSync(filePath);
    return { raw: buf.length, gz: gzipSync(buf).length };
}

/**
 * Collect + measure the eager set of a built `dist/gh-pages`.
 * Throws (never returns a partial reading) when the artifact is not there.
 */
export function collectEagerBytes(distDir = DEFAULT_DIST) {
    const dist = path.resolve(distDir);
    const indexPath = path.join(dist, "index.html");
    if (!existsSync(indexPath)) {
        throw new Error(
            `[eager-bytes] no built artifact at ${indexPath} — run \`npm run gh-pages\` first. ` +
                `This instrument measures the BUILT bundle and will not substitute another origin (W2.md §ENV).`,
        );
    }

    const htmlBuf = readFileSync(indexPath);
    const html = htmlBuf.toString("utf8");
    const noscriptBlocks = html.match(NOSCRIPT_RE) ?? [];
    // F-3 — strip BEFORE collecting, so no `<noscript>` fallback link is ever
    // read as a render-blocking resource.
    const live = html.replace(NOSCRIPT_RE, "");

    const js = [];
    const blockingCss = [];
    const excludedCss = [];
    const skipped = [];

    TAG_RE.lastIndex = 0;
    let tag;
    while ((tag = TAG_RE.exec(live)) !== null) {
        const name = tag[1].toLowerCase();
        const attrs = parseAttrs(tag[2] ?? "");
        const rel = (attrs.rel ?? "").trim().toLowerCase();

        if (name === "script") {
            const type = (attrs.type ?? "").trim().toLowerCase();
            if (type !== "module" || !attrs.src) continue;
            if (!isLocalRef(attrs.src)) {
                skipped.push({ href: attrs.src, why: "remote entry module" });
                continue;
            }
            js.push({ href: attrs.src, role: "entry-module" });
            continue;
        }

        if (rel === "modulepreload") {
            if (!attrs.href) continue;
            if (!isLocalRef(attrs.href)) {
                skipped.push({ href: attrs.href, why: "remote modulepreload" });
                continue;
            }
            js.push({ href: attrs.href, role: "modulepreload" });
            continue;
        }

        if (rel === "stylesheet") {
            if (!attrs.href) continue;
            if (!isLocalRef(attrs.href)) {
                skipped.push({ href: attrs.href, why: "remote stylesheet" });
                continue;
            }
            const entry = { href: attrs.href, media: attrs.media ?? null };
            if (isRenderBlockingStylesheet(attrs)) blockingCss.push(entry);
            else excludedCss.push({ ...entry, why: "async (media=print swap)" });
        }
    }

    // The browser fetches one URL once; a repeated href is one resource. Kept
    // visible rather than silently folded — a genuine double-link is a finding.
    const duplicateRefs = [];
    const measure = (entries) => {
        const seen = new Set();
        const out = [];
        for (const e of entries) {
            const file = resolveRef(dist, e.href);
            if (seen.has(file)) {
                duplicateRefs.push({ href: e.href, role: e.role ?? "stylesheet" });
                continue;
            }
            seen.add(file);
            if (!existsSync(file)) {
                throw new Error(
                    `[eager-bytes] index.html references ${e.href} but ${file} does not exist — the artifact is inconsistent.`,
                );
            }
            out.push({ ...e, path: path.relative(dist, file), ...measureFile(file) });
        }
        return out;
    };

    const jsFiles = measure(js);
    const cssFiles = measure(blockingCss);
    const excludedFiles = measure(excludedCss);

    const sum = (rows, key) => rows.reduce((a, r) => a + r[key], 0);
    const bucket = (rows) => ({
        count: rows.length,
        raw: sum(rows, "raw"),
        gz: sum(rows, "gz"),
        files: rows,
    });

    const eagerJs = bucket(jsFiles);
    const renderBlockingCss = bucket(cssFiles);
    const excluded = bucket(excludedFiles);

    return {
        schema: "x-w2.eager-bytes/1",
        tool: "scripts/perf/eager-bytes.mjs",
        generatedAt: new Date().toISOString(),
        dist: path.relative(process.cwd(), dist) || ".",
        method:
            "zlib.gzipSync (default level) over the emitted files ON DISK; <noscript> stripped before collection (F-3); " +
            "NEVER PerformanceResourceTiming.transferSize (W2.md §ENV — serve-built.mjs sends no Content-Encoding).",
        indexHtml: {
            path: "index.html",
            ...measureFile(indexPath),
            noscriptBlocksStripped: noscriptBlocks.length,
        },
        eagerJs,
        renderBlockingCss,
        excludedCss: excluded,
        duplicateRefs,
        skippedRemoteRefs: skipped,
        totals: {
            eagerRaw: eagerJs.raw + renderBlockingCss.raw,
            eagerGz: eagerJs.gz + renderBlockingCss.gz,
        },
        budget: {
            gate: "W2.md §6 G2",
            eagerJsGzMax: EAGER_JS_GZ_MAX,
            eagerJsGz: eagerJs.gz,
            marginBytes: EAGER_JS_GZ_MAX - eagerJs.gz,
            verdict: eagerJs.gz <= EAGER_JS_GZ_MAX ? "GREEN" : "RED",
            note: "CSS is MEASURED, NOT GATED (W2.md §ENV). The enforcing gate is e2e/smoke/perf/eager-payload.spec.ts.",
        },
    };
}

const kib = (bytes) => `${(bytes / 1024).toFixed(1)} KiB`;

export function formatSummary(r) {
    const lines = [];
    lines.push(`dist: ${r.dist}   (index.html raw=${r.indexHtml.raw} gz=${r.indexHtml.gz})`);
    lines.push(`eager JS modules: ${r.eagerJs.count}`);
    for (const f of r.eagerJs.files) {
        lines.push(`    ./${f.path}  raw=${f.raw}  gz=${f.gz}  (${f.role})`);
    }
    lines.push(
        `eager JS   raw= ${r.eagerJs.raw}  gz= ${r.eagerJs.gz} = ${kib(r.eagerJs.gz)}` +
            `   (bar ${r.budget.eagerJsGzMax} B) -> ${r.budget.verdict}`,
    );
    lines.push(
        `render-block CSS raw= ${r.renderBlockingCss.raw}  gz= ${r.renderBlockingCss.gz} = ` +
            `${kib(r.renderBlockingCss.gz)}   (measured, NOT gated)`,
    );
    for (const f of r.excludedCss.files) {
        lines.push(`    excluded (async): ./${f.path}  raw=${f.raw}  gz=${f.gz}  media=${f.media}`);
    }
    if (r.duplicateRefs.length) {
        lines.push(`    duplicate refs folded: ${r.duplicateRefs.map((d) => d.href).join(", ")}`);
    }
    lines.push(`TOTAL eager gz= ${r.totals.eagerGz} = ${kib(r.totals.eagerGz)}`);
    return lines.join("\n") + "\n";
}

const invokedDirectly =
    process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname);

if (invokedDirectly) {
    try {
        const result = collectEagerBytes(process.argv[2] ?? DEFAULT_DIST);
        process.stderr.write(formatSummary(result));
        process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    } catch (err) {
        process.stderr.write(`${err instanceof Error ? err.message : String(err)}\n`);
        process.exitCode = 2;
    }
}
