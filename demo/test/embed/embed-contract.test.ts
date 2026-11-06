/**
 * The embed slice's contract (`demo/app/embed/bridge.ts`, `params.ts`): the
 * host allow-list, exact-origin posts, the host message gate, and the route.
 */
import { describe, expect, it, vi } from "vitest";
import {
    EMBED_NS,
    EMBED_VERSION,
    createEmbedBridge,
    isAllowedHost,
    readHostMessage,
    resolveHostOrigin,
} from "../../app/embed/bridge";
import { parsePalette, parseSliceRoute, parseStops } from "../../app/embed/params";
import { balancedColumns } from "../../app/embed/balance";

interface FakeWin {
    win: Window;
    parent: { postMessage: ReturnType<typeof vi.fn> };
    dispatch: (event: Partial<MessageEvent>) => void;
}

function framed(opts: { hostname: string; ancestor?: string; referrer?: string }): FakeWin {
    const parent = { postMessage: vi.fn() };
    let listener: ((e: MessageEvent) => void) | undefined;
    const win = {
        parent,
        location: {
            hostname: opts.hostname,
            ancestorOrigins: opts.ancestor ? [opts.ancestor] : undefined,
        },
        document: { referrer: opts.referrer ?? "" },
        addEventListener: (_: string, fn: (e: MessageEvent) => void) => (listener = fn),
        removeEventListener: () => (listener = undefined),
        requestAnimationFrame: (cb: FrameRequestCallback) => (cb(0), 1),
        cancelAnimationFrame: () => {},
    } as unknown as Window;
    return { win, parent, dispatch: (e) => listener?.(e as MessageEvent) };
}

describe("host allow-list", () => {
    it("admits daraksha.babb.dev from a deployed slice, and nothing else", () => {
        expect(isAllowedHost("https://daraksha.babb.dev", "color.babb.dev")).toBe(true);
        expect(isAllowedHost("https://evil.example", "color.babb.dev")).toBe(false);
        expect(isAllowedHost("http://daraksha.babb.dev", "color.babb.dev")).toBe(false);
        expect(isAllowedHost("http://localhost:5173", "color.babb.dev")).toBe(false);
    });
    it("admits a loopback host only when the slice itself is served from loopback", () => {
        expect(isAllowedHost("http://localhost:5173", "localhost")).toBe(true);
        expect(isAllowedHost("http://127.0.0.1:4173", "127.0.0.1")).toBe(true);
        expect(isAllowedHost("http://localhost.evil.example", "localhost")).toBe(false);
    });
    it("resolves the host from ancestorOrigins, else the referrer, and refuses an unlisted one", () => {
        expect(resolveHostOrigin(framed({ hostname: "color.babb.dev", ancestor: "https://daraksha.babb.dev" }).win)).toBe(
            "https://daraksha.babb.dev",
        );
        expect(
            resolveHostOrigin(framed({ hostname: "color.babb.dev", referrer: "https://daraksha.babb.dev/colour" }).win),
        ).toBe("https://daraksha.babb.dev");
        expect(resolveHostOrigin(framed({ hostname: "color.babb.dev", ancestor: "https://evil.example" }).win)).toBeNull();
    });
});

