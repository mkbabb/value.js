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
