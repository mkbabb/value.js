// CHALLENGE-D pass 4 — probe D17
// Territory passes 1–3 did not measure:
//   A. the card's liquid-press drive while THIS component's trigger is pressed
//      (all three prior passes declared "motion" the one clean axis)
//   B. the destructive row's screen position as a function of card position
//      (side-flip) — a per-row menu whose Delete moves above/below the trigger
//   C. RTL, MEASURED (pass 1 read `ml-auto` in source; nobody rendered it)
//   D. the disabled row's cursor/pointer-events affordance
//   E. prefers-reduced-motion, with the menu actually open
// Read-only against the live dev server. Writes only JSON/PNG under this folder.
import { chromium } from "playwright";
import { writeFileSync } from "node:fs";

const ORIGIN = "http://localhost:9000";
const ROUTE = `${ORIGIN}/#/palettes`;
const OUT = new URL(".", import.meta.url).pathname;

const mk = (i, name, n = 5) => ({
    id: `p-${i}`,
    slug: `pal-${i}-aaaaaaa`,
    name,
    isLocal: true,
    versionCount: 1,
    colors: Array.from({ length: n }, (_, k) => ({ css: `hsl(${(i * 47 + k * 31) % 360} 60% 55%)` })),
});

const SEED = {
    version: 1,
    palettes: [
        mk(1, "Muted Terracotta and Deep Sea Foam Study"),
        mk(2, "Second Palette"),
        mk(3, "Third Palette"),
        mk(4, "Fourth Palette"),
        mk(5, "Fifth Palette"),
        mk(6, "Sixth Palette"),
        mk(7, "Seventh Palette"),
        mk(8, "Eighth Palette"),
        mk(9, "Ninth Palette"),
        mk(10, "Tenth Palette"),
        mk(11, "Eleventh Palette"),
    ],
};

const results = {};

async function boot(ctx, viewport, { rtl = false } = {}) {
    const page = await ctx.newPage();
    await page.setViewportSize(viewport);
    await page.addInitScript((s) => {
        localStorage.setItem("color-palettes", JSON.stringify(s));
    }, SEED);
    if (rtl) {
        await page.addInitScript(() => {
            const apply = () => {
                document.documentElement.setAttribute("dir", "rtl");
                document.documentElement.setAttribute("lang", "ar");
            };
            apply();
            document.addEventListener("DOMContentLoaded", apply);
            setTimeout(apply, 1500);
            setTimeout(apply, 3000);
        });
    }
    await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(2600);
    return page;
}

const cardState = (page, idx) =>
    page.evaluate((i) => {
        const card = document.querySelectorAll('[role="article"]')[i];
        if (!card) return null;
        const cs = getComputedStyle(card);
        const r = card.getBoundingClientRect();
        return {
            pressT: cs.getPropertyValue("--card-press-t").trim(),
            inlineStyle: card.getAttribute("style"),
            transform: cs.transform,
            scale: cs.scale,
            w: +r.width.toFixed(2),
            h: +r.height.toFixed(2),
        };
    }, idx);

const browser = await chromium.launch();

