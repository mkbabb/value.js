import { execSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * G-CANON-7 (U-F50) — the shot policy: no oversized tracked binary.
 *
 * 133 MB (84%) of the tracked tree was audit binaries; a 58 MB N-tranche
 * heapsnapshot (`docs/tranches/N/audit/lanes2/shots/L-PERF1-heap.heapsnapshot`)
 * was STILL tracked — 37% of the whole tree. It is `git rm`'d from the tip
 * (history-rewrite is out of scope — booked owner-decidable). This gate is the
 * standing guard so a multi-MB binary can never silently re-enter tracked.
 *
 * Threshold: 4 MB. The largest LEGITIMATE tracked asset is a ~1.09 MB ruling
 * shot (`docs/tranches/S/audit/pi/w6-after/ruling-shots/*.png`); 4 MB leaves
 * generous headroom for future evidence PNGs while catching any binary in the
 * heapsnapshot class (58 MB). The 154 tracked-exempt PNGs are RULED KEEP
 * (audit evidence, intentionally tracked, all well under threshold) — the
 * policy guards the SIZE class, not the tracked-exemption.
 *
 * Allowlist: empty. No legitimate tracked file exceeds 4 MB. Any future
 * intentional large asset joins the allowlist WITH a rationale, never silently.
 *
 * Born-RED before the `git rm` (the 58 MB heapsnapshot is tracked); GREEN once
 * removed + no tracked file exceeds the threshold.
 */

const repoRoot = path.resolve(import.meta.dirname, "..", "..");
const THRESHOLD_BYTES = 4 * 1024 * 1024; // 4 MB

/** Files intentionally exempt from the size cap (rationale required per entry). */
const ALLOWLIST: readonly string[] = [
    // (empty) — no legitimate tracked file exceeds the threshold.
];

function trackedFiles(): string[] {
    return execSync("git ls-files", { cwd: repoRoot, encoding: "utf8", maxBuffer: 64 * 1024 * 1024 })
        .split("\n")
        .filter((l) => l.length > 0);
}

describe("G-CANON-7 · shot policy — no oversized tracked binary (U-F50)", () => {
    it(`keeps every git-tracked file <= ${THRESHOLD_BYTES / (1024 * 1024)} MB (allowlist aside)`, () => {
        const oversized: { file: string; mb: number }[] = [];
        for (const file of trackedFiles()) {
            if (ALLOWLIST.includes(file)) continue;
            let size: number;
            try {
                size = statSync(path.join(repoRoot, file)).size;
            } catch {
                continue; // tracked-but-absent (mid-rm race) — nothing to weigh
            }
            if (size > THRESHOLD_BYTES) {
                oversized.push({ file, mb: +(size / (1024 * 1024)).toFixed(1) });
            }
        }
        expect(
            oversized,
            `tracked files exceed the ${THRESHOLD_BYTES / (1024 * 1024)} MB shot-policy cap (add to ALLOWLIST with a rationale only if intentional): ${JSON.stringify(oversized)}`,
        ).toEqual([]);
    });

    it("has git-rm'd the N-tranche heapsnapshot from the tip", () => {
        const tracked = trackedFiles();
        expect(
            tracked,
            "the 58 MB heapsnapshot must no longer be git-tracked",
        ).not.toContain("docs/tranches/N/audit/lanes2/shots/L-PERF1-heap.heapsnapshot");
    });
});
