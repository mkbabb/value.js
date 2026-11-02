// SERVED MODEL: claude-opus-5[1m]
/**
 * boot-smoke.mjs — THE BOOT-TRUTH GATE, BOTH MODES (X-W1 · CC-032 · G-12/G-13).
 *
 * Invoked as `node scripts/ci/boot-smoke.mjs …` (the form `d9c3b9f2`'s CI job
 * used, via an npm script); it carries no shebang and is not exec-bit run.
 *
 * Restores the structural guard `d9c3b9f2` created as inv-N-1 and `6d6d3521`
 * deleted as "CI-orphaned; W44 routed-mount witness supersedes" — eleven hours
 * before W44 closed booking a gh-pages prod-preview EMPTY MOUNT as a carry
 * (NV-7). The successor witness covered dev only; the mode that actually ships
 * was unwitnessed, which is the whole reason NV-7 survived to be carried.
 *
 * ── WHAT IT ASSERTS ──────────────────────────────────────────────────────────
 * Four assertions per mode, per seed (W1.md:248-250):
 *   A1  `#app` has >= 1 element child          — the mount happened at all
 *   A2  a `role=main` landmark exists          — the pane shell rendered
 *   A3  `page.on('pageerror')` collected `[]`  — nothing threw to the window
 *   A4  >= 1 desktop utility class is present in the EMITTED CSS
 *
 * A4 is read from the LIVE document's CSSOM, never from a file guess: the
 * desktop/CSS-emission chronic (K.W2.6 -> M.W2.A -> N.W2.B -> N.W10.D -> R.W2)
 * is a build-mode-only failure in which the `lg:` breakpoint band is dropped
 * from the emitted sheet while every source file still declares it. A stylesheet
 * that never loaded cannot answer, which is exactly the signal wanted.
 *
 * ── WHY TWO MODES ───────────────────────────────────────────────────────────
 * `dev` boots the vite dev server with a COLD dep-optimizer cache (`--force`):
 * the warm `.vite/deps` cache is one of the three named silencers — it renders a
 * stale graph while vitest/lint/typecheck all stay green.
 *
 * `prod-preview` builds `npm run gh-pages` and serves `dist/gh-pages` at a
 * BARE `127.0.0.1:PORT` origin. Bare is load-bearing and is CHECKED here, not
 * assumed: a sub-path origin masks base-path defects, and the whole class this
 * gate exists to kill is "green in dev, blank in the artifact that ships".
 *
 * ── WHY A SEED MATRIX, NOT ONE DEFAULT BOOT ─────────────────────────────────
 * X-W1-FOLD R16/R17. The boot model is resolved BEFORE the app is constructed
 * (`demo/app/composables/boot/hydrate.ts`): URL hash, else the
 * persisted store, else the default. `useColorPipeline`'s
 * `channelNumber(convertPickerColor(color,"hsv"),"h")` then runs in App.vue's
 * setup — OUTSIDE the ErrorBoundary, which is inside App's own template — so an
 * achromatic seed whose hsv hue is powerless (`"none"`) throws BEFORE mount and
 * no boundary can catch it. A default cold boot cannot see this: the default
 * seed is chromatic. The matrix carries the seed classes a real user reaches —
 * a share link and a returning session — including `?color=black`, and a
 * chromatic control so a green run proves the matrix discriminates.
 *
 * ── THE ARTIFACT CENSUS (R42) ───────────────────────────────────────────────
 * prod-preview records the emitted-asset census of the build it just probed —
 * count, JS/CSS split, vendor-katex presence, and the modulepreload set read
 * from the served `index.html`. It rides the build this gate already runs.
 *
 * Exit code 0 when every case passes; non-zero names the first failing case.
 *
 * Usage:
 *   node scripts/ci/boot-smoke.mjs --mode=dev
 *   node scripts/ci/boot-smoke.mjs --mode=prod-preview [--build]
 *   node scripts/ci/boot-smoke.mjs --mode=prod-preview --origin=http://127.0.0.1:4173
 *   node scripts/ci/boot-smoke.mjs --mode=prod-preview --origin=https://color.babb.dev/
 *   ... [--json=<path>] [--seed=<id>] [--timeout=<ms>]
 *
 * `--origin` probes an origin someone else is already serving (the form is
 * still checked). It takes two forms (COHESION §0ha.2): the loopback form
 * `http://127.0.0.1:PORT/`, and the production form — `https:`, a host on the
 * named `PRODUCTION_ORIGINS` allowlist, no port. Both must be a bare root: no
 * sub-path, query or fragment. A production origin starts no local server; it
 * reads the deployed bytes, and the report records the served build's
 * fingerprint (`servedBuild`). `--build` runs `npm run gh-pages` first.
 * `--seed` narrows the matrix to one case for triage — it is a DIAGNOSTIC,
 * never a gate posture: a gate run takes the whole matrix.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import crypto from "node:crypto";
import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const GH_PAGES_DIR = path.join(REPO_ROOT, "dist", "gh-pages");
const HOST = "127.0.0.1";
const SERVER_READY_TIMEOUT_MS = 180_000;
const DEFAULT_CASE_TIMEOUT_MS = 30_000;

/**
 * The deploy origins of record (COHESION §0ha.2) — the only https hosts the
 * production origin form admits, each with the `/health` of the API its build
 * talks to (`.env.example` `API_HEALTH_URL`), whose `commit` is recorded beside
 * the served fingerprint.
 */
