// SERVED MODEL: claude-opus-5-5
// X.W12U.k — the runtime MOUNT CENSUS (W12U.md §2 .k item 2; the census the
// value-L1 seat never ran). For every route and every overlay it walks the LIVE
// Vue component tree of the served page and lists each component that is
// mounted more than once, then reads those against the reviewed table below.
//
// A component mounted N times is one of two things:
//   · a REPEATED ITEM — one job per datum (a swatch, a card, a row, a seat);
//   · a DUPLICATE-FOR-ONE-JOB — two mounts answering one question in one view.
// The table (`mount-roles.json`, beside this file) names every repeated item
// and the datum it repeats over. A multi-mounted component that the table does
// not name is reported as a DUPLICATE and reds the run; so is a table row
// marked `single` that mounts twice. The table is the census's reading, kept
// beside the instrument so a new multi-mount cannot pass unread.
//
// Counted: instances that are mounted, not KeepAlive-deactivated, and whose
// root element is connected. Real Chrome, new headless (COHESION §0ei), :9000.
// Usage: node probe-mounts.mjs [width] [height] [light|dark] [out.json]
import { chromium } from "@playwright/test";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { prepare } from "../x/seed-x.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROLES = JSON.parse(readFileSync(join(HERE, "mount-roles.json"), "utf8"));
const [W, H] = [Number(process.argv[2] ?? 1440), Number(process.argv[3] ?? 900)];
const theme = process.argv[4] ?? "light";
const OUT = process.argv[5];
const phone = W < 900;
const BASE = process.env.BASE ?? "http://localhost:9000";

/** Walk the live vnode tree; count mounted, active component instances by file. */
const census = () => {
    const app = document.querySelector("#app")?.__vue_app__;
    if (!app) return { error: "no __vue_app__ on #app" };
    const counts = {};
    const seen = new Set();
    const nameOf = (type) => {
        const file = type.__file;
        if (file) {
            const i = file.indexOf("/demo/");
            if (i >= 0) return file.slice(i + 1);
            const g = file.indexOf("/glass-ui/");
            return g >= 0 ? `glass:${file.slice(file.lastIndexOf("/") + 1)}` : file;
        }
        return type.name || type.__name || null;
    };
    const visitInstance = (inst) => {
        if (!inst || seen.has(inst)) return;
        seen.add(inst);
        if (inst.isUnmounted || inst.isDeactivated) return;
        const name = nameOf(inst.type);
        const el = inst.subTree?.el;
        const live = !el || el.isConnected;
        if (name && live) counts[name] = (counts[name] ?? 0) + 1;
        visitVNode(inst.subTree);
    };
    const visitVNode = (vnode) => {
        if (!vnode || typeof vnode !== "object") return;
        if (vnode.component) visitInstance(vnode.component);
        if (vnode.suspense?.activeBranch) visitVNode(vnode.suspense.activeBranch);
        const kids = vnode.children;
        if (Array.isArray(kids)) for (const k of kids) visitVNode(k);
        if (vnode.dynamicChildren) for (const k of vnode.dynamicChildren) visitVNode(k);
    };
    visitInstance(app._instance);
    // Teleported overlays keep their owner in the tree above, so the walk
    // already reaches them through the Teleport vnode's children.
    return { counts };
};

/** Read one census against the table. */
function judge(counts) {
    const multi = Object.entries(counts).filter(([, n]) => n > 1);
    const duplicates = [];
    const ruled = [];
    for (const [name, n] of multi) {
        if (!name.startsWith("demo/")) continue; // producer internals are glass's census
        const role = ROLES[name];
        if (!role || role.kind === "single") duplicates.push({ name, n, role: role?.kind ?? "UNREAD" });
        // `ruled`: two mounts for one job that stand by a recorded design
        // ruling. Not a pass — it is listed in every result that shows it.
        else if (role.kind === "ruled") ruled.push({ name, n, row: role.row });
    }
    return { multi: Object.fromEntries(multi.filter(([k]) => k.startsWith("demo/"))), duplicates, ruled };
}

const ROUTES = [
    "/", "/palettes", "/browse", "/extract", "/mix", "/generate", "/gradient",
    "/atmosphere", "/blob", "/admin/users", "/admin/names", "/admin/audit",
    "/admin/flagged", "/admin/tags", "/nope/xyz",
];

/** Overlays: [label, route, open(page)] — each opened on its own fresh page. */
const click = (p, role, name, nth = 0) => p.getByRole(role, { name }).nth(nth).click({ timeout: 60000 });
const OVERLAYS = [
    ["dock view select", "/", (p) => click(p, "combobox", /select view/i)],
    // The dock's menus: the phone dock folds them into one "Menu"; the desktop
    // dock seats the profile/admin trigger and the @mbabb attribution trigger.
    ["dock menu", "/", (p) => phone
        ? click(p, "button", /^menu$/i)
        : p.locator('[data-o18="admin-trigger"], [data-o18="profile-trigger"]').first().click({ timeout: 60000 })],
    ["dock attribution menu", "/", (p) => phone
        ? click(p, "button", /^menu$/i)
        : p.getByRole("button", { name: "@mbabb" }).first().click({ timeout: 60000 })],
    ["color-space select", "/", (p) => click(p, "combobox", /color space/i)],
    ["dock color input", "/", (p) => click(p, "button", /open color input/i)],
    ["browse filters", "/browse", (p) => click(p, "button", /filters/i)],
    ["palette card menu", "/browse", (p) => click(p, "button", "Palette menu")],
    ["tag-edit popover", "/browse", async (p) => { await click(p, "button", "Palette menu"); await click(p, "menuitem", "Edit Tags"); }],
    ["version drawer", "/browse", async (p) => { await click(p, "button", "Palette menu"); await click(p, "menuitem", /Versions/); }],
    // Report is offered on a palette the visitor does not own (odd seeds).
    ["flag report dialog", "/browse", async (p) => { await click(p, "button", "Palette menu", 1); await click(p, "menuitem", /report/i); }],
    ["delete-all dialog", "/palettes", (p) => click(p, "button", /delete all/i)],
    ["admin user delete confirm", "/admin/users", (p) => click(p, "button", /^delete user/i)],
    ["admin flagged delete confirm", "/admin/flagged", (p) => click(p, "button", /^delete/i)],
    ["admin tag delete confirm", "/admin/tags", (p) => click(p, "button", /^delete/i)],
];

