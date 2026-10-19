// SERVED MODEL: claude-fable-5-1
//
// X.W5.t — the OUT-IN CO-MOUNT RE-PROBE (fold X-W5-FOLD.md:41, W5F-04's
// GATING LOCK: "no wave may delete PaneSlot.vue:12-23 before [the out-in
// re-probe] runs — script + RESULTS committed against `demo/shell/PaneSlot.vue`
// itself, real `--duration-fast` leave + `defineAsyncComponent` panes + the
// rAF mirror").
//
// THE CLAIM UNDER TEST (PaneSlot.vue:35-46, the R.W3 record): under `vite`
// DEV, Vue 3.5's `mode="out-in"` strands the slot on a comment placeholder
// once the outgoing pane's leave completes — the incoming ASYNC pane is never
// mounted — while the production build schedules the handoff correctly. The
// default (simultaneous) mode was kept because of that record, and fold
// W5F-04 measured its cost: two in-flow panes in one ordinary box for the
// whole overlap (the co-mount geometry).
//
// THE INSTRUMENT. Four arms, every one of them the REAL app at HEAD — the real
// `PaneSlot.vue` bytes (its rAF mirror, `watch(componentKey)` → one-frame
// deferred commit), the real `defineAsyncComponent` panes (`usePaneRouter.ts`
// :187-204), the real `--duration-fast` leave and `--spring-snappy` enter
// (`animations.css`), read back from the live computed style:
//   · built/default   — `vite build --mode gh-pages` at HEAD, served statically
//   · built/out-in    — the same build with ONE byte-change applied at BUILD
//                       time by a `load` hook (`mode="out-in"` on PaneSlot's
//                       `<Transition>`); no file under `demo/` is written
//   · dev/default     — `vite` dev server at HEAD
//   · dev/out-in      — the dev server with the same load-hook injection
// The injection is a temp Vite config in the OS temp dir that wraps the
// repo's `vite.config.ts`; the needle is asserted to match exactly once, so a
// drifted PaneSlot template fails loudly instead of silently probing default
// mode twice.
//
// PER HOP (from a settled `/#/`: →/gradient →/mix →/extract →/generate →/ , the
// D1 hops plus the back hop, at D1's 1440×900 light DPR 2): a rAF sampler
// records, every frame, each region wrapper's ELEMENT child count and offset
// height, the `.pane-container` height and the document scrollHeight, and
// the leave/enter `*-active` presence with the leave's computed transition
// duration. After the settle window the slot's END STATE is read: the stage
// and inspector wrappers' element children (0 = stranded on the comment
// placeholder — the R.W3 defect), the mounted pane's root class and the
// route H1. A second read follows a long grace so a slow chunk is never
// misfiled as a strand.
//
// Usage:  node docs/tranches/V/megatranche/workflows/gates/out-in-reprobe.mjs
//   REPROBE_SKIP_DEV=1     skip the two dev-server arms
//   REPROBE_SKIP_BUILT=1   skip the two built arms
//   REPROBE_DIST_DEFAULT=<dir>  REPROBE_DIST_OUTIN=<dir>  reuse prior builds
// Output: one JSON document on stdout (the RESULTS file), exit 0 when every
// requested arm completed its hops — this is a research probe, and its
// verdict fields (`stranded`, `coMount`) ARE the result, not a pass/fail.

import { chromium } from "playwright-core";
import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { createServer as createNet } from "node:net";
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, "../../../../../..");
const PANESLOT = path.join(REPO, "demo/shell/PaneSlot.vue");
const NEEDLE = '<Transition\n        :name="transitionName"';
const HOPS = ["/gradient", "/mix", "/extract", "/generate", "/"];
const SETTLE_MS = { built: 1800, dev: 4000 };
const GRACE_MS = 3000;
const SKIP_DEV = process.env.REPROBE_SKIP_DEV === "1";
const SKIP_BUILT = process.env.REPROBE_SKIP_BUILT === "1";
// The LATENCY arms: the same built bundles behind an emulated network round
// trip (CDP Network.emulateNetworkConditions), so a chunk that resolves AFTER
// the 200 ms leave has ended is measured on the production bytes too — the
// R.W3 record called the strand "dev-only"; dev is merely where a chunk is
// slow, so the claim is tested where it would bite a user on a slow link.
const LATENCY_MS = Number(process.env.REPROBE_LATENCY_MS ?? 1000);

