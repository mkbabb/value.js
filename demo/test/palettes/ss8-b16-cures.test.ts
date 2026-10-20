/**
 * SS-8 B16-palette-dialogs — cures and the falsifiers that hold them.
 *
 *   · SS8-0454 (MPD A-12 residue): the Enter that opened the migrate dialog may
 *     still be held; its first auto-repeat (+58 ms live) pressed the Cancel the
 *     dialog focuses on open and dismissed the dialog it had just opened. Until
 *     a key is released (or freshly pressed) inside the dialog, repeats are
 *     swallowed.
 *   · SS8-0471 (VHD U-4 residue): the drawer's abandoned version read was never
 *     aborted. The signal now threads drawer → `pm.versions.fetchVersions` →
 *     `listVersions` → `request`, and the drawer aborts on close, on unmount and
 *     when a fresh first page supersedes it. A caller's abort is not a network
 *     failure: the transport's availability latch stays untouched.
 *   · SS8-0453/0455/0456/0460 (already cured at X.W12U.s2): the dialog renders
 *     no close button, no `variant` fallthrough attribute and no frame class.
 *     These lock the cured state.
 *   · SS8-0458 (already cured): `setActiveView` speaks `ViewId`, so the old
 *     `"saved"` tab write is a compile error (checked by vue-tsc on this file).
 */
import { afterEach, describe, expect, it, vi } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import MigratePalettesDialog from "../../palettes/browser/dialog/MigratePalettesDialog.vue";
import VersionHistoryDrawer from "../../palettes/browser/dialog/VersionHistoryDrawer.vue";
import { BROWSE_PORT_KEY } from "../../palettes/usePalettePorts";
import type { VersionsResult } from "../../palettes/useVersionHistory";
import type { SlugMigrationDeps } from "../../palettes/useSlugMigration";
import { request } from "../../platform/transport/client";
import { apiAvailability } from "../../platform/transport/availability";