const b = await chromium.launch({ channel: "chrome", headless: true });
const newPage = async () => {
    const ctx = await b.newContext({ viewport: { width: W, height: H }, colorScheme: theme, isMobile: phone, hasTouch: phone });
    await prepare(ctx, { theme, admin: true, palettes: true, user: true, browse: "ok" });
    const p = await ctx.newPage();
    return { ctx, p };
};
// One page for the whole census: the first load pays the dev server's module
// graph (minutes on a loaded host), every later view is a same-document hash
// navigation. `commit` + an explicit wait for the mounted app, because the
// `load` event alone timed out at 120 s on a host at load 340.
let booted = false;
const settle = async (p, route) => {
    if (!booted) {
        await p.goto(`${BASE}/#${route}`, { waitUntil: "commit", timeout: 600000 });
        await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
        booted = true;
    } else {
        await p.evaluate((r) => { location.hash = `#${r}`; }, route);
    }
    await p.waitForFunction(() => !document.body.innerText.includes("Loading the scene"), null, { timeout: 120000 }).catch(() => {});
    await p.waitForTimeout(2500);
};

/** Read the census; a dev-server full reload (a sibling seat saving a file
 *  destroys the execution context) is waited out and the read repeated. */
const read1 = async (p) => {
    for (let attempt = 0; attempt < 4; attempt++) {
        try {
            return await p.evaluate(census);
        } catch (e) {
            if (!/context was destroyed|navigation/i.test(String(e))) throw e;
            await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
            await p.waitForTimeout(4000);
        }
    }
    return { error: "the page kept reloading under the read" };
};

/**
 * A view is READ only once its panes mounted. A lazy pane whose chunk misses
 * the app's 20 s load bound renders the pane ERROR plate, and one still
 * loading renders the LOADING plate; a census of either is a census of the
 * plate. The plate's own recovery is a reload, so the probe reloads (the dev
 * server has the transforms by then) and reads again; a view that never
 * mounts is reported UNREAD and reds the run.
 */
const PLATES = ["demo/shell/PaneErrorPlate.vue", "demo/shell/PaneLoadingPlate.vue"];
const readView = async (p, route) => {
    let c = null;
    for (let attempt = 0; attempt < 4; attempt++) {
        await settle(p, route);
        c = await read1(p);
        if (c.error || !PLATES.some((n) => c.counts[n])) return c;
        await p.reload({ waitUntil: "commit", timeout: 600000 });
        await p.waitForFunction(() => !!document.querySelector("#app")?.__vue_app__?._instance, null, { timeout: 600000 });
        await p.waitForTimeout(20000);
    }
    return { error: `pane plate still mounted: ${PLATES.filter((n) => c?.counts?.[n]).join(", ")}` };
};

const result = { viewport: `${W}x${H}`, theme, base: BASE, views: {}, overlays: {} };
let red = 0, read = 0;
const { ctx, p } = await newPage();
{
    for (const route of ROUTES) {
        const c = await readView(p, route);
        if (c.error) { console.log(`${W}x${H} ${theme} view ${route} UNREAD ${c.error}`); result.views[route] = { unread: c.error }; red++; continue; }
        const j = judge(c.counts);
        result.views[route] = j;
        read++;
        if (j.duplicates.length) red++;
        console.log(`${W}x${H} ${theme} view ${route} ${j.duplicates.length ? "RED" : "GREEN"} multi=${Object.keys(j.multi).length} dup=${JSON.stringify(j.duplicates)} ruled=${JSON.stringify(j.ruled)}`);
    }
}
for (const [label, route, open] of OVERLAYS) {
    // Close whatever the last overlay left open, leave the route, come back.
    await p.keyboard.press("Escape"); await p.keyboard.press("Escape");
    await settle(p, "/blob");
    const base = await readView(p, route);
    if (base.error) { result.overlays[label] = { unread: base.error }; red++; console.log(`${W}x${H} ${theme} overlay ${label} UNREAD ${base.error}`); continue; }
    let opened = true;
    try { await open(p); await p.waitForTimeout(1200); } catch (e) { opened = false; result.overlays[label] = { unopened: String(e).split("\n")[0].slice(0, 160) }; }
    if (opened) {
        const c = await read1(p);
        const j = judge(c.counts ?? {});
        result.overlays[label] = j;
        read++;
        if (j.duplicates.length) red++;
        console.log(`${W}x${H} ${theme} overlay ${label} ${j.duplicates.length ? "RED" : "GREEN"} multi=${Object.keys(j.multi).length} dup=${JSON.stringify(j.duplicates)} ruled=${JSON.stringify(j.ruled)}`);
    } else {
        // An overlay the probe could not open is NOT read; it is named, and
        // it reds the run: an unread surface is not a clean one.
        red++;
        console.log(`${W}x${H} ${theme} overlay ${label} UNOPENED ${result.overlays[label].unopened}`);
    }
}
await ctx.close();
await b.close();
if (OUT) writeFileSync(OUT, JSON.stringify(result, null, 1));
console.log(red ? `RED ${red} (read ${read})` : `GREEN ${read}/${read}`);
