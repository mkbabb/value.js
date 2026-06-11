#!/usr/bin/env node
/**
 * boot-smoke.mjs — the inv-N-1 boot-truth gate.
 *
 * Boots the demo headless on a COLD vite dep-optimizer cache and asserts the
 * app actually mounts with a console clean of value.js-origin errors. This is
 * the structural defeat of the white-screen failure class N restored from: a
 * sibling glass-ui rename (e.g. the `glass-carousel` boot-fatal) types `any`
 * under the dts-less `file:` symlink and the WARM dep-optimizer cache renders a
 * stale graph — so vitest/lint/typecheck all stay green while the live demo
 * white-screens. This gate runs the real runtime path, cold, and fails loud.
 *
 * Why cold (`vite --force`): the abrogation ledger §4 names the warm
 * dep-optimizer cache as one of the three silencers. `--force` discards the
 * `.vite/deps` cache and re-optimizes from scratch, reproducing exactly the
 * "clean server" the audit found white-screens where the warm server renders.
 *
 * Why the dev server (not the gh-pages static build): the dev server IS the
 * path that broke — it carries the dep-optimizer, the runtime glass-ui import
 * graph, and the HMR client. A static build sidesteps the optimizer entirely,
 * so it cannot exercise the silencer this gate exists to defeat.
 *
 * Mount assertion: the demo mounts Vue at `#app` (demo/color-picker/index.html)
 * and the pane shell renders the `role="main"` landmark ("Color tool panes").
 * A white-screen leaves `#app` empty and the landmark absent — both are
 * asserted. Console errors are filtered through the SAME env-noise policy the
 * e2e suite uses (e2e/smoke/fixtures/env-noise.ts): live-API 4xx/5xx are
 * network conditions, not code paths, and must not flake a boot gate. The
 * filter stays NARROW — any other console.error or pageerror fails the gate.
 *
 * Exit codes: 0 = mounted + console-clean; non-zero = white-screen, mount
 * timeout, server-spawn failure, or a non-noise console/page error.
 *
 * Standalone by design (NOT a playwright spec): W1.D owns e2e/**; this gate is
 * a plain node script wired as its own blocking CI job, so a boot break is
 * legible without the 5-project harness.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { chromium } from "playwright";

const PORT = Number(process.env.BOOT_SMOKE_PORT ?? 9123);
const HOST = "127.0.0.1";
const URL = `http://${HOST}:${PORT}/`;
const SERVER_READY_TIMEOUT_MS = 120_000;
const MOUNT_TIMEOUT_MS = 30_000;

// The env-noise policy, kept in lockstep with e2e/smoke/fixtures/env-noise.ts.
// Live-API 4xx/5xx + sub-resource load failures are network conditions, not
// value.js code paths. NARROW by intent: never a wildcard fetch/TypeError
// swallow, so a real regression still trips the gate.
const ENV_NOISE_REGEX =
    /\b(429|503|504)\b|Too Many Requests|Failed to load resource|blocked by CORS policy/i;
const isEnvNoise = (text) => ENV_NOISE_REGEX.test(text);

/** Poll the dev server's root until it answers 200, or time out. */
async function waitForServer(deadline) {
    while (Date.now() < deadline) {
        try {
            const res = await fetch(URL, { method: "GET" });
            if (res.ok) return;
        } catch {
            // not up yet
        }
        await sleep(500);
    }
    throw new Error(
        `dev server did not become ready at ${URL} within ${SERVER_READY_TIMEOUT_MS}ms`,
    );
}

async function main() {
    // 1 · spawn the dev server with a COLD dep-optimizer cache (--force).
    //     same-origin VITE_API_URL keeps the optional palette read off the live
    //     server so the gate is hermetic (mirrors the e2e webServer posture).
    const server = spawn(
        "npx",
        ["vite", "--force", "--host", HOST, "--port", String(PORT), "--strictPort"],
        {
            stdio: ["ignore", "inherit", "inherit"],
            env: { ...process.env, VITE_API_URL: URL },
        },
    );

    let serverExited = false;
    let tearingDown = false;
    server.on("exit", (code, signal) => {
        serverExited = true;
        // Only an UNEXPECTED early exit is noteworthy; the SIGTERM we send at
        // teardown lands here too (code 143) and must not look like a failure.
        if (!tearingDown && code && code !== 0)
            console.error(`[boot-smoke] vite exited early: code=${code} signal=${signal}`);
    });

    let browser;
    let failure = null;
    try {
        await waitForServer(Date.now() + SERVER_READY_TIMEOUT_MS);
        if (serverExited) throw new Error("dev server process exited before the smoke run");

        // 2 · drive it headless; capture every console.error + pageerror.
        const consoleErrors = [];
        browser = await chromium.launch({ headless: true });
        const page = await browser.newPage();
        page.on("console", (msg) => {
            if (msg.type() === "error" && !isEnvNoise(msg.text()))
                consoleErrors.push(msg.text());
        });
        page.on("pageerror", (err) => {
            if (!isEnvNoise(err.message)) consoleErrors.push(`pageerror: ${err.message}`);
        });

        await page.goto(URL, { waitUntil: "load", timeout: MOUNT_TIMEOUT_MS });

        // 3 · mount assertion — the pane shell's `role="main"` landmark proves
        //     Vue mounted into #app (a white-screen leaves it absent).
        await page
            .getByRole("main", { name: "Color tool panes" })
            .waitFor({ state: "visible", timeout: MOUNT_TIMEOUT_MS })
            .catch(() => {
                throw new Error(
                    'mount assertion failed: role="main" "Color tool panes" never rendered ' +
                        "(white-screen — the demo did not mount)",
                );
            });

        // Let any deferred mount-time errors flush before judging console-clean.
        await sleep(500);

        if (consoleErrors.length > 0) {
            throw new Error(
                `console NOT clean — ${consoleErrors.length} value.js-origin error(s):\n` +
                    consoleErrors.map((e) => `  • ${e}`).join("\n"),
            );
        }

        console.log("[boot-smoke] PASS — demo mounted, console clean (cold dep-optimizer cache).");
    } catch (err) {
        failure = err;
    } finally {
        tearingDown = true;
        if (browser) await browser.close().catch(() => {});
        if (!serverExited) {
            server.kill("SIGTERM");
            // give vite a beat to release the port; SIGKILL if it lingers
            await sleep(1000);
            if (!serverExited) server.kill("SIGKILL");
        }
    }

    if (failure) {
        console.error(`[boot-smoke] FAIL — ${failure.message}`);
        process.exitCode = 1;
    }
}

main().catch((err) => {
    console.error(`[boot-smoke] FAIL — ${err?.stack ?? err}`);
    process.exitCode = 1;
});
