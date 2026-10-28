/**
 * SS-8 Z3-workbench-about-cohort — the falsifiers that hold the REFUTED
 * Markdown rows (packet
 * `docs/tranches/X/execution/SS8/packets/Z3-workbench-about-cohort.md`).
 *
 *   · Z-Markdown-2: the loading skeletons ship no inert `surface` / `variant`
 *     attributes (the live bones carry only data-slot / aria-hidden / class).
 *   · Z-Markdown-3: an unwritten guide is a catalog DECISION (`doc: null`),
 *     which AboutPane renders as an explicit empty-state sentence, never a
 *     blank section. Every written guide resolves to a component.
 *
 * Z-Markdown-8's WebKit cell needs no cure (WebKit compensates the anchor);
 * the chromium cell is PROVEN and routed, not cured here.
 */
import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { Markdown } from "../../scenes/about/markdown";
import { SPACE_CATALOG } from "../../color-session/space-catalog";

const DEMO = resolve(import.meta.dirname, "../..");

describe("Z3 · Markdown REFUTED rows stay cured", () => {
    it("-2: the loading bones carry no inert surface/variant attributes", () => {
        const pending = () => new Promise<{ default: unknown }>(() => {});
        const w = mount(Markdown, { props: { module: pending } });
        const bones = w.findAll('[data-slot="skeleton"]');
        expect(bones.length).toBe(3);
        for (const b of bones) {
            expect(b.attributes("surface")).toBeUndefined();
            expect(b.attributes("variant")).toBeUndefined();
            expect(b.attributes("data-surface")).toBeUndefined();
            expect(b.attributes("data-variant")).toBeUndefined();
        }
        w.unmount();
    });

    it("-3: display-p3 is an authored no-guide decision, rendered as a sentence", async () => {
        const catalog = SPACE_CATALOG as Record<string, { doc: unknown }>;
        expect(catalog["display-p3"]?.doc).toBeNull();
        const pane = readFileSync(resolve(DEMO, "scenes/about/AboutPane.vue"), "utf8");
        expect(pane).toMatch(/<Markdown\s+v-if="activeSpace\.doc"/);
        expect(pane).toMatch(/<p v-else[^>]*data-guide-empty-state>\s*No long-form guide is written for \{\{ activeSpace\.label \}\} yet/);
    });
});
