// SERVED MODEL: claude-opus-5[1m]
import { test, expect } from "@playwright/test";
import type { Browser } from "@playwright/test";
import { mainPane } from "../fixtures/dock";
import { execFileSync, execSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { detectRenderer, isSoftwareGL, percentile } from "./frame-budget";

/**
 * X-W2 (Track A · X·V) — THE EAGER-PAYLOAD GATE (W2.md §5 X.W2.c; §6 G2/G3/G4).
 *
 * The four-close Q14 chronic ends when the boot cost becomes *a measured number
 * with a named environment* that one agent can re-run at one bench. This file is
 * that command. Two legs:
 *
 *   1 · BYTES (G2) — `node scripts/perf/eager-bytes.mjs` over the BUILT
 *       `dist/gh-pages`: the `<script type=module>` entry + every
 *       `rel=modulepreload` href + every render-blocking stylesheet, each
 *       gzipped FROM DISK. Asserted: `eagerJsGz <= 286720` (280 KiB).
 *   2 · CORE WEB VITALS (G3 · G4) — N ≥ 20 COLD-CACHE loads of `#/` per config,
 *       against the built bundle on :8091. Asserted: p75 TBT ≤ 300 ms and
 *       p75 LCP ≤ 2500 ms, per config, on ONE pinned runner class.
 *
 * ── THE ORIGIN IS THE BUILT BUNDLE, AND THAT IS STRUCTURAL (W2.md §ENV /
 *    MT-F011: *"No dev-server number may appear anywhere in this wave"*). The
 *    `smoke-perf` project's baseURL is `serve-built.mjs` on :8091; both legs
 *    call `builtOrigin()`, which FAILS the test rather than measure a dev
 *    server. The 38,454 ms cold-boot figure in the record is Vite cold
 *    dependency optimisation on the dev server and is not a Q14 number.
 *
 * ── THE BAR IS FIXED AT WAVE-OPEN. 286,720 B / 300 ms / 2500 ms are W2.md §6's
 *    bytes. §11 guardrail 1: re-baselining is a §3a triumvirate trigger and is
 *    NOT available to an implementing seat — it is S.W3's exact failure mode
 *    (measured 347.9 KiB against ≤ 280 KiB, then moved the bar). There is no
 *    `escalate` arm and no `test.fail()`: these legs pass, or the wave closes
 *    `complete_with_misses` carrying the measured number.
 *
 * ── BORN-RED ON PURPOSE at the wave's open. The pre-cure baseline is banked in
 *    `docs/tranches/X/evidence/W2/BEFORE.json` (2026-09-17, the pin string it
 *    carries) — read the figures THERE, never from this comment. Its verdicts:
 *    **G2 RED** (the eager JS gzip total stands above the 280 KiB bar), **G3 RED
 *    on `mobile-4x-cpu` and GREEN on `desktop-unthrottled`**, **G4 GREEN on
 *    both**. The cure is X.W2.a's import repoint (`@mkbabb/glass-ui/blob` →
 *    `./blob-config`), never an edit to this file.
 *
 * ── WHICH TBT WINDOW, AND WHY IT IS NOT THE TEXTBOOK ONE. Lighthouse defines
 *    Total Blocking Time over [FCP, TTI]. Measured over N=20 at this wave's
 *    open, that window reads **0 ms on BOTH configs** — and the reason is a
 *    property of the product, not of the harness: nothing paints until Vue
 *    mounts, so `FCP === LCP`, and the boot's single blocking task has already
 *    ENDED by first paint. The strict window is therefore structurally blind to
 *    exactly the cost this wave exists to cut, and a gate that cannot see its
 *    own defect is not a gate (L-19).
 *
 *    So the GATED figure is blocking time over the WHOLE load,
 *    [navigationStart, observationEnd] — the window that can see the payload —
 *    and the strict-window figure is reported beside it every run as
 *    `p75TbtLighthouseWindow`. The choice is made on VISIBILITY, not on verdict,
 *    and it cost this seat the reproduction it would have preferred: it turns
 *    the desktop leg GREEN, and both legs land BELOW the §6 G3 N=5 pilot
 *    (359 ms desktop / 734 ms mobile-4×). That divergence from the pilot is a
 *    recorded finding for unit d and the L-18 challenge passes — not a number
 *    this seat may reconcile by choosing a window.
 *
 * ── BYTES ARE READ FROM DISK, NEVER FROM THE WIRE. `serve-built.mjs` sends no
 *    `Content-Encoding` and has no latency, so `transferSize` against it reports
 *    uncompressed bytes. `transferBytes`/`resources` below are DIAGNOSTIC ONLY
 *    (they reproduce the §6 G3 pilot table's columns); no gate reads them.
 *
 * ── RENDERER. Headless Chromium here is ANGLE-SwiftShader (the suite-wide
 *    headless-stability pin, `playwright.config.ts`). That is part of the
 *    recorded runner class, not a caveat hidden in prose.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = resolve(HERE, "../../..");
const INSTRUMENT = resolve(REPO_ROOT, "scripts/perf/eager-bytes.mjs");

/** W2.md §6 G2 · G3 · G4 — the bars, verbatim. Not editable by this seat. */
const EAGER_JS_GZ_MAX = 286720; // 280 KiB
const P75_TBT_MAX_MS = 300;
const P75_LCP_MAX_MS = 2500;

/**
 * N ≥ 20 cold loads per config (G3/G4). The env override may only RAISE N —
 * a gate whose sample size can be lowered from outside is not a gate.
 */
const N_LOADS = Math.max(20, Number(process.env.X_W2_CWV_N ?? 20));

/** Post-visible settle so the FINAL LCP candidate and the boot long tasks land. */
const SETTLE_MS = 3000;

/** The built-bundle origin's port (`playwright.config.ts`'s `E2E_PERF_PORT`). */
const PERF_PORT = Number(process.env.VJS_E2E_PERF_PORT ?? 8091);

interface CwvConfig {
    name: string;
    viewport: { width: number; height: number };
    /** CDP `Emulation.setCPUThrottlingRate`; 1 = unthrottled. */
    cpuThrottleRate: number;
}

/** The two configs of the §6 G3 pilot table, at its exact viewports and rate. */
const CONFIGS: CwvConfig[] = [
    {
        name: "desktop-unthrottled",
        viewport: { width: 1440, height: 900 },
        cpuThrottleRate: 1,
    },
    {
        name: "mobile-4x-cpu",
        viewport: { width: 390, height: 844 },
        cpuThrottleRate: 4,
    },
];

interface LoadSample {
    lcp: number;
    fcp: number;
    /** Blocking time over the WHOLE load, [0, observationEnd] — the GATED figure. */
    tbt: number;
    /** The same sum over Lighthouse's strict [FCP, TTI≈observationEnd] window — reported, not gated. */
    tbtLighthouseWindow: number;
    cls: number;
    longTasks: number;
    /** Every observed long task as `start+duration` (ms), for audit. */
    tasks: { start: number; dur: number }[];
    /** The TBT window's end (ms from navigation start) — see `tbtDefinition`. */
    windowEndMs: number;
    /** DIAGNOSTIC ONLY — the origin sends no Content-Encoding (§ENV). */
    transferBytes: number;
    resources: number;
}

/**
 * MT-F011, enforced rather than promised: the perf legs run against
 * `serve-built.mjs` (:8091) or they do not run at all.
 */
function builtOrigin(): string {
    const baseURL = test.info().project.use.baseURL;
    expect(
        baseURL,
        "MT-F011: the smoke-perf project must define a baseURL",
    ).toBeTruthy();
    const port = Number(new URL(baseURL as string).port);
    expect(
        port,
        `MT-F011: every X-W2 number comes from the BUILT bundle (serve-built.mjs :${PERF_PORT}); ` +
            `a dev-server origin (${baseURL}) is a wave-failing substitution, not a caveat`,
    ).toBe(PERF_PORT);
    return baseURL as string;
}

/**
 * The runner-class pin string — G3's admissible pin (ii): the bench recorded as
 * `sw_vers` + `machdep.cpu.brand_string` + node + Playwright versions. On pin
 * (i) (`ubuntu-24.04` via X-W1's restored job) the same fields are read from
 * `os`. **A receipt without a pin string fails the gate**, so this is computed,
 * never typed.
 */
function runnerPin(renderer: string, origin: string): string {
    const machine =
        process.platform === "darwin"
            ? [
                  `macOS ${execSync("sw_vers -productVersion", { encoding: "utf8" }).trim()} ` +
                      `(${execSync("sw_vers -buildVersion", { encoding: "utf8" }).trim()})`,
                  execSync("sysctl -n machdep.cpu.brand_string", {
                      encoding: "utf8",
                  }).trim(),
              ]
            : [`${os.type()} ${os.release()}`, os.cpus()[0]?.model ?? "unknown-cpu"];
    const pwVersion = JSON.parse(
        readFileSync(
            resolve(REPO_ROOT, "node_modules/@playwright/test/package.json"),
            "utf8",
        ),
    ).version as string;
    return [
        ...machine,
        `node ${process.version}`,
        `@playwright/test ${pwVersion}`,
        `Chromium headless (${isSoftwareGL(renderer) ? "SwiftShader" : renderer})`,
        `serve-built.mjs :${new URL(origin).port}`,
    ].join(" · ");
}

/** One genuinely cold visit: fresh context (no cache, no storage), then read. */
async function coldLoad(
    browser: Browser,
    origin: string,
    cfg: CwvConfig,
): Promise<LoadSample> {
    const context = await browser.newContext({
        baseURL: origin,
        viewport: cfg.viewport,
    });
    try {
        const page = await context.newPage();

        // Armed before any product script runs, so the first paint is observed.
        await page.addInitScript(() => {
            interface Probe {
                lcp: number[];
                longtasks: { start: number; dur: number }[];
                cls: number;
            }
            const probe: Probe = { lcp: [], longtasks: [], cls: 0 };
            (window as unknown as { __xw2: Probe }).__xw2 = probe;
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) probe.lcp.push(e.startTime);
            }).observe({ type: "largest-contentful-paint", buffered: true });
            new PerformanceObserver((list) => {
                for (const e of list.getEntries())
                    probe.longtasks.push({ start: e.startTime, dur: e.duration });
            }).observe({ type: "longtask", buffered: true });
            new PerformanceObserver((list) => {
                for (const e of list.getEntries()) {
                    const shift = e as PerformanceEntry & {
                        value: number;
                        hadRecentInput: boolean;
                    };
                    if (!shift.hadRecentInput) probe.cls += shift.value;
                }
            }).observe({ type: "layout-shift", buffered: true });
        });

        const cdp = await context.newCDPSession(page);
        await cdp.send("Network.enable");
        // COLD CACHE — the whole eager set is fetched on every measured load.
        await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
        if (cfg.cpuThrottleRate > 1) {
            await cdp.send("Emulation.setCPUThrottlingRate", {
                rate: cfg.cpuThrottleRate,
            });
        }

        await page.goto("/#/");
        await expect(
            mainPane(page),
            `${cfg.name}: the built bundle never reached a mounted main`,
        ).toBeVisible({ timeout: 30_000 });
        await page.waitForTimeout(SETTLE_MS);

        return await page.evaluate(() => {
            interface Probe {
                lcp: number[];
                longtasks: { start: number; dur: number }[];
                cls: number;
            }
            const probe = (window as unknown as { __xw2: Probe }).__xw2;
            // X-W1 · G-1 — `probe.lcp[last]` is `number | undefined` under the
            // repo's `noUncheckedIndexedAccess`, and `LoadSample.lcp` is a
            // plain `number`. `.at(-1)` with the SAME zero fallback the guard
            // already declares says the intent once.
            const lcp = probe.lcp.at(-1) ?? 0;
            const fcpEntry = performance.getEntriesByName("first-contentful-paint")[0];
            const fcp = fcpEntry ? fcpEntry.startTime : 0;
            // Lighthouse's `calculateSumOfBlockingTime`, applied to TWO windows:
            // each long task (duration ≥ 50 ms) is CLIPPED to the window and
            // contributes `clippedDuration − 50 ms`. `observationEnd` stands in
            // for Lighthouse's TTI, which this harness cannot derive without a
            // trace; it is recorded per sample as `windowEndMs` so the
            // substitution is auditable rather than implied.
            const observationEnd = performance.now();
            const THRESHOLD = 50;
            const blockingTime = (windowStart: number, windowEnd: number) => {
                let sum = 0;
                for (const t of probe.longtasks) {
                    if (t.dur < THRESHOLD) continue;
                    const end = t.start + t.dur;
                    if (end < windowStart || t.start > windowEnd) continue;
                    const clipped =
                        Math.min(end, windowEnd) - Math.max(t.start, windowStart);
                    if (clipped > THRESHOLD) sum += clipped - THRESHOLD;
                }
                return sum;
            };
            // BOTH windows are measured; `tbt` (the whole load) is the gated one.
            // See the file docstring's "WHICH TBT WINDOW" block for why.
            const tbt = blockingTime(0, observationEnd);
            const tbtLighthouseWindow = blockingTime(fcp, observationEnd);
            const resourceEntries = performance.getEntriesByType(
                "resource",
            ) as PerformanceResourceTiming[];
            const nav = performance.getEntriesByType("navigation")[0] as
                | PerformanceNavigationTiming
                | undefined;
            return {
                lcp,
                fcp,
                tbt,
                tbtLighthouseWindow,
                cls: probe.cls,
                longTasks: probe.longtasks.length,
                tasks: probe.longtasks,
                windowEndMs: observationEnd,
                transferBytes:
                    resourceEntries.reduce((acc, r) => acc + (r.transferSize || 0), 0) +
                    (nav?.transferSize ?? 0),
                resources: resourceEntries.length,
            };
        });
    } finally {
        await context.close();
    }
}

