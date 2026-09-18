import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

function implementationFiles(root: string): readonly string[] {
    const files: string[] = [];
    for (const entry of readdirSync(root, { withFileTypes: true })) {
        if ([".dts", "node_modules", "test"].includes(entry.name)) continue;
        const path = join(root, entry.name);
        if (entry.isDirectory()) files.push(...implementationFiles(path));
        else if (entry.name.endsWith(".ts") && entry.name !== "types.ts") files.push(path);
    }
    return files;
}

describe("reserved trailing-input code", () => {
    it("has zero construction sites", () => {
        const code = ["trailing", "input"].join("_");
        const construction = new RegExp(`(?:failure\\([^)]*|code\\s*:)\\s*["']${code}["']`, "s");
        const mirrorRoot = dirname(dirname(fileURLToPath(import.meta.url)));
        const hits = implementationFiles(mirrorRoot).filter((path) => construction.test(readFileSync(path, "utf8")));
        expect(hits).toEqual([]);
    });
});

