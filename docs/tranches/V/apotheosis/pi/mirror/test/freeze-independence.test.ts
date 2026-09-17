import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

function sourceFiles(root: string): readonly string[] {
    const files: string[] = [];
    for (const entry of readdirSync(root, { withFileTypes: true })) {
        if (["dist", "node_modules"].includes(entry.name)) continue;
        const path = join(root, entry.name);
        if (entry.isDirectory()) files.push(...sourceFiles(path));
        else if (/\.(?:js|ts|vue)$/.test(entry.name)) files.push(path);
    }
    return files;
}

describe("freeze independence", () => {
    it("finds no consumer branch on frozen state or mutation of parsed payloads", () => {
        const roots = [
            "/Users/mkbabb/Programming/keyframes-v-exec/src",
            "/Users/mkbabb/Programming/value.js/demo",
        ];
        const freezeProbe = ["Object", "isFrozen"].join("\\.");
        const reliance = new RegExp(`${freezeProbe}|\\b(?:parsed|result)\\.(?:value|diagnostics)\\s*(?:=|\\+\\+|--)`);
        const hits = roots.flatMap(sourceFiles).filter((path) => reliance.test(readFileSync(path, "utf8")));
        expect(hits).toEqual([]);
    });
});

