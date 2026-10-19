/**
 * X.W7.g3 · ImageDropZone — the §R3.2 band (wb-extract-imagedropzone R-n),
 * mounted on the real SFC. Drag events are dispatched as the browser does:
 * enter/leave pairs for every descendant crossing.
 */
import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import ImageDropZone from "../../workbenches/extract/ImageDropZone.vue";

function drag(type: string, files: File[] = []) {
    const e = new Event(type, { bubbles: true, cancelable: true }) as DragEvent;
    Object.defineProperty(e, "dataTransfer", {
        value: { files, types: ["Files"], items: files.map((f) => ({ kind: "file", type: f.type })), dropEffect: "none" },
    });
    return e;
}

const img = () => new File([new Uint8Array([1])], "a.png", { type: "image/png" });

describe("ImageDropZone", () => {
    it("R-5 / R-17: crossing a descendant never clears the drag highlight; the drop lands", async () => {
        const w = mount(ImageDropZone, { props: { preview: null }, attachTo: document.body });
        await w.vm.$nextTick(); // the drop-zone listeners attach once the template ref is bound
        const zone = w.element as HTMLElement;
        const child = zone.querySelector("span, svg, div") as HTMLElement;
        zone.dispatchEvent(drag("dragenter", [img()]));
        child.dispatchEvent(drag("dragenter", [img()]));
        zone.dispatchEvent(drag("dragleave", [img()]));
        await w.vm.$nextTick();
        expect(zone.dataset.dragging).toBe("true");
        child.dispatchEvent(drag("drop", [img()]));
        await w.vm.$nextTick();
        expect(w.emitted("file")).toHaveLength(1);
        expect(zone.dataset.dragging).toBeUndefined();
        w.unmount();
    });

    it("R-16: the zone does not own the file dialog — it asks its parent", async () => {
        const w = mount(ImageDropZone, { props: { preview: null } });
        expect(w.find('input[type="file"]').exists()).toBe(false);
        await w.trigger("click");
        expect(w.emitted("open")).toHaveLength(1);
        expect(w.emitted("sample")).toBeUndefined();
    });

    it("R-19: populated, one act — sample — with no phantom `disableClick` branch", async () => {
        const w = mount(ImageDropZone, { props: { preview: "blob:x" } });
        expect(w.attributes("aria-label")).toBe("Sample colors from the image");
        await w.trigger("keydown", { key: "Enter" });
        expect(w.emitted("sample")).toHaveLength(1);
        expect(w.emitted("open")).toBeUndefined();
        expect(Object.keys(ImageDropZone.props ?? {})).not.toContain("disableClick");
    });

    it("R-12: a disabled zone takes no intake — no click, no drop", async () => {
        const w = mount(ImageDropZone, { props: { preview: null, disabled: true }, attachTo: document.body });
        await w.vm.$nextTick();
        await w.trigger("click");
        w.element.dispatchEvent(drag("drop", [img()]));
        expect(w.emitted("open")).toBeUndefined();
        expect(w.emitted("file")).toBeUndefined();
        expect(w.attributes("aria-disabled")).toBe("true");
        w.unmount();
    });

    it("R-8 / R-27: the populated affordance is a real, always-painted badge on its own ground", () => {
        const w = mount(ImageDropZone, { props: { preview: "blob:x" } });
        const badge = w.get("[data-zone-affordance]");
        expect(badge.attributes("aria-hidden")).toBeUndefined();
        expect(badge.classes().join(" ")).not.toMatch(/opacity-0|group-hover|bg-background\/85/);
    });

    it("R-11 / R-22 / R-25: no transition-all, no inline durations, the img rides the radius token", () => {
        const w = mount(ImageDropZone, { props: { preview: "blob:x" } });
        expect(w.html()).not.toContain("transition-all");
        expect(w.html()).not.toContain("transition-duration");
        expect(w.get("img").classes()).toContain("rounded-panel");
        expect(w.get("img").classes()).not.toContain("rounded-xl");
    });

    it("R-14: the empty zone wears the certified WELL material, keeping the semantic drop-target tint", () => {
        const w = mount(ImageDropZone, { props: { preview: null } });
        expect(w.classes()).toContain("dashed-well");
        expect(w.html()).not.toMatch(/bg-primary\/5/);
    });
});
