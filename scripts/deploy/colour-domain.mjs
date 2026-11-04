// SERVED MODEL: claude-opus-5-5
//
// colour-domain.mjs — colour.babb.dev, the second spelling (COHESION §0hq; owner
// order 2026-11-04, verbatim: "color with no u, too, should be a domain. both.").
//
// colour.babb.dev answers a path-preserving 301 to the one canonical origin,
// color.babb.dev. Its own Cloudflare Pages project, `colour`, serves nothing but
// scripts/deploy/colour/_redirects. `domains.yml` runs this file twice, around the
// wrangler deploy:
//
//   project  GET the Pages project `colour`, create it if absent, and hold its
//            production branch at `master` (a deploy to any other branch lands as
//            a Preview and the live host never updates).
//   domain   prove the deploy (the project's *.pages.dev host 301s), attach
//            colour.babb.dev, find or create its proxied CNAME, wait for the
//            domain to go active, then prove colour.babb.dev 301s with the path
//            kept and color.babb.dev still answers 200.
//
// Mode `provision` (push, dispatch) may create and patch. Mode `verify` (the
// weekly schedule) only reads, and fails on any drift.
//
// It never overwrites. A DNS record for colour.babb.dev that is not exactly one
// CNAME to the project's host fails the run with a conflict message. If the
// token cannot read or write the babb.dev zone, a public DNS lookup decides: a
// name that resolves goes on to the active wait and the 301 proof (the real
// oracle); a name that does not fails the run naming the one record to add.
//
// Secrets: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID come from the
// environment only and are never printed. The token travels only in the
// Authorization header; logged paths and error text have the account id replaced
// by `{account}` and the zone id by `{zone}`. Node builtins only.
//
// Usage: node scripts/deploy/colour-domain.mjs <project|domain> <provision|verify>
import { appendFileSync } from "node:fs";
import { Resolver } from "node:dns/promises";

const PROJECT = "colour";
const PRODUCTION_BRANCH = "master";
const DOMAIN = "colour.babb.dev";
const ZONE = "babb.dev";
const CANONICAL = "https://color.babb.dev";
const API = "https://api.cloudflare.com/client/v4";
const RECORD_COMMENT = "domains.yml (value.js): colour.babb.dev 301 -> color.babb.dev";
const ACTIVE_WAIT_MS = 20 * 60_000;
const EDGE_WAIT_MS = 8 * 60_000;

const TOKEN = process.env.CLOUDFLARE_API_TOKEN ?? "";
const ACCOUNT = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const [command, mode] = process.argv.slice(2);
const PROVISION = mode === "provision";

class Failure extends Error {}
const fail = (message) => {
    throw new Failure(message);
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Identifiers kept out of the log: value -> placeholder.
const masked = new Map([
    [TOKEN, "***"],
    [ACCOUNT, "{account}"],
]);
function redact(text) {
    let out = String(text);
    for (const [value, placeholder] of masked) {
        if (value) out = out.replaceAll(value, placeholder);
    }
    return out;
}

/** One Cloudflare API call. GETs retry transient failures; writes never retry. */
async function cf(method, path, body) {
    const attempts = method === "GET" ? 3 : 1;
    for (let attempt = 1; ; attempt++) {
        let response;
        try {
            response = await fetch(`${API}${path}`, {
                method,
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    ...(body ? { "Content-Type": "application/json" } : {}),
                },
                body: body ? JSON.stringify(body) : undefined,
                signal: AbortSignal.timeout(30_000),
            });
        } catch (error) {
            if (attempt < attempts) {
                await sleep(5_000 * attempt);
                continue;
            }
            fail(
                `${method} ${redact(path)} failed: ${redact(error?.cause?.message ?? error?.message)}`,
            );
        }
        if ((response.status === 429 || response.status >= 500) && attempt < attempts) {
            await response.body?.cancel();
            await sleep(5_000 * attempt);
            continue;
        }
        let json = null;
        try {
            json = await response.json();
        } catch {
            // a non-JSON error body: reported by status alone
        }
        const ok = response.ok && json?.success === true;
        const errorList = Array.isArray(json?.errors) ? json.errors : [];
        const errors = redact(
            errorList.map((e) => `${e.code} ${e.message}`).join("; "),
        );
        const codes = errorList.map((e) => e.code);
        console.log(
            `${method} ${redact(path)} -> ${response.status}${ok ? "" : ` (${errors || "no error detail"})`}`,
        );
        return { status: response.status, ok, result: json?.result, errors, codes };
    }
}