const PRODUCTION_ORIGINS = new Map([
    ["color.babb.dev", { apiHealth: "https://api.color.babb.dev/health" }],
]);

/* ─────────────────────────── the seed matrix (R16/R17) ─────────────────────
 * `hash` is the hash-router query the resolver reads pre-router
 * (`#/?space=…&color=…`); `storage` is the persisted color-state projection
 * (`color-picker` -> `{inputColor, savedColors}`), installed before any script
 * on the page runs. `class` records why the row exists so a failing row is
 * self-routing.
 */
const SEEDS = [
    {
        id: "default",
        class: "the W1.md literal — a cold boot with no seed at all",
        hash: "",
        storage: null,
    },
    {
        id: "deep-link-black",
        class: "R16 — `?color=black` at minimum; grey 0 is hsv-powerless",
        hash: "#/?space=rgb&color=black",
        storage: null,
    },
    {
        id: "deep-link-grey-333333",
        class: "R16 — grey 51, a member of the 28/256 hsv-powerless set",
        hash: "#/?space=hex&color=%23333333",
        storage: null,
    },
    {
        id: "deep-link-grey-808080",
        class:
            "CONTROL — grey 128 is NOT hsv-powerless; a matrix that reds " +
            "this row is reporting something other than the seed class",
        hash: "#/?space=hex&color=%23808080",
        storage: null,
    },
    {
        id: "deep-link-lch-none",
        class: "R17 — the legal `none` hue reaching the picker through the URL",
        hash: "#/?space=lch&color=lch(50%25%200%20none)",
        storage: null,
    },
    {
        id: "deep-link-oklch-none",
        class: "R17 — the same in oklch; 256/256 greys emit `none` in both",
        hash: "#/?space=oklch&color=oklch(0.5%200%20none)",
        storage: null,
    },
    {
        id: "persisted-black",
        class:
            "R16 — the self-perpetuating arm: the seed that crashed the last " +
            "session is still in localStorage on the next one",
        hash: "",
        storage: { inputColor: "black", savedColors: [] },
    },
    {
        id: "persisted-oklch-none",
        class: "R17 — a persisted none-hue string, the returning-user path",
        hash: "",
        storage: { inputColor: "oklch(0.5 0 none)", savedColors: [] },
    },
];

const COLOR_STORE_KEY = "color-picker"; // demo/color-session/useColorPersistence.ts:15

/* ───────────────────────────────── argv ─────────────────────────────────── */