// ───────────────────────────────────────────────────────────────────────────
// ARM A — does pressing this component's trigger drive the CARD's press spring,
// and is the press released when the modal menu takes the pointer?
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    const page = await boot(ctx, { width: 1440, height: 1000 });

    const trig = page.locator('button[aria-label="Palette menu"]').first();
    const box = await trig.boundingBox();

    const rest = await cardState(page, 0);
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(120);
    const hover = await cardState(page, 0);

    await page.mouse.down();
    await page.waitForTimeout(90);
    const downEarly = await cardState(page, 0);
    await page.waitForTimeout(500);
    const downSettled = await cardState(page, 0);
    const menuOpenDuringHold = await page.locator('[role="menu"]').count();

    await page.mouse.up();
    await page.waitForTimeout(120);
    const upEarly = await cardState(page, 0);
    await page.waitForTimeout(800);
    const upSettled = await cardState(page, 0);
    const menuOpenAfter = await page.locator('[role="menu"]').count();

    // body pointer-events while the menu is open (does the card still hit-test?)
    const bodyPE = await page.evaluate(() => {
        const b = getComputedStyle(document.body).pointerEvents;
        const card = document.querySelectorAll('[role="article"]')[0];
        const cr = card.getBoundingClientRect();
        const hit = document.elementFromPoint(cr.x + 8, cr.y + 8);
        return {
            bodyPointerEvents: b,
            cardPointerEvents: getComputedStyle(card).pointerEvents,
            elementAtCardCorner: hit ? `${hit.tagName}.${(hit.className || "").toString().slice(0, 40)}` : null,
        };
    });

    // control: press the card body itself (the legitimate press site)
    await page.keyboard.press("Escape");
    await page.waitForTimeout(600);
    const cardBox = await page.locator('[role="article"]').first().boundingBox();
    await page.mouse.move(cardBox.x + 40, cardBox.y + cardBox.height - 10);
    await page.mouse.down();
    await page.waitForTimeout(200);
    const controlDown = await cardState(page, 0);
    await page.mouse.up();
    await page.waitForTimeout(700);
    const controlUp = await cardState(page, 0);

    results.A_pressLeak = {
        trigger: { x: +box.x.toFixed(1), y: +box.y.toFixed(1), w: +box.width.toFixed(1), h: +box.height.toFixed(1) },
        rest, hover, downEarly, downSettled, menuOpenDuringHold,
        upEarly, upSettled, menuOpenAfter,
        bodyPE,
        control: { controlDown, controlUp },
    };
    await page.screenshot({ path: `${OUT}evidence/pass4-A-press.png` }).catch(() => {});
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM B — the destructive row's position as a function of WHICH card you touch
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 820 } });
    const page = await boot(ctx, { width: 1440, height: 820 });

    async function menuGeometry(n) {
        const triggers = page.locator('button[aria-label="Palette menu"]');
        const t = triggers.nth(n);
        await t.scrollIntoViewIfNeeded();
        await page.waitForTimeout(250);
        const tb = await t.boundingBox();
        await t.click();
        await page.waitForTimeout(450);
        const geo = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            if (!menu) return null;
            const mr = menu.getBoundingClientRect();
            const rows = [...menu.querySelectorAll('[role="menuitem"]')].map((el) => {
                const r = el.getBoundingClientRect();
                return { text: el.textContent.trim().replace(/\s+/g, " "), y: +r.y.toFixed(1), cy: +(r.y + r.height / 2).toFixed(1) };
            });
            return {
                side: menu.getAttribute("data-side"),
                align: menu.getAttribute("data-align"),
                rect: { x: +mr.x.toFixed(1), y: +mr.y.toFixed(1), w: +mr.width.toFixed(1), h: +mr.height.toFixed(1) },
                rows,
            };
        });
        await page.keyboard.press("Escape");
        await page.waitForTimeout(350);
        return { trigger: { x: +tb.x.toFixed(1), y: +tb.y.toFixed(1), cy: +(tb.y + tb.height / 2).toFixed(1) }, geo };
    }

    const first = await menuGeometry(0);
    const count = await page.locator('button[aria-label="Palette menu"]').count();
    const last = await menuGeometry(count - 1);

    const delta = (m) => {
        const del = m.geo?.rows?.find((r) => /^Delete/.test(r.text));
        return del ? +(del.cy - m.trigger.cy).toFixed(1) : null;
    };

    results.B_destructiveRowPosition = {
        cardsRendered: count,
        first: { ...first, deleteOffsetFromTrigger: delta(first) },
        last: { ...last, deleteOffsetFromTrigger: delta(last) },
        swingPx:
            delta(first) != null && delta(last) != null
                ? +Math.abs(delta(first) - delta(last)).toFixed(1)
                : null,
    };
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM C — RTL, rendered and measured
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: "ar-EG" });
    const page = await boot(ctx, { width: 1440, height: 900 }, { rtl: true });

    const dir = await page.evaluate(() => ({
        html: document.documentElement.getAttribute("dir"),
        computed: getComputedStyle(document.documentElement).direction,
        bodyComputed: getComputedStyle(document.body).direction,
    }));

    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(500);

    // inject the three annotated arms byte-for-byte as the SFC writes them,
    // so the `ml-auto` register can be rendered in RTL (those arms need a backend)
    const injected = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        if (!menu) return null;
        const rows = [...menu.querySelectorAll('[role="menuitem"]')];
        const host = rows[0];
        const clone = host.cloneNode(true);
        clone.setAttribute("data-probe", "annotated");
        clone.innerHTML =
            '<svg class="h-4 w-4"></svg>Publish' +
            '<span class="ml-auto fira-code text-mono-caption opacity-55 tracking-wide" style="font-variant: small-caps" data-probe-ann="1">private</span>';
        host.parentElement.insertBefore(clone, host);
        const ann = clone.querySelector("[data-probe-ann]");
        const cr = clone.getBoundingClientRect();
        const ar = ann.getBoundingClientRect();
        const cs = getComputedStyle(ann);
        return {
            rowRect: { x: +cr.x.toFixed(1), right: +cr.right.toFixed(1), w: +cr.width.toFixed(1) },
            annRect: { x: +ar.x.toFixed(1), right: +ar.right.toFixed(1), w: +ar.width.toFixed(1) },
            annMarginInlineStart: cs.marginInlineStart,
            annMarginInlineEnd: cs.marginInlineEnd,
            annMarginLeft: cs.marginLeft,
            annMarginRight: cs.marginRight,
            distanceFromRowStart: +(ar.right - cr.right).toFixed(1),
            distanceFromRowEnd: +(ar.x - cr.x).toFixed(1),
        };
    });

    const rtlGeo = await page.evaluate(() => {
        const menu = document.querySelector('[role="menu"]');
        const trig = document.querySelector('button[aria-label="Palette menu"]');
        const card = document.querySelectorAll('[role="article"]')[0];
        const mr = menu.getBoundingClientRect();
        const tr = trig.getBoundingClientRect();
        const cr = card.getBoundingClientRect();
        const label = menu.querySelector("[data-probe] , div");
        const header = [...menu.children].find((c) => !c.getAttribute("role"));
        const hcs = header ? getComputedStyle(header) : null;
        return {
            menu: { x: +mr.x.toFixed(1), right: +mr.right.toFixed(1), w: +mr.width.toFixed(1) },
            trigger: { x: +tr.x.toFixed(1), right: +tr.right.toFixed(1) },
            card: { x: +cr.x.toFixed(1), right: +cr.right.toFixed(1) },
            menuDirection: getComputedStyle(menu).direction,
            side: menu.getAttribute("data-side"),
            align: menu.getAttribute("data-align"),
            // is the panel's END edge aligned with the trigger's END edge?
            endEdgeDeltaLTRsense: +(mr.right - tr.right).toFixed(1),
            startEdgeDeltaRTLsense: +(mr.x - tr.x).toFixed(1),
            headerTextAlign: hcs ? hcs.textAlign : null,
            headerOverflow: hcs ? hcs.textOverflow : null,
        };
    });

    await page.screenshot({ path: `${OUT}evidence/pass4-C-rtl-menu.png` }).catch(() => {});

    // submenu side in RTL
    const sub = await page.evaluate(async () => {
        const rows = [...document.querySelectorAll('[role="menuitem"]')];
        const exp = rows.find((r) => r.getAttribute("aria-haspopup") === "menu" || /Export/.test(r.textContent));
        if (!exp) return null;
        exp.dispatchEvent(new PointerEvent("pointermove", { bubbles: true, pointerType: "mouse" }));
        exp.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true, pointerType: "mouse" }));
        await new Promise((r) => setTimeout(r, 700));
        const menus = [...document.querySelectorAll('[role="menu"]')];
        if (menus.length < 2) return { menus: menus.length };
        const parent = menus[0].getBoundingClientRect();
        const child = menus[1].getBoundingClientRect();
        return {
            menus: menus.length,
            parent: { x: +parent.x.toFixed(1), right: +parent.right.toFixed(1) },
            child: { x: +child.x.toFixed(1), right: +child.right.toFixed(1) },
            childSide: menus[1].getAttribute("data-side"),
        };
    });

    results.C_rtl = { dir, rtlGeo, annotation: injected, submenu: sub };
    await page.screenshot({ path: `${OUT}evidence/pass4-C-rtl-submenu.png` }).catch(() => {});
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM D — the disabled row's affordance (cursor / pointer-events / hit test)
// ───────────────────────────────────────────────────────────────────────────
{
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await boot(ctx, { width: 1440, height: 900 });
    await page.locator('button[aria-label="Palette menu"]').first().click();
    await page.waitForTimeout(450);

    const d = await page.evaluate(() => {
        const rows = [...document.querySelectorAll('[role="menuitem"]')];
        const host = rows.find((r) => /Publish/.test(r.textContent)) || rows[0];
        const before = {
            text: host.textContent.trim().replace(/\s+/g, " "),
            cursor: getComputedStyle(host).cursor,
            pointerEvents: getComputedStyle(host).pointerEvents,
            classList: host.className,
        };
        // reproduce the SFC's :disabled arm exactly as reka renders it
        host.setAttribute("data-disabled", "");
        host.setAttribute("aria-disabled", "true");
        const cs = getComputedStyle(host);
        const r = host.getBoundingClientRect();
        const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2);
        return {
            before,
            afterDisabled: {
                cursor: cs.cursor,
                pointerEvents: cs.pointerEvents,
                opacity: cs.opacity,
                userSelect: cs.userSelect,
            },
            hitTestIsTheRow: hit === host || host.contains(hit),
        };
    });
    results.D_disabledAffordance = d;
    await ctx.close();
}