const projectPath = `/accounts/${ACCOUNT}/pages/projects/${PROJECT}`;

async function getProject() {
    const r = await cf("GET", projectPath);
    if (r.ok) return r.result;
    // 8000007: "Project not found".
    if (r.status === 404 || r.codes.includes(8000007)) return null;
    fail(`could not read Pages project ${PROJECT}: HTTP ${r.status} ${r.errors}`);
}

/** The project's own host, e.g. colour-xyz.pages.dev: read, never assumed. */
function hostOf(project) {
    const host = String(project?.subdomain ?? "").toLowerCase();
    if (!/^[a-z0-9-]+\.pages\.dev$/.test(host)) {
        fail(
            `Pages project ${PROJECT} reports an unexpected subdomain: ${JSON.stringify(project?.subdomain)}`,
        );
    }
    return host;
}

async function project() {
    let found = await getProject();
    if (!found) {
        if (!PROVISION)
            fail(
                `Pages project ${PROJECT} is missing; dispatch domains.yml on master to provision it`,
            );
        const r = await cf("POST", `/accounts/${ACCOUNT}/pages/projects`, {
            name: PROJECT,
            production_branch: PRODUCTION_BRANCH,
        });
        if (!r.ok)
            fail(
                `could not create Pages project ${PROJECT}: HTTP ${r.status} ${r.errors}`,
            );
        console.log(`created Pages project ${PROJECT}`);
        found = await getProject();
        if (!found)
            fail(`Pages project ${PROJECT} is still missing after its creation`);
    }
    if (found.production_branch !== PRODUCTION_BRANCH) {
        const drift = `Pages project ${PROJECT} has production branch ${JSON.stringify(found.production_branch)}, not ${PRODUCTION_BRANCH}`;
        if (!PROVISION) fail(drift);
        console.log(`${drift}; patching it`);
        const r = await cf("PATCH", projectPath, {
            production_branch: PRODUCTION_BRANCH,
        });
        if (!r.ok)
            fail(
                `could not set the production branch of ${PROJECT}: HTTP ${r.status} ${r.errors}`,
            );
        found = await getProject();
        if (found?.production_branch !== PRODUCTION_BRANCH)
            fail(`${drift} after the patch`);
    }
    console.log(
        `project ${PROJECT}: host ${hostOf(found)}, production branch ${found.production_branch}`,
    );
}

async function probe(url) {
    try {
        const response = await fetch(url, {
            redirect: "manual",
            signal: AbortSignal.timeout(15_000),
        });
        await response.body?.cancel();
        return { status: response.status, location: response.headers.get("location") };
    } catch (error) {
        return {
            status: 0,
            location: null,
            error: error?.cause?.code ?? error?.message,
        };
    }
}

/** `origin` must 301 every path to the same path on the canonical origin. */
async function expectRedirect(origin, label) {
    const deadline = Date.now() + EDGE_WAIT_MS;
    for (const path of ["/", "/x/y"]) {
        const expected = `${CANONICAL}${path}`;
        for (;;) {
            const got = await probe(`${origin}${path}`);
            const seen = `${got.status}${got.location ? ` -> ${got.location}` : ""}${got.error ? ` (${got.error})` : ""}`;
            if (got.status === 301 && got.location === expected) {
                console.log(`${label}: ${path} answered ${seen}`);
                break;
            }
            if (Date.now() > deadline)
                fail(
                    `${label}: ${origin}${path} answered ${seen}; expected 301 -> ${expected}`,
                );
            console.log(`${label}: ${path} answered ${seen}; retrying`);
            await sleep(10_000);
        }
    }
    // Logged, never gated: the Pages docs do not say whether a redirect keeps the
    // query string, and the app's URL state lives in the #fragment, which
    // browsers re-attach to a Location that carries none (RFC 9110 §10.2.2).
    const q = await probe(`${origin}/x/y?colour-probe=1`);
    const carried = q.location === `${CANONICAL}/x/y?colour-probe=1`;
    console.log(
        `${label}: the query string is ${carried ? "carried" : "not carried"} (${q.status} -> ${q.location})`,
    );
}

