// SERVED MODEL: claude-opus-5-5[1m]
import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { regionSettled } from "../fixtures/settle";
import { expandDock } from "../fixtures/dock";
import { detectRenderer, isSoftwareGL } from "../perf/frame-budget";

/**
 * X-W6 · X.W6.j — THE FOUR SCENE CONTRACTS (CC-056 · V·L3; CC-057 · V·L4).
 * `W6.md` §5 `.j` (j1–j4), re-pointed from `o27-…` to this file by the
 * 2026-09-19 ADDENDUM (the o27 ordinal ships `o27-focus-affordance`).
 *
 * A scene is X-W5's contract, adopted here route by route — never authored:
 * the route resolves ONE `VIEW_MAP` row (`demo/shell/viewSchema.ts`), whose
 * ordered regions mount as `role="region"` slots named by their label
 * (`App.vue` `.pane-wrapper--<role>`), and whose commands reach the dock as
 * X-W4's typed `SceneActionSet` (`usePaneRouter.sceneActions`). The router's
 * `component: Stub` records are X-W5's ruled shape (the route NAME drives the
 * scene), so "a routed scene" is read at the DOM the scene contract produces,
 * never at the router table.
 *
 *   j1 · gradient scene   — the Gradient stage owns its authoring stage, its
 *                           selected-stop inspector and its stable actions.
 *   j2 · mix canary       — one interaction owner, no nested interactive
 *                           controls, the 2D canvas's lifetime bound to the
 *                           scene (asserted after route-away).
 *   j3 · preview survives — Blob and Atmosphere repaint after a forced WebGL
 *                           context loss + restore.
 *   j4 · short landscape  — at 720×450 the last control and the preview are
 *                           both reachable.
 *
 * MOTION-SOURCED assertions (the j2 narration clock) cite the motion
 * quarantine record `docs/tranches/V/megatranche/audit/codex-provenance/
 * motion-quarantine.md` (tracked `9812f951`, W6.md H2) and assert no motion
 * PROPERTY — only that a clock stops drawing when its scene leaves. The
 * pane transitions are X-W5's (CC-054/CC-055) and are only WAITED on here,
 * through the one settle helper (`fixtures/settle.ts`).
 */

async function openScene(page: Page, hash: string, stageLabel: string) {
    await page.goto(`/#/${hash}`);
    const stage = page.locator(`.pane-wrapper--stage[role="region"]`);
    await expect(stage).toHaveAttribute("aria-label", stageLabel, { timeout: 20_000 });
    await regionSettled(stage);
    return stage;
}

/** An ACTIVATING control — what a press or a key drives. A bare
 *  `tabindex="0"` scroll container (the specimen strip's keyboard-scroll
 *  affordance) is focusable but activates nothing, so it is not one. */
const INTERACTIVE =
    'button, input, select, textarea, a[href], [role="button"], [role="slider"], [role="combobox"], [role="switch"], [role="tab"], [role="checkbox"], [role="menuitem"], [role="option"]';

// ── shared readings ─────────────────────────────────────────────────────────

/** The scene's regions as the shell mounted them, IN ORDER: `role:label`. */
async function regionsOf(page: Page): Promise<string[]> {
    return page.locator('.pane-container [role="region"]').evaluateAll((els) =>
        els.map((el) => {
            const role = [...el.classList]
                .find((c) => c.startsWith("pane-wrapper--"))
                ?.slice("pane-wrapper--".length);
            return `${role}:${el.getAttribute("aria-label")}`;
        }),
    );
}

/** Every interactive control that sits INSIDE another interactive control
 *  within `scope` — a nested control is a second owner of its host's gesture
 *  (the host's activation and the inner control's both fire on one press). */
async function nestedControls(
    scope: import("@playwright/test").Locator,
): Promise<string[]> {
    return scope.evaluate((root, sel) => {
        const out: string[] = [];
        for (const el of root.querySelectorAll(sel)) {
            const host = el.parentElement?.closest(sel);
            if (host && root.contains(host))
                out.push(
                    `${el.tagName.toLowerCase()}[${el.getAttribute("aria-label") ?? el.getAttribute("role") ?? ""}] inside ${host.tagName.toLowerCase()}[${host.getAttribute("aria-label") ?? host.getAttribute("role") ?? ""}]`,
                );
        }
        return out;
    }, INTERACTIVE);
}

