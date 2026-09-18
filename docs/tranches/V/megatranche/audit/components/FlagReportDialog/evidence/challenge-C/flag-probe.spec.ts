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
const P2 = {
    slug: "other-palette",
    name: "Other Palette",
    colors: [{ css: "#0f0" }],
    userSlug: "someone-else",
    voteCount: 0,
    voted: false,
    isLocal: false,
};

async function seedTwo(page: Page) {
    await page.route("**/palettes?**", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                data: [P1, P2],
                total: 2,
                limit: 50,
                offset: 0,
            }),
        }),
    );
}

async function openFlagDialog(page: Page, cardIndex: number) {
    const main = page.getByRole("main", { name: "Color tool panes" });
    await expect(main).toBeVisible();
    await main
        .getByRole("button", { name: "Palette menu" })
        .nth(cardIndex)
        .click();
    await page.getByRole("menuitem", { name: /Report/ }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
}

test("P1: a11y + geometry census of the open dialog", async ({ page }) => {
    await seedTwo(page);
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);

    const snap = await page.getByRole("dialog").ariaSnapshot();
    console.log("=== ARIA SNAPSHOT ===\n" + snap);

    const census = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]')!;
        const out: any = { html: dlg.outerHTML.slice(0, 4000), targets: [] };
        const focusables = dlg.querySelectorAll(
            'button,[role="radio"],textarea,input,a[href],[tabindex]',
        );
        focusables.forEach((el) => {
            const r = el.getBoundingClientRect();
            out.targets.push({
                tag: el.tagName,
                role: el.getAttribute("role"),
                id: el.id || null,
                text: (el.textContent ?? "").trim().slice(0, 30),
                w: +r.width.toFixed(1),
                h: +r.height.toFixed(1),
                ariaLabel: el.getAttribute("aria-label"),
                labelledby: el.getAttribute("aria-labelledby"),
            });
        });
        const ta = dlg.querySelector("textarea")!;
        out.textarea = {
            id: ta.id || null,
            name: ta.getAttribute("name"),
            ariaLabel: ta.getAttribute("aria-label"),
            labelledby: ta.getAttribute("aria-labelledby"),
            describedby: ta.getAttribute("aria-describedby"),
            placeholder: ta.placeholder,
            maxlength: ta.maxLength,
            bg: getComputedStyle(ta).backgroundColor,
        };
        const rg = dlg.querySelector('[role="radiogroup"]');
        out.radiogroup = rg
            ? {
                  ariaLabel: rg.getAttribute("aria-label"),
                  labelledby: rg.getAttribute("aria-labelledby"),
                  required: rg.getAttribute("aria-required"),
              }
            : null;
        out.activeElement = {
            tag: document.activeElement?.tagName,
            text: (document.activeElement?.textContent ?? "").trim().slice(0, 40),
        };
        const labels = Array.from(dlg.querySelectorAll("label")).map((l) => ({
            htmlFor: (l as HTMLLabelElement).htmlFor,
            control: (l as HTMLLabelElement).control?.tagName ?? null,
            text: l.textContent?.trim(),
        }));
        out.labels = labels;
        return out;
    });
    console.log("=== CENSUS ===\n" + JSON.stringify(census, null, 2));

    // Label-click activation: does clicking the *text* select the radio?
    await page.locator('label[for="reason-copyright"]').click();
    const checkedAfterLabelClick = await page.evaluate(() =>
        Array.from(document.querySelectorAll('[role="radio"]')).map((r) => ({
            id: r.id,
            checked: r.getAttribute("aria-checked"),
            state: r.getAttribute("data-state"),
        })),
    );
    console.log(
        "=== AFTER LABEL CLICK ===\n" +
            JSON.stringify(checkedAfterLabelClick, null, 2),
    );
});

