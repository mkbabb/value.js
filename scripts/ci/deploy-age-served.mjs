// SERVED MODEL: claude-opus-5-5
//
// deploy-age-served.mjs — the post-ship half of G-21 (X-W11 · COHESION §0gc.2 (i)).
//
// Runs as the last ship step of `deploy-pages.yml`, after wrangler has cut the
// Production deployment. It asserts that the build production SERVES is the
// build of the commit this run deployed, in two parts:
//
//   1. The run records the deployed commit. `--built` (the sha the job checked
//      out and built) must equal `--run` (`github.sha`, which GitHub records as
//      this run's `headSha`). `deploy-age.mjs` reads the deployed commit from
//      that `headSha`, so a run where they differ would name the wrong commit
//      and must not count as a successful deploy.
//   2. Production serves that build. The built `index.html`'s same-origin
//      asset references (`./assets/index-<hash>.js` and the rest) are content
//      hashed, so they fingerprint the build. The served `index.html` at
//      `--origin` must carry exactly the same set. Cloudflare's edge can lag
//      the deploy by seconds, so the fetch retries for a bounded window and
//      then fails naming both sets.
//   3. A path the build does not hold answers an uncached 404 (dist/404.html),
//      never the shell as 200 under `/assets/*`; and at a nested path that
//      404 page's own script resolves to a served file, so the page starts.
//
// Fail-closed: an empty built fingerprint means the instrument measured
// nothing, and it reds. Node builtins only.
//
// Usage: node scripts/ci/deploy-age-served.mjs --dist dist/gh-pages \
//            --origin https://color.babb.dev/ --built <sha> --run <sha>
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { parseArgs } from "node:util";

const { values } = parseArgs({
    options: {
        dist: { type: "string" },
        origin: { type: "string" },
        built: { type: "string" },
        run: { type: "string" },
        attempts: { type: "string", default: "18" },
        "interval-ms": { type: "string", default: "10000" },
    },
});

function fail(message) {
    console.log(`::error title=served-sha::${message}`);
    console.log(`FAIL — ${message}`);
    process.exit(1);
}

for (const k of ["dist", "origin", "built", "run"]) {
    if (!values[k]) fail(`--${k} is required.`);
}

if (values.built !== values.run) {
    fail(
        `this run built ${values.built} but records ${values.run} as its sha. ` +
            "deploy-age reads the deployed commit from the run record, so this deploy cannot be named and does not count.",
    );
}
console.log(`deployed commit : ${values.built} (built == run record)`);

/** The same-origin, content-hashed references in an index.html: its build fingerprint. */
function fingerprint(html) {
    const refs = new Set();
    for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
        const ref = m[1];
        if (/^[a-z][a-z0-9+.-]*:|^\/\/|^#/i.test(ref)) continue; // absolute, protocol-relative, fragment
        refs.add(ref);
    }
    return [...refs].sort();
}

const built = fingerprint(readFileSync(join(values.dist, "index.html"), "utf8"));
if (built.length === 0)
    fail(
        `${values.dist}/index.html carries no same-origin asset reference, so there is nothing to compare.`,
    );
console.log(`built fingerprint (${built.length}): ${built.join(" ")}`);

/**
 * A path the build does not hold is a 404 nobody keeps (dist/404.html), never the
 * shell as 200: under `/assets/*` that answer would be cached as the asset. The
 * fingerprint can be unchanged by a deploy, so it may match before the edge
 * serves the new deployment: this polls on the same bounded window.
 */
async function absentAssetIs404() {
    let answer = "";
    for (let i = 1; i <= attempts; i++) {
        const absent = new URL(`assets/absent-${Date.now()}.js`, values.origin);
        try {
            const res = await fetch(absent, { cache: "no-store" });
            const cache = res.headers.get("cache-control") ?? "";
            if (res.status === 404 && !/immutable|max-age=[1-9]/.test(cache)) {
                console.log(`OK — ${absent} answers 404 (${cache || "no cache-control"}).`);
                return;
            }
            answer = `${absent} answers ${res.status} ${res.headers.get("content-type")} (${cache})`;
        } catch (err) {
            answer = `${absent} fetch failed: ${err.message}`;
        }
        console.log(`attempt ${i}/${attempts}: ${answer}`);
        if (i < attempts) await new Promise((r) => setTimeout(r, interval));
    }
    fail(`${answer}; a missing asset must be an uncached 404.`);
}

/**
 * The 404 page is the shell. Its asset URLs are relative, so below the first
 * path segment they resolve only through its `<base href>`: its module script,
 * resolved as the browser would, must be a served file, or the page paints
 * and never starts.
 */
async function nestedAbsentPageStarts() {
    const page = new URL(`no/such/page-${Date.now()}`, values.origin);
    const res = await fetch(page, { cache: "no-store" });
    const html = await res.text();
    if (res.status !== 404) fail(`${page} answers ${res.status}; an absent page must be a 404.`);
    const baseHref = html.match(/<base\s[^>]*href="([^"]+)"/i)?.[1];
    const base = baseHref ? new URL(baseHref, page) : page;
    const src = html.match(/<script\b[^>]*type="module"[^>]*\ssrc="([^"]+)"/i)?.[1];
    if (!src) fail(`${page} carries no module script, so there is nothing to start.`);
    const script = new URL(src, base);
    const sres = await fetch(script, { cache: "no-store" });
    const type = sres.headers.get("content-type") ?? "";
    if (sres.status !== 200 || !/javascript/.test(type)) {
        fail(
            `${page} (404) loads ${script}, which answers ${sres.status} ${type}; ` +
                "the 404 page must resolve its assets from the site root.",
        );
    }
    console.log(`OK — ${page} (404) loads ${script} (200 ${type}).`);
}

const attempts = Number(values.attempts);
const interval = Number(values["interval-ms"]);
let served = [];
for (let i = 1; i <= attempts; i++) {
    const url = new URL(values.origin);
    url.searchParams.set("deploy-age", values.built);
    let status = "fetch failed";
    try {
        const res = await fetch(url, {
            cache: "no-store",
            headers: { "cache-control": "no-cache" },
        });
        status = `HTTP ${res.status}`;
        if (res.ok) served = fingerprint(await res.text());
    } catch (err) {
        status = `fetch failed: ${err.message}`;
    }
    const same =
        served.length === built.length && served.every((r, j) => r === built[j]);
    console.log(
        `attempt ${i}/${attempts}: ${url.origin}${url.pathname} → ${status} · ${same ? "MATCH" : "differs"}`,
    );
    if (same) {
        console.log(`OK — ${values.origin} serves the build of ${values.built}.`);
        await absentAssetIs404();
        await nestedAbsentPageStarts();
        process.exit(0);
    }
    if (i < attempts) await new Promise((r) => setTimeout(r, interval));
}

const missing = built.filter((r) => !served.includes(r));
const extra = served.filter((r) => !built.includes(r));
fail(
    `${values.origin} does not serve the build of ${values.built} after ${attempts} attempts. ` +
        `built-only: [${missing.join(", ")}] · served-only: [${extra.join(", ")}]`,
);