/** Open the dock's action row (the X-W4 `SceneActionSet` render path) and read
 *  its seats as `token=state`. */
async function sceneSeats(page: Page): Promise<string[]> {
    await expandDock(page);
    const toggle = page.getByRole("button", { name: "Toggle action bar" });
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator(".glass-dock[data-morphing]")).toHaveCount(0, {
        timeout: 8000,
    });
    return page
        .locator('[data-testid="scene-action-row"] [data-scene-action]')
        .evaluateAll((els) =>
            els.map(
                (el) =>
                    `${el.getAttribute("data-scene-action")}=${el.getAttribute("data-action-state")}`,
            ),
        );
}

// ── j1 · gradient scene (the pilot) ─────────────────────────────────────────

test("gradient scene — the Gradient stage owns its authoring stage, its selected-stop inspector and its stable actions", async ({
    page,
}, testInfo) => {
    testInfo.setTimeout(90_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    const stage = await openScene(page, "gradient", "Gradient");

    // The route resolves ONE scene row: the Gradient stage, the Palettes companion.
    expect(await regionsOf(page)).toEqual(["stage:Gradient", "inspector:Palettes"]);

    // STAGE: the authoring surface lives in the stage and nowhere else.
    const rail = stage.getByTestId("gradient-stop-bar");
    await expect(rail).toHaveCount(1);
    await expect(page.getByTestId("gradient-stop-bar")).toHaveCount(1);
    await expect(stage.getByTestId("gradient-render-tile")).toHaveCount(1);

    // INSPECTOR: selecting a stop makes the ONE inspector its subject.
    await rail.scrollIntoViewIfNeeded();
    const handles = rail.locator("[data-stop-id]");
    const before = await handles.count();
    const box = (await rail.boundingBox())!;
    await rail.click({ position: { x: box.width * 0.5, y: box.height / 2 } });
    await expect(handles).toHaveCount(before + 1);
    await handles.nth(1).click();
    await expect(page.getByTestId("gradient-stop-inspector")).toHaveCount(1);
    await expect(stage.getByTestId("gradient-stop-inspector")).toContainText(
        `Stop 2 of ${before + 1}`,
    );

    // ONE OWNER PER GESTURE: no control in the stage hosts another control.
    expect(await nestedControls(stage)).toEqual([]);

    // STABLE ACTION: the dock renders the scene's typed set, every seat bound
    // to the registered pane — and the seat drives THAT pane (reset returns
    // the stop the rail just minted).
    expect(await sceneSeats(page)).toEqual([
        "gradient.reset=ready",
        "gradient.copyCSS=ready",
        "gradient.seedFromPalette=ready",
    ]);
    await page.locator('[data-scene-action="gradient.reset"] button').click();
    await expect(handles).toHaveCount(before);
});

// ── j2 · mix canary ─────────────────────────────────────────────────────────

/** Two saved local palettes, so the Mix pane's palettes mode has subjects. */
const SEED_PALETTES = {
    version: 1,
    palettes: ["Dawn", "Dusk"].map((name, i) => ({
        id: `o29-${i}`,
        name,
        slug: `o29-${name.toLowerCase()}`,
        colors: (i === 0
            ? ["#ff5a36", "#ffd166", "#06d6a0"]
            : ["#3a0ca3", "#4361ee", "#4cc9f0"]
        ).map((css, position) => ({ css, position })),
        createdAt: "2026-09-23T00:00:00.000Z",
        updatedAt: "2026-09-23T00:00:00.000Z",
        isLocal: true,
    })),
};

/** Instrument every 2D context the page creates: `__ops` counts the frames
 *  it clears (the narration clock clears once per tick), so a context that
 *  keeps counting after its scene left is a clock that outlived its scene. */
function track2dContexts(): void {
    const w = window as unknown as { __ctx2d: CanvasRenderingContext2D[] };
    w.__ctx2d = [];
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
        this: HTMLCanvasElement,
        type: string,
        ...rest: unknown[]
    ) {
        const ctx = (getContext as (...a: unknown[]) => unknown).call(
            this,
            type,
            ...rest,
        );
        if (
            type === "2d" &&
            ctx &&
            !w.__ctx2d.includes(ctx as CanvasRenderingContext2D)
        ) {
            // Attributed at CREATION, while the canvas still sits in its region:
            // a route-away detaches it (KeepAlive parks the subtree), after
            // which no selector can find it.
            (ctx as { __mix?: boolean }).__mix =
                this.closest('[role="region"][aria-label="Mix"]') !== null;
            w.__ctx2d.push(ctx as CanvasRenderingContext2D);
        }
        return ctx;
    } as typeof HTMLCanvasElement.prototype.getContext;
    const clearRect = CanvasRenderingContext2D.prototype.clearRect;
    CanvasRenderingContext2D.prototype.clearRect = function (
        this: CanvasRenderingContext2D & { __ops?: number },
        ...a: [number, number, number, number]
    ) {
        this.__ops = (this.__ops ?? 0) + 1;
        return clearRect.apply(this, a);
    };
}

