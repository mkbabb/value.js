import {
    userTest as test,
    expect,
} from "/Users/mkbabb/Programming/value.js/e2e/smoke/fixtures/user-auth";
import type { Page } from "@playwright/test";

const P1 = {
    slug: "shady-spam",
    name: "Shady Spam",
    colors: [{ css: "#f00" }],
    userSlug: "spammer",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

async function seed(page: Page) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ data: [P1], total: 1, limit: 50, offset: 0 }),
        }),
    );
}

const DIR =
    "/private/tmp/claude-504/-Users-mkbabb-Programming-value-js/6614e90c-8bd6-434f-b017-5ad4277c6e5e/scratchpad/";

const probe = () => {
    const d = document.querySelector('[data-slot="dialog-content"]');
    const menu = document.querySelector('[data-slot="dropdown-menu-content"]');
    const pick = (el: Element | null) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return {
            state: el.getAttribute("data-state"),
            filter: cs.filter,
            backdropFilter: cs.backdropFilter,
            opacity: cs.opacity,
            scale: cs.scale,
            translate: cs.translate,
            transform: cs.transform,
            zIndex: cs.zIndex,
            rect: { x: +r.x.toFixed(0), y: +r.y.toFixed(0), w: +r.width.toFixed(0), h: +r.height.toFixed(0) },
        };
    };
    return {
        dialog: pick(d),
        menu: pick(menu),
        openMenus: document.querySelectorAll('[role="menu"]').length,
        transitions: (d as HTMLElement)?.getAnimations?.().map((a) => ({
            type: a.constructor.name,
            playState: a.playState,
            prop: (a as any).transitionProperty ?? (a as any).animationName,
            currentTime: a.currentTime,
        })),
    };
};

test("P11: settle trace of the reveal transition", async ({ page }) => {
    await seed(page);
    await page.goto("/#/browse");
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main.getByRole("button", { name: "Palette menu" }).first().click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();

    for (const t of [100, 400, 1000, 2500, 5000]) {
        await page.waitForTimeout(t === 100 ? 100 : t - 0);
        console.log(`=== t~${t} ===\n` + JSON.stringify(await page.evaluate(probe)));
    }
    await page.screenshot({ path: DIR + "flag-t5000.png" });
    await page.locator('[data-slot="dialog-content"]').screenshot({
        path: DIR + "flag-elem-only.png",
    });
});
