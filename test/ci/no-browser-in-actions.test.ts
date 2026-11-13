// Owner order 2026-11-13: no browser runs in any GitHub Action. The browser
// suites run locally before a ship (`npm run preship`). This asserts the
// workflows stay that way, so a browser job is not quietly added back.
import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const DIR = path.resolve(import.meta.dirname, "../../.github/workflows");
const BROWSER = /playwright|chromium|webkit|lhci|lighthouse|boot-smoke|test:browser-unit|preship/i;

describe("GitHub Actions run no browser", () => {
    const files = readdirSync(DIR).filter((f) => /\.ya?ml$/.test(f));

    it("finds the workflows", () => {
        expect(files).toContain("ci.yml");
    });

    for (const file of files) {
        it(`${file} launches no browser`, () => {
            const code = readFileSync(path.join(DIR, file), "utf8")
                .split("\n")
                .filter((line) => !line.trimStart().startsWith("#"))
                .map((line) => line.replace(/\s#\s.*$/, ""));
            expect(code.filter((line) => BROWSER.test(line))).toEqual([]);
        });
    }

    it("CI runs the shared gate script", () => {
        expect(readFileSync(path.join(DIR, "ci.yml"), "utf8")).toMatch(/run: npm run ci:actions/);
    });
});