function parseArgs(argv) {
    const args = {
        mode: null,
        origin: null,
        build: false,
        json: null,
        seed: null,
        timeout: null,
    };
    for (const raw of argv) {
        const [key, value] = raw.startsWith("--")
            ? raw.slice(2).split(/=(.*)/s)
            : [null, null];
        switch (key) {
            case "mode":
                args.mode = value;
                break;
            case "origin":
                args.origin = value;
                break;
            case "build":
                args.build = true;
                break;
            case "json":
                args.json = value;
                break;
            case "seed":
                args.seed = value;
                break;
            case "timeout":
                args.timeout = Number(value);
                break;
            default:
                throw new Error(`unknown argument: ${raw}`);
        }
    }
    if (args.mode !== "dev" && args.mode !== "prod-preview") {
        throw new Error("--mode=dev|prod-preview is required");
    }
    return args;
}

/**
 * The ORIGIN-FORM check (G-13's falsifier, made mechanical).
 *
 * A prod preview served under a sub-path — `http://127.0.0.1:8080/gh-pages/`,
 * `.../dist/gh-pages/` — silently absorbs base-path defects, so the gate would
 * pass for a build that cannot be served from a site root. The origin form is
 * therefore checked, not assumed: loopback host, explicit port, ROOT path, no
 * query, no fragment.
 *
 * The production form (COHESION §0ha.2) is an `https:` origin whose host is
 * exactly a `PRODUCTION_ORIGINS` key, with no port. The sub-path, query and
 * fragment complaints are shared, so G-13's falsifier holds for both forms.
 * Returns the bare origin and which form it took.
 */
function assertBareOrigin(origin) {
    let url;
    try {
        url = new URL(origin);
    } catch {
        throw new Error(`ORIGIN-FORM: not a URL: ${origin}`);
    }
    const production = url.protocol === "https:";
    const productionHosts = [...PRODUCTION_ORIGINS.keys()].join(", ");
    const complaints = [];
    if (production) {
        if (!PRODUCTION_ORIGINS.has(url.hostname))
            complaints.push(`host ${url.hostname} (want one of ${productionHosts})`);
        if (url.port) complaints.push(`explicit port ${url.port} (want none)`);
    } else {
        if (url.protocol !== "http:")
            complaints.push(`protocol ${url.protocol} (want http:)`);
        if (url.hostname !== HOST)
            complaints.push(`host ${url.hostname} (want ${HOST})`);
        if (!url.port) complaints.push("no explicit port");
    }
    if (url.pathname !== "/" && url.pathname !== "") {
        complaints.push(
            `sub-path ${url.pathname} — a sub-path origin masks base-path defects`,
        );
    }
    if (url.search) complaints.push(`query ${url.search}`);
    if (url.hash) complaints.push(`fragment ${url.hash}`);
    if (complaints.length) {
        const form = production
            ? `production https://{${productionHosts}}/`
            : `${HOST}:PORT`;
        throw new Error(
            `ORIGIN-FORM: ${origin} is not a bare ${form} origin — ${complaints.join("; ")}`,
        );
    }
    return {
        origin: `${url.protocol}//${url.host}`,
        form: production ? "production" : "loopback",
    };
}

/* ──────────────────────────────── servers ───────────────────────────────── */

const CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".mjs": "text/javascript; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".ico": "image/x-icon",
    ".woff2": "font/woff2",
    ".woff": "font/woff",
    ".ttf": "font/ttf",
    ".txt": "text/plain; charset=utf-8",
    ".webmanifest": "application/manifest+json",
};

/**
 * Serve a built directory at a BARE loopback origin on an ephemeral port.
 * Deliberately NOT an SPA fallback server: the demo uses `createWebHashHistory`
 * (`demo/app/router/index.ts:41`), so every route is one document, and
 * a catch-all rewrite would hide a genuinely missing asset behind index.html.
 */