const kib = (bytes: number) => `${(bytes / 1024).toFixed(1)} KiB`;

test("X-W2 G2 — the eager module set's JS gzip budget, from the built artifact", () => {
    // The gate runs the instrument as its own command, so the number asserted
    // here is byte-identical to the one a reviewer gets from the shell.
    builtOrigin();
    const stdout = execFileSync(process.execPath, [INSTRUMENT], {
        cwd: REPO_ROOT,
        encoding: "utf8",
        maxBuffer: 16 * 1024 * 1024,
    });
    const record = JSON.parse(stdout);

    console.log(
        `[X-W2 G2] eager JS modules=${record.eagerJs.count} raw=${record.eagerJs.raw} ` +
            `gz=${record.eagerJs.gz} (${kib(record.eagerJs.gz)}) bar=${EAGER_JS_GZ_MAX} B ` +
            `→ ${record.budget.verdict}`,
    );
    for (const f of record.eagerJs.files) {
        console.log(
            `[X-W2 G2]   ${f.role.padEnd(14)} ./${f.path}  raw=${f.raw} gz=${f.gz}`,
        );
    }
    console.log(
        `[X-W2 G2] render-block CSS raw=${record.renderBlockingCss.raw} ` +
            `gz=${record.renderBlockingCss.gz} (${kib(record.renderBlockingCss.gz)}) — measured, NOT gated`,
    );
    console.log(
        `[X-W2 G2] TOTAL eager gz=${record.totals.eagerGz} (${kib(record.totals.eagerGz)})`,
    );

    // The set is non-empty and the entry module is in it — a gate that could go
    // green by measuring nothing is not a gate (L-19).
    expect(
        record.eagerJs.count,
        "no eager JS modules collected — the parse found nothing",
    ).toBeGreaterThan(0);
    expect(
        record.eagerJs.files.filter((f: { role: string }) => f.role === "entry-module")
            .length,
        "no `<script type=module>` entry in the eager set",
    ).toBeGreaterThan(0);

    // Finding F-3, wired as a falsifier: the async-swap stylesheet is linked
    // twice (once `media=print onload`, once inside `<noscript>`). If the
    // `<noscript>` strip ever regresses, the same file lands in BOTH buckets
    // and the CSS reading doubles (188,594 B gz against the true 88,177 B).
    const blocking = new Set(
        record.renderBlockingCss.files.map((f: { path: string }) => f.path),
    );
    const alsoExcluded = record.excludedCss.files
        .map((f: { path: string }) => f.path)
        .filter((p: string) => blocking.has(p));
    expect(
        alsoExcluded,
        "F-3: a stylesheet counted as BOTH render-blocking and async — the <noscript> strip regressed",
    ).toEqual([]);

    expect(
        record.eagerJs.gz,
        `eager JS gzip ${record.eagerJs.gz} B (${kib(record.eagerJs.gz)}) exceeds the ${EAGER_JS_GZ_MAX} B ` +
            `(280 KiB) bar. The bar is FIXED at wave-open (W2.md §11 guardrail 1) — the cure is to take ` +
            `bytes OUT of the eager graph (X.W2.a's ./blob-config repoint), never to move the bar.`,
    ).toBeLessThanOrEqual(EAGER_JS_GZ_MAX);
});