test("P2: submitting state observability + in-flight affordance", async ({
    page,
}) => {
    await seedTwo(page);
    let posts = 0;
    await page.route("**/palettes/shady-spam/flag", async (route) => {
        posts++;
        await new Promise((r) => setTimeout(r, 2500));
        return route.fulfill({
            status: 201,
            contentType: "application/json",
            body: JSON.stringify({ flagged: true }),
        });
    });
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Spam" }).click();
    await page.getByRole("textbox").fill("some detail text");

    const report = page.getByRole("button", { name: "Report" });
    // Sample the DOM every 100ms for 2s starting right at the click.
    const samplerPromise = page.evaluate(async () => {
        const samples: any[] = [];
        for (let i = 0; i < 24; i++) {
            const dlg = document.querySelector('[role="dialog"]');
            const btn = dlg
                ? Array.from(dlg.querySelectorAll("button")).find((b) =>
                      b.textContent?.trim().startsWith("Report"),
                  )
                : null;
            const ta = dlg?.querySelector("textarea") as HTMLTextAreaElement | null;
            samples.push({
                t: i * 100,
                dialogOpen: !!dlg,
                spinner: !!dlg?.querySelector(".animate-spin"),
                reportDisabled: btn ? btn.disabled : null,
                checkedRadios: dlg
                    ? Array.from(dlg.querySelectorAll('[role="radio"]')).filter(
                          (r) => r.getAttribute("aria-checked") === "true",
                      ).length
                    : null,
                textareaValue: ta ? ta.value : null,
                liveRegions: dlg
                    ? dlg.querySelectorAll("[aria-live],[role=status],[role=alert]")
                          .length
                    : null,
            });
            await new Promise((r) => setTimeout(r, 100));
        }
        return samples;
    });
    await report.click();
    const samples = await samplerPromise;
    console.log("=== IN-FLIGHT SAMPLES ===\n" + JSON.stringify(samples));
    console.log("POSTS=" + posts);
});

test("P3: state leaks across cancel + reopen on a DIFFERENT palette", async ({
    page,
}) => {
    await seedTwo(page);
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await expect(page.getByRole("dialog")).toContainText("Shady Spam");
    await page.getByRole("radio", { name: "Copyright violation" }).click();
    await page.getByRole("textbox").fill("LEAKED DETAIL TEXT");
    // Cancel.
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).toBeHidden();

    // Reopen on the OTHER palette.
    await openFlagDialog(page, 1);
    const state = await page.evaluate(() => {
        const dlg = document.querySelector('[role="dialog"]')!;
        return {
            title: dlg.textContent?.slice(0, 120),
            checked: Array.from(dlg.querySelectorAll('[role="radio"]'))
                .filter((r) => r.getAttribute("aria-checked") === "true")
                .map((r) => r.id),
            textarea: (dlg.querySelector("textarea") as HTMLTextAreaElement).value,
            reportDisabled: Array.from(dlg.querySelectorAll("button")).find((b) =>
                b.textContent?.trim().startsWith("Report"),
            )?.disabled,
        };
    });
    console.log("=== REOPEN STATE ===\n" + JSON.stringify(state, null, 2));
});

test("P4: 409 Already-flagged failure is indistinguishable from success", async ({
    page,
}) => {
    await seedTwo(page);
    const consoleMsgs: string[] = [];
    page.on("console", (m) => consoleMsgs.push(`${m.type()}: ${m.text()}`));
    await page.route("**/palettes/shady-spam/flag", (route) =>
        route.fulfill({
            status: 409,
            contentType: "application/json",
            body: JSON.stringify({
                type: "about:blank",
                title: "Conflict",
                status: 409,
                detail: "Already flagged",
            }),
        }),
    );
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Spam" }).click();
    await page.getByRole("button", { name: "Report" }).click();
    await page.waitForTimeout(1200);
    const after = await page.evaluate(() => ({
        dialogPresent: !!document.querySelector('[role="dialog"]'),
        anyAlert: document.querySelectorAll("[role=alert],[aria-live]").length,
        bodyHasError: /already flagged|failed|error/i.test(
            document.body.innerText,
        ),
        activeElement: document.activeElement?.tagName,
        activeText: (document.activeElement?.textContent ?? "").trim().slice(0, 40),
    }));
    console.log("=== AFTER 409 ===\n" + JSON.stringify(after, null, 2));
    console.log(
        "=== CONSOLE ===\n" +
            consoleMsgs.filter((m) => /flag|error|warn/i.test(m)).join("\n"),
    );
});

test("P5: unauthenticated 401 path", async ({ page }) => {
    await seedTwo(page);
    let sawPost = false;
    await page.route("**/palettes/shady-spam/flag", (route) => {
        sawPost = true;
        return route.fulfill({
            status: 401,
            contentType: "application/json",
            body: JSON.stringify({ status: 401, detail: "Authentication required" }),
        });
    });
    await page.goto("/#/browse");
    await openFlagDialog(page, 0);
    await page.getByRole("radio", { name: "Other" }).click();
    await page.getByRole("button", { name: "Report" }).click();
    await page.waitForTimeout(1000);
    const after = await page.evaluate(() => ({
        dialogPresent: !!document.querySelector('[role="dialog"]'),
        bodyHasError: /sign in|auth|failed|error/i.test(document.body.innerText),
    }));
    console.log("=== AFTER 401 === sawPost=" + sawPost + " " + JSON.stringify(after));
});
