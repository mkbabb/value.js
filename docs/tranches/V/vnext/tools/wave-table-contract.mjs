export const waveFiles = Object.freeze([
    "waves/P-V.md",
    "waves/K-A.md",
    "waves/G-D.md",
    "waves/M-C.md",
]);

export const waveIdPattern = /^[PVKAGDMC]\d{2}[A-Z]?$/;
export const waveBandCounts = Object.freeze({ P: 8, V: 45, K: 27, A: 36, G: 11, D: 33, M: 13, C: 20 });
export const waveTotal = 193;
export const waveCellCount = 8;
export const waveCell = Object.freeze({
    id: 0,
    mission: 1,
    dependencies: 2,
    bornRed: 3,
    deliverables: 4,
    gates: 5,
    routingPi: 6,
    exclusions: 7,
});

const nonvisualRouting = "R0 · N/A(no-visual-claim)";
const visualRouting = /^R([1-5]) · ([A-Za-z0-9](?:[A-Za-z0-9._/-]*[A-Za-z0-9])?)-π\/DELTA$/;
const openingState = /^(?:BORN-RED|BORN-ABSENT|RULING|AUDIT) — \S/;

export function openingStateFailure(value) {
    return openingState.test(value)
        ? null
        : "Born-state must start exactly `BORN-RED —`, `BORN-ABSENT —`, `RULING —`, or `AUDIT —`";
}

export function waveHeaderFailure(cells) {
    if (!Array.isArray(cells) || cells[waveCell.id] !== "ID") return "wave header must begin with `ID`";
    if (cells.length !== waveCellCount) return `wave header must have ${waveCellCount} cells`;
    const fixed = [
        [waveCell.mission, "Mission"],
        [waveCell.dependencies, "Dependencies"],
        [waveCell.bornRed, "Born-RED witness"],
        [waveCell.gates, "Falsifiable gates"],
        [waveCell.routingPi, "Routing / π·DELTA"],
    ];
    for (const [index, expected] of fixed) {
        if (cells[index] !== expected) return `wave header cell ${index + 1} must be exact \`${expected}\``;
    }
    if (!/^(?:Landing and deliverables|Deliverables)$/.test(cells[waveCell.deliverables])) {
        return "wave header deliverables cell is not canonical";
    }
    if (!/^Exclusions\b/.test(cells[waveCell.exclusions])) {
        return "wave header must place Exclusions after Routing / π·DELTA";
    }
    return null;
}

export function waveSeparatorFailure(cells) {
    if (!Array.isArray(cells) || cells.length !== waveCellCount) {
        return `wave table separator must have ${waveCellCount} cells`;
    }
    return cells.every((cell) => /^:?-{3,}:?$/.test(cell))
        ? null
        : "wave table separator contains a noncanonical cell";
}

export function routingPiFailure(value) {
    if (value === nonvisualRouting) return null;
    const match = visualRouting.exec(value);
    if (!match) {
        return "routing/π must be exact `R0 · N/A(no-visual-claim)` or `R1`–`R5 · <named-evidence>-π/DELTA`";
    }
    const evidence = match[2];
    if (evidence.includes("..") || evidence.includes("//")) {
        return "routing/π evidence token may not contain `..` or `//`";
    }
    return null;
}
