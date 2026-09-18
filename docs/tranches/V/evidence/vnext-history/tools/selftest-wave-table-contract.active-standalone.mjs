#!/usr/bin/env node

import assert from "node:assert/strict";

import {
    openingStateFailure,
    routingPiFailure,
    waveBandCounts,
    waveCellCount,
    waveHeaderFailure,
    waveSeparatorFailure,
    waveTotal,
} from "./wave-table-contract.mjs";

assert.deepEqual(waveBandCounts, { P: 8, V: 45, K: 27, A: 36, G: 11, D: 33, M: 13, C: 20 });
assert.equal(waveCellCount, 8);
assert.equal(waveTotal, 193);
const openingPositives = ["BORN-RED", "BORN-ABSENT", "RULING", "AUDIT"];
for (const state of openingPositives) {
    assert.equal(openingStateFailure(`${state} — exact witness`), null);
}
const openingRejections = ["live defect", "BORN-RED: defect", "BORN-RED - defect", "BORN_RED — defect", "BORN-RED —"];
for (const value of openingRejections) {
    assert.ok(openingStateFailure(value), value);
}
const validHeader = [
    "ID", "Mission", "Dependencies", "Born-RED witness", "Deliverables", "Falsifiable gates",
    "Routing / π·DELTA", "Exclusions or terminal branch",
];
const reversedHeader = [
    "ID", "Mission", "Dependencies", "Born-RED witness", "Deliverables", "Falsifiable gates",
    "Exclusions or terminal branch", "Routing / π·DELTA",
];
assert.equal(waveHeaderFailure(validHeader), null);
assert.ok(waveHeaderFailure(reversedHeader));
assert.equal(waveSeparatorFailure(Array(8).fill("---")), null);
assert.ok(waveSeparatorFailure(Array(7).fill("---")));

const positives = [
    "R0 · N/A(no-visual-claim)",
    "R1 · value.picker-π/DELTA",
    "R2 · value/route-matrix-π/DELTA",
    "R3 · keyframes.cube-traces-π/DELTA",
    "R4 · cross-app-probe-π/DELTA",
    "R5 · physical/iphone-safari-π/DELTA",
];
for (const value of positives) assert.equal(routingPiFailure(value), null, value);

const rejections = [
    "R0",
    "R0 · scene-π/DELTA",
    "R1",
    "R2 · prose evidence-π/DELTA",
    "R3 · a..b-π/DELTA",
    "R4 · a//b-π/DELTA",
    "R5 · -leading-π/DELTA",
    "R6 · invented-π/DELTA",
    " R0 · N/A(no-visual-claim)",
];
for (const value of rejections) assert.ok(routingPiFailure(value), value);

process.stdout.write(`${JSON.stringify({
    schema: "vnext-wave-table-contract-selftest/1",
    routing_positives: positives.length,
    routing_rejections: rejections.length,
    opening_state_positives: openingPositives.length,
    opening_state_rejections: openingRejections.length,
    header_positives: 1,
    header_rejections: 1,
    separator_positives: 1,
    separator_rejections: 1,
})}\n`);
