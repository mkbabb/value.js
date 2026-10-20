import type { Page } from "@playwright/test";
import { adminPopulatedTest as test, expect } from "./fixtures/admin-populated";

/**
 * SS-8 · B18-admin-panels — the REFUTED consumer rows, read off the frame
 * (packet `docs/tranches/X/execution/SS8/packets/B18-admin-panels.md`).
 *
 * CURES (red before the cure, green after):
 *   SS8-0514  the Audit loading shadows hold the rows' rhythm: the shadow list's
 *             gap is the row list's gap (the height limb is fixme'd: it rides
 *             AdminListSkeleton's column, another seat's uncommitted hunk).
 * PINS (already cured at HEAD; the witness's figures, kept from regressing):
 *   SS8-0529  at coarse 390 the Tags create placeholders fit their fields (the
 *             106.2-in-104 residue did not reproduce on the 2026-10-20 tree:
 *             "Category..." 80.9 px in a 186 px box).
 *   SS8-0509  a ~6 KB batch target never widens its row past the track (320).
 *   SS8-0510/0515  no empty flex-1 spacer; the count + Refresh cluster ends the
 *             toolbar at 390.
 *   SS8-0513  Audit Refresh is 28×28 fine, 44×44 coarse.
 *   SS8-0523  the flag badge renders at `--type-small` (no caption size).
 *   SS8-0524  coarse 390 Flagged controls are ≥ 44 px (Chromium arm).
 *   SS8-0526  no repeating admin poll; a query before the hash still routes.
 */

const NOW = "2026-07-05T00:00:00.000Z";
const WORST =
    "count=50 slugs=" +
    Array.from({ length: 50 }, (_, i) => `palette-slug-${i}-` + "q".repeat(100)).join(",");

const audit = (target = "sunset-riot-9a3f") =>
    JSON.stringify({
        data: [
            { id: "a1", timestamp: NOW, action: "palette.feature", target, ipHash: "ip-1" },
            { id: "a2", timestamp: NOW, action: "user.delete", target: "spammer-42", ipHash: "ip-2" },
            { id: "a3", timestamp: NOW, action: "flag.dismiss", target: "neon-haze-1b2c", ipHash: "ip-3" },
        ],
        total: 3,
        limit: 50,
        offset: 0,
    });

/** Answer `GET /admin/audit` only when `release()` is called (registered after the fixture, so it wins). */
async function holdAudit(page: Page, body = audit()) {
    let release!: () => void;
    const gate = new Promise<void>((r) => (release = r));
    await page.route(
        (u) => u.pathname.startsWith("/admin/audit"),
        async (route) => {
            await gate;
            await route.fulfill({ status: 200, contentType: "application/json", body });
        },
    );
    return release;
}

const PANE = (id: string) => `[data-pane="admin-${id}"]`;

/** The Audit shadows (held first load) and then the released rows, measured. */
async function shadowsVsRows(page: Page) {
    const release = await holdAudit(page);
    await page.goto("/#/admin/audit");
    const status = page.locator(`${PANE("audit")} [role="status"][aria-label="Loading audit log"]`);
    await status.waitFor();
    const skel = await status.evaluate((st) => {
        const k = [...st.children].map((e) => e.getBoundingClientRect());
        return { h: k.map((b) => b.height), gaps: k.slice(1).map((b, i) => b.top - k[i]!.bottom) };
    });
    release();
    const firstRow = page.locator(`${PANE("audit")} .min-w-0.flex.items-center.rounded-md.border-card-edge`).first();
    await firstRow.waitFor();
    const rows = await page.locator(`${PANE("audit")} .min-w-0.flex.items-center.rounded-md.border-card-edge`).evaluateAll((es) => {
        const k = es.map((e) => e.getBoundingClientRect());
        return { h: k.map((b) => b.height), gaps: k.slice(1).map((b, i) => b.top - k[i]!.bottom) };
    });
    console.log("SS8-0514", JSON.stringify({ skel, rows }));
    return { skel, rows };
}

test.describe("SS8-0514 · Audit shadows keep the row rhythm", () => {
    test("shadow gap = row gap", async ({ page }) => {
        // First in a run, the lazy admin chunk's cold dev transform alone has
        // spent the 30 s budget (observed twice); the measurement is unchanged.
        test.slow();
        const { skel, rows } = await shadowsVsRows(page);
        for (const g of skel.gaps) expect(Math.abs(g - rows.gaps[0]!)).toBeLessThanOrEqual(0.5);
    });
    // The height limb rides AdminListSkeleton's column, held by the B17 seat's
    // uncommitted SS8-0487 hunk (blockedByDirty); un-fixme when that lands.
    test.fixme("shadow height = row height", async ({ page }) => {
        const { skel, rows } = await shadowsVsRows(page);
        for (const h of skel.h) expect(Math.abs(h - rows.h[0]!)).toBeLessThanOrEqual(1);
    });
});

