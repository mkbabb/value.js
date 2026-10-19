// SERVED MODEL: claude-opus-5-5
// X.W12U.q — read a Playwright trace.zip for the CAUSE of a failure (§0ev.2).
// usage: node trace-read.mjs <trace.zip> [...]
// Prints, per trace: every API action with its duration and error, the slowest
// network responses, the count of requests still unanswered at the end, and
// every console error / page error. One line per fact; no screenshots read.
import { execFileSync } from "node:child_process";

const lines = (zip, member) => {
    try {
        return execFileSync("unzip", ["-p", zip, member], { maxBuffer: 1 << 30 }).toString().split("\n").filter(Boolean);
    } catch {
        return [];
    }
};
for (const zip of process.argv.slice(2)) {
    const names = execFileSync("unzip", ["-Z1", zip]).toString().split("\n");
    const traces = names.filter((n) => /\.trace$/.test(n));
    const nets = names.filter((n) => /\.network$/.test(n));
    const ev = traces.flatMap((t) => lines(zip, t)).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    const net = nets.flatMap((t) => lines(zip, t)).map((l) => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);
    const before = new Map();
    const acts = [];
    let t0 = Infinity;
    for (const e of ev) {
        if (e.type === "before") { before.set(e.callId, e); t0 = Math.min(t0, e.startTime); }
        if (e.type === "after") {
            const b = before.get(e.callId);
            if (b) acts.push({ api: `${b.class ?? ""}.${b.method ?? b.apiName ?? ""}`, sel: b.params?.selector ?? b.params?.url ?? b.params?.expression?.slice(0, 40) ?? "", at: b.startTime - t0, dur: e.endTime - b.startTime, err: e.error?.message?.split("\n")[0] });
            before.delete(e.callId);
        }
    }
    const tEnd = Math.max(...ev.map((e) => e.endTime ?? e.startTime ?? e.time ?? 0)) - t0;
    console.log(`== ${zip.split("/").slice(-2, -1)[0]}  span=${(tEnd / 1000).toFixed(1)}s actions=${acts.length} pendingAtEnd=${before.size}`);
    for (const a of acts.filter((a) => a.dur > 1500 || a.err).slice(0, 14))
        console.log(`  +${(a.at / 1000).toFixed(1)}s ${a.api} ${String(a.sel).slice(0, 70)} dur=${(a.dur / 1000).toFixed(1)}s${a.err ? " ERR " + a.err.slice(0, 110) : ""}`);
    for (const b of [...before.values()].slice(0, 4))
        console.log(`  +${((b.startTime - t0) / 1000).toFixed(1)}s PENDING ${b.class}.${b.method} ${String(b.params?.selector ?? b.params?.url ?? "").slice(0, 70)}`);
    const reqs = net.filter((n) => n.type === "resource-snapshot").map((n) => n.snapshot);
    const slow = reqs.map((s) => ({ u: s.request.url.replace(/^https?:\/\/[^/]+/, "").slice(0, 70), ms: s.time, st: s.response.status })).sort((a, b) => b.ms - a.ms);
    const failed = reqs.filter((s) => s.response.status <= 0 || s.response.status >= 400);
    console.log(`  network: ${reqs.length} responses, ${failed.length} failed/none, sum=${(reqs.reduce((s, r) => s + Math.max(0, r.time), 0) / 1000).toFixed(1)}s; slowest: ${slow.slice(0, 3).map((s) => `${s.u} ${Math.round(s.ms)}ms`).join(" | ")}`);
    for (const f of failed.slice(0, 4)) console.log(`  net ${f.response.status} ${f.request.url.replace(/^https?:\/\/[^/]+/, "").slice(0, 90)}`);
    const errs = ev.filter((e) => (e.type === "console" && e.messageType === "error") || e.type === "pageError" || (e.type === "event" && e.method === "pageError"));
    console.log(`  console/page errors: ${errs.length}`);
    for (const e of errs.slice(0, 5)) console.log(`  err: ${String(e.text ?? e.params?.error?.error?.message ?? e.error?.message ?? JSON.stringify(e).slice(0, 120)).split("\n")[0].slice(0, 160)}`);
}
