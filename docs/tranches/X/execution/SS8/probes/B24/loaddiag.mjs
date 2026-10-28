// SERVED MODEL: claude-opus-5-5 · SS-8 B24 — why does `load` not fire on the static build at "/"? Log requests still pending at 20 s.
import { launch, save } from "./lib.mjs";
const b = await launch();
try {
    const ctx = await b.newContext({ viewport: { width: 1280, height: 720 } });
    try {
        const p = await ctx.newPage();
        const pending = new Map(); const done = [];
        p.on("request", (r) => pending.set(r, Date.now()));
        p.on("requestfinished", (r) => { pending.delete(r); });
        p.on("requestfailed", (r) => { done.push({ url: r.url().slice(0, 120), fail: r.failure()?.errorText }); pending.delete(r); });
        const t0 = Date.now(); let loadAt = null;
        p.on("load", () => { loadAt = Date.now() - t0; });
        await p.goto(`${process.env.B24_BASE}/`, { waitUntil: "commit" });
        await p.waitForTimeout(20000);
        const out = { loadAt, url: p.url(), pending: [...pending.keys()].map((r) => ({ url: r.url().slice(0, 140), type: r.resourceType() })), failed: done.slice(0, 20) };
        save("loaddiag.json", out); console.log(JSON.stringify(out).slice(0, 2500));
    } finally { await ctx.close(); }
} finally { await b.close(); }
