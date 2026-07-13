import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// U.W-DEMO · U-F48 (the demo state-fragility FOLD) — G-DEMO-4 born-RED gate.
//
// The two MECHANICAL sub-assertions of the fold, each guarding a LIVE defect:
//   (a) `COLOR_STORE_KEY` is defined EXACTLY ONCE across demo/ — one canonical
//       const both consumers import (born-RED today: defined twice, in
//       `boot/hydrate.ts` + `color/useColorPersistence.ts`, keyed independently).
//   (b) `usePaletteStore` is a MODULE SINGLETON — its `useStorage(` binding is
//       created OUTSIDE the exported function body (born-RED today: created
//       inside the per-call factory, re-spun on every one of its three calls).
//
// The Dock watcher-coalesce (the fold's third sub-cure) is a verify-at-execution
// done-state, NOT a standing gate (T ruled demo-decomposition a remediation act,
// not a gate act), so it carries no assertion here.
// ─────────────────────────────────────────────────────────────────────────────

const root = process.cwd();
const demoDir = join(root, "demo");

function walk(dir: string): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        if (entry.name === "node_modules") continue;
        const full = join(dir, entry.name);
        if (entry.isDirectory()) {
            out.push(...walk(full));
        } else if (/\.(ts|vue)$/.test(entry.name)) {
            out.push(full);
        }
    }
    return out;
}

const demoFiles = walk(demoDir);

describe("U-F48 · demo state-cluster coalesce (G-DEMO-4)", () => {
    it("(a) COLOR_STORE_KEY is defined exactly once across demo/", () => {
        // A DEFINITION is `COLOR_STORE_KEY =` (identifier followed by a single
        // `=`); imports (`{ COLOR_STORE_KEY }`) and usages (`getItem(COLOR_STORE_KEY)`,
        // `useStorage(COLOR_STORE_KEY, …)`) carry no `=` and are excluded.
        const defRe = /\bCOLOR_STORE_KEY\s*=(?!=)/g;
        const defSites: string[] = [];
        for (const file of demoFiles) {
            const src = readFileSync(file, "utf8");
            const matches = src.match(defRe);
            if (matches) {
                for (let i = 0; i < matches.length; i++) {
                    defSites.push(file.slice(root.length + 1));
                }
            }
        }
        expect(
            defSites,
            `COLOR_STORE_KEY should be single-sourced; defined at: ${defSites.join(", ")}`,
        ).toHaveLength(1);
    });

    it("(a′) the canonical COLOR_STORE_KEY lives in @lib/palette/constants", () => {
        const constants = readFileSync(
            join(demoDir, "@/lib/palette/constants.ts"),
            "utf8",
        );
        expect(constants).toMatch(/export const COLOR_STORE_KEY\s*=/);
    });

    it("(b) usePaletteStore creates its useStorage binding at module scope (singleton, not a per-call factory)", () => {
        const src = readFileSync(
            join(demoDir, "@/composables/palette/usePaletteStore.ts"),
            "utf8",
        );
        // Locate the useStorage CALL site (tolerant of a generic —
        // `useStorage<PaletteStore>(`); the bare `import { useStorage }` is not a
        // call and is excluded (it is followed by `}`, not `<`/`(`).
        const useStorageIdx = src.search(/useStorage\s*[<(]/);
        const exportFnIdx = src.indexOf("export function usePaletteStore");
        expect(
            useStorageIdx,
            "no useStorage call found",
        ).toBeGreaterThanOrEqual(0);
        expect(
            exportFnIdx,
            "no `export function usePaletteStore` found",
        ).toBeGreaterThanOrEqual(0);
        // The store binding must be created OUTSIDE (before) the exported
        // function body — a module-level lazy singleton, so the three call sites
        // share ONE binding / ONE localStorage round-trip, not a per-call factory.
        expect(
            useStorageIdx,
            "useStorage( must be created at module scope, before `export function usePaletteStore`",
        ).toBeLessThan(exportFnIdx);
    });
});
