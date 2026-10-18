// SERVED MODEL: claude-opus-5-5
/**
 * api-tls-smoke.mjs — the palette API's post-deploy + weekly smoke
 * (X-W11 · W11.md ADDENDUM 2026-10-06 limb (b) · COHESION §0eh).
 *
 * Why it exists: from 2026-08-26 to 2026-10-06 api.color.babb.dev served an
 * EXPIRED certificate (a Let's Encrypt lineage whose renewal failed on dead
 * names). Every palette fetch from color.babb.dev failed TLS, silently, for
 * about six weeks, while every deploy went green. This probe makes that window
 * fail a run instead.
 *
 * What it asserts (the addendum's words, and nothing weaker):
 *   1. a GET of `https://api.color.babb.dev/palettes?limit=1` over STRICT TLS —
 *      Node's default chain + hostname verification; this file never sets
 *      `rejectUnauthorized: false` and refuses to run if
 *      NODE_TLS_REJECT_UNAUTHORIZED=0 is in the environment;
 *   2. answers HTTP 200;
 *   3. with a `Content-Type` of `application/json`;
 *   4. whose body parses as JSON;
 *   5. and the served (leaf) certificate's `notAfter`, read from the TLS
 *      socket's peer certificate, is more than 14 days after now.
 *
 * Usage:
 *   node scripts/ci/api-tls-smoke.mjs                       # the bound target
 *   node scripts/ci/api-tls-smoke.mjs --url <https-url> --min-days <n>
 * The flags exist for falsification only (a non-JSON target, a threshold the
 * live certificate fails); CI invokes the bare form. Exit 0 = every assertion
 * held; exit 1 = at least one failed (each failure is printed by name).
 */
import https from "node:https";

const DEFAULT_URL = "https://api.color.babb.dev/palettes?limit=1";
const DEFAULT_MIN_DAYS = 14;
const TIMEOUT_MS = 20_000;
const DAY_MS = 24 * 60 * 60 * 1000;

function parseArgs(argv) {
    const args = { url: DEFAULT_URL, minDays: DEFAULT_MIN_DAYS };
    for (let i = 0; i < argv.length; i++) {
        const flag = argv[i];
        const value = argv[i + 1];
        if (flag === "--url" && value) {
            args.url = value;
            i++;
        } else if (flag === "--min-days" && value) {
            args.minDays = Number(value);
            i++;
        } else {
            throw new Error(`unknown or incomplete argument: ${flag}`);
        }
    }
    if (!args.url.startsWith("https://"))
        throw new Error(`--url must be https: ${args.url}`);
    if (!Number.isFinite(args.minDays) || args.minDays < 0) {
        throw new Error(`--min-days must be a non-negative number: ${args.minDays}`);
    }
    return args;
}

/** One strict-TLS GET; resolves with status, content type, body and the leaf cert. */
function get(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(
            url,
            { headers: { accept: "application/json" } },
            (res) => {
                // Read the peer certificate while the socket is open (before the body ends).
                const cert = res.socket.getPeerCertificate();
                const authorized = res.socket.authorized;
                const chunks = [];
                res.on("data", (chunk) => chunks.push(chunk));
                res.on("end", () =>
                    resolve({
                        status: res.statusCode,
                        contentType: res.headers["content-type"] ?? "",
                        body: Buffer.concat(chunks).toString("utf8"),
                        cert,
                        authorized,
                    }),
                );
                res.on("error", reject);
            },
        );
        req.setTimeout(TIMEOUT_MS, () =>
            req.destroy(new Error(`timed out after ${TIMEOUT_MS} ms`)),
        );
        req.on("error", reject);
    });
}

async function main() {
    if (process.env.NODE_TLS_REJECT_UNAUTHORIZED === "0") {
        throw new Error(
            "NODE_TLS_REJECT_UNAUTHORIZED=0 is set — this smoke runs over strict TLS only",
        );
    }
    const { url, minDays } = parseArgs(process.argv.slice(2));
    const now = Date.now();
    const failures = [];

    let res;
    try {
        res = await get(url);
    } catch (err) {
        // A TLS verification failure (expired, self-signed, wrong host) lands here.
        console.log(
            JSON.stringify({
                url,
                ok: false,
                failures: [`request: ${err.code ?? ""} ${err.message}`.trim()],
            }),
        );
        process.exitCode = 1;
        return;
    }

    if (!res.authorized)
        failures.push("tls: the peer certificate chain was not authorized");
    if (res.status !== 200) failures.push(`status: expected 200, got ${res.status}`);
    const mediaType = res.contentType.split(";")[0].trim().toLowerCase();
    if (mediaType !== "application/json") {
        failures.push(
            `content-type: expected application/json, got ${JSON.stringify(res.contentType)}`,
        );
    }
    try {
        JSON.parse(res.body);
    } catch (err) {
        failures.push(`body: not JSON (${err.message})`);
    }

    const notAfter = res.cert?.valid_to ? new Date(res.cert.valid_to) : null;
    const daysLeft = notAfter ? (notAfter.getTime() - now) / DAY_MS : NaN;
    if (!notAfter || Number.isNaN(notAfter.getTime())) {
        failures.push("cert: the peer certificate carried no readable notAfter");
    } else if (!(notAfter.getTime() > now + minDays * DAY_MS)) {
        failures.push(
            `cert: notAfter ${notAfter.toISOString()} is not more than ${minDays} d out (${daysLeft.toFixed(1)} d left)`,
        );
    }

    const ok = failures.length === 0;
    console.log(
        JSON.stringify({
            url,
            ok,
            status: res.status,
            contentType: res.contentType,
            subject: res.cert?.subject?.CN ?? null,
            issuer: res.cert?.issuer?.O ?? null,
            notAfter: notAfter?.toISOString() ?? null,
            daysLeft: Number.isFinite(daysLeft) ? Number(daysLeft.toFixed(1)) : null,
            minDays,
            failures,
        }),
    );
    if (!ok) process.exitCode = 1;
}

main().catch((err) => {
    console.error(`api-tls-smoke: ${err.message}`);
    process.exitCode = 1;
});
