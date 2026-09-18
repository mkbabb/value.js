// SERVED MODEL: claude-opus-5[1m]
/**
 * ════════════════════════════════════════════════════════════════════════════
 * X.W1.b · THE MODALITY MATRIX, RUN AGAINST THE ROUTE CENSUS (R34, NG-11, G-10)
 * ════════════════════════════════════════════════════════════════════════════
 *
 * R34's CURE-SHAPE LOCK, verbatim: *"the visual/oracle re-gate must run modality
 * matrices **against the route census, not a 5-route sample**."*
 *
 * What is being cured, measured at the bytes (see `census.ts` for the commands):
 * SIX shipped modality arms — forced-colors-desktop, keyboard-focus-desktop,
 * reduced-motion-desktop, rtl-desktop, rtl-mobile, zoom-200-desktop — each
 * holding THE SAME five routes: adminusers, blob, browse, gradient, picker. One
 * coverage defect, not six footnotes; R-28 calls it *"the structural reason
 * R-2/R-7/R-13/R-21 survived to be found here."* Every arm below runs all 14.
 *
 * ─── R36: AN EMULATED MODALITY IS LABELLED EMULATION ────────────────────────
 *
 * The single most falsifiable claim a modality matrix can make is that it
 * witnessed a modality it only emulated. R36 sharpens G-10 with exactly that:
 * *"an EMULATED modality is labelled emulation and does not discharge a
 * real-modality obligation (real WHCM ≠ WebKit-emulated forced colors)."* The
 * ten-cell roster in `capture.mjs`/`states.mjs` makes the same rule mechanical —
 * *"a chromium emulation labelled as WHC is the I-20 failure by name"*.
 *
 * So every arm below carries a `fidelity`, it lands in the golden's own
 * filename, and the two emulated arms say so:
 *
 *   forced-colors  EMULATED — this is `chromium/emulated-forced-colors`. It is
 *                  NOT `windows/real-HCM`. EC-8 residue 8's ask — *"a real
 *                  forced-colors cell belongs in X-W1's golden matrix"* — is
 *                  NOT discharged by these cells, and the caveat register says
 *                  so in as many words (IC-6). What IS discharged is the
 *                  ROUTE-CENSUS half: the arm now covers 14 routes instead of 5,
 *                  so EC-8's and MX-17's roster mis-aims are at least visible on
 *                  every surface that carries them.
 *   zoom-200       EMULATED — 200% zoom simulated as a half viewport at 2× DPR,
 *                  the mechanism `states.mjs` uses and names. Real browser zoom
 *                  is not the same transform; this reproduces the CSS-pixel
 *                  consequence (reflow at 1.4.4's threshold) and nothing more.
 *
 * The other four are REAL in this cell: `reducedMotion` and `dir="rtl"` are the
 * genuine signals the product reads, and the keyboard arm presses real keys.
 *
 * ─── Scheme ─────────────────────────────────────────────────────────────────
 *
 * Modality arms run at ONE scheme (light). The light/dark axis is exhausted at
 * 110 at-rest cells; what a modality arm adds is the modality's effect on layout
 * and affordance, which is not scheme-dependent — and under forced-colors the
 * app's own colours are overridden outright, so a second scheme would be two
 * names for one frame. L-19 forbids minting a cell that carries no consumer
 * information, and this is that rule applied, not a retreat from the census:
 * R34's defect was the ROUTE axis, and the route axis here is complete.
 */
import { ROUTE_CENSUS } from "./census";
import {
    applyRtl,
    gotoRoute,
    seedAdmin,
    seedScheme,
    tabTo,
    requireQuiescence,
} from "./capture";
import { visualTest as test } from "./fixtures";

interface Modality {
    readonly id: string;
    readonly viewport: string;
    readonly fidelity: "real" | "emulated";
    /** The capture geometry, for the half-pixel tie guard (see IC-11). */
    readonly size: { width: number; height: number };
    readonly use: Parameters<typeof test.use>[0];
    /** Applied after the route has loaded and quiesced. */
    readonly after?: "rtl" | "tab";
    readonly note: string;
}

const MODALITIES: readonly Modality[] = [
    {
        id: "zoom-200-desktop",
        viewport: "720x450@2",
        fidelity: "emulated",
        size: { width: 720, height: 450 },
        use: { viewport: { width: 720, height: 450 }, deviceScaleFactor: 2 },
        note: "200% zoom simulated as half-viewport at 2x DPR — WCAG 1.4.4 reflow (states.mjs)",
    },
    {
        id: "reduced-motion-desktop",
        viewport: "1024",
        fidelity: "real",
        size: { width: 1024, height: 768 },
        use: { viewport: { width: 1024, height: 768 }, reducedMotion: "reduce" },
        note: "prefers-reduced-motion: reduce — the genuine media feature the product reads",
    },
    {
        id: "forced-colors-desktop",
        viewport: "1024",
        fidelity: "emulated",
        size: { width: 1024, height: 768 },
        use: { viewport: { width: 1024, height: 768 }, forcedColors: "active" },
        note: "EMULATED. chromium/emulated-forced-colors, NOT windows/real-HCM (R36, EC-8 residue 8)",
    },
    {
        id: "rtl-desktop",
        viewport: "1024",
        fidelity: "real",
        size: { width: 1024, height: 768 },
        use: { viewport: { width: 1024, height: 768 } },
        after: "rtl",
        note: 'dir="rtl" applied POST-load (MT-F022) — witnesses R54/R-21 physical-inset pins',
    },
    {
        id: "rtl-mobile",
        viewport: "390",
        fidelity: "real",
        size: { width: 390, height: 844 },
        use: { viewport: { width: 390, height: 844 } },
        after: "rtl",
        note: 'dir="rtl" at mobile width — the second half of R-21\'s NO-WAVE-OWNER witness',
    },
    {
        id: "keyboard-focus-desktop",
        viewport: "1024",
        fidelity: "real",
        size: { width: 1024, height: 768 },
        use: { viewport: { width: 1024, height: 768 } },
        after: "tab",
        note: "12 Tab presses, chromium — the engine MT-F022 requires before believing a focus gap",
    },
];

for (const modality of MODALITIES) {
    test.describe(`${modality.id} · ${modality.note}`, () => {
        test.use(modality.use);

        for (const route of ROUTE_CENSUS) {
            test(`${route.id}`, async ({ page, visual }) => {
                if (route.admin) await seedAdmin(page.context());
                await seedScheme(page.context(), "light");
                await page.emulateMedia({ colorScheme: "light" });

                await gotoRoute(page, route.path);

                if (modality.after === "rtl") await applyRtl(page);
                if (modality.after === "tab") await tabTo(page);
                await requireQuiescence(page, test.info().title);

                await visual.shot(page, {
                    arm: modality.id,
                    subject: route.id,
                    pane: "both",
                    viewport: modality.viewport,
                    scheme: "light",
                    fidelity: modality.fidelity,
                    capture: modality.size,
                });
            });
        }
    });
}
