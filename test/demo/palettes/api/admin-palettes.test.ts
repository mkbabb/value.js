import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.resetModules();
});

describe("Admin palette curation transport", () => {
    it.each([
        [true, "featured"],
        [false, "standard"],
    ] as const)("sends the explicit featured=%s state", async (featured, tier) => {
        vi.stubEnv("VITE_API_URL", "http://localhost:3001");
        const fetchMock = vi.fn().mockResolvedValue(
            new Response(
                JSON.stringify({ slug: "audit-palette", tier }),
                {
                    status: 200,
                    headers: { "Content-Type": "application/json" },
                },
            ),
        );
        vi.stubGlobal("fetch", fetchMock);
        const { setPaletteFeatured } = await import(
            "../../../../demo/palettes/api/admin-palettes"
        );

        await setPaletteFeatured("audit-admin", "audit-palette", featured);

        expect(fetchMock).toHaveBeenCalledOnce();
        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toMatch(/\/admin\/palettes\/audit-palette\/feature$/);
        expect(init.method).toBe("POST");
        expect(init.body).toBe(JSON.stringify({ featured }));
        expect(init.headers).toMatchObject({
            Authorization: "Bearer audit-admin",
            "Content-Type": "application/json",
        });
    });
});
