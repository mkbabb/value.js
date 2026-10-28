#!/usr/bin/env node
// OD19 · load — map a built chunk's char offset (LoAF sourceCharPosition) to its source line.
// usage: node load-pos.mjs <chunk.js> <offset...>
import { readFileSync } from "node:fs";
import { TraceMap, originalPositionFor } from "@jridgewell/trace-mapping";
const [file, ...offs] = process.argv.slice(2);
const code = readFileSync(file, "utf8");
const map = new TraceMap(readFileSync(`${file}.map`, "utf8"));
for (const o of offs.map(Number)) {
    const before = code.slice(0, o);
    const line = before.split("\n").length;
    const column = o - before.lastIndexOf("\n") - 1;
    const p = originalPositionFor(map, { line, column });
    console.log(o, (p.source ?? "").replace(/^.*node_modules\//, "nm:").replace(/^.*\/demo\//, "demo/"), p.line, p.name ?? "", "|", code.slice(o, o + 80).replace(/\n/g, " "));
}