test("X-W2 G3/G4 — p75 TBT and p75 LCP over N≥20 cold loads, both configs", async ({
    browser,
}) => {
    // N≥20 cold loads × 2 configs, each a fresh context on a software rasteriser
    // under a ×4 CPU throttle on one leg: minutes, by construction.
    test.setTimeout(20 * 60 * 1000);

    const origin = builtOrigin();

    // Renderer read once, on its own context, for the pin string.
    const probeCtx = await browser.newContext({ baseURL: origin });
    const probePage = await probeCtx.newPage();
    await probePage.goto("/#/");
    const renderer = await detectRenderer(probePage);
    await probeCtx.close();

    const pin = runnerPin(renderer, origin);
    console.log(`[X-W2 CWV] pin: ${pin}`);
    console.log(`[X-W2 CWV] renderer(raw): ${renderer}`);
    console.log(
        `[X-W2 CWV] origin=${origin} route=#/ N=${N_LOADS} settle=${SETTLE_MS}ms cold-cache=CDP Network.setCacheDisabled`,
    );

    const configs: Record<string, unknown> = {};
    for (const cfg of CONFIGS) {
        // One DISCARDED warm-up load per config, then the N measured ones. The
        // first context in a process pays SwiftShader's one-time shader-compile
        // and process-start cost — a harness artifact no visitor pays (the
        // o24-lcp-identity precedent, same reason). It is measured and REPORTED
        // below as `warmup`, never deleted from the record.
        const warmup = await coldLoad(browser, origin, cfg);
        console.log(
            `[X-W2 CWV ${cfg.name}] warmup (DISCARDED from p75): lcp=${warmup.lcp.toFixed(0)}ms ` +
                `tbt=${warmup.tbt.toFixed(0)}ms fcp=${warmup.fcp.toFixed(0)}ms longTasks=${warmup.longTasks}`,
        );

        const samples: LoadSample[] = [];
        for (let i = 0; i < N_LOADS; i++) {
            samples.push(await coldLoad(browser, origin, cfg));
        }

        const col = (
            key:
                | "lcp"
                | "fcp"
                | "tbt"
                | "tbtLighthouseWindow"
                | "cls"
                | "longTasks"
                | "transferBytes"
                | "resources",
        ) => samples.map((s) => s[key]);
        const p75Lcp = percentile(col("lcp"), 75);
        const p75Tbt = percentile(col("tbt"), 75);
        const p75Fcp = percentile(col("fcp"), 75);
        const summary = {
            viewport: cfg.viewport,
            cpuThrottleRate: cfg.cpuThrottleRate,
            n: samples.length,
            warmupLoadsDiscarded: 1,
            warmup,
            p75Lcp,
            p75Tbt,
            p75Fcp,
            /** Reported, NOT gated — see the docstring's "WHICH TBT WINDOW" block. */
            p75TbtLighthouseWindow: percentile(col("tbtLighthouseWindow"), 75),
            medianLcp: percentile(col("lcp"), 50),
            medianTbt: percentile(col("tbt"), 50),
            maxTbt: Math.max(...col("tbt")),
            p75LongestTaskMs: percentile(
                samples.map((s) => Math.max(0, ...s.tasks.map((t) => t.dur))),
                75,
            ),
            p75Cls: percentile(col("cls"), 75),
            medianLongTasks: percentile(col("longTasks"), 50),
            // DIAGNOSTIC ONLY — §ENV: this origin sends no Content-Encoding.
            medianTransferBytesUncompressed: percentile(col("transferBytes"), 50),
            medianResources: percentile(col("resources"), 50),
            gates: {
                "G3 p75 TBT ≤ 300 ms": {
                    measured: p75Tbt,
                    window: "[navigationStart, observationEnd] — the gated window",
                    bar: P75_TBT_MAX_MS,
                    verdict: p75Tbt <= P75_TBT_MAX_MS ? "GREEN" : "RED",
                    lighthouseWindowReading: percentile(col("tbtLighthouseWindow"), 75),
                    lighthouseWindowNote:
                        "[FCP, TTI≈observationEnd]. Reads 0 because FCP===LCP on this product — the boot's " +
                        "blocking task ends before first paint, so the strict window cannot see it (L-19).",
                },
                "G4 p75 LCP ≤ 2500 ms": {
                    measured: p75Lcp,
                    bar: P75_LCP_MAX_MS,
                    verdict: p75Lcp <= P75_LCP_MAX_MS ? "GREEN" : "RED",
                },
            },
            samples,
        };
        configs[cfg.name] = summary;

        console.log(
            `[X-W2 CWV ${cfg.name}] N=${samples.length} p75 LCP=${p75Lcp.toFixed(0)}ms ` +
                `p75 TBT=${p75Tbt.toFixed(0)}ms p75 FCP=${p75Fcp.toFixed(0)}ms ` +
                `p75 TBT[FCP,end]=${summary.p75TbtLighthouseWindow.toFixed(0)}ms (reported, not gated) ` +
                `p75 CLS=${summary.p75Cls.toFixed(4)} median longTasks=${summary.medianLongTasks} ` +
                `p75 longest task=${summary.p75LongestTaskMs.toFixed(0)}ms max TBT=${summary.maxTbt.toFixed(0)}ms ` +
                `median transfer(uncompressed, diagnostic)=${summary.medianTransferBytesUncompressed} B ` +
                `resources=${summary.medianResources}`,
        );
    }

    const record = {
        schema: "x-w2.cwv/1",
        gate: "W2.md §6 G3 (p75 TBT ≤ 300 ms) · G4 (p75 LCP ≤ 2500 ms)",
        generatedAt: new Date().toISOString(),
        pin,
        rendererRaw: renderer,
        origin,
        originKind:
            "BUILT dist/gh-pages via e2e/smoke/perf/serve-built.mjs (MT-F011: never a dev server)",
        route: "#/",
        n: N_LOADS,
        settleMs: SETTLE_MS,
        coldCache: "CDP Network.setCacheDisabled + a fresh browser context per load",
        tbtDefinition:
            "Lighthouse calculateSumOfBlockingTime (every long task ≥ 50 ms, CLIPPED to the window, contributes " +
            "clippedDuration − 50 ms), evaluated over TWO windows. GATED: [navigationStart, observationEnd]. " +
            "REPORTED BESIDE IT: Lighthouse's strict [FCP, TTI≈observationEnd], which reads 0 on this product " +
            "because FCP===LCP — nothing paints until Vue mounts, so the boot's blocking task ends before first " +
            "paint and the strict window is structurally blind to the cost this wave cuts (L-19). observationEnd " +
            "(per-sample `windowEndMs`) stands in for TTI, which this harness cannot derive without a trace.",
        configs,
    };
    console.log(`[X-W2 CWV] record\n${JSON.stringify(record, null, 2)}`);

    // Mechanical hand-off for the BEFORE/AFTER pair: the receipt is written by
    // the same run that measured it, never transcribed.
    const outPath = process.env.X_W2_CWV_OUT;
    if (outPath) {
        const abs = resolve(REPO_ROOT, outPath);
        mkdirSync(dirname(abs), { recursive: true });
        writeFileSync(abs, `${JSON.stringify(record, null, 2)}\n`);
        console.log(`[X-W2 CWV] wrote ${abs}`);
    }

    // `expect.soft` so ONE run records all four verdicts instead of aborting at
    // the first. It softens nothing: any failure below fails this test.
    for (const cfg of CONFIGS) {
        const s = configs[cfg.name] as { p75Tbt: number; p75Lcp: number };
        expect
            .soft(
                s.p75Tbt,
                `G3 ${cfg.name}: p75 TBT ${s.p75Tbt.toFixed(0)}ms over N=${N_LOADS} (window [navigationStart, ` +
                    `observationEnd]) exceeds ${P75_TBT_MAX_MS}ms on pin [${pin}]. ` +
                    `The bar is lighthouserc.json's total-blocking-time error bar, fixed at ` +
                    `wave-open; a still-red TBT after the payload cut is a §3a triumvirate trigger, not a re-baseline.`,
            )
            .toBeLessThanOrEqual(P75_TBT_MAX_MS);
        expect
            .soft(
                s.p75Lcp,
                `G4 ${cfg.name}: p75 LCP ${s.p75Lcp.toFixed(0)}ms over N=${N_LOADS} exceeds ${P75_LCP_MAX_MS}ms ` +
                    `on pin [${pin}].`,
            )
            .toBeLessThanOrEqual(P75_LCP_MAX_MS);
    }
});