/** The mix narration's contexts: every tracked 2D context whose canvas is (or
 *  was, before a route-away detached it) the Mix pane's decorative overlay. */
async function mixContexts(page: Page): Promise<{ ops: number; backing: number }[]> {
    return page.evaluate(() =>
        (
            window as unknown as {
                __ctx2d: (CanvasRenderingContext2D & {
                    __ops?: number;
                    __mix?: boolean;
                })[];
            }
        ).__ctx2d
            .filter((ctx) => ctx.__mix === true)
            .map((ctx) => ({
                ops: ctx.__ops ?? 0,
                backing: ctx.canvas.width * ctx.canvas.height,
            })),
    );
}

test("mix canary — one interaction owner, no nested controls, the narration canvas bound to its scene", async ({
    page,
}, testInfo) => {
    testInfo.setTimeout(120_000);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript((seed) => {
        localStorage.setItem("color-palettes", JSON.stringify(seed));
    }, SEED_PALETTES);
    await page.addInitScript(track2dContexts);
    await openScene(page, "mix", "Picker");
    const mix = page.locator(
        '.pane-wrapper--inspector[role="region"][aria-label="Mix"]',
    );
    await regionSettled(mix);

    // ONE OWNER: no control in the Mix scene hosts another — in either mode.
    expect.soft(await nestedControls(mix), "colors mode").toEqual([]);
    await mix.getByRole("button", { name: "Palettes", exact: true }).click();
    const dawn = mix.getByRole("button", { name: /palette Dawn/ });
    const dusk = mix.getByRole("button", { name: /palette Dusk/ });
    await expect(dawn).toBeVisible();
    expect.soft(await nestedControls(mix), "palettes mode").toEqual([]);

    // The palette choice is ONE owner's toggle: the pressed state is the
    // button's own, and a press toggles it — never a nested card's machine.
    await dawn.click();
    await expect(dawn).toHaveAttribute("aria-pressed", "true");
    await dawn.click();
    await expect(dawn).toHaveAttribute("aria-pressed", "false");

    // CANVAS LIFETIME. Start a narration (palettes mode: two real sources —
    // the colors-mode add seats are the WatercolorDot impostor seats, MX-3,
    // routed to X.W4.g), route away mid-flight, and read the context the
    // narration drew with. MOTION-SOURCED (motion-quarantine.md, W6.md H2): no
    // motion PROPERTY is asserted — only that the clock drew, and that it stops
    // drawing, and holds no pixels, once its scene has left.
    await dawn.click();
    await dusk.click();
    await mix.getByRole("button", { name: "Mix", exact: true }).click();
    await expect
        .poll(async () => (await mixContexts(page)).reduce((n, c) => n + c.ops, 0), {
            message: "the narration never drew",
            timeout: 5_000,
            intervals: [16],
        })
        .toBeGreaterThan(0);

    // Route away while the narration is in flight (its window is 1.2 s). The
    // region's LABEL flips at once, but the Mix pane is still on screen in its
    // leave transition (X-W5's `out-in`), where drawing is honest; the scene
    // has LEFT when its canvas has left the document (KeepAlive parks the
    // subtree off-document at deactivation, an unmount removes it).
    await page.evaluate(() => (location.hash = "#/gradient"));
    await expect(
        page.locator('.pane-wrapper--inspector[role="region"]'),
    ).toHaveAttribute("aria-label", "Palettes");
    await expect
        .poll(() =>
            page.evaluate(() =>
                (
                    window as unknown as {
                        __ctx2d: (CanvasRenderingContext2D & { __mix?: boolean })[];
                    }
                ).__ctx2d.some((ctx) => ctx.__mix === true && ctx.canvas.isConnected),
            ),
        )
        .toBe(false);
    const left = await mixContexts(page);
    await page.waitForTimeout(1_500);
    const later = await mixContexts(page);
    expect
        .soft(
            later.map((c) => c.ops),
            "a narration clock outlived its scene",
        )
        .toEqual(left.map((c) => c.ops));
    expect
        .soft(
            later.map((c) => c.backing),
            "a narration backing store outlived its scene",
        )
        .toEqual(later.map(() => 0));

    // The phase machine is not stranded: back on Mix, the result stands inked.
    await page.evaluate(() => (location.hash = "#/mix"));
    await regionSettled(mix);
    await expect(mix.locator(".mix-plate")).toBeVisible();
    await expect(mix.locator(".mix-plate--ghost")).toHaveCount(0);
});

