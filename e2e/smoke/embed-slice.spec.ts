import { createServer, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import { test, expect, type Page, type Frame } from "@playwright/test";

/**
 * Smoke: the embed entry (`/embed/#/picker`, `/embed/#/gradient`) framed by a
 * cross-origin host, over the `babb-embed` v1 contract (demo/app/embed/bridge.ts).
 *
 * The host is a page served by this spec on 127.0.0.1 (a different origin from
 * the slice's localhost), so every message crosses a real origin boundary. It
 * is a real loopback server, not a routed response: Chromium's local-network
 * checks refuse a loopback frame inside a document with no address space. A
 * slice served from loopback admits a loopback host; the deployed slice admits
 * only daraksha.babb.dev (demo/test/embed/embed-contract.test.ts).
 */

let hostServer: Server;
let hostOrigin = "";
let hostBody = "";
test.beforeAll(async () => {
    hostServer = createServer((_req, res) => {
        res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
        res.end(hostBody);
    });
    await new Promise<void>((resolve) => hostServer.listen(0, "127.0.0.1", resolve));
    hostOrigin = `http://127.0.0.1:${(hostServer.address() as AddressInfo).port}`;
});
test.afterAll(async () => {
    await new Promise((resolve) => hostServer.close(resolve));
});

const HER = [
    "efflorescence:oklch(73% 0.185 2)",
    "gulabi:oklch(90% 0.055 18)",
    "haldi:oklch(82% 0.145 76)",
    "zari:oklch(72% 0.12 88)",
    "sheesham:oklch(55% 0.085 56)",
    "tulsi:oklch(72% 0.055 145)",
    "curry-leaf:oklch(43% 0.085 152)",
    "jamun:oklch(39% 0.1 356)",
].join(";");

interface Msg {
    origin: string;
    data: { ns: string; v: number; type: string; [k: string]: unknown };
}

async function host(page: Page, sliceUrl: string, frame: { w: number; h: number }) {
    const slice = new URL(sliceUrl);
    hostBody = `<!doctype html><meta charset="utf-8"><body style="margin:0">
<script>
window.__msgs = [];
addEventListener("message", (e) => window.__msgs.push({ origin: e.origin, data: e.data }));
</script>
<iframe id="slice" title="Slice" src="${sliceUrl}" style="border:0;width:${frame.w}px;height:${frame.h}px"></iframe>`;
    const errors: string[] = [];
    page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
    });
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(`${hostOrigin}/`);
    const sliceFrame = (): Frame => page.frames().find((f) => f.url().startsWith(slice.origin))!;
    const msgs = () => page.evaluate(() => (window as unknown as { __msgs: Msg[] }).__msgs);
    await expect.poll(async () => (await msgs()).some((m) => m.data?.type === "ready"), { timeout: 20_000 }).toBe(true);
    return { errors, msgs, sliceFrame, sliceOrigin: slice.origin };
}

test("the picker slice is ready, themed and sized, and speaks only to its host", async ({ page, baseURL }) => {
    const url = `${baseURL}/embed/#/picker?palette=${encodeURIComponent(HER)}&scheme=dark`;
    const { errors, msgs, sliceFrame, sliceOrigin } = await host(page, url, { w: 420, h: 640 });

    const all = await msgs();
    const ready = all.find((m) => m.data.type === "ready")!;
    expect(ready.origin).toBe(sliceOrigin);
    expect(ready.data).toMatchObject({ ns: "babb-embed", v: 1, slice: "picker", scheme: "dark" });
    expect(ready.data.height as number).toBeGreaterThan(200);

    const frame = sliceFrame();
    // The app's own plate, field and console; her eight swatches; her name.
    await expect(frame.locator(".picker-plate")).toBeVisible();
    await expect(frame.locator(".spectrum-picker")).toBeVisible();
    await expect(frame.getByRole("group", { name: "Colours" }).getByRole("button")).toHaveCount(8);
    await expect(frame.getByTestId("embed-color-name")).toHaveText("Efflorescence");
    // The ground is transparent, and the frame's scheme is the host's.
    expect(await frame.evaluate(() => getComputedStyle(document.body).backgroundColor)).toBe("rgba(0, 0, 0, 0)");
    expect(await frame.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(true);
    expect(await frame.evaluate(() => document.documentElement.style.colorScheme)).toBe("dark");

    // A swatch press reports the colour to the host.
    await frame.getByRole("button", { name: "Curry Leaf" }).click();
    await expect(frame.getByTestId("embed-color-name")).toHaveText("Curry Leaf");
    await expect.poll(async () => (await msgs()).filter((m) => m.data.type === "color").length).toBeGreaterThan(0);

    // set-theme flips the slice and is acknowledged.
    await page.evaluate((origin) => {
        (document.getElementById("slice") as HTMLIFrameElement).contentWindow!.postMessage(
            { ns: "babb-embed", v: 1, type: "set-theme", scheme: "light" },
            origin,
        );
    }, sliceOrigin);
    await expect.poll(async () => (await msgs()).some((m) => m.data.type === "theme" && m.data.scheme === "light")).toBe(true);
    expect(await frame.evaluate(() => document.documentElement.classList.contains("dark"))).toBe(false);

    // Every message is in the contract.
    for (const m of await msgs()) expect(m.data).toMatchObject({ ns: "babb-embed", v: 1 });
    expect(errors).toEqual([]);
});

test("the gradient slice runs its ribbon along a tall frame", async ({ page, baseURL }) => {
    const five = HER.split(";").filter((s) => /^(efflorescence|gulabi|haldi|zari|tulsi):/.test(s)).join(";");
    const url = `${baseURL}/embed/#/gradient?palette=${encodeURIComponent(five)}&scheme=light`;
    const { errors, msgs, sliceFrame } = await host(page, url, { w: 240, h: 628 });

    const ready = (await msgs()).find((m) => m.data.type === "ready")!;
    expect(ready.data).toMatchObject({ slice: "gradient", scheme: "light" });
    const frame = sliceFrame();
    await expect(frame.locator(".embed-gradient")).toHaveAttribute("data-orientation", "vertical");
    await expect(frame.getByRole("img", { name: "Gradient" })).toBeVisible();
    const ribbon = await frame.getByRole("img", { name: "Gradient" }).evaluate((el) => (el as HTMLElement).style.getPropertyValue("--ribbon"));
    // A top-to-bottom ribbon: CSS's default direction, so no angle is written.
    expect(ribbon).toMatch(/^linear-gradient\(in /);
    expect(errors).toEqual([]);
});

test("a slice opened directly renders and posts nothing", async ({ page, baseURL }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
        if (m.type() === "error") errors.push(m.text());
    });
    await page.goto(`${baseURL}/embed/#/picker?palette=${encodeURIComponent(HER)}`);
    await expect(page.locator(".picker-plate")).toBeVisible();
    expect(errors).toEqual([]);
});
