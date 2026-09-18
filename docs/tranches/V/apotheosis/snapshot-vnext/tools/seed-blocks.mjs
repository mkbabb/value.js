import { createHash } from "node:crypto";

const sha256 = (value) => createHash("sha256").update(value).digest("hex");

const positionAt = (text, offset, baseLine) => {
    const before = text.slice(0, offset);
    const parts = before.split("\n");
    return {
        line: baseLine + parts.length - 1,
        column: parts.at(-1).length + 1,
    };
};

const makeBlock = (seed, kind, text, startLine, startColumn = 1) => {
    const lines = text.split("\n");
    const endLine = startLine + lines.length - 1;
    const endColumn = lines.length === 1
        ? startColumn + lines[0].length
        : lines.at(-1).length + 1;
    return {
        seed,
        kind,
        excerpt: text,
        start: { line: startLine, column: startColumn },
        end: { line: endLine, column: endColumn },
        sha256: sha256(text),
    };
};

const splitMethodBlock = (block) => {
    const clauses = [
        [
            "The DAG spans",
            "(never vote-counts).",
            "method-dag-thrice",
        ],
        [
            "Iterate per cluster",
            "owner escalation.",
            "method-convergence",
        ],
        [
            "ALL design routes",
            "DesignSync.",
            "method-designsync",
        ],
        [
            "Maximal parallelization",
            "agglomerate clusters as fits.",
            "method-parallelism",
        ],
    ];
    return clauses.map(([startToken, endToken, kind]) => {
        const startOffset = block.excerpt.indexOf(startToken);
        const endOffset = block.excerpt.indexOf(endToken, startOffset) + endToken.length;
        if (startOffset < 0 || endOffset < endToken.length) {
            throw new Error(`unable to split kickoff method clause ${kind}`);
        }
        const excerpt = block.excerpt.slice(startOffset, endOffset);
        const start = positionAt(block.excerpt, startOffset, block.start.line);
        return makeBlock(block.seed, kind, excerpt, start.line, start.column);
    });
};

const parseScope = (seed, lines, firstLine, endExclusive) => {
    const blocks = [];
    let index = firstLine - 1;
    const isListStart = (line) => /^(?:- |\d+\. )/.test(line);
    const isBoundary = (line) =>
        line.trim() === "" ||
        /^#{1,6}\s/.test(line) ||
        /^---\s*$/.test(line) ||
        /^\|/.test(line) ||
        isListStart(line);

    while (index < endExclusive - 1) {
        const line = lines[index];
        if (line.trim() === "" || /^#{1,6}\s/.test(line) || /^---\s*$/.test(line)) {
            index += 1;
            continue;
        }

        if (/^\|/.test(line)) {
            const next = lines[index + 1] ?? "";
            if (/^\|(?:\s*:?-+:?\s*\|)+\s*$/.test(next)) {
                index += 2;
                while (index < endExclusive - 1 && /^\|/.test(lines[index])) {
                    blocks.push(makeBlock(seed, "table-row", lines[index], index + 1));
                    index += 1;
                }
                continue;
            }
            throw new Error(`${seed}:${index + 1}: orphan Markdown table row`);
        }

        if (isListStart(line)) {
            const start = index;
            index += 1;
            while (index < endExclusive - 1 && !isBoundary(lines[index])) index += 1;
            blocks.push(makeBlock(seed, "list-item", lines.slice(start, index).join("\n"), start + 1));
            continue;
        }

        const start = index;
        index += 1;
        while (index < endExclusive - 1 && !isBoundary(lines[index])) index += 1;
        blocks.push(makeBlock(seed, "paragraph", lines.slice(start, index).join("\n"), start + 1));
    }
    return blocks;
};

export const extractSeedBlocks = (seed, source) => {
    const lines = source.split("\n");
    let startHeading;
    let endHeading;
    if (seed === "kickoff") {
        startHeading = "## §0 — CHARTER";
    } else if (seed === "handoff") {
        startHeading = "## P1 — PARSER ARCHAEOLOGY [union product]";
        endHeading = "## P6 — INGESTION SET + FIRST ACTIONS";
    } else {
        throw new Error(`unknown seed ${seed}`);
    }
    const startIndex = lines.indexOf(startHeading);
    const endIndex = endHeading ? lines.indexOf(endHeading) : lines.length;
    if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) {
        throw new Error(`${seed}: seed coverage headings missing or reordered`);
    }
    const raw = parseScope(seed, lines, startIndex + 2, endIndex + 1);
    const blocks = [];
    for (const block of raw) {
        if (seed === "kickoff" && block.start.line === 283 && block.end.line === 291) {
            blocks.push(...splitMethodBlock(block));
        } else {
            blocks.push(block);
        }
    }
    return blocks;
};

export const sourceKey = (block) =>
    `${block.seed}:${block.start.line}:${block.start.column}-${block.end.line}:${block.end.column}`;