// ── j3 · preview survives ───────────────────────────────────────────────────

/** Count WebGL draws per canvas (`__draws` on the element), installed before
 *  any context exists: a preview has REPAINTED when its canvas draws again. */
function trackWebglDraws(): void {
    for (const proto of [
        WebGL2RenderingContext.prototype,
        WebGLRenderingContext.prototype,
    ]) {
        for (const name of ["drawArrays", "drawElements"] as const) {
            const draw = proto[name] as (...a: unknown[]) => void;
            (proto as unknown as Record<string, unknown>)[name] = function (
                this: WebGLRenderingContext,
                ...a: unknown[]
            ) {
                const c = this.canvas as HTMLCanvasElement & { __draws?: number };
                c.__draws = (c.__draws ?? 0) + 1;
                return draw.apply(this, a);
            };
        }
    }
}

/** Force the loss through the context's own extension (`WEBGL_lose_context`),
 *  the same event a GPU reset delivers; `restore` hands it back. */
async function loseContext(page: Page, selector: string, act: "lose" | "restore") {
    await page
        .locator(selector)
        .first()
        .evaluate((canvas, which) => {
            const c = canvas as HTMLCanvasElement & { __loser?: WEBGL_lose_context };
            if (which === "lose") {
                const gl =
                    (c.getContext("webgl2") as WebGL2RenderingContext | null) ??
                    (c.getContext("webgl") as WebGLRenderingContext | null);
                if (!gl) throw new Error("the preview holds no WebGL context");
                const ext = gl.getExtension("WEBGL_lose_context");
                if (!ext) throw new Error("WEBGL_lose_context is not exposed");
                c.__loser = ext;
                ext.loseContext();
            } else {
                c.__loser!.restoreContext();
            }
        }, act);
}

const draws = (page: Page, selector: string) =>
    page
        .locator(selector)
        .first()
        .evaluate((c) => (c as HTMLCanvasElement & { __draws?: number }).__draws ?? 0);