afterEach(() => {
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

async function openDialog() {
    const wrapper = mount(MigratePalettesDialog, {
        props: { open: true, count: 2, mode: "switch", target: "moss-bank" },
        attachTo: document.body,
    });
    await flushPromises();
    const content = document.querySelector<HTMLElement>('[data-slot="dialog-content"]')!;
    const cancel = [...content.querySelectorAll("button")].find((b) => b.textContent?.trim() === "Cancel")!;
    return { wrapper, content, cancel };
}

function key(el: HTMLElement, type: "keydown" | "keyup", repeat: boolean) {
    const e = new KeyboardEvent(type, { key: "Enter", repeat, bubbles: true, cancelable: true });
    el.dispatchEvent(e);
    return e;
}

describe("SS8-0454 · a held Enter cannot press the dialog it opened", () => {
    it("the dialog opens on Cancel and swallows the held key's repeats", async () => {
        const { wrapper, cancel } = await openDialog();
        expect(document.activeElement).toBe(cancel);
        expect(key(cancel, "keydown", true).defaultPrevented).toBe(true);
        expect(key(cancel, "keydown", true).defaultPrevented).toBe(true);
        wrapper.unmount();
    });

    it("after the key is released, the dialog's keys are its own again", async () => {
        const { wrapper, cancel } = await openDialog();
        key(cancel, "keyup", false);
        expect(key(cancel, "keydown", true).defaultPrevented).toBe(false);
        wrapper.unmount();
    });

    it("a fresh press inside the dialog also ends the guard", async () => {
        const { wrapper, cancel } = await openDialog();
        expect(key(cancel, "keydown", false).defaultPrevented).toBe(false);
        expect(key(cancel, "keydown", true).defaultPrevented).toBe(false);
        wrapper.unmount();
    });
});

describe("SS8-0453/0455/0456/0460 · the migrate dialog's cured frame", () => {
    it("no close button, no variant attr, no frame class; Cancel is the dismiss", async () => {
        const { wrapper, content, cancel } = await openDialog();
        expect(content.querySelector('[data-slot="dialog-close"]')).toBeNull();
        expect([...content.querySelectorAll("button")].filter((b) => b.hasAttribute("variant"))).toEqual([]);
        expect(content.className.split(/\s+/).filter((c) => c === "rounded-dialog")).toEqual([]);
        expect(content.dataset.surface).toBe("glass");
        expect(cancel.dataset.emphasis).toBe("text");
        cancel.click();
        expect(wrapper.emitted("dismiss")).toHaveLength(1);
        wrapper.unmount();
    });
});

describe("SS8-0458 · the admin branch's view write speaks ViewId", () => {
    it("'saved' is not a view (type-checked) and 'palettes' is", () => {
        const seen: string[] = [];
        const setActiveView: SlugMigrationDeps["setActiveView"] = (id) => void seen.push(id);
        setActiveView("palettes");
        // @ts-expect-error — the pre-router tab id is not a ViewId (gate N2).
        setActiveView("saved");
        expect(seen).toEqual(["palettes", "saved"]);
    });
});

describe("SS8-0471 · the drawer aborts the version read it abandons", () => {
    function mountDrawer() {
        const signals: (AbortSignal | undefined)[] = [];
        const settle: ((r: VersionsResult) => void)[] = [];
        const fetchVersions = (_s: string, _l?: number, _o?: number, signal?: AbortSignal) =>
            new Promise<VersionsResult>((resolve) => {
                signals.push(signal);
                settle.push(resolve);
            });
        const wrapper = mount(VersionHistoryDrawer, {
            props: { open: false, paletteSlug: "moss-bank", paletteName: "Moss bank", currentHash: null },
            global: { provide: { [BROWSE_PORT_KEY as symbol]: { versions: { fetchVersions } } } },
            attachTo: document.body,
        });
        return { wrapper, signals, settle };
    }

    it("closing aborts the read in flight", async () => {
        const { wrapper, signals } = mountDrawer();
        await wrapper.setProps({ open: true });
        expect(signals).toHaveLength(1);
        expect(signals[0]?.aborted).toBe(false);
        await wrapper.setProps({ open: false });
        expect(signals[0]?.aborted).toBe(true);
        wrapper.unmount();
    });

    it("unmounting (the subject-scoped v-if release) aborts the read in flight", async () => {
        const { wrapper, signals } = mountDrawer();
        await wrapper.setProps({ open: true });
        wrapper.unmount();
        expect(signals[0]?.aborted).toBe(true);
    });

    it("a superseding first page aborts its predecessor, which never clears the new read's loading", async () => {
        const { wrapper, signals, settle } = mountDrawer();
        await wrapper.setProps({ open: true });
        await wrapper.setProps({ currentHash: "h2" });
        expect(signals).toHaveLength(2);
        expect(signals[0]?.aborted).toBe(true);
        expect(signals[1]?.aborted).toBe(false);
        settle[0]!({ ok: false, message: "aborted" });
        await flushPromises();
        expect(wrapper.emitted("load-failed")).toBeUndefined();
        expect(document.body.textContent).toMatch(/loading versions/);
        wrapper.unmount();
    });
});

describe("SS8-0471 · a caller's abort is not a network failure", () => {
    it("the abort propagates and the availability latch is untouched", async () => {
        vi.stubGlobal(
            "fetch",
            vi.fn((_i: string, init: RequestInit) => {
                const e = new DOMException("aborted", "AbortError");
                return init.signal?.aborted ? Promise.reject(e) : Promise.reject(new TypeError("net"));
            }),
        );
        apiAvailability.value = "available";
        const ctrl = new AbortController();
        ctrl.abort();
        await expect(request("/palettes/x/versions", { signal: ctrl.signal })).rejects.toMatchObject({
            name: "AbortError",
        });
        expect(apiAvailability.value).toBe("available");
    });
});