async function serveStatic(root) {
    if (!fs.existsSync(path.join(root, "index.html"))) {
        throw new Error(
            `prod-preview: ${root} has no index.html — run \`npm run gh-pages\` ` +
                "(or pass --build) before probing; the library build writes dist/ " +
                "but NOT dist/gh-pages",
        );
    }
    const server = http.createServer((req, res) => {
        let filePath;
        try {
            const url = new URL(req.url, `http://${HOST}`);
            filePath = path.join(root, decodeURIComponent(url.pathname));
        } catch {
            res.writeHead(400).end("bad request");
            return;
        }
        const resolved = path.resolve(filePath);
        if (resolved !== root && !resolved.startsWith(root + path.sep)) {
            res.writeHead(403).end("forbidden");
            return;
        }
        let target = resolved;
        if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
            target = path.join(target, "index.html");
        }
        if (!fs.existsSync(target) || !fs.statSync(target).isFile()) {
            res.writeHead(404).end("not found");
            return;
        }
        res.writeHead(200, {
            "content-type":
                CONTENT_TYPES[path.extname(target)] ?? "application/octet-stream",
            "cache-control": "no-store",
        });
        fs.createReadStream(target).pipe(res);
    });
    await new Promise((resolve, reject) => {
        server.once("error", reject);
        server.listen(0, HOST, resolve);
    });
    return { server, origin: `http://${HOST}:${server.address().port}` };
}

/** Poll an origin until it answers, or time out. */
async function waitForServer(origin, deadline) {
    let lastError = "never answered";
    while (Date.now() < deadline) {
        try {
            const res = await fetch(origin + "/", { method: "GET" });
            if (res.ok) return;
            lastError = `HTTP ${res.status}`;
        } catch (err) {
            lastError = String(err?.message ?? err);
        }
        await sleep(500);
    }
    throw new Error(`server never became ready at ${origin} (${lastError})`);
}

/**
 * Spawn the vite dev server on a COLD dep-optimizer cache.
 *
 * X-W11 §0gc (e2e-visual seat) — THE 6-HOUR HANG. This used to spawn `npx vite`
 * and stop it with `child.kill("SIGTERM")`. On Linux `npx` dies on SIGTERM and
 * does NOT take its vite grandchild with it: vite is re-parented to init and
 * keeps the write ends of the stdout/stderr pipes this process reads, so the
 * event loop never drains and `node boot-smoke.mjs` never exits. CI measured it
 * on run 39117135689: "dev: 8/8 seed cases passed" at 09:58:19, then nothing
 * until GitHub's 6 h job ceiling cancelled the step (and its cleanup reaped the
 * orphan). macOS hides the defect, which is why every local run exited.
 *
 * The cure is ownership of the whole tree: vite's own bin under this Node (no
 * wrapper process between us and the server), in its own process group, which
 * `stop` signals as a group and then WAITS for — the step returns only once
 * the server is gone, never after a fixed sleep.
 */
async function startDevServer() {
    const port = 9100 + Math.floor(Math.random() * 400);
    const origin = `http://${HOST}:${port}`;
    const viteBin = path.join(REPO_ROOT, "node_modules", "vite", "bin", "vite.js");
    const child = spawn(
        process.execPath,
        [viteBin, "--force", "--host", HOST, "--port", String(port), "--strictPort"],
        {
            cwd: REPO_ROOT,
            stdio: ["ignore", "pipe", "pipe"],
            detached: true,
            // Same-origin VITE_API_URL keeps the optional palette read off the
            // live server, so the gate is hermetic (the e2e webServer posture).
            env: { ...process.env, VITE_API_URL: origin },
        },
    );
    const log = [];
    child.stdout.on("data", (d) => log.push(String(d)));
    child.stderr.on("data", (d) => log.push(String(d)));
    let exited = false;
    const exitedPromise = new Promise((resolve) =>
        child.on("exit", (code, signal) => {
            exited = true;
            if (code) log.push(`[vite exited code=${code}]`);
            resolve(signal ?? code);
        }),
    );
    /** Signal the whole process group; ESRCH means it is already gone. */
    const signalGroup = (sig) => {
        try {
            process.kill(-child.pid, sig);
        } catch (err) {
            if (err?.code !== "ESRCH") throw err;
        }
    };
    const stop = async () => {
        if (!exited) {
            signalGroup("SIGTERM");
            // The grace timer is cancelled once vite exits, so it never holds
            // the loop open itself.
            const grace = new AbortController();
            const settled = await Promise.race([
                exitedPromise.then(() => true),
                sleep(5000, false, { signal: grace.signal }).catch(() => true),
            ]);
            grace.abort();
            if (!settled) {
                signalGroup("SIGKILL");
                await exitedPromise;
            }
        }
        // Any straggler left in the group (vite's own workers) goes with it,
        // and the pipe read ends are released so nothing holds the loop.
        signalGroup("SIGKILL");
        child.stdout.destroy();
        child.stderr.destroy();
    };
    try {
        await waitForServer(origin, Date.now() + SERVER_READY_TIMEOUT_MS);
    } catch (err) {
        await stop();
        throw new Error(`${err.message}\n--- vite output ---\n${log.join("")}`);
    }
    if (exited) {
        await stop();
        throw new Error(`vite exited before the smoke run\n${log.join("")}`);
    }
    return { origin, stop };
}

