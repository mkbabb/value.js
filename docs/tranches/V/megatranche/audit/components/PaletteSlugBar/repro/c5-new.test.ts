import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import PaletteSlugBar from "../../../../../../../../demo/palettes/browser/slug/PaletteSlugBar.vue";
import { useAdminAuth } from "../../../../../../../../demo/platform/auth/useAdminAuth";

const PROPS = { userSlug: null, cssColorOpaque: "#369", hasSavedPalettes: false };

/* ────────────────────────────────────────────────────────────────────────────
 * C-38 — the <Transition> stub trap.
 * @vue/test-utils stubs <Transition> by DEFAULT. Every jsdom harness written for
 * this component so far (probes/c4-slugbar.probe.test.ts prints <transition-stub>)
 * therefore runs with `mode="out-in"` erased. Measured both ways below: with the
 * default stub, C-3 (focus never lands) READS CURED.
 * ──────────────────────────────────────────────────────────────────────────── */

// Replay the shipped leave duration (demo/styles/animations.css:112-117 →
// --duration-fast: 0.2s) that vitest's `css:false` drops.
function withRealMorphDuration() {
    const real = window.getComputedStyle.bind(window);
    return vi.spyOn(window, "getComputedStyle").mockImplementation(((
        el: Element,
        pe?: string | null,
    ) => {
        const s = real(el, pe ?? undefined);
        if (el instanceof Element && el.classList?.contains("vj-morph-leave-active")) {
            return new Proxy(s, {
                get(t, k) {
                    if (k === "transitionDuration") return "0.2s";
                    if (k === "transitionDelay") return "0s";
                    if (k === "transitionProperty") return "opacity";
                    if (k === "animationDuration") return "0s";
                    if (k === "animationDelay") return "0s";
                    const v = (t as any)[k];
                    return typeof v === "function" ? v.bind(t) : v;
                },
            }) as CSSStyleDeclaration;
        }
        return s;
    }) as any);
}

async function measureFocus(unstub: boolean) {
    const restore = withRealMorphDuration();
    const calls: string[] = [];
    const realFocus = HTMLElement.prototype.focus;
    HTMLElement.prototype.focus = function (this: HTMLElement, ...a: any[]) {
        calls.push(this.tagName);
        return realFocus.apply(this, a as []);
    };
    const w = mount(PaletteSlugBar, {
        props: PROPS,
        attachTo: document.body,
        ...(unstub ? { global: { stubs: { transition: false } } } : {}),
    });
    await w.find("button").trigger("click");
    await new Promise((r) => setTimeout(r, 70));
    await nextTick();
    const out = {
        transitionStubbed: !!w.element.querySelector("transition-stub"),
        inputAtFocusTime: !!document.querySelector("input"),
        focusCalls: [...calls],
        activeElement: document.activeElement?.tagName,
    };
    HTMLElement.prototype.focus = realFocus;
    restore.mockRestore();
    w.unmount();
    document.body.innerHTML = "";
    return out;
}

describe("C-38 · the @vue/test-utils <Transition> default stub hides C-3", () => {
    it("reads CURED with the default stub and DEFECTIVE without it", async () => {
        const stubbed = await measureFocus(false);
        const unstubbed = await measureFocus(true);
        // eslint-disable-next-line no-console
        console.log("C-38 default (Transition STUBBED):", JSON.stringify(stubbed));
        // eslint-disable-next-line no-console
        console.log("C-38 un-stubbed (shipped behaviour):", JSON.stringify(unstubbed));

        // the harness default: the bug is invisible
        expect(stubbed.inputAtFocusTime).toBe(true);
        expect(stubbed.focusCalls).toEqual(["INPUT"]);
        expect(stubbed.activeElement).toBe("INPUT");

        // reality: no input, no focus call, focus dropped on <body>
        expect(unstubbed.inputAtFocusTime).toBe(false);
        expect(unstubbed.focusCalls).toEqual([]);
        expect(unstubbed.activeElement).toBe("BODY");
    });
});

/* ────────────────────────────────────────────────────────────────────────────
 * C-39 — the empty-admin-token boundary. `ADMIN_TOKEN=""` (an UNSET .env line,
 * the single most likely thing an operator pastes) normalises to "" and is
 * classified as an admin token. The parent runs clearUserSlug() FIRST.
 * ──────────────────────────────────────────────────────────────────────────── */

describe("C-39 · quoted-empty / unset-env input emits an EMPTY admin token", () => {
    const CASES = ['""', "''", 'ADMIN_TOKEN=""', "ADMIN_TOKEN=''", '  ""  '];
    for (const raw of CASES) {
        it(`${JSON.stringify(raw)} → switchSlug("", true)`, async () => {
            const w = mount(PaletteSlugBar, { props: PROPS, attachTo: document.body });
            const state = (w.vm as any).$.setupState;
            state.slugEditMode = true;
            await nextTick();
            state.slugInput = raw;
            await state.onSlugSwitch();
            // eslint-disable-next-line no-console
            console.log(
                `C-39 ${JSON.stringify(raw)} →`,
                JSON.stringify(w.emitted("switchSlug")),
                "| editModeClosed:",
                state.slugEditMode === false,
                "| error:",
                JSON.stringify(state.slugError),
            );
            expect(w.emitted("switchSlug")).toEqual([["", true]]);
            expect(state.slugError).toBe(""); // no rejection is surfaced
            w.unmount();
            document.body.innerHTML = "";
        });
    }

    it("the receiving composable accepts the empty token and stays unauthenticated", () => {
        // this vitest/jsdom env exposes no Storage; shim one so the REAL
        // useAdminAuth module can run unmodified.
        const store = new Map<string, string>();
        const LS = {
            getItem: (k: string) => (store.has(k) ? store.get(k)! : null),
            setItem: (k: string, v: string) => void store.set(k, String(v)),
            removeItem: (k: string) => void store.delete(k),
            clear: () => store.clear(),
            key: () => null,
            get length() { return store.size; },
        } as unknown as Storage;
        Object.defineProperty(globalThis, "localStorage", { value: LS, configurable: true });
        LS.clear();
        const { login, isAuthenticated, getToken } = useAdminAuth();
        login("");
        const state = {
            isAuthenticated: isAuthenticated.value,
            getToken: JSON.stringify(getToken()),
            localStorage: JSON.stringify(LS.getItem("palette-admin-token")),
        };
        // eslint-disable-next-line no-console
        console.log("C-39 useAdminAuth after login(''):", JSON.stringify(state));
        // clearUserSlug() has ALREADY run by this point (useSlugMigration.ts:53-54),
        // so the user session is gone and no admin session replaces it.
        expect(state.isAuthenticated).toBe(false);
        expect(LS.getItem("palette-admin-token")).toBe("");
        LS.clear();
    });
});
