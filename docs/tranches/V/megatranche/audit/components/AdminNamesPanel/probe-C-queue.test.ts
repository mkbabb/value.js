/**
 * CHALLENGE-C probe — AdminNamesPanel / useColorNameQueue duplicate-key repro.
 * Scratchpad-only. Never lands in the repo test tree.
 */
import { describe, it, expect, vi } from "vitest";
import { ref } from "vue";

vi.mock("/Users/mkbabb/Programming/value.js/demo/platform/auth/useAdminAuth.ts", () => ({
    useAdminAuth: () => ({
        isAuthenticated: { value: true },
        login() {},
        logout() {},
        getToken: () => "probe-token",
    }),
}));

const approveCalls: string[] = [];
vi.mock("/Users/mkbabb/Programming/value.js/demo/palettes/api/index.ts", () => ({
    getAdminQueue: async () => ({ data: [], total: 0, limit: 50, offset: 0 }),
    getApprovedColorNamesAdmin: async () => ({ data: [], total: 0, limit: 50, offset: 0 }),
    approveColorName: async (_t: string, id: string) => {
        approveCalls.push(id);
        await new Promise((r) => setTimeout(r, 25));
    },
    rejectColorName: async () => {},
    deleteColorName: async () => {},
}));

const { useColorNameQueue } = await import("/Users/mkbabb/Programming/value.js/demo/palettes/useColorNameQueue.ts");

describe("double-click Approve", () => {
    it("appends the SAME id twice to approvedColors (duplicate v-for key)", async () => {
        const q = useColorNameQueue({ searchQuery: ref("") });
        const item = {
            id: "c1",
            name: "Wax Seal",
            css: "oklch(0.52 0.18 25)",
            status: "proposed" as const,
            createdAt: "2026-07-05T00:00:00.000Z",
        };
        q.adminColorQueue.value = [item];

        // Two clicks inside the network RTT — exactly what an ungated button allows.
        await Promise.all([q.onApproveColor(item), q.onApproveColor(item)]);

        console.log("approveCalls =", JSON.stringify(approveCalls));
        console.log(
            "approvedColors ids =",
            JSON.stringify(q.approvedColors.value.map((x: any) => x.id)),
        );
        expect(approveCalls).toEqual(["c1", "c1"]);
        expect(q.approvedColors.value.map((x: any) => x.id)).toEqual(["c1", "c1"]);
    });
});