/** Run `npm run gh-pages` and fail loudly if it does not produce an artifact. */
async function buildGhPages() {
    await new Promise((resolve, reject) => {
        const child = spawn("npm", ["run", "gh-pages"], {
            cwd: REPO_ROOT,
            stdio: ["ignore", "inherit", "inherit"],
        });
        child.on("exit", (code) =>
            code === 0
                ? resolve()
                : reject(new Error(`npm run gh-pages exited ${code}`)),
        );
    });
}

/* ──────────────────────────── the four assertions ───────────────────────── */

/**
 * Read the mount state and the emitted-CSS state out of the live document.
 * Everything here is a READ — the page is never modified to make it answer.
 */
const readBootState = () => {
    const app = document.querySelector("#app");

    // A4 — walk the CSSOM for a desktop-breakpoint utility. Recursing through
    // CSSMediaRule keeps the enclosing condition, because "the class exists but
    // its media band was dropped" and "the class was never emitted" are
    // different defects and the receipt should say which one it saw.
    const desktopUtilities = [];
    let unreadableSheets = 0;
    const DESKTOP_SELECTOR = /\.lg\\:/;
    // A style rule carries a (usually empty) `cssRules` list of its own in the
    // nesting era, so "has cssRules" is NOT "is a grouping rule": test the
    // selector first, then descend into whatever children exist.
    const walk = (rules, media) => {
        for (const rule of rules) {
            if (rule.selectorText && DESKTOP_SELECTOR.test(rule.selectorText)) {
                desktopUtilities.push({
                    selector: rule.selectorText,
                    media: media ?? null,
                });
            }
            if (rule.cssRules && rule.cssRules.length) {
                walk(
                    rule.cssRules,
                    rule.conditionText ? String(rule.conditionText) : media,
                );
            }
        }
    };
    for (const sheet of document.styleSheets) {
        try {
            walk(sheet.cssRules, null);
        } catch {
            unreadableSheets += 1; // cross-origin sheet — not ours to read
        }
    }

    return {
        appPresent: !!app,
        appTag: app ? app.tagName : null,
        appChildElementCount: app ? app.childElementCount : -1,
        appChildTags: app ? Array.from(app.children, (c) => c.tagName) : [],
        mainLandmarkCount: document.querySelectorAll('main, [role="main"]').length,
        mainLandmarkLabels: Array.from(
            document.querySelectorAll('main, [role="main"]'),
            (el) => el.getAttribute("aria-label") ?? "(unlabelled)",
        ),
        styleSheetCount: document.styleSheets.length,
        unreadableSheets,
        desktopUtilityCount: desktopUtilities.length,
        desktopUtilitySample: desktopUtilities.slice(0, 3),
    };
};