for (const [hash, stageLabel, selector] of [
    ["blob", "Picker", '[data-testid="goo-blob-canvas"]'],
    ["atmosphere", "Atmosphere", '[data-testid="atmosphere-canvas"]'],
] as const) {
    test(`preview survives — ${hash}: the preview repaints after a forced WebGL context loss`, async ({
        page,
    }, testInfo) => {
        testInfo.setTimeout(90_000);
        await page.setViewportSize({ width: 1440, height: 900 });
        await page.addInitScript(trackWebglDraws);
        await openScene(page, hash, stageLabel);
        const canvas = page.locator(selector).first();
        await expect(canvas).toBeAttached({ timeout: 15_000 });

        if (hash === "atmosphere") {
            // The atmosphere's SUBSTRATE is the producer's device-tier law
            // (`resolveRenderMode("auto")`, `useAtmosphere.ts:158`): a software
            // rasteriser takes the `"css"` substrate — a complete CSS render of
            // the same derived palette, with NO GL surface — and a real GPU takes
            // WebGL2. The substrate is read at the canvas (the CSS render is its
            // inline `background-image`) and must agree with the renderer, so
            // neither branch can be entered by accident.
            const renderer = await detectRenderer(page);
            const css = await canvas.evaluate(
                (c) => (c as HTMLCanvasElement).style.backgroundImage !== "",
            );
            expect(css, `substrate vs renderer '${renderer}'`).toBe(
                isSoftwareGL(renderer),
            );
            if (css) {
                // No context exists, so no loss can reach the preview: it draws
                // nothing through GL and its CSS render stands complete.
                await page.waitForTimeout(1_000);
                expect(await draws(page, selector)).toBe(0);
                await expect(canvas).toHaveCSS("background-image", /gradient\(/);
                await expect
                    .poll(() =>
                        canvas.evaluate((c) => Number(getComputedStyle(c).opacity)),
                    )
                    .toBeGreaterThan(0);
                return;
            }
        }

        // WEBGL_lose_context acts on a WebGL surface only. On a real GPU both
        // previews take glass's WebGPU substrate, whose only page-forcible
        // loss (`GPUDevice.destroy()`, reason "destroyed") the producer treats
        // as terminal by design — so that cell cannot witness this arm, and it
        // says so here rather than passing on a surface it never lost.
        await expect
            .poll(() => draws(page, selector), {
                timeout: 15_000,
                message:
                    "the preview draws through no WebGL context (not a WebGL substrate)",
            })
            .toBeGreaterThan(0);

        await loseContext(page, selector, "lose");
        await expect
            .poll(() =>
                canvas.evaluate((c) => {
                    const gl =
                        (c as HTMLCanvasElement).getContext("webgl2") ??
                        (c as HTMLCanvasElement).getContext("webgl");
                    return gl?.isContextLost() ?? null;
                }),
            )
            .toBe(true);
        const atLoss = await draws(page, selector);

        await loseContext(page, selector, "restore");
        // REPAINT: the context is back, the renderer draws into it again, and
        // the preview is shown (the atmosphere rests at opacity 0 on its
        // ground while lost — `useAtmosphere` — and must come back).
        await expect
            .poll(() =>
                canvas.evaluate((c) => {
                    const gl =
                        (c as HTMLCanvasElement).getContext("webgl2") ??
                        (c as HTMLCanvasElement).getContext("webgl");
                    return gl?.isContextLost() ?? null;
                }),
            )
            .toBe(false);
        await expect
            .poll(() => draws(page, selector), {
                timeout: 15_000,
                message: "no repaint after restore",
            })
            .toBeGreaterThan(atLoss);
        await expect
            .poll(() => canvas.evaluate((c) => Number(getComputedStyle(c).opacity)), {
                timeout: 10_000,
                message: "the preview stays hidden after restore",
            })
            .toBeGreaterThan(0);
    });
}

// ── j4 · short landscape ────────────────────────────────────────────────────

interface Reach {
    label: string;
    inViewport: boolean;
    hit: boolean;
    rect: { x: number; y: number; w: number; h: number };
}

/** The scene's LAST control, in DOM order across its regions, scrolled to and
 *  hit-tested: reachable = its centre sits inside the viewport AND the topmost
 *  element there is the control (or inside it) — nothing (the dock, a sibling
 *  region, the fold) occludes it. */
async function lastControlReach(page: Page): Promise<Reach> {
    const handle = await page.evaluateHandle((sel) => {
        const all = [
            ...document.querySelectorAll(`.pane-container [role="region"] :is(${sel})`),
        ].filter((el) => {
            const r = el.getBoundingClientRect();
            return (
                r.width > 0 &&
                r.height > 0 &&
                getComputedStyle(el).visibility !== "hidden"
            );
        });
        return all[all.length - 1] ?? null;
    }, INTERACTIVE);
    const el = handle.asElement();
    expect(el, "the scene has no interactive control at all").not.toBeNull();
    await el!.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    return el!.evaluate((node) => {
        const r = node.getBoundingClientRect();
        const cx = r.x + r.width / 2;
        const cy = r.y + r.height / 2;
        const inViewport = cx >= 0 && cy >= 0 && cx <= innerWidth && cy <= innerHeight;
        const top = inViewport ? document.elementFromPoint(cx, cy) : null;
        return {
            label:
                node.getAttribute("aria-label") ??
                (node.textContent ?? "").trim().slice(0, 40) ??
                node.tagName,
            inViewport,
            hit: !!top && (top === node || node.contains(top)),
            rect: { x: r.x, y: r.y, w: r.width, h: r.height },
        };
    });
}

/** The blob preview is a `pointer-events: none` ORNAMENT painted above its
 *  own card (the stage slot's layer, `shell.css` `.pane-wrapper--stage`), so a
 *  hit-test cannot read its paint order — `elementsFromPoint` skips it and
 *  returns the card beneath. It is read by GEOMETRY: the share of its box that
 *  lies inside the viewport. */
async function boxInViewport(page: Page, selector: string): Promise<number> {
    return page
        .locator(selector)
        .first()
        .evaluate((el) => {
            const r = el.getBoundingClientRect();
            const w = Math.max(0, Math.min(innerWidth, r.right) - Math.max(0, r.left));
            const h = Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top));
            return r.width * r.height ? (w * h) / (r.width * r.height) : 0;
        });
}

