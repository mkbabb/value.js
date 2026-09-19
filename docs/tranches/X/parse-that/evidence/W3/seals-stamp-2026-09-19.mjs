// SERVED MODEL: claude-opus-5[1m]
// X.P.W3.m — SCRATCH diagnostic: enumerate parseStylesheet's 206 misses and print the FULL
// remainder attribution, including every cell `remainderId` leaves "unattributed".
// Read-only against the candidate tree; lives in the session scratchpad, commits nowhere.
const TS = "/Users/mkbabb/Programming/parse-that-css-totality-p2/typescript";

const { readPin } = await import(`${TS}/test/css-totality/lib/pin.mjs`);
const { buildUnion } = await import(`${TS}/test/css-totality/lib/corpus.mjs`);
const { partition, frozenCodes, parseResultShape, deepEqual } = await import(
    `${TS}/test/css-totality/lib/matrix.mjs`
);
const { adjudicator, remainderId, ruledValue } = await import(
    `${TS}/test/css-totality/lib/adjudications.mjs`
);
const entry = await import(`${TS}/src/css/entry.mjs`);

const pin = await readPin("6aca8602");
const codes = frozenCodes(pin.typesText);
const union = buildUnion();
const rows = union.rows;

const call = (fn, s) => {
    try {
        return { threw: false, value: fn(s) };
    } catch (e) {
        return { threw: true, why: String(e).split("\n")[0] };
    }
};

const run = (name) => {
    const fn = entry.js[name];
    const sets = partition(pin.published[name], rows, adjudicator(name));
    const misses = [];
    for (const cell of sets.accept) {
        const got = call(fn, cell.s);
        if (got.threw) { misses.push({ kind: "THROW", input: cell.s }); continue; }
        const shape = parseResultShape(got.value, codes);
        if (shape) { misses.push({ kind: "SHAPE", input: cell.s }); continue; }
        if (got.value.ok !== true) { misses.push({ kind: "FALSE_REJECT_IN_SHAPE", input: cell.s }); continue; }
        if (cell.value !== undefined && !cell.valueDiffers) {
            const ruled = ruledValue(cell.s, cell.value);
            if (!deepEqual(got.value.value, ruled.value)) misses.push({ kind: "DIVERGENT_VALUE", input: cell.s });
        }
    }
    for (const cell of sets.reject) {
        const got = call(fn, cell.s);
        if (got.threw) { misses.push({ kind: "THROW", input: cell.s }); continue; }
        const shape = parseResultShape(got.value, codes);
        if (shape) { misses.push({ kind: "SHAPE", input: cell.s }); continue; }
        if (got.value.ok !== false) { misses.push({ kind: "MIS_ACCEPT", input: cell.s }); continue; }
    }
    return misses;
};

for (const name of process.argv.slice(2)) {
    const misses = run(name);
    const byId = new Map();
    for (const m of misses) {
        const id = remainderId(m.input);
        const list = byId.get(id) ?? [];
        list.push(m);
        byId.set(id, list);
    }
    console.log(`\n${"=".repeat(96)}\n${name} — ${misses.length} misses`);
    for (const [id, list] of [...byId].sort((a, b) => b[1].length - a[1].length)) {
        console.log(`  ${String(list.length).padStart(4)}  ${id.slice(0, 96)}`);
    }
    for (const [id, list] of byId) {
        if (!/^unattributed$|SH-1|E-j1/.test(id)) continue;
        console.log(`\n  --- ${id} (${list.length}) ---`);
        for (const m of list) console.log(`    ${m.kind.padEnd(22)} ${JSON.stringify(m.input).slice(0, 150)}`);
    }
}