/** Probe one seed. Returns the case record; never throws for a product RED. */
async function probeSeed(browser, origin, seed, timeoutMs) {
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
    });
    const pageErrors = [];
    const consoleErrors = [];
    const failedRequests = [];
    let record;
    try {
        if (seed.storage) {
            const payload = JSON.stringify(seed.storage);
            await context.addInitScript(
                ([key, value]) => {
                    try {
                        window.localStorage.setItem(key, value);
                    } catch {
                        /* storage blocked — the case reports what it measured */
                    }
                },
                [COLOR_STORE_KEY, payload],
            );
        }
        const page = await context.newPage();
        page.on("pageerror", (err) =>
            pageErrors.push(String(err?.stack ?? err?.message ?? err)),
        );
        page.on("console", (msg) => {
            if (msg.type() === "error") consoleErrors.push(msg.text());
        });
        page.on("requestfailed", (req) =>
            failedRequests.push(`${req.url()} :: ${req.failure()?.errorText ?? "?"}`),
        );

        const target = origin + "/" + seed.hash;
        const response = await page.goto(target, {
            waitUntil: "load",
            timeout: timeoutMs,
        });

        // Give the app its mount beat, but do not WAIT FOR SUCCESS: polling
        // until the landmark appears and then asserting it appeared is a
        // tautology. Poll for quiescence, then read once and judge.
        const deadline = Date.now() + timeoutMs;
        while (Date.now() < deadline) {
            const mounted = await page.evaluate(
                () => (document.querySelector("#app")?.childElementCount ?? 0) > 0,
            );
            if (mounted) break;
            await sleep(250);
        }
        await sleep(750); // let deferred mount-time throws flush

        const state = await page.evaluate(readBootState);
        const assertions = [
            {
                id: "A1",
                name: "#app has >= 1 element child",
                pass: state.appPresent && state.appChildElementCount >= 1,
                reading: state.appPresent
                    ? `#app is <${state.appTag}> with ${state.appChildElementCount} element ` +
                      `child(ren): [${state.appChildTags.join(", ")}]`
                    : "#app not found in the document",
            },
            {
                id: "A2",
                name: "a role=main landmark exists",
                pass: state.mainLandmarkCount >= 1,
                reading:
                    `${state.mainLandmarkCount} landmark(s): ` +
                    `[${state.mainLandmarkLabels.join(" | ")}]`,
            },
            {
                id: "A3",
                name: "pageerror collected []",
                pass: pageErrors.length === 0,
                reading:
                    pageErrors.length === 0
                        ? "[]"
                        : `${pageErrors.length} pageerror(s): ` +
                          pageErrors.map((e) => e.split("\n")[0]).join(" | "),
            },
            {
                id: "A4",
                name: ">= 1 desktop utility class in the emitted CSS",
                pass: state.desktopUtilityCount >= 1,
                reading:
                    `${state.desktopUtilityCount} desktop utility rule(s) across ` +
                    `${state.styleSheetCount} sheet(s)` +
                    (state.unreadableSheets
                        ? ` (${state.unreadableSheets} unreadable)`
                        : "") +
                    (state.desktopUtilitySample.length
                        ? ` — e.g. ${state.desktopUtilitySample
                              .map((r) => `${r.selector} @ ${r.media ?? "(no media)"}`)
                              .join(", ")}`
                        : ""),
            },
        ];
        record = {
            seed: seed.id,
            class: seed.class,
            url: target,
            httpStatus: response ? response.status() : null,
            assertions,
            pass: assertions.every((a) => a.pass),
            pageErrors,
            consoleErrors,
            failedRequests,
        };
    } catch (err) {
        record = {
            seed: seed.id,
            class: seed.class,
            url: origin + "/" + seed.hash,
            httpStatus: null,
            assertions: [],
            pass: false,
            harnessError: String(err?.stack ?? err),
            pageErrors,
            consoleErrors,
            failedRequests,
        };
    } finally {
        await context.close().catch(() => {});
    }
    return record;
}

/* ──────────────────────── the R42 artifact census ───────────────────────── */

/**
 * The emitted-asset census of the build just probed. Free: the build already
 * ran for G-13. Records the modulepreload set because an entry chunk that
 * preloads nothing is the exact signature NV-7 left behind (`c4af0ef9`).
 */
function censusGhPages(root) {
    const assetsDir = path.join(root, "assets");
    const assets = fs.existsSync(assetsDir) ? fs.readdirSync(assetsDir).sort() : [];
    const byExt = {};
    for (const name of assets) {
        const ext = path.extname(name) || "(none)";
        byExt[ext] = (byExt[ext] ?? 0) + 1;
    }
    const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
    const entry = html.match(/<script type="module"[^>]*src="([^"]+)"/)?.[1] ?? null;
    const modulepreload = [
        ...html.matchAll(/<link rel="modulepreload"[^>]*href="([^"]+)"/g),
    ].map((m) => m[1]);
    const stylesheets = [
        ...html.matchAll(/<link rel="stylesheet"[^>]*href="([^"]+)"/g),
    ].map((m) => m[1]);
    const entryBytes =
        entry && fs.existsSync(path.join(root, entry))
            ? fs.statSync(path.join(root, entry)).size
            : null;
    const katex = assets.filter((a) => /katex/i.test(a));
    return {
        root,
        topLevel: fs.readdirSync(root).sort(),
        assetCount: assets.length,
        byExtension: byExt,
        entry,
        entryBytes,
        modulepreload,
        stylesheets,
        katexAssetCount: katex.length,
        vendorKatexChunks: katex.filter((a) => /^vendor-katex/.test(a)),
        vendorKatexInModulepreload: modulepreload.some((h) => /vendor-katex/.test(h)),
    };
}

