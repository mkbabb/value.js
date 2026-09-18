// SERVED MODEL: claude-opus-5[1m]
//
// X-W1 · X.W1.a — R10 (ErrorBoundary EB-26), the second seeded suite.
//
// The companion to `error-boundary.test.ts`: the corpus's CHALLENGE-C probes,
// seeded by name into the demo component-test home rather than re-authored
// (R10's CURE-SHAPE LOCK). Two changes only — the `@demo/…` alias becomes a
// relative path (W43 killed the demo aliases repo-wide) and this header. The
// bespoke vitest config the probes shipped with is NOT carried: the repo's own
// `vitest.config.ts` reaches `demo/test/**` and, since fold R6, carries
// `@vitejs/plugin-vue`, so these mount under `npm test` with no second
// harness.
//
// Source of record:
// docs/tranches/V/megatranche/audit/components/ErrorBoundary/probes/challenge-c-impl.test.ts

import { describe, expect, it, vi } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";

import ErrorBoundary from "../../color-picker/ErrorBoundary.vue";

const global = {
    stubs: {
        // The REAL glass-ui Button forwards @click and renders a <button>;
        // stubbing keeps the probe about the boundary's own logic.
        Button: {
            template: `<button type="button" @click="$emit('click')"><slot/></button>`,
        },
        CircleAlert: true,
        RotateCcw: true,
    },
};

/** Always throws during render. */
const AlwaysThrows = defineComponent({
    name: "AlwaysThrows",
    setup: () => () => {
        throw new Error("boom-from-render");
    },
});

/** Throws on the FIRST render only, then renders healthy content. */
const throwOnce = { armed: true };
const ThrowsOnce = defineComponent({
    name: "ThrowsOnce",
    setup: () => () => {
        if (throwOnce.armed) {
            throwOnce.armed = false;
            throw new Error("boom-once");
        }
        return h("p", { id: "healthy" }, "healthy child");
    },
});

const Healthy = defineComponent({
    name: "Healthy",
    setup: () => () => h("p", { id: "healthy-other" }, "a different, healthy pane"),
});

describe("C-A · the catch path renders and announces", () => {
    it("paints role=alert with the machine-truth detail", async () => {
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(AlwaysThrows) },
        });
        await nextTick();
        await nextTick();
        const alert = w.find('[role="alert"]');
        expect(alert.exists()).toBe(true);
        console.log("[C-A] role:", alert.attributes("role"));
        console.log("[C-A] aria-live:", alert.attributes("aria-live"));
        console.log("[C-A] tabindex:", alert.attributes("tabindex"));
        console.log("[C-A] text:", JSON.stringify(w.text()));
        w.unmount();
    });
});

describe("C-B · DIAGNOSTIC BLACKOUT", () => {
    it("no console.error, no console.warn, no app.config.errorHandler", async () => {
        const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
        const appErrors: unknown[] = [];

        const w = mount(ErrorBoundary, {
            slots: { default: () => h(AlwaysThrows) },
            global: {
                ...global,
                config: { errorHandler: (e: unknown) => void appErrors.push(e) },
            },
        });
        await nextTick();
        await nextTick();

        const errCalls = errSpy.mock.calls.map((c) => String(c[0])).join(" | ");
        const warnCalls = warnSpy.mock.calls.map((c) => String(c[0])).join(" | ");
        errSpy.mockRestore();
        warnSpy.mockRestore();

        console.log("[C-B] boundary painted:", w.find('[role="alert"]').exists());
        console.log(
            "[C-B] console.error mentioning the throw:",
            errCalls.includes("boom-from-render"),
        );
        console.log(
            "[C-B] console.warn mentioning the throw:",
            warnCalls.includes("boom-from-render"),
        );
        console.log("[C-B] app.config.errorHandler invocations:", appErrors.length);
        console.log("[C-B] component emissions on catch:", JSON.stringify(w.emitted()));

        expect(errCalls.includes("boom-from-render")).toBe(false);
        expect(appErrors.length).toBe(0);
        expect(w.emitted()).toEqual({});
        w.unmount();
    });
});