/** The atmosphere preview is the GROUND itself (a full-bleed canvas behind the
 *  scene), so "in the viewport" is true by construction and proves nothing. It
 *  is read as the share of an 8px-pitch viewport grid where no region's pane
 *  surface and no nav sits over the field — the gutters and bands where it
 *  shows unglazed. */
async function groundUncovered(page: Page): Promise<number> {
    return page.evaluate(() => {
        let seen = 0;
        let total = 0;
        const PITCH = 8;
        for (let x = PITCH / 2; x < innerWidth; x += PITCH)
            for (let y = PITCH / 2; y < innerHeight; y += PITCH) {
                total++;
                const covered = document
                    .elementsFromPoint(x, y)
                    .some(
                        (el) =>
                            el.closest('.pane-container [role="region"] > *') !==
                                null || el.closest("nav") !== null,
                    );
                if (!covered) seen++;
            }
        return total ? seen / total : 0;
    });
}

const previewReach = (page: Page, hash: "blob" | "atmosphere") =>
    hash === "blob"
        ? boxInViewport(page, '[data-testid="goo-blob-canvas"]')
        : groundUncovered(page);

test.describe("j4 short landscape", () => {
    test.use({ viewport: { width: 720, height: 450 } });

    for (const [hash, stageLabel] of [
        ["blob", "Picker"],
        ["atmosphere", "Atmosphere"],
    ] as const) {
        test(`short landscape — ${hash}: the last control and the preview are both reachable at 720×450`, async ({
            page,
        }) => {
            await openScene(page, hash, stageLabel);
            if (hash === "blob")
                await expect(
                    page.locator('[data-testid="goo-blob-canvas"]'),
                ).toBeAttached({
                    timeout: 15_000,
                });
            const atRest = await previewReach(page, hash);
            const last = await lastControlReach(page);
            const withLast = await previewReach(page, hash);
            console.log(
                `[j4] ${hash} preview@rest=${atRest.toFixed(3)} last="${last.label}" inViewport=${last.inViewport} hit=${last.hit} rect=${JSON.stringify(last.rect)} preview@last=${withLast.toFixed(3)}`,
            );
            expect(
                last.inViewport && last.hit,
                `last control "${last.label}" unreachable`,
            ).toBe(true);
            expect(
                withLast,
                "the preview is not reachable beside the last control",
            ).toBeGreaterThan(0);
        });
    }
});