async function expectCanonical() {
    const deadline = Date.now() + 60_000;
    for (;;) {
        const got = await probe(`${CANONICAL}/`);
        if (got.status === 200) {
            console.log(`${CANONICAL}/ answered 200`);
            return;
        }
        if (Date.now() > deadline)
            fail(
                `${CANONICAL}/ answered ${got.status} ${got.location ?? got.error ?? ""}; the redirect target must serve`,
            );
        await sleep(10_000);
    }
}

const domainsPath = `${projectPath}/domains`;

async function getDomain() {
    const r = await cf("GET", domainsPath);
    if (!r.ok)
        fail(`could not list the domains of ${PROJECT}: HTTP ${r.status} ${r.errors}`);
    return (
        (Array.isArray(r.result) ? r.result : []).find((d) => d.name === DOMAIN) ?? null
    );
}

async function resolvesPublicly() {
    const resolver = new Resolver({ timeout: 5_000, tries: 2 });
    resolver.setServers(["1.1.1.1", "8.8.8.8"]);
    for (const rrtype of ["A", "AAAA", "CNAME"]) {
        try {
            const answers = await resolver.resolve(DOMAIN, rrtype);
            if (answers.length) {
                console.log(`public DNS: ${DOMAIN} ${rrtype} ${answers.join(", ")}`);
                return true;
            }
        } catch {
            // ENODATA / ENOTFOUND: try the next type
        }
    }
    console.log(`public DNS: ${DOMAIN} does not resolve`);
    return false;
}

const sameHost = (content, host) =>
    String(content).toLowerCase().replace(/\.$/, "") === host;
const describe = (records) =>
    records
        .map((r) => `${r.type} ${r.content}${r.proxied ? " (proxied)" : ""}`)
        .join(", ");

/**
 * The CNAME colour -> <project host>. Returns true when this run created it.
 * Zone id: the attached domain's zone_tag (no Zone:Read needed), else a lookup.
 */
async function ensureRecord(host, attached) {
    let zoneId = attached?.zone_tag || null;
    if (!zoneId) {
        const zones = await cf("GET", `/zones?name=${ZONE}`);
        if (zones.ok && Array.isArray(zones.result) && zones.result.length === 1)
            zoneId = zones.result[0].id;
    }
    let apiError = zoneId ? "" : `no zone id for ${ZONE}`;
    if (zoneId) {
        masked.set(zoneId, "{zone}");
        // No type filter: an A or AAAA at the name is a conflict too.
        const list = await cf("GET", `/zones/${zoneId}/dns_records?name=${DOMAIN}`);
        if (list.ok) {
            const records = Array.isArray(list.result) ? list.result : [];
            if (records.length > 0) {
                const [only] = records;
                if (
                    records.length !== 1 ||
                    only.type !== "CNAME" ||
                    !sameHost(only.content, host)
                ) {
                    fail(
                        `DNS conflict: ${DOMAIN} has ${describe(records)}; expected exactly one CNAME -> ${host}. Not overwriting; resolve it by hand, then dispatch domains.yml`,
                    );
                }
                console.log(
                    `DNS: CNAME ${DOMAIN} -> ${host} present (proxied: ${only.proxied})`,
                );
                return false;
            }
            if (!PROVISION) fail(`DNS: no record for ${DOMAIN}`);
            const created = await cf("POST", `/zones/${zoneId}/dns_records`, {
                type: "CNAME",
                name: DOMAIN,
                content: host,
                proxied: true,
                ttl: 1,
                comment: RECORD_COMMENT,
            });
            if (created.ok) {
                console.log(`DNS: created CNAME ${DOMAIN} -> ${host} (proxied)`);
                return true;
            }
            apiError = `create: HTTP ${created.status} ${created.errors}`;
        } else {
            apiError = `read: HTTP ${list.status} ${list.errors}`;
        }
    }
    // The token cannot read or write the zone: public DNS decides.
    console.log(
        `DNS: the ${ZONE} zone is not usable with this token (${apiError}); falling back to a public lookup`,
    );
    if (await resolvesPublicly()) return false;
    fail(
        `OWNER ACT: the Cloudflare token cannot write DNS on ${ZONE} (${apiError}). Add one record in the ${ZONE} zone, CNAME colour -> ${host} (proxied), or grant the token Zone DNS:Edit on ${ZONE}; then dispatch domains.yml`,
    );
}