describe("C-C · the recovery button is a LOOP when the cause persists", () => {
    it("Try again remounts the same throwing subtree; boundary re-catches", async () => {
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(AlwaysThrows) },
            attachTo: document.body,
        });
        await nextTick();
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);

        await w.find("button").trigger("click");
        await nextTick();
        await nextTick();
        await nextTick();

        const still = w.find('[role="alert"]').exists();
        console.log("[C-C] after Try again, error plate still present:", still);
        console.log("[C-C] emitted:", JSON.stringify(w.emitted()));
        expect(still).toBe(true);
        w.unmount();
    });
});

describe("C-D · FOCUS IS NEVER RESTORED on successful recovery", () => {
    it("activeElement falls to <body> after reset", async () => {
        throwOnce.armed = true;
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(ThrowsOnce) },
            attachTo: document.body,
        });
        await nextTick();
        await nextTick();
        await nextTick();

        const ae = document.activeElement as HTMLElement | null;
        console.log(
            "[C-D] activeElement after catch:",
            ae?.tagName,
            ae?.getAttribute("role"),
        );

        const btnW = w.find("button");
        (btnW.element as HTMLButtonElement).focus();
        console.log(
            "[C-D] activeElement before reset:",
            document.activeElement?.tagName,
        );

        await btnW.trigger("click");
        await nextTick();
        await nextTick();
        await nextTick();

        console.log("[C-D] error plate gone:", !w.find('[role="alert"]').exists());
        console.log("[C-D] healthy child mounted:", w.find("#healthy").exists());
        console.log(
            "[C-D] activeElement AFTER reset:",
            document.activeElement?.tagName,
            document.activeElement === document.body ? "(=== document.body)" : "",
        );
        expect(w.find('[role="alert"]').exists()).toBe(false);
        expect(document.activeElement).toBe(document.body);
        w.unmount();
    });
});

describe("C-E · the boundary never RE-ARMS when the slot content changes", () => {
    it("navigating to a healthy pane keeps the dead error plate on screen", async () => {
        const broken = ref(true);
        const Host = defineComponent({
            name: "Host",
            setup: () => () =>
                h(ErrorBoundary as never, null, {
                    default: () => h(broken.value ? AlwaysThrows : Healthy),
                }),
        });
        const w = mount(Host, { global, attachTo: document.body });
        await nextTick();
        await nextTick();
        expect(w.find('[role="alert"]').exists()).toBe(true);

        broken.value = false;
        await nextTick();
        await nextTick();
        await nextTick();

        const stillDead = w.find('[role="alert"]').exists();
        const healthyMounted = w.find("#healthy-other").exists();
        console.log("[C-E] after navigating to a HEALTHY pane:");
        console.log("[C-E]   error plate still rendered:", stillDead);
        console.log("[C-E]   healthy pane mounted:", healthyMounted);
        console.log("[C-E]   visible text:", JSON.stringify(w.text()));
        expect(stillDead).toBe(true);
        expect(healthyMounted).toBe(false);
        w.unmount();
    });
});

describe("C-F · no live region exists before the error (Safari/VO announcement hazard)", () => {
    it("the aria-live node is created in the same commit as its content", async () => {
        const w = mount(ErrorBoundary, {
            global,
            slots: { default: () => h(Healthy) },
        });
        await nextTick();
        console.log("[C-F] pre-error DOM:", JSON.stringify(w.html()));
        console.log(
            "[C-F] pre-error [aria-live] count:",
            w.findAll("[aria-live]").length,
        );
        console.log(
            "[C-F] pre-error [role=alert] count:",
            w.findAll('[role="alert"]').length,
        );
        expect(w.findAll("[aria-live]").length).toBe(0);
        w.unmount();
    });
});

describe("C-G · unbounded machine-truth detail", () => {
    it("renders an arbitrarily long error message verbatim, unclamped", async () => {
        const Long = defineComponent({
            name: "Long",
            setup: () => () => {
                throw new Error("X".repeat(4000));
            },
        });
        const w = mount(ErrorBoundary, { global, slots: { default: () => h(Long) } });
        await nextTick();
        await nextTick();
        const detail = w.findAll("p").at(-1);
        console.log("[C-G] rendered detail length:", detail?.text().length);
        console.log("[C-G] detail classes:", detail?.attributes("class"));
        expect(detail?.text().length).toBe(4000);
        w.unmount();
    });
});
