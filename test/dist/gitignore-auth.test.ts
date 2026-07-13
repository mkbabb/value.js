import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * G-CANON-5 (U-F49) — the `/auth/` anchor + silent-drop guard.
 *
 * `.gitignore`'s `auth/` pattern was UNANCHORED — a bare `auth/` matches at ANY
 * depth, so it also swallowed the tracked SOURCE dir `demo/@/composables/auth/`
 * (4 live composables). Those files survive only by tracked-exemption; any NEW
 * or re-added file under that dir would be silently ignored — a silent-drop
 * trap (the same class tranche U closes wave-wide).
 *
 * The cure anchors the ignore to `/auth/` (the repo-ROOT build-artefact dir
 * only). This gate asserts BOTH halves of the fix:
 *   (a) the auth ignore is anchored (`/auth/`), never a bare `auth/`;
 *   (b) every `demo/@/composables/auth/*.ts` source file is git-tracked.
 *
 * Born-RED before the anchor edit (the bare `auth/` line is present); GREEN
 * once anchored + the tracked-source assertion holds.
 */

const repoRoot = path.resolve(import.meta.dirname, "..", "..");

function gitignoreLines(): string[] {
    return readFileSync(path.join(repoRoot, ".gitignore"), "utf8")
        .split("\n")
        .map((l) => l.trim())
        .filter((l) => l.length > 0 && !l.startsWith("#"));
}

describe("G-CANON-5 · gitignore auth/ anchor (U-F49)", () => {
    it("anchors the auth ignore to /auth/ (root build-artefact only), never a bare auth/", () => {
        const lines = gitignoreLines();
        // A bare, unanchored `auth/` matches the tracked source dir at any depth.
        const unanchored = lines.filter((l) => l === "auth/" || l === "auth");
        expect(
            unanchored,
            "`.gitignore` must not carry a bare unanchored `auth/` — it matches the tracked demo/@/composables/auth/ source dir",
        ).toEqual([]);
        // The intended target is the repo-root build-artefact dir only.
        expect(
            lines.some((l) => l === "/auth/"),
            "`.gitignore` must anchor the auth ignore to `/auth/`",
        ).toBe(true);
    });

    it("keeps every demo/@/composables/auth source file git-tracked (no silent drop)", () => {
        const tracked = execSync("git ls-files demo/@/composables/auth/", {
            cwd: repoRoot,
            encoding: "utf8",
        })
            .split("\n")
            .filter((l) => l.endsWith(".ts"));
        // The 4 live auth composables must all be tracked.
        expect(
            tracked.length,
            "demo/@/composables/auth/ must hold its tracked source composables",
        ).toBeGreaterThanOrEqual(4);
        for (const expected of [
            "demo/@/composables/auth/useSession.ts",
            "demo/@/composables/auth/useUserAuth.ts",
            "demo/@/composables/auth/useAdminAuth.ts",
            "demo/@/composables/auth/useAdminUsers.ts",
        ]) {
            expect(tracked, `${expected} must be git-tracked`).toContain(expected);
        }
    });
});