describe("bridge", () => {
    it("posts every message to the host's exact origin, tagged ns and v", () => {
        const f = framed({ hostname: "color.babb.dev", ancestor: "https://daraksha.babb.dev" });
        const bridge = createEmbedBridge(f.win);
        bridge.post({ type: "color", css: "oklch(73% 0.185 2)" });
        expect(f.parent.postMessage).toHaveBeenCalledWith(
            { ns: EMBED_NS, v: EMBED_VERSION, type: "color", css: "oklch(73% 0.185 2)" },
            "https://daraksha.babb.dev",
        );
    });
    it("posts nothing when not framed by an allowed host", () => {
        const f = framed({ hostname: "color.babb.dev", ancestor: "https://evil.example" });
        createEmbedBridge(f.win).post({ type: "theme", scheme: "dark" });
        expect(f.parent.postMessage).not.toHaveBeenCalled();
    });
    it("takes set-theme only from the host origin and the parent window", () => {
        const f = framed({ hostname: "color.babb.dev", ancestor: "https://daraksha.babb.dev" });
        const bridge = createEmbedBridge(f.win);
        const seen: string[] = [];
        bridge.onSetTheme((s) => seen.push(s));
        const data = { ns: EMBED_NS, v: EMBED_VERSION, type: "set-theme", scheme: "dark" };
        f.dispatch({ origin: "https://evil.example", source: f.parent as unknown as Window, data });
        f.dispatch({ origin: "https://daraksha.babb.dev", source: {} as Window, data });
        f.dispatch({ origin: "https://daraksha.babb.dev", source: f.parent as unknown as Window, data: { ...data, v: 2 } });
        f.dispatch({ origin: "https://daraksha.babb.dev", source: f.parent as unknown as Window, data });
        expect(seen).toEqual(["dark"]);
    });
    it("reads only contract messages", () => {
        expect(readHostMessage({ ns: EMBED_NS, v: EMBED_VERSION, type: "set-theme", scheme: "light" })).toEqual({
            type: "set-theme",
            scheme: "light",
        });
        expect(readHostMessage({ ns: EMBED_NS, v: EMBED_VERSION, type: "set-theme", scheme: "sepia" })).toBeNull();
        expect(readHostMessage("set-theme")).toBeNull();
    });
});

describe("route", () => {
    it("reads the slice, the scheme and named inline stops", () => {
        const route = parseSliceRoute(
            "#/picker?palette=" +
                encodeURIComponent("efflorescence:oklch(73% 0.185 2);curry-leaf:oklch(43% 0.085 152)") +
                "&scheme=dark",
        );
        expect(route.slice).toBe("picker");
        expect(route.scheme).toBe("dark");
        expect(route.palette).toEqual({
            kind: "stops",
            stops: [
                { css: "oklch(73% 0.185 2)", name: "efflorescence" },
                { css: "oklch(43% 0.085 152)", name: "curry-leaf" },
            ],
        });
    });
    it("keeps unnamed stops and drops what value.js cannot parse", () => {
        expect(parseStops("oklch(90% 0.055 18); not-a-colour(1); rgb(1, 2, 3)")).toEqual([
            { css: "oklch(90% 0.055 18)" },
            { css: "rgb(1, 2, 3)" },
        ]);
    });
    it("reads a bare token as a palette slug", () => {
        expect(parsePalette("her-palette-9")).toEqual({ kind: "slug", slug: "her-palette-9" });
        expect(parsePalette(null)).toEqual({ kind: "none" });
    });
    it("refuses an unknown slice and scheme", () => {
        const route = parseSliceRoute("#/blob?scheme=sepia");
        expect(route.slice).toBeNull();
        expect(route.scheme).toBeNull();
    });
});

describe("swatch balance", () => {
    it("shares the swatches evenly between as few rows as fit: eight that fit seven to a row sit four and four", () => {
        // 40 px swatches, 8 px gaps: 7 fit in 328 px.
        expect(balancedColumns(8, 328, 40, 8)).toBe(4);
        expect(balancedColumns(8, 400, 40, 8)).toBe(8);
        expect(balancedColumns(7, 328, 40, 8)).toBe(7);
        expect(balancedColumns(9, 328, 40, 8)).toBe(5);
        expect(balancedColumns(5, 100, 40, 8)).toBe(2);
    });
    it("never orphans one swatch when four or more take two rows", () => {
        for (let n = 4; n <= 16; n++)
            for (let w = 40; w <= 800; w += 13) {
                const fit = Math.floor((w + 8) / 48);
                if (n <= fit || n > 2 * fit) continue;
                const cols = balancedColumns(n, w, 40, 8);
                const last = n % cols || cols;
                if (n > cols) expect(last, `n=${n} w=${w}`).toBeGreaterThan(1);
            }
    });
});