// ── PART 2: the injection config + builders/servers ─────────────────────────

/** The temp Vite config: wraps the repo config; W5T_MODE=out-in injects. */
function writeInjectConfig(dir) {
    const cfg = path.join(dir, "vite.w5t.config.mjs");
    writeFileSync(
        cfg,
        `import { readFileSync } from "node:fs";
import base from ${JSON.stringify(path.join(REPO, "vite.config.ts"))};
const TARGET = ${JSON.stringify(PANESLOT)};
const NEEDLE = ${JSON.stringify(NEEDLE)};
const inject = {
    name: "w5t-out-in-inject",
    enforce: "pre",
    load(id) {
        if (id.includes("?") || id !== TARGET) return null;
        const code = readFileSync(id, "utf8");
        const n = code.split(NEEDLE).length - 1;
        if (n !== 1) throw new Error("PaneSlot.vue needle count " + n + " !== 1");
        return { code: code.replace(NEEDLE, '<Transition\\n        mode="out-in"\\n        :name="transitionName"'), map: null };
    },
};
export default (env) => {
    const c = typeof base === "function" ? base(env) : base;
    const plugins = process.env.W5T_MODE === "out-in" ? [inject, ...(c.plugins ?? [])] : c.plugins;
    return { ...c, plugins };
};
`,
    );
    return cfg;
}

const VITE_BIN = path.join(REPO, "node_modules/vite/bin/vite.js");

function run(args, env) {
    return new Promise((resolve, reject) => {
        const p = spawn(process.execPath, [VITE_BIN, ...args], {
            cwd: REPO,
            env: { ...process.env, ...env },
            stdio: ["ignore", "pipe", "pipe"],
        });
        let out = "";
        p.stdout.on("data", (d) => (out += d));
        p.stderr.on("data", (d) => (out += d));
        p.on("exit", (code) => (code === 0 ? resolve(out) : reject(new Error(`vite ${args[0]} exit ${code}\n${out.slice(-1500)}`))));
    });
}

async function build(cfg, mode, outDir) {
    const t0 = Date.now();
    const log = await run(["build", "--config", cfg, "--mode", "gh-pages", "--outDir", outDir], { W5T_MODE: mode });
    const injected = /w5t|out-in/.test(log) || mode !== "out-in";
    if (mode === "out-in" && !existsSync(outDir)) throw new Error("out-in build produced nothing");
    return { outDir, ms: Date.now() - t0, injected };
}

function freePort() {
    return new Promise((resolve) => {
        const s = createNet();
        s.listen(0, "127.0.0.1", () => {
            const { port } = s.address();
            s.close(() => resolve(port));
        });
    });
}

const MIME = { ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".html": "text/html", ".json": "application/json", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".ico": "image/x-icon" };

/** A zero-dependency static server for a built dist (serve-built.mjs's shape). */
async function serveStatic(dist) {
    const port = await freePort();
    const server = createServer((req, res) => {
        let p = decodeURIComponent((req.url ?? "/").split("?")[0]);
        const cand = path.join(dist, p);
        if (p === "/" || !cand.startsWith(dist) || !existsSync(cand) || statSync(cand).isDirectory()) p = "/index.html";
        const fp = path.join(dist, p);
        if (!existsSync(fp)) { res.writeHead(404); res.end(); return; }
        res.writeHead(200, { "content-type": MIME[path.extname(fp)] ?? "application/octet-stream" });
        res.end(readFileSync(fp));
    });
    await new Promise((r) => server.listen(port, "127.0.0.1", r));
    return { base: `http://127.0.0.1:${port}`, close: () => server.close() };
}

