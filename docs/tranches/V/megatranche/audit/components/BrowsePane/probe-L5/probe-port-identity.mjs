// CHALLENGE-L pass 5 — direct runtime proof of ref identity across the five
// "narrow, feature-owned ports" (demo/palettes/usePalettePorts.ts:22-31).
//
// Walks the live Vue component tree's `provides` chain, collects every
// symbol-keyed provide, and tests REFERENCE EQUALITY between members of
// different ports. Two ports that hand out the same ref object are one port.
//
// Run:  node probe-port-identity.mjs        (dev server must be on :9000)
import { chromium } from "playwright";

const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
await p.goto("http://localhost:9000/#/browse", { waitUntil: "networkidle" });
await p.waitForTimeout(2500);

const out = await p.evaluate(() => {
    // Walk up from any rendered element to collect the provides prototype chain.
    const el = document.querySelector("#app") ?? document.body;
    let vc = el.__vueParentComponent ?? el.__vue_app__?._instance;
    // descend to find an instance with a populated provides chain
    const seen = new Map();
    const collect = (provides) => {
        let o = provides;
        while (o && o !== Object.prototype) {
            for (const s of Object.getOwnPropertySymbols(o)) {
                if (!seen.has(s.toString())) seen.set(s.toString(), o[s]);
            }
            o = Object.getPrototypeOf(o);
        }
    };
    const walk = (inst, depth) => {
        if (!inst || depth > 40) return;
        if (inst.provides) collect(inst.provides);
        for (const k of ["subTree", "component"]) {
            /* no-op: traversal below uses children */
        }
        const st = inst.subTree;
        const kids = [];
        const push = (v) => {
            if (!v) return;
            if (Array.isArray(v)) return v.forEach(push);
            if (v.component) kids.push(v.component);
            if (v.children) push(v.children);
        };
        push(st);
        kids.forEach((c) => walk(c, depth + 1));
    };
    walk(el.__vue_app__?._instance ?? vc, 0);

    const get = (name) => seen.get(`Symbol(${name})`);
    const browse = get("palette.browse");
    const library = get("palette.library");
    const admin = get("palette.admin");

    if (!browse || !library) {
        return { error: "ports not found", keys: [...seen.keys()] };
    }
    return {
        portsFound: [...seen.keys()].filter((k) => k.startsWith("Symbol(palette.")),
        // L5-1 · searchQuery
        searchQuery_browse_is_library: browse.searchQuery === library.searchQuery,
        searchQuery_browse_is_admin: admin ? browse.searchQuery === admin.searchQuery : null,
        // L5-2 · expandedId
        expandedId_browse_is_library: browse.expandedId === library.expandedId,
        expandedId_browse_is_admin: admin ? browse.expandedId === admin.expandedId : null,
        toggleExpand_browse_is_library: browse.toggleExpand === library.toggleExpand,
        // control: members that SHOULD differ
        control_remotePalettes_vs_savedPalettes:
            browse.remotePalettes === library.savedPalettes,
        // L5-2 keyspace evidence
        expandedId_value: browse.expandedId?.value ?? null,
    };
});

console.log(JSON.stringify(out, null, 2));
await b.close();