/** Placeholder text width (the input's own font) vs the field's content box. */
async function placeholderFit(page: Page, label: string) {
    return page.locator(`input[aria-label="${label}"]`).evaluate((el: HTMLInputElement) => {
        const cs = getComputedStyle(el);
        const ctx = document.createElement("canvas").getContext("2d")!;
        ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
        const text = ctx.measureText(el.placeholder).width;
        const box = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        return {
            text: +text.toFixed(1),
            box: +box.toFixed(1),
            field: +el.getBoundingClientRect().width.toFixed(1),
            coarse: matchMedia("(pointer: coarse)").matches,
            uiScale: getComputedStyle(document.documentElement).getPropertyValue("--ui-scale").trim(),
        };
    });
}

test.describe("coarse 390", () => {
    test.use({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

    test("SS8-0529 · the Tags create placeholders fit their fields", async ({ page }) => {
        await page.goto("/#/admin/tags");
        await page.locator('input[aria-label="New tag category"]').waitFor();
        for (const label of ["New tag name", "New tag category"]) {
            const fit = await placeholderFit(page, label);
            console.log("SS8-0529", label, JSON.stringify(fit));
            expect(fit.text, label).toBeLessThanOrEqual(fit.box);
        }
    });

    test("SS8-0513 · Audit Refresh is 44×44 coarse", async ({ page }) => {
        await page.goto("/#/admin/audit");
        const b = await page.getByRole("button", { name: "Refresh audit log" }).boundingBox();
        expect([Math.round(b!.width), Math.round(b!.height)]).toEqual([44, 44]);
    });

    test("SS8-0524 · Flagged Dismiss and delete are ≥ 44 px (Chromium arm)", async ({ page }) => {
        await page.goto("/#/admin/flagged");
        const dismiss = page.getByRole("button", { name: /^Dismiss/ }).first();
        await dismiss.waitFor();
        const d = await dismiss.boundingBox();
        const del = await page.getByRole("button", { name: /^Delete/ }).first().boundingBox();
        expect(d!.height).toBeGreaterThanOrEqual(44);
        expect(Math.min(del!.width, del!.height)).toBeGreaterThanOrEqual(44);
    });
});

test.describe("fine pointer pins", () => {
    test("SS8-0509 · a ~6 KB target never widens its row past the track (320)", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        const release = await holdAudit(page, audit(WORST));
        release();
        await page.goto("/#/admin/audit");
        const row = page.locator(`${PANE("audit")} .min-w-0.flex.items-center.rounded-md.border-card-edge`).first();
        await row.waitFor();
        const m = await row.evaluate((r) => ({
            row: r.getBoundingClientRect().width,
            track: r.parentElement!.getBoundingClientRect().width,
            cw: r.clientWidth,
            sw: r.scrollWidth,
        }));
        // The defect is a row ~22,000 px past its track; a row mid-arrival reads
        // up to 3 px INSIDE it, so only the widening direction is bounded.
        expect(m.row - m.track).toBeLessThanOrEqual(1);
        expect(m.sw).toBeLessThanOrEqual(m.cw);
    });

    test("SS8-0510/0515 · no flex-1 spacer; the count + Refresh cluster ends the toolbar at 390", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto("/#/admin/audit");
        const refresh = page.getByRole("button", { name: "Refresh audit log" });
        await page.locator(`${PANE("audit")} .min-w-0.flex.items-center.rounded-md`).first().waitFor();
        const m = await refresh.evaluate((btn) => {
            const toolbar = btn.parentElement!.parentElement!;
            const kids = [...toolbar.children];
            return {
                emptySpacers: kids.filter((k) => k.childElementCount === 0 && !k.textContent!.trim()).length,
                gapToEnd: toolbar.getBoundingClientRect().right - btn.getBoundingClientRect().right,
            };
        });
        expect(m.emptySpacers).toBe(0);
        expect(m.gapToEnd).toBeLessThanOrEqual(0.5);
    });

    test("SS8-0513 · Audit Refresh is 28×28 fine", async ({ page }) => {
        await page.goto("/#/admin/audit");
        const b = await page.getByRole("button", { name: "Refresh audit log" }).boundingBox();
        expect([Math.round(b!.width), Math.round(b!.height)]).toEqual([28, 28]);
    });

    test("SS8-0523 · the flag badge renders at --type-small", async ({ page }) => {
        await page.goto("/#/admin/flagged");
        const badge = page.locator(`${PANE("flagged")} [data-slot="badge"]`).first();
        await badge.waitFor();
        const m = await badge.evaluate((b) => {
            const probe = document.createElement("span");
            probe.style.fontSize = "var(--type-small)";
            document.body.append(probe);
            const small = getComputedStyle(probe).fontSize;
            probe.remove();
            return { badge: getComputedStyle(b).fontSize, small };
        });
        expect(m.badge).toBe(m.small);
    });

    test("SS8-0526 · no repeating admin poll; a query before the hash still routes", async ({ page }) => {
        const reqs: string[] = [];
        page.on("request", (r) => {
            if (new URL(r.url()).pathname.startsWith("/admin/")) reqs.push(r.url());
        });
        await page.goto("/?utm=x&q=1#/admin/flagged");
        await expect(page.locator(PANE("flagged"))).toBeVisible();
        await page.waitForTimeout(1500);
        const settled = reqs.length;
        await page.waitForTimeout(5000);
        expect(reqs.length).toBe(settled);
    });
});