async function waitHttp(base, ms) {
    const t0 = Date.now();
    while (Date.now() - t0 < ms) {
        try { const r = await fetch(base + "/"); if (r.ok) return; } catch { /* not up yet */ }
        await new Promise((r) => setTimeout(r, 250));
    }
    throw new Error(`server at ${base} not up after ${ms} ms`);
}

/** A vite dev server as a child; W5T_MODE selects the injection. */
async function serveDev(cfg, mode) {
    const port = await freePort();
    const child = spawn(process.execPath, [VITE_BIN, "--config", cfg, "--port", String(port), "--strictPort", "--host", "127.0.0.1"], {
        cwd: REPO,
        env: { ...process.env, W5T_MODE: mode },
        stdio: ["ignore", "pipe", "pipe"],
    });
    let log = "";
    child.stdout.on("data", (d) => (log += d));
    child.stderr.on("data", (d) => (log += d));
    const base = `http://127.0.0.1:${port}`;
    await waitHttp(base, 30000);
    return { base, close: () => child.kill("SIGTERM"), log: () => log };
}

// ── PART 3: the in-page instruments ─────────────────────────────────────────

/** Arm the per-frame sampler and the leave/enter observer in the page. */
function arm() {
    const w = window;
    w.__rec = true;
    w.__samples = [];
    w.__leave = null;
    w.__enter = null;
    const wrappers = () => [...document.querySelectorAll(".pane-wrapper")];
    const roleOf = (el) => [...el.classList].map((c) => /^pane-wrapper--(\w+)$/.exec(c)?.[1]).find(Boolean) ?? "?";
    const container = () => document.querySelector(".pane-container");
    let last = performance.now();
    const loop = () => {
        const n = performance.now();
        const s = { dt: Math.round((n - last) * 10) / 10, cont: container()?.offsetHeight ?? 0, doc: document.documentElement.scrollHeight, w: {} };
        last = n;
        for (const el of wrappers()) {
            const kids = [...el.children];
            s.w[roleOf(el)] = { n: kids.length, h: el.offsetHeight, leave: kids.filter((k) => k.classList.contains("vj-enter-leave-active")).length, enter: kids.filter((k) => k.classList.contains("vj-enter-enter-active")).length };
        }
        w.__samples.push(s);
        if (w.__rec) requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    const durMs = (cs, prop) => {
        const props = cs.transitionProperty.split(",").map((t) => t.trim());
        const durs = cs.transitionDuration.split(",").map((t) => (t.trim().endsWith("ms") ? parseFloat(t) : parseFloat(t) * 1000));
        let ms = 0;
        props.forEach((p, i) => { if (p === prop || p === "all") ms = Math.max(ms, durs[i % durs.length]); });
        return ms;
    };
    w.__mo?.disconnect();
    w.__mo = new MutationObserver((records) => {
        for (const r of records) {
            const el = r.target;
            if (!(el instanceof Element) || !el.parentElement?.classList.contains("pane-wrapper")) continue;
            if (el.classList.contains("vj-enter-leave-active") && !w.__leave) {
                const cs = getComputedStyle(el);
                w.__leave = { role: roleOf(el.parentElement), transformMs: durMs(cs, "transform"), opacityMs: durMs(cs, "opacity"), at: Math.round(performance.now()) };
            }
            if (el.classList.contains("vj-enter-enter-active") && !w.__enter) {
                const cs = getComputedStyle(el);
                w.__enter = { role: roleOf(el.parentElement), transformMs: durMs(cs, "transform"), at: Math.round(performance.now()) };
            }
        }
    });
    w.__mo.observe(document.body, { subtree: true, attributes: true, attributeFilter: ["class"] });
}

/** Read the sampler back and the slot's END STATE. */
function read() {
    const w = window;
    w.__rec = false;
    w.__mo?.disconnect();
    const S = w.__samples ?? [];
    const roles = [...new Set(S.flatMap((s) => Object.keys(s.w)))];
    const per = {};
    for (const r of roles) {
        const rows = S.map((s) => s.w[r]).filter(Boolean);
        per[r] = {
            maxChildren: Math.max(0, ...rows.map((x) => x.n)),
            framesWith2Plus: rows.filter((x) => x.n >= 2).length,
            framesWith0: rows.filter((x) => x.n === 0).length,
            maxH: Math.max(0, ...rows.map((x) => x.h)),
            settledH: rows.at(-1)?.h ?? 0,
            leaveFrames: rows.filter((x) => x.leave > 0).length,
            enterFrames: rows.filter((x) => x.enter > 0).length,
        };
    }
    const cont = S.map((s) => s.cont);
    const end = {};
    for (const el of document.querySelectorAll(".pane-wrapper")) {
        const role = [...el.classList].map((c) => /^pane-wrapper--(\w+)$/.exec(c)?.[1]).find(Boolean) ?? "?";
        const kids = [...el.children];
        end[role] = {
            label: el.getAttribute("aria-label"),
            children: kids.length,
            nodeTypes: [...el.childNodes].map((n) => n.nodeType),
            rootClass: kids[0]?.className?.toString().slice(0, 60) ?? null,
            direction: kids[0]?.getAttribute("data-scene-direction") ?? null,
        };
    }
    return {
        frames: S.length,
        containerMaxH: Math.max(0, ...cont),
        containerSettledH: cont.at(-1) ?? 0,
        docMaxH: Math.max(0, ...S.map((s) => s.doc)),
        docSettledH: S.at(-1)?.doc ?? 0,
        leave: w.__leave,
        enter: w.__enter,
        perRole: per,
        end,
        h1: document.querySelector("main h1")?.textContent?.trim() ?? null,
        href: location.hash,
    };
}

/** The strand check alone (the grace re-read). */
function readEnd() {
    const end = {};
    for (const el of document.querySelectorAll(".pane-wrapper")) {
        const role = [...el.classList].map((c) => /^pane-wrapper--(\w+)$/.exec(c)?.[1]).find(Boolean) ?? "?";
        end[role] = { children: el.children.length, rootClass: el.firstElementChild?.className?.toString().slice(0, 60) ?? null };
    }
    return end;
}

// ── PART 4: one arm, then main ──────────────────────────────────────────────

/** Walk the hops on one arm; the page's console errors ride the record. */
async function runArm(browser, name, kind, base, latencyMs = 0) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: "light", deviceScaleFactor: 2, reducedMotion: "no-preference" });
    await ctx.addInitScript(() => { try { localStorage.setItem("vueuse-color-scheme", "light"); } catch { /* storage unavailable */ } });
    const page = await ctx.newPage();
    if (latencyMs > 0) {
        const cdp = await ctx.newCDPSession(page);
        await cdp.send("Network.enable");
        await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: latencyMs, downloadThroughput: -1, uploadThroughput: -1 });
    }
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e.message).slice(0, 200)));
    page.on("console", (m) => { if (m.type() === "error") errors.push(m.text().slice(0, 200)); });
    await page.goto(`${base}/#/`, { waitUntil: "load" });
    await page.waitForTimeout((kind === "dev" ? 6000 : 2800) + latencyMs * 4);
    const tokens = await page.evaluate(() => {
        const cs = getComputedStyle(document.documentElement);
        const t = (n) => cs.getPropertyValue(n).trim();
        return { durationFast: t("--duration-fast"), springSnappyDuration: t("--spring-snappy-duration"), springSnappySettle: t("--spring-snappy-settle"), motionTempo: t("--motion-tempo") };
    });
    const modeSeen = await page.evaluate(() => ({ h1: document.querySelector("main h1")?.textContent?.trim() ?? null, wrappers: document.querySelectorAll(".pane-wrapper").length }));
    const hops = [];
    for (const hash of HOPS) {
        await page.evaluate(arm);
        await page.evaluate((h) => { location.hash = `#${h}`; }, hash);
        await page.waitForTimeout(SETTLE_MS[kind] + latencyMs * 2);
        const s = await page.evaluate(read);
        const strandedAtSettle = Object.values(s.end).some((e) => e.children === 0);
        let afterGrace = null;
        if (strandedAtSettle) {
            await page.waitForTimeout(GRACE_MS);
            afterGrace = await page.evaluate(readEnd);
        }
        const stranded = strandedAtSettle && Object.values(afterGrace ?? {}).some((e) => e.children === 0);
        const coMount = Object.values(s.perRole).some((r) => r.maxChildren >= 2);
        hops.push({ hop: `→${hash}`, ...s, strandedAtSettle, afterGrace, stranded, coMount });
        await page.waitForTimeout(400);
    }
    await ctx.close();
    return {
        arm: name,
        kind,
        base,
        latencyMs,
        tokens,
        boot: modeSeen,
        hops,
        stranded: hops.some((h) => h.stranded),
        strandedHops: hops.filter((h) => h.stranded).map((h) => h.hop),
        coMountHops: hops.filter((h) => h.coMount).map((h) => h.hop),
        maxContainerJump: Math.max(0, ...hops.map((h) => h.containerMaxH - h.containerSettledH)),
        errors,
    };
}