// ───────────────────────────────────────────────────────────────────────────
// ARM E — prefers-reduced-motion, with the menu open
// ───────────────────────────────────────────────────────────────────────────
{
    for (const rm of ["no-preference", "reduce"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: rm });
        const page = await boot(ctx, { width: 1440, height: 900 });
        const trig = page.locator('button[aria-label="Palette menu"]').first();
        const box = await trig.boundingBox();

        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.mouse.down();
        await page.waitForTimeout(120);
        const pressedCard = await cardState(page, 0);
        await page.mouse.up();
        await page.waitForTimeout(400);

        const m = await page.evaluate(() => {
            const menu = document.querySelector('[role="menu"]');
            if (!menu) return null;
            const cs = getComputedStyle(menu);
            const anims = menu.getAnimations ? menu.getAnimations().map((a) => ({
                name: a.animationName || (a.effect && a.effect.getComputedTiming ? "css-transition" : "?"),
                duration: a.effect ? a.effect.getComputedTiming().duration : null,
            })) : [];
            const wrapper = menu.parentElement;
            return {
                animationName: cs.animationName,
                animationDuration: cs.animationDuration,
                transitionProperty: cs.transitionProperty,
                transitionDuration: cs.transitionDuration,
                transform: cs.transform,
                opacity: cs.opacity,
                activeAnimations: anims,
                wrapperTransform: wrapper ? getComputedStyle(wrapper).transform : null,
                prm: matchMedia("(prefers-reduced-motion: reduce)").matches,
                motionWeight: getComputedStyle(document.documentElement).getPropertyValue("--motion-weight").trim(),
            };
        });
        results[`E_reducedMotion_${rm}`] = { menu: m, cardWhilePressingTrigger: pressedCard };
        await ctx.close();
    }
}

await browser.close();
writeFileSync(`${OUT}probe-D17-pass4-results.json`, JSON.stringify(results, null, 1));
console.log(JSON.stringify(results, null, 1));
