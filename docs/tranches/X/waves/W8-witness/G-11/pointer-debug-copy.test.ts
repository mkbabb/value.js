/**
 * SERVED MODEL: claude-opus-5-5
 *
 * X.W8.d · G-11 falsifier (W8.md: "force `execCommand` to fail and assert the
 * UI does not report success"), plus the timer-dispose and `type="button"`
 * clauses, mounted against the real `PointerDebugOverlay.vue`.
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { nextTick, reactive } from "vue";
import { flushPromises, mount } from "@vue/test-utils";

import PointerDebugOverlay from "../../../../../../demo/picker/debug/PointerDebugOverlay.vue";
import { POINTER_DEBUG_KEY } from "../../../../../../demo/picker/debug/usePointerDebug";

function debugStub() {
    return {
        state: reactive({ enabled: true, events: [], gauges: {}, frozen: false, frozenSince: 0 }),
        forceReleaseAllPointers: vi.fn(),
        clearEvents: vi.fn(),
    };
}

async function mountOpen() {
    const wrapper = mount(PointerDebugOverlay, {
        attachTo: document.body,
        global: { provide: { [POINTER_DEBUG_KEY as symbol]: debugStub() } },
    });
    (document.body.querySelector(".debug-header") as HTMLElement).click();
    await nextTick();
    await flushPromises();
    return wrapper;
}

function copyButton(): HTMLButtonElement {
    return document.body.querySelector(".debug-btn-copy") as HTMLButtonElement;
}

function reportsCopied(): boolean {
    return document.body.querySelector(".debug-copied") !== null;
}

/** jsdom ships no `execCommand`; define it for the test, removed after. */
function stubExecCommand(result: boolean) {
    const fn = vi.fn(() => result);
    Object.defineProperty(document, "execCommand", { value: fn, configurable: true });
    return fn;
}

afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    delete (document as unknown as Record<string, unknown>).execCommand;
    document.body.innerHTML = "";
});

describe("G-11 · PointerDebugOverlay copy + dispose", () => {
    it("FALSIFIER: clipboard rejects AND execCommand fails → no 'copied!', textarea removed", async () => {
        vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: () => Promise.reject(new Error("denied")) } });
        const exec = stubExecCommand(false);
        const wrapper = await mountOpen();
        copyButton().click();
        await flushPromises();
        expect(exec).toHaveBeenCalledWith("copy");
        expect(reportsCopied()).toBe(false);
        expect(document.body.querySelector("textarea")).toBeNull();
        wrapper.unmount();
    });

    it("execCommand throws → the textarea is still removed (try/finally)", async () => {
        vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: () => Promise.reject(new Error("denied")) } });
        Object.defineProperty(document, "execCommand", {
            value: () => { throw new Error("boom"); },
            configurable: true,
        });
        const wrapper = await mountOpen();
        const errors: unknown[] = [];
        wrapper.vm.$.appContext.config.errorHandler = (e) => { errors.push(e); };
        copyButton().click();
        await flushPromises();
        expect(document.body.querySelector("textarea")).toBeNull();
        expect(reportsCopied()).toBe(false);
        expect(errors).toHaveLength(1); // the throw surfaces; it is not swallowed
        wrapper.unmount();
    });

    it("execCommand succeeds → 'copied!'; unmount clears the pending 1500 ms reset timer", async () => {
        vi.stubGlobal("navigator", { ...navigator, clipboard: { writeText: () => Promise.reject(new Error("denied")) } });
        stubExecCommand(true);
        const wrapper = await mountOpen();
        const set = vi.spyOn(globalThis, "setTimeout");
        const clear = vi.spyOn(globalThis, "clearTimeout");
        copyButton().click();
        await flushPromises();
        expect(reportsCopied()).toBe(true);
        const call = set.mock.calls.findIndex((c) => c[1] === 1500);
        expect(call).toBeGreaterThanOrEqual(0);
        const handle = set.mock.results[call]!.value;
        clear.mockClear();
        wrapper.unmount();
        expect(clear).toHaveBeenCalledWith(handle);
    });

    it("the three action buttons are type=button", async () => {
        const wrapper = await mountOpen();
        const types = [...document.body.querySelectorAll(".debug-actions button")].map((b) => b.getAttribute("type"));
        expect(types).toEqual(["button", "button", "button"]);
        wrapper.unmount();
    });
});