const started = new Date().toISOString();
const tmp = mkdtempSync(path.join(tmpdir(), "w5t-out-in-"));
const cfg = writeInjectConfig(tmp);
const paneSlotBytes = readFileSync(PANESLOT, "utf8");
if (paneSlotBytes.split(NEEDLE).length - 1 !== 1) throw new Error("PaneSlot.vue needle count !== 1 — the template drifted; re-anchor the probe");
const paneSlotHasMode = /<Transition[^>]*\bmode=/.test(paneSlotBytes);

const builds = {};
const arms = [];
const closers = [];
const browser = await chromium.launch({ headless: true });
try {
    if (!SKIP_BUILT) {
        const dDef = process.env.REPROBE_DIST_DEFAULT ?? path.join(tmp, "dist-default");
        const dOut = process.env.REPROBE_DIST_OUTIN ?? path.join(tmp, "dist-out-in");
        builds.default = process.env.REPROBE_DIST_DEFAULT ? { outDir: dDef, reused: true } : await build(cfg, "default", dDef);
        builds.outIn = process.env.REPROBE_DIST_OUTIN ? { outDir: dOut, reused: true } : await build(cfg, "out-in", dOut);
        for (const [name, dist] of [["built/default", dDef], ["built/out-in", dOut]]) {
            const srv = await serveStatic(dist);
            closers.push(srv.close);
            arms.push(await runArm(browser, name, "built", srv.base));
            if (LATENCY_MS > 0) arms.push(await runArm(browser, `${name}+latency${LATENCY_MS}`, "built", srv.base, LATENCY_MS));
        }
    }
    if (!SKIP_DEV) {
        for (const [name, mode] of [["dev/default", "default"], ["dev/out-in", "out-in"]]) {
            const srv = await serveDev(cfg, mode);
            closers.push(srv.close);
            arms.push(await runArm(browser, name, "dev", srv.base));
        }
    }
} finally {
    await browser.close();
    for (const c of closers) c();
}

const verdict = {};
for (const a of arms) verdict[a.arm] = { stranded: a.stranded, strandedHops: a.strandedHops, coMountHops: a.coMountHops.length, maxContainerJump: a.maxContainerJump, errors: a.errors.length };
console.log(JSON.stringify({ probe: "out-in-reprobe.mjs", servedModel: "claude-fable-5-1", unit: "X.W5.t", startedAt: started, finishedAt: new Date().toISOString(), target: "demo/shell/PaneSlot.vue", paneSlotHasModeAttrAtHead: paneSlotHasMode, hops: HOPS, settleMs: SETTLE_MS, builds, verdict, arms }, null, 2));
process.exit(0);
