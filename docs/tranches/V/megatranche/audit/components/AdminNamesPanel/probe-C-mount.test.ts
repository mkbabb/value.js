/** CHALLENGE-C probe — mount AdminNamesPanel and read the rendered truth. */
import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";

// jsdom lacks ResizeObserver; glass-ui SegmentedTabs' roving-focus watcher needs it.
(globalThis as any).ResizeObserver = class { observe() {} unobserve() {} disconnect() {} };
if (!(Element.prototype as any).getAnimations) (Element.prototype as any).getAnimations = function () { return []; };
if (!globalThis.matchMedia) (globalThis as any).matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {} });
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import AdminNamesPanel from "/Users/mkbabb/Programming/value.js/demo/palettes/browser/admin/AdminNamesPanel.vue";

const item = (id: string) => ({
    id,
    name: "Wax Seal",
    css: "oklch(0.52 0.18 25)",
    status: "approved" as const,
    createdAt: "2026-07-05T00:00:00.000Z",
});

describe("AdminNamesPanel rendered truth", () => {
    it("A) tab counts read 0 while both lists are LOADING", async () => {
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [],
                approvedItems: [],
                loadingPending: true,
                loadingApproved: true,
                pendingError: null,
                approvedError: null,
                cssColorOpaque: "#ff0000",
            },
        });
        const tabText = w.findAll("button").map((b) => b.text()).filter((t) => /Pending|Approved/.test(t));
        console.log("LOADING tab labels =", JSON.stringify(tabText));
        expect(tabText).toEqual(["Pending · 0", "Approved · 0"]);
    });

    it("B) the loading wrapper carries aria-label on a role-less div", () => {
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [], approvedItems: [], loadingPending: true, loadingApproved: false,
                pendingError: null, approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        const el = w.find('[aria-label="Loading pending proposals"]');
        console.log(
            "loading wrapper: tag =", el.element.tagName,
            "| role =", el.attributes("role") ?? "NONE",
            "| nested role=status count =", el.findAll('[role="status"]').length,
        );
        expect(el.attributes("role")).toBeUndefined();
    });

    it("C) the double-approve array renders the SAME proposal as two rows", async () => {
        const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [], approvedItems: [item("c1")], loadingPending: false, loadingApproved: false,
                pendingError: null, approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        // switch to the Approved branch
        // drive v-model directly (jsdom lacks the Web Animations API the strip's
        // click path uses) — identical to selecting the Approved tab.
        await w.findComponent(SegmentedTabs).vm.$emit("update:modelValue", "approved");
        await w.vm.$nextTick();
        console.log("approved-branch delete buttons =", w.findAll('[aria-label^="Delete color name"]').length);
        // the double-approve outcome from the useColorNameQueue repro:
        await w.setProps({ approvedItems: [item("c1"), item("c1")] });
        await w.vm.$nextTick();
        const rows = w.findAll('[aria-label^="Delete color name"]').length;
        const msgs = warn.mock.calls.map((c) => String(c[0]));
        console.log("rows rendered for ONE unique id =", rows, "| vue warnings =", JSON.stringify(msgs.slice(0, 2)));
        warn.mockRestore();
        expect(rows).toBe(2);
    });

    it("D) no aria-live / no tabpanel anywhere in the rendered panel", () => {
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [item("c1")], approvedItems: [], loadingPending: false, loadingApproved: false,
                pendingError: null, approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        console.log(
            "aria-live =", w.findAll("[aria-live]").length,
            "| role=tabpanel =", w.findAll('[role="tabpanel"]').length,
            "| aria-controls =", w.findAll("[aria-controls]").length,
        );
        expect(w.findAll("[aria-live]").length).toBe(0);
    });
});

describe("glass-ui 7 Button API", () => {
    it("E) `variant` is not a ButtonProp — it lands as a dead DOM attribute", () => {
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [item("c1")], approvedItems: [], loadingPending: false, loadingApproved: false,
                pendingError: "boom", approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        const retry = w.findAll("button").find((b) => /Retry/.test(b.text()))!;
        console.log("Retry button outerHTML =", retry.element.outerHTML.replace(/\s+/g, " ").slice(0, 300));
        expect(retry.element.getAttribute("variant")).toBe("outline");
    });
});

describe("error precedence", () => {
    it("F) a failed REFRESH hides rows that are still held in memory", () => {
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [item("c1"), item("c2")], approvedItems: [],
                loadingPending: false, loadingApproved: false,
                pendingError: "Backend unreachable — working locally.",
                approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        const rows = w.findAll('[aria-label^="Approve color name"]').length;
        const tabLabel = w.findAll("button").map((b) => b.text()).find((t) => /Pending/.test(t));
        console.log("pendingItems=2 + error → rendered rows =", rows, "| tab label =", JSON.stringify(tabLabel));
        expect(rows).toBe(0);
    });
});

describe("swatch fidelity", () => {
    it("G) an unparseable / unsupported css literal renders a blank swatch, silently", () => {
        const bad = { ...item("c9"), css: "not-a-color", status: "proposed" as const };
        const w = mount(AdminNamesPanel, {
            props: {
                pendingItems: [bad], approvedItems: [], loadingPending: false, loadingApproved: false,
                pendingError: null, approvedError: null, cssColorOpaque: "#ff0000",
            },
        });
        const sw = w.find(".rounded-full.border");
        console.log("swatch style =", JSON.stringify(sw.attributes("style") ?? ""), "| row still approvable =",
            w.findAll('[aria-label^="Approve color name"]').length);
        expect(sw.attributes("style") ?? "").toBe("");
    });
});