async function retryValidation() {
    const r = await cf("PATCH", `${domainsPath}/${DOMAIN}`);
    if (!r.ok)
        console.log(
            `::warning title=colour.babb.dev::retrying validation failed: HTTP ${r.status} ${r.errors}`,
        );
}

async function waitActive(recordCreated) {
    const deadline = Date.now() + ACTIVE_WAIT_MS;
    // A fresh record retries validation at once; otherwise every 5 min while
    // pending, and every minute while in error.
    let lastRetry = recordCreated ? 0 : Date.now();
    for (;;) {
        const d = await getDomain();
        if (!d) fail(`${DOMAIN} is no longer attached to Pages project ${PROJECT}`);
        const detail = [
            d.validation_data?.status && `validation ${d.validation_data.status}`,
            d.verification_data?.status && `verification ${d.verification_data.status}`,
            d.validation_data?.error_message,
            d.verification_data?.error_message,
        ]
            .filter(Boolean)
            .join(", ");
        const seen = `${d.status}${detail ? ` (${detail})` : ""}`;
        console.log(`domain ${DOMAIN}: ${seen}`);
        if (d.status === "active") return;
        if (d.status === "blocked" || d.status === "deactivated")
            fail(`${DOMAIN} is ${seen}`);
        if (!PROVISION) fail(`${DOMAIN} is ${seen}, not active`);
        if (Date.now() > deadline) {
            fail(
                `${DOMAIN} is still ${seen} after ${ACTIVE_WAIT_MS / 60_000} min; validation continues on Cloudflare's side, so dispatch domains.yml again to finish`,
            );
        }
        const retryEvery = d.status === "error" ? 60_000 : 5 * 60_000;
        if (Date.now() - lastRetry >= retryEvery) {
            await retryValidation();
            lastRetry = Date.now();
        }
        await sleep(15_000);
    }
}

async function domain() {
    const found = await getProject();
    if (!found)
        fail(`Pages project ${PROJECT} is missing (the project step provisions it)`);
    if (found.production_branch !== PRODUCTION_BRANCH) {
        fail(
            `Pages project ${PROJECT} has production branch ${JSON.stringify(found.production_branch)}, not ${PRODUCTION_BRANCH}`,
        );
    }
    const host = hostOf(found);

    // 1. The deploy landed as Production and _redirects parsed.
    await expectRedirect(`https://${host}`, host);

    // 2. Attach the domain before its DNS record: a CNAME to a Pages host with
    //    no attached domain answers 522.
    let attached = await getDomain();
    if (!attached) {
        if (!PROVISION) fail(`${DOMAIN} is not attached to Pages project ${PROJECT}`);
        const r = await cf("POST", domainsPath, { name: DOMAIN });
        if (!r.ok)
            fail(
                `could not attach ${DOMAIN} to ${PROJECT}: HTTP ${r.status} ${r.errors}`,
            );
        console.log(`attached ${DOMAIN} to ${PROJECT}`);
        attached = r.result;
        if (!attached?.zone_tag) {
            // zone_tag can trail the attach by a moment; read it back once.
            await sleep(5_000);
            attached = (await getDomain()) ?? attached;
        }
    }

    // 3. DNS, then 4. the domain goes active.
    const recordCreated = await ensureRecord(host, attached);
    await waitActive(recordCreated);

    // 5. The custom domain 301s, and the target still serves.
    await expectRedirect(`https://${DOMAIN}`, DOMAIN);
    await expectCanonical();

    const summary = process.env.GITHUB_STEP_SUMMARY;
    if (summary) {
        appendFileSync(
            summary,
            `- \`${DOMAIN}\` and \`${host}\` answer 301 to \`${CANONICAL}/\` with the path kept (${mode}).\n`,
        );
    }
}

try {
    if (command !== "project" && command !== "domain")
        fail(`usage: colour-domain.mjs <project|domain> <provision|verify>`);
    if (mode !== "provision" && mode !== "verify")
        fail(`usage: colour-domain.mjs <project|domain> <provision|verify>`);
    if (!TOKEN || !ACCOUNT)
        fail("CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID must both be set");
    await (command === "project" ? project() : domain());
} catch (error) {
    const message =
        error instanceof Failure
            ? error.message
            : `${command} crashed: ${error?.message ?? error}`;
    console.log(`::error title=colour.babb.dev::${redact(message)}`);
    process.exitCode = 1;
}
