import { spawn } from "node:child_process";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const worker = join(root, "correctness-worker.mjs");
const cases = join(root, "peer-comparable-cases.json");

function run(args, timeoutMs) {
    return new Promise((resolveRun, rejectRun) => {
        const child = spawn(process.execPath, ["--import", "tsx", worker, ...args], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
        let stdout = ""; let stderr = ""; let timedOut = false;
        child.stdout.on("data", (chunk) => { stdout += chunk; });
        child.stderr.on("data", (chunk) => { stderr += chunk; });
        const timer = setTimeout(() => { timedOut = true; child.kill("SIGKILL"); }, timeoutMs);
        child.once("error", rejectRun);
        child.once("close", (code, signal) => {
            clearTimeout(timer);
            resolveRun({ code, signal, timedOut, stdout, stderr });
        });
    });
}

const [command, argument] = process.argv.slice(2);
if (command === "--candidate") {
    const result = await run(["--candidate", resolve(argument), "consumeNumber", cases], 5000);
    if (result.timedOut || result.code !== 0) throw new Error(`candidate harness failed: ${JSON.stringify(result)}`);
    process.stdout.write(result.stdout);
} else if (command === "--self-test") {
    for (const peer of ["live_regex", "deposed", "c14"]) {
        const result = await run(["--peer", join(root, "peer-adapters.mjs"), peer, cases], 2000);
        if (result.timedOut || result.code !== 0) throw new Error(`${peer} smoke failed: ${JSON.stringify(result)}`);
    }
    const killed = await run(["--hang"], 50);
    if (!killed.timedOut || killed.signal !== "SIGKILL") throw new Error(`killability failed: ${JSON.stringify(killed)}`);
    process.stdout.write(`${JSON.stringify({ status: "PASS", peers: 3, cases_per_peer: 6, killability: "SIGKILL_AFTER_50MS" })}\n`);
} else throw new Error("usage: --self-test | --candidate <absolute-or-relative-source>");