/* ─────────────────────── the served build (§0ha.2) ──────────────────────── */

/**
 * The same-origin references in an `index.html`: its build fingerprint. The
 * rule is `deploy-age-served.mjs`'s `fingerprint` (G-21), so this set compares
 * one-to-one with the `built fingerprint` that deploy logs: the asset names
 * are content hashed, so the set names the build.
 */
function fingerprintIndex(html) {
    const refs = new Set();
    for (const m of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
        const ref = m[1];
        if (/^[a-z][a-z0-9+.-]*:|^\/\/|^#/i.test(ref)) continue; // absolute, protocol-relative, fragment
        refs.add(ref);
    }
    return [...refs].sort();
}

/**
 * Read the build a production origin SERVES: its `index.html` fingerprint and
 * the deployed API's `/health` commit. Fail-closed — an origin that serves no
 * fingerprint, or an API that does not name its commit, measured nothing.
 */
async function readServedBuild(origin) {
    const { apiHealth } = PRODUCTION_ORIGINS.get(new URL(origin).hostname);
    const indexUrl = origin + "/";
    const indexRes = await fetch(indexUrl, {
        cache: "no-store",
        headers: { "cache-control": "no-cache" },
    });
    if (!indexRes.ok)
        throw new Error(`served build: ${indexUrl} → HTTP ${indexRes.status}`);
    const html = await indexRes.text();
    const fingerprint = fingerprintIndex(html);
    if (fingerprint.length === 0) {
        throw new Error(
            `served build: ${indexUrl} carries no same-origin asset reference`,
        );
    }
    const healthRes = await fetch(apiHealth, { cache: "no-store" });
    if (!healthRes.ok)
        throw new Error(`served build: ${apiHealth} → HTTP ${healthRes.status}`);
    const health = await healthRes.json();
    if (typeof health.commit !== "string" || !health.commit) {
        throw new Error(`served build: ${apiHealth} names no commit`);
    }
    return {
        index: {
            url: indexUrl,
            status: indexRes.status,
            sha256: crypto.createHash("sha256").update(html).digest("hex"),
        },
        fingerprintCount: fingerprint.length,
        fingerprint,
        health: {
            url: apiHealth,
            status: healthRes.status,
            service: health.service ?? null,
            version: health.version ?? null,
            commit: health.commit,
        },
    };
}

/* ───────────────────────────────── main ─────────────────────────────────── */

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const timeoutMs = Number.isFinite(args.timeout)
        ? args.timeout
        : DEFAULT_CASE_TIMEOUT_MS;
    const seeds = args.seed ? SEEDS.filter((s) => s.id === args.seed) : SEEDS;
    if (seeds.length === 0) {
        throw new Error(
            `--seed=${args.seed} matches no case; known: ${SEEDS.map((s) => s.id).join(", ")}`,
        );
    }

    let origin = null;
    let stop = async () => {};
    let census = null;
    let form = "loopback";
    let servedBuild = null;

    if (args.origin) {
        ({ origin, form } = assertBareOrigin(args.origin));
        if (form === "production" && args.mode !== "prod-preview") {
            throw new Error(
                `ORIGIN-FORM: ${origin} is a deployed build — probe it with --mode=prod-preview`,
            );
        }
        await waitForServer(origin, Date.now() + 30_000);
        if (form === "production") {
            // The local dist/gh-pages is not what production serves; the
            // served bytes are read instead.
            servedBuild = await readServedBuild(origin);
        } else if (args.mode === "prod-preview" && fs.existsSync(GH_PAGES_DIR)) {
            census = censusGhPages(GH_PAGES_DIR);
        }
    } else if (args.mode === "dev") {
        const dev = await startDevServer();
        origin = assertBareOrigin(dev.origin).origin;
        stop = dev.stop;
    } else {
        if (args.build) await buildGhPages();
        const served = await serveStatic(GH_PAGES_DIR);
        origin = assertBareOrigin(served.origin).origin;
        stop = async () => await new Promise((r) => served.server.close(r));
        census = censusGhPages(GH_PAGES_DIR);
    }

    console.log(
        `[boot-smoke] mode=${args.mode} origin=${origin} seeds=${seeds.length}`,
    );
    if (servedBuild) {
        console.log(
            `[boot-smoke] served build (§0ha.2): ${servedBuild.fingerprintCount} same-origin ` +
                `refs · index.html sha256 ${servedBuild.index.sha256.slice(0, 12)} · ` +
                `${servedBuild.health.url} commit ${servedBuild.health.commit}`,
        );
    }
    if (census) {
        console.log(
            `[boot-smoke] artifact census (R42): ${census.assetCount} assets · entry ` +
                `${census.entry} (${census.entryBytes} B) · ${census.modulepreload.length} ` +
                `modulepreload · vendor-katex chunks ${census.vendorKatexChunks.length} ` +
                `(in modulepreload set: ${census.vendorKatexInModulepreload})`,
        );
    }

    // The launch sits INSIDE the try: a launch that throws must still stop the
    // server it would otherwise leave holding this process open.
    let browser = null;
    const cases = [];
    try {
        browser = await chromium.launch({ headless: true });
        for (const seed of seeds) {
            const record = await probeSeed(browser, origin, seed, timeoutMs);
            cases.push(record);
            const verdict = record.pass ? "PASS" : "FAIL";
            console.log(`\n[boot-smoke] ${verdict} · ${record.seed} · ${record.url}`);
            console.log(`             ${record.class}`);
            if (record.harnessError)
                console.log(`             HARNESS: ${record.harnessError}`);
            for (const a of record.assertions) {
                console.log(
                    `             ${a.pass ? "ok  " : "FAIL"} ${a.id} ${a.name}`,
                );
                console.log(`                  ${a.reading}`);
            }
            // A boot that dies inside a Vue setup never reaches `pageerror` —
            // Vue reports it through console.error. A3 stays exactly as the
            // spec words it; the console is printed beside a failing case so
            // the receipt carries the cause and not only the symptom.
            if (!record.pass && record.consoleErrors.length) {
                console.log(
                    `             console.error (${record.consoleErrors.length}):`,
                );
                for (const line of record.consoleErrors.slice(0, 6)) {
                    console.log(
                        `                  • ${line.split("\n")[0].slice(0, 220)}`,
                    );
                }
            }
        }
    } finally {
        await browser?.close().catch(() => {});
        await stop();
    }

    const failed = cases.filter((c) => !c.pass);
    const report = {
        tool: "scripts/ci/boot-smoke.mjs",
        mode: args.mode,
        origin,
        form,
        ranAt: new Date().toISOString(),
        node: process.version,
        seedCount: seeds.length,
        passCount: cases.length - failed.length,
        failCount: failed.length,
        census,
        servedBuild,
        cases,
    };
    if (args.json) {
        fs.mkdirSync(path.dirname(path.resolve(args.json)), { recursive: true });
        fs.writeFileSync(
            path.resolve(args.json),
            JSON.stringify(report, null, 2) + "\n",
        );
        console.log(`\n[boot-smoke] report → ${args.json}`);
    }

    console.log(
        `\n[boot-smoke] ${args.mode}: ${report.passCount}/${cases.length} seed cases passed`,
    );
    if (failed.length) {
        console.error(
            `[boot-smoke] FAIL — ${failed.length} case(s): ${failed.map((c) => c.seed).join(", ")}`,
        );
        process.exitCode = 1;
    }
}

main().catch((err) => {
    console.error(`[boot-smoke] FAIL — ${err?.stack ?? err}`);
    process.exitCode = 1;
});
