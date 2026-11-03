/**
 * OD-3 (COHESION §0hh): the approved-name registry is not a once-per-page
 * latch. A name approved AFTER the tab's first read resolves on the next
 * re-read (visibility return / admin approve), without a reload.
 */
import { beforeEach, describe, expect, it, vi } from "vitest";

const approved: { id: string; name: string; css: string; status: "approved"; createdAt: string }[] = [];
const read = vi.fn(async () => ({ data: [...approved] }));

vi.mock("../../color-session/color-names", () => ({
    getApprovedColorNames: () => read(),
    proposeColorName: vi.fn(),
}));

import { useCustomColorNames } from "../../color-session/useCustomColorNames";

beforeEach(() => {
    approved.length = 0;
    read.mockClear();
    useCustomColorNames().reset();
});

describe("approved-name registry revalidation", () => {
    it("a name approved after the first read resolves on the next read", async () => {
        const names = useCustomColorNames();
        await names.loadFromAPI();
        expect(names.getMetadata("daraksha")).toBeUndefined();

        approved.push({ id: "1", name: "daraksha", css: "oklch(73% 0.185 2)", status: "approved", createdAt: "" });
        await names.loadFromAPI();

        expect(read).toHaveBeenCalledTimes(2);
        expect(names.getMetadata("daraksha")?.css).toBe("oklch(73% 0.185 2)");
        expect(names.customNameEntries.value.map((e) => e.name)).toContain("daraksha");
    });

    it("concurrent calls share one in-flight read", async () => {
        const names = useCustomColorNames();
        await Promise.all([names.loadFromAPI(), names.loadFromAPI(), names.loadFromAPI()]);
        expect(read).toHaveBeenCalledTimes(1);
    });

    it("a failed re-read keeps the last good registry", async () => {
        const names = useCustomColorNames();
        approved.push({ id: "1", name: "daraksha", css: "oklch(73% 0.185 2)", status: "approved", createdAt: "" });
        await names.loadFromAPI();
        read.mockRejectedValueOnce(new TypeError("fetch failed"));
        await names.loadFromAPI();
        expect(names.getMetadata("daraksha")).toBeDefined();
        expect(names.loaded.value).toBe(true);
    });
});
