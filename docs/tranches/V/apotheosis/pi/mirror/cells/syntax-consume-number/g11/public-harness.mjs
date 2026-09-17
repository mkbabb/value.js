import { spawn } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const mirror = resolve(root, "../../..");
const worker = join(root, "public-worker.ts");
const corpusPath = join(root, "public-corpus.json");
const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
const loader = join(mirror, "node_modules/tsx/dist/loader.mjs");
const nodePath = join(mirror, "node_modules");

function run(args, timeoutMs) {
    return new Promise((resolveRun, rejectRun) => {
        const child = spawn(process.execPath, ["--import", loader, worker, ...args], {
            cwd: root,
            env: { ...process.env, NODE_PATH: nodePath },
            stdio: ["ignore", "pipe", "pipe"],
        });
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

async function suite(modulePath, exportName, expectPass = true) {
    const result = await run(["--suite", resolve(modulePath), exportName, corpusPath], 5000);
    const passed = !result.timedOut && result.code === 0;
    if (passed !== expectPass) throw new Error(`suite ${exportName} ${expectPass ? "failed" : "failed to reject"}: ${JSON.stringify(result)}`);
    return passed ? JSON.parse(result.stdout) : { status: "REJECTED_AS_REQUIRED", export: exportName, stderr: result.stderr.split("\n")[0] };
}

const median = (values) => values.slice().sort((a, b) => a - b)[Math.floor(values.length / 2)];
async function work(modulePath, exportName) {
    const reports = [];
    for (const construction of corpus.work.constructions) {
        const result = await run(["--work", resolve(modulePath), exportName, corpusPath, construction], corpus.work.subprocess_timeout_ms);
        if (result.timedOut || result.code !== 0) throw new Error(`work ${exportName}/${construction} failed: ${JSON.stringify(result)}`);
        const parsed = JSON.parse(result.stdout);
        const medians = corpus.work.sizes_utf16.map((size) => {
            const ns = parsed.samples.filter((sample) => sample.size === size).map((sample) => sample.ns);
            if (ns.length !== corpus.work.samples) throw new Error(`${construction}/${size}: sample count mismatch`);
            return Math.max(corpus.work.timing_floor_ms * 1e6, median(ns));
        });
        const adjacent = medians.slice(1).map((value, index) => value / medians[index]);
        const global = medians.at(-1) / medians[0];
        if (adjacent.some((ratio) => ratio > corpus.work.adjacent_ratio_ceiling) || global > corpus.work.global_ratio_ceiling) throw new Error(`${construction}: geometric work ratio exceeded ${JSON.stringify({ medians, adjacent, global })}`);
        reports.push({ construction, sizes: corpus.work.sizes_utf16, medians_ns: medians, adjacent_ratios: adjacent, global_ratio: global });
    }
    return reports;
}

async function prove(modulePath, exportName) {
    const correctness = await suite(modulePath, exportName, true);
    const workReport = await work(modulePath, exportName);
    return { correctness, work: workReport };
}

async function selfTest() {
    const negativeModule = join(root, "negative-controls.ts");
    const rejected = [];
    for (const name of ["positiveIntegerOnly", "historicalIncomplete", "noLeadingDotOrExponent"]) rejected.push(await suite(negativeModule, name, false));
    const probes = [];
    for (const [seat, name] of [["h", "probeH"], ["b", "probeB"], ["s", "probeS"], ["d", "probeD"]]) probes.push({ seat, ...(await prove(join(root, `probes/${seat}.ts`), name)) });
    const killed = await run(["--hang", negativeModule, "positiveIntegerOnly", corpusPath], 50);
    if (!killed.timedOut || killed.signal !== "SIGKILL") throw new Error(`killability failed: ${JSON.stringify(killed)}`);
    return { status: "PASS", negative_controls_rejected: rejected.length, topology_probes: probes.length, killability: "SIGKILL_AFTER_50MS" };
}

const [command, modulePath, exportName = "consumeNumber"] = process.argv.slice(2);
if (command === "--candidate") process.stdout.write(`${JSON.stringify({ status: "PASS", mode: "candidate", ...(await prove(modulePath, exportName)) }, null, 2)}\n`);
else if (command === "--self-test") process.stdout.write(`${JSON.stringify(await selfTest(), null, 2)}\n`);
else if (command === "--born-red") {
    for (const seat of ["h", "b", "s", "d"]) if (existsSync(join(root, `candidates/${seat}`))) throw new Error(`candidate root exists before admission: candidates/${seat}`);
    process.stdout.write(`${JSON.stringify({ ...(await selfTest()), status: "BORN_RED", candidates: 0 }, null, 2)}\n`);
} else throw new Error("usage: --born-red | --self-test | --candidate <module> [export]");
