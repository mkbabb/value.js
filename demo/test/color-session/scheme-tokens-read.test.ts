// SERVED MODEL: claude-opus-5-5
/**
 * X.W11.lck (COHESION §0gy.8, R16-9) — the unit lock for `.cut`'s first cut
 * (`b14ed7945`, `useContrastSafeColor.ts` `SCHEME_TOKENS`).
 *
 * The cut reads `--color-gold` and `--destructive` together: the first ask
 * (the dock's gold, on a clean style) memoises both, so the certify task's
 * `--destructive` ask no longer forces its own style recalculation. The cut
 * claims the same values and the same invalidation as before. This lock
 * asserts exactly that claim, as results, so the same assertions pass on the
 * bytes before the cut (`b14ed7945^`) and after it (HEAD):
 *
 *  - each token resolves to its scheme's arm of the cascade's `light-dark()`;
 *  - the destructive ink certifies the cascade's red, whichever token is
 *    asked first;
 *  - a scheme flip (the caller's `dark`, or the root `.dark` class) drops the
 *    memo, so both tokens re-resolve to the other arm;
 *  - a token the cascade has not painted yet is never memoised, alone or as
 *    the batched neighbour of another token's read: its own later ask reads
 *    the cascade it then finds;
 *  - within one scheme the memo holds (a token is a scheme constant).
 *
 * jsdom resolves no custom property, so the root's computed style is stubbed
 * with a cascade map. The destructive token has no export of its own: it is
 * observed as the colour `certifyAccentInk` is handed.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { computed, createApp, defineComponent, h, ref } from "vue";

const seen = vi.hoisted(() => ({ certified: [] as string[] }));
const isDark = ref(false);
vi.mock("@mkbabb/glass-ui/dark", () => ({ useGlobalDark: () => ({ isDark }) }));
vi.mock("../../color-session/ink", async (importOriginal) => {
    const real = await importOriginal<typeof import("../../color-session/ink")>();
    return {
        ...real,
        certifyAccentInk: (css: string, ...rest: [number, number?]) => {
            seen.certified.push(css);
            return real.certifyAccentInk(css, ...rest);
        },
    };
});

const GOLD = "light-dark(#a07a10, #e8c547)";
const RED = "light-dark(#c42020, #ff6b6b)";
const cascade = new Map<string, string>();

function stubRootStyle() {
    const real = window.getComputedStyle.bind(window);
    const stub = (el: Element, pseudo?: string | null) => {
        const cs = real(el, pseudo);
        if (el !== document.documentElement) return cs;
        return new Proxy(cs, {
            get: (t, k) =>
                k === "getPropertyValue"
                    ? (name: string) => cascade.get(name) ?? ""
                    : Reflect.get(t, k),
        });
    };
    vi.spyOn(window, "getComputedStyle").mockImplementation(stub);
    if ((globalThis as unknown) !== window)
        vi.spyOn(globalThis, "getComputedStyle").mockImplementation(stub);
}

async function load() {
    vi.resetModules();
    return import("../../color-session/useContrastSafeColor");
}

type Mod = Awaited<ReturnType<typeof load>>;

/** Mounts the composable and returns a reader of the red it certifies. */
function mountDestructive(mod: Mod) {
    let read = () => "";
    const host = document.createElement("div");
    document.body.appendChild(host);
    const app = createApp(
        defineComponent({
            setup() {
                const safe = mod.useContrastSafeColor(
                    computed(() => "oklch(0.62 0.18 40)"),
                    computed(() => 0.5),
                );
                read = () => {
                    seen.certified.length = 0;
                    void safe.destructiveInkCss.value;
                    return seen.certified.at(-1) ?? "";
                };
                return () => h("span");
            },
        }),
    );
    app.mount(host);
    return {
        red: () => read(),
        unmount: () => {
            app.unmount();
            host.remove();
        },
    };
}

beforeEach(() => {
    cascade.clear();
    isDark.value = false;
    document.documentElement.classList.remove("dark");
    stubRootStyle();
});

afterEach(() => {
    vi.restoreAllMocks();
    document.documentElement.classList.remove("dark");
});

describe("scheme tokens (X.W11.lck, §0gy.8: the .cut read, same values and invalidation)", () => {
    // Each leg mounts the composable before its first read, so the mount's
    // probe-epoch bump lands before the reads and they share one stamp (the
    // case the cut's batched read serves).
    it("gold asked first: both tokens resolve to the light arm, and the red certifies the cascade's red", async () => {
        cascade.set("--color-gold", GOLD).set("--destructive", RED);
        const mod = await load();
        const m = mountDestructive(mod);
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        expect(m.red()).toBe("#c42020");
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        m.unmount();
    });

    it("red asked first: the same values", async () => {
        cascade.set("--color-gold", GOLD).set("--destructive", RED);
        const mod = await load();
        const m = mountDestructive(mod);
        expect(m.red()).toBe("#c42020");
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        m.unmount();
    });

    it("a scheme flip drops the memo: both tokens re-resolve to the dark arm, and back", async () => {
        cascade.set("--color-gold", GOLD).set("--destructive", RED);
        const mod = await load();
        const m = mountDestructive(mod);
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        expect(m.red()).toBe("#c42020");
        document.documentElement.classList.add("dark");
        isDark.value = true;
        expect(mod.goldIdentityCss(true)).toBe("#e8c547");
        expect(m.red()).toBe("#ff6b6b");
        document.documentElement.classList.remove("dark");
        isDark.value = false;
        expect(m.red()).toBe("#c42020");
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        m.unmount();
    });

    it("the root .dark class alone (a read that raced the flip) drops the memo", async () => {
        cascade.set("--color-gold", GOLD);
        const mod = await load();
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        cascade.set("--color-gold", "light-dark(#111111, #222222)");
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        document.documentElement.classList.add("dark");
        expect(mod.goldIdentityCss(false)).toBe("#111111");
    });

    it("an unpainted token is never memoised, alone or as the batched neighbour", async () => {
        const mod = await load();
        // Mounted first, so the mount's epoch bump is spent before the reads:
        // every read below shares one stamp.
        const m = mountDestructive(mod);
        expect(mod.goldIdentityCss(false)).toBe("#D4AF37");
        cascade.set("--color-gold", GOLD);
        expect(mod.goldIdentityCss(false)).toBe("#a07a10");
        cascade.set("--destructive", RED);
        expect(m.red()).toBe("#c42020");
        m.unmount();
    });
});
