// SERVED MODEL: claude-opus-5-5 · SS-8 B24 — sequential runner: imports each named probe module in turn
// (each launches ONE browser and closes it in its own finally before the next starts).
for (const f of process.argv.slice(2)) {
    console.log(`== ${f} ${new Date().toTimeString().slice(0, 8)}`);
    try { await import(new URL(f, import.meta.url)); } catch (e) { console.log(`== ${f} FAILED ${String(e).slice(0, 300)}`); }
}
