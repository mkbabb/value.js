/**
 * SERVED MODEL: claude-opus-5-5
 *
 * X-W8 · X.W8.d · G-12 — the dock's admin latch is DERIVED, not stored.
 *
 * The retired latch (a `ref` seeded from the view, set true on any admin-class
 * view with no else-arm) gilded the dock for the rest of the session once an
 * anonymous visitor touched `/#/atmosphere`. This suite drives the real
 * `useViewManager` over a real hash router: anonymous `/#/` → `/#/atmosphere`
 * → `back()` and asserts no gold on `/#/`.
 *
 * Falsifier (W8.md G-12): reintroduce the stored ref and the back-navigation
 * assertion fails.
 *
 * UNVERIFIABLE-HERE, labelled (W8.md G-12): the authed `viewEntries` collapse
 * needs a live admin session; dev :9000 is API-less, so that arm is driven by
 * a stubbed `isAdminAuthenticated` ref below.
 */
import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref } from "vue";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter, type Router } from "vue-router";

import { useViewManager, type ViewManager } from "../../shell/useViewManager";
import {
    useDockAdminMode,
    type UseDockAdminModeReturn,
} from "../../shell/dock/composables/useDockAdminMode";

const Blank = defineComponent({ render: () => null });

function makeRouter(): Router {
    return createRouter({
        // The app's routes are hash-mode (`/#/…`); the memory history carries the
        // same path stack and the same `back()` → popstate-equivalent listener
        // path without jsdom's asynchronous session-history traversal.
        history: createMemoryHistory(),
        routes: [
            { path: "/", name: "picker", component: Blank },
            { path: "/atmosphere", name: "atmosphere", component: Blank },
            { path: "/admin-users", name: "admin-users", component: Blank },
        ],
    });
}

async function harness(authed: boolean) {
    const router = makeRouter();
    router.push("/");
    await router.isReady();
    const isAdminAuthenticated = ref(authed);
    let vm!: ViewManager;
    let admin!: UseDockAdminModeReturn;
    const Host = defineComponent({
        setup() {
            vm = useViewManager();
            admin = useDockAdminMode({ viewManager: vm, isAdminAuthenticated });
            return () => h("div");
        },
    });
    const wrapper = mount(Host, { global: { plugins: [router] } });
    return { router, vm, admin, isAdminAuthenticated, wrapper };
}

async function settle(router: Router) {
    // `router.back()` resolves on the history popstate, not on the call.
    await new Promise<void>((resolve) => {
        const stop = router.afterEach(() => {
            stop();
            resolve();
        });
    });
    await nextTick();
}

describe("G-12 · useDockAdminMode — the admin latch is derived", () => {
    it("anonymous /#/ → /#/atmosphere → back(): no gold on /#/", async () => {
        const { router, vm, admin, wrapper } = await harness(false);
        expect(vm.currentView.value).toBe("picker");
        expect(admin.isAdminMode.value).toBe(false);

        await router.push("/atmosphere");
        expect(vm.currentView.value).toBe("atmosphere");
        // Anonymous on an admin-class view: still no gold.
        expect(admin.isAdminMode.value).toBe(false);

        router.back();
        await settle(router);
        expect(vm.currentView.value).toBe("picker");
        expect(admin.isAdminMode.value).toBe(false);
        wrapper.unmount();
    });

    it("authed: gold on an admin view, cleared on back() to /#/ (vitest-stubbed session)", async () => {
        const { router, vm, admin, wrapper } = await harness(true);
        expect(admin.isAdminMode.value).toBe(false);

        await router.push("/atmosphere");
        expect(admin.isAdminMode.value).toBe(true);
        expect(admin.viewEntries.value.map((e) => e.id)).toContain("atmosphere");

        router.back();
        await settle(router);
        expect(vm.currentView.value).toBe("picker");
        expect(admin.isAdminMode.value).toBe(false);
        expect(admin.viewEntries.value.map((e) => e.id)).toContain("picker");
        wrapper.unmount();
    });
});
