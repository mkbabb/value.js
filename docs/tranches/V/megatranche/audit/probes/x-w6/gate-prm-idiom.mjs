// SERVED MODEL: claude-opus-5-5[1m]
//
// X.W6.e · gate **e2** — NO PRIVATE CLOCK: the gradient tree adds no ungated
// rAF, and every motion declaration sits inside a `no-preference` block.
//
//   grep -rn "requestAnimationFrame" demo/workbenches/gradient/
//   node docs/tranches/V/megatranche/audit/probes/x-w6/gate-prm-idiom.mjs
//
// RED at open (W6.md e2): "2 rAF sites today (EasingAuthoringStage.vue:58,
// :65 — syncVbRatio), neither PRM-gated; the wave must land at ≤2 with both
// gated, or at 0". Fold row W6·150: "Reduced motion has five demo homes plus
// glass's published-and-unused ./motion-core" — this gate is that row's
// instrument too.
//
// MOTION-SOURCED · PENDING-QUARANTINE (W6.md H2): every assertion below cites
// `docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md`
// (tracked at 9812f951) and is RE-DERIVED against the two guards on every run —
// `demo/styles/animations.css` (the app-wide reduce guard) and
// `node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css`
// (glass's). The gate asserts the tree does NOT lean on them: a transition that
// is correct only because a guard zeroes it afterwards is exactly the defect.
//
// WHAT IT CHECKS, over every .vue / .ts file under demo/workbenches/gradient/:
//   1 · rAF: `requestAnimationFrame` in code (comments stripped) — GREEN at 0;
//       at 1–2 only if each call sits under a reduced-motion read; >2 reds.
//   2 · CSS motion: every `transition*` / `animation*` DECLARATION in a <style>
//       block is nested inside `@media (prefers-reduced-motion: no-preference)`.
//   3 · No motion outside the stylesheet: no `transition` / `animation` key in
//       an inline `:style` binding, no Tailwind `transition*` / `animate-*` /
//       `duration-*` utility on a template class — both declare motion where
//       no media block can reach it.
//   4 · ONE reduced-motion read: no local `prefers-reduced-motion` media query
//       in script (matchMedia / useMediaQuery); the read is the producer's
//       `useReducedMotion` / `readReducedMotion` (`@mkbabb/glass-ui/motion-core`).
//   NEGATIVE CONTROL (printed every run): the same scanner over four synthetic
//   sources, each carrying one defect, must RED each one.
//
// Exit 0 = GREEN. Exit 1 = RED.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../../../../../../..");
const TREE = join(ROOT, "demo/workbenches/gradient");
const QUARANTINE = join(
    ROOT,
    "docs/tranches/V/megatranche/audit/codex-provenance/motion-quarantine.md",
);
const GUARDS = [
    join(ROOT, "demo/styles/animations.css"),
    join(
        ROOT,
        "node_modules/@mkbabb/glass-ui/dist/styles/utilities/a11y-overrides.css",
    ),
];

const stripComments = (src) =>
    src
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/(^|[^:])\/\/.*$/gm, "$1")
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "));

/** Scan one source; returns { raf, findings[] }. */
function scan(name, raw) {
    const src = stripComments(raw);
    const findings = [];
    const lines = src.split("\n");

    // 1 · rAF
    const rafLines = lines
        .map((l, i) => (/\brequestAnimationFrame\s*\(/.test(l) ? i + 1 : 0))
        .filter(Boolean);

    // 2 · CSS motion declarations, located by a brace-depth walk of <style>.
    const style = src.match(/<style[^>]*>([\s\S]*?)<\/style>/);
    if (style) {
        const before = src.slice(0, style.index).split("\n").length;
        const css = style[1];
        const stack = []; // one entry per open brace: true iff a no-preference @media
        let line = before;
        let buf = "";
        for (const ch of css) {
            if (ch === "\n") line++;
            if (ch === "{") {
                stack.push(
                    /@media[^{]*prefers-reduced-motion\s*:\s*no-preference/.test(buf),
                );
                buf = "";
            } else if (ch === "}") {
                stack.pop();
                buf = "";
            } else if (ch === ";") {
                const decl = buf.trim();
                if (
                    /^(transition|animation)(-[a-z-]+)?\s*:/.test(decl) &&
                    !stack.includes(true)
                ) {
                    findings.push(
                        `${name}:${line} motion declared outside a no-preference block: ${decl.slice(0, 70)}`,
                    );
                }
                buf = "";
            } else buf += ch;
        }
    }

    // 3 · inline :style motion keys and template motion utilities
    const template = src.match(/<template>([\s\S]*)<\/template>/)?.[1] ?? "";
    const tplStart = template
        ? src.slice(0, src.indexOf(template)).split("\n").length
        : 0;
    template.split("\n").forEach((l, i) => {
        if (
            /(^|[\s{,'"])(transition|animation)[A-Za-z-]*\s*:/.test(l) &&
            !/^\s*[.#@a-z-]+\s*\{/.test(l)
        ) {
            findings.push(
                `${name}:${tplStart + i} motion in an inline style binding: ${l.trim().slice(0, 70)}`,
            );
        }
        const cls = l.match(/\bclass="([^"]*)"/)?.[1] ?? "";
        const util = cls
            .split(/\s+/)
            .find((c) =>
                /^(transition(-[a-z]+)?|animate-[a-z-]+|duration-\S+)$/.test(c),
            );
        if (util)
            findings.push(
                `${name}:${tplStart + i} motion utility on a template class: ${util}`,
            );
    });

    // 4 · local reduced-motion reads in script
    const script =
        src.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1] ??
        (name.endsWith(".ts") ? src : "");
    if (
        /(matchMedia|useMediaQuery)\s*\(\s*["'`][^"'`]*prefers-reduced-motion/.test(
            script,
        )
    ) {
        findings.push(
            `${name} reads prefers-reduced-motion through a local media query — the read is glass's useReducedMotion`,
        );
    }
    return { raf: rafLines, findings };
}

const fails = [];

// Negative control — one defect per synthetic source, each must RED.
const CONTROLS = [
    [
        "ctl-style.vue",
        "<template><div/></template>\n<style scoped>\n.x { transition: opacity 1s; }\n</style>",
    ],
    [
        "ctl-inline.vue",
        '<template>\n<div :style="{ transition: `opacity 1s` }"/>\n</template>',
    ],
    [
        "ctl-utility.vue",
        '<template>\n<div class="w-4 transition-transform"/>\n</template>',
    ],
    [
        "ctl-read.vue",
        '<script setup>\nconst r = useMediaQuery("(prefers-reduced-motion: reduce)");\n</script>',
    ],
];
const ctl = CONTROLS.map(([n, s]) => [n, scan(n, s).findings.length > 0]);
console.log(
    `negative control: ${ctl.map(([n, red]) => `${n} → ${red ? "FAIL" : "BLIND"}`).join(" · ")}`,
);
if (ctl.some(([, red]) => !red))
    fails.push("negative control: the scanner missed a synthetic defect");
const gated = scan(
    "ctl-gated.vue",
    "<template><div/></template>\n<style>\n@media (prefers-reduced-motion: no-preference) {\n  .x { transition: opacity 1s; }\n}\n</style>",
);
console.log(
    `positive control: a transition inside the no-preference block → ${gated.findings.length ? "FAIL" : "clean"}`,
);
if (gated.findings.length)
    fails.push("positive control: the scanner reds a correctly gated declaration");

// The quarantine record and the two guards, re-derived.
console.log(
    `quarantine record: ${existsSync(QUARANTINE) ? "present" : "ABSENT"} (${relative(ROOT, QUARANTINE)})`,
);
if (!existsSync(QUARANTINE))
    fails.push(
        "motion-quarantine.md is absent — every motion assertion here is unquarantined",
    );
for (const g of GUARDS) {
    const ok =
        existsSync(g) &&
        /prefers-reduced-motion:\s*reduce/.test(readFileSync(g, "utf8"));
    console.log(
        `guard ${relative(ROOT, g)}: ${ok ? "present (a reduce block)" : "MISSING"}`,
    );
}

// The tree.
const files = [];
const walk = (d) => {
    for (const e of readdirSync(d)) {
        const p = join(d, e);
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(vue|ts)$/.test(e)) files.push(p);
    }
};
walk(TREE);
let rafTotal = 0;
let motionDecls = 0;
for (const f of files) {
    const raw = readFileSync(f, "utf8");
    const rel = relative(ROOT, f);
    const { raf, findings } = scan(rel, raw);
    rafTotal += raf.length;
    motionDecls += (
        stripComments(raw).match(/^\s*(transition|animation)(-[a-z-]+)?\s*:/gm) ?? []
    ).length;
    for (const l of raf) {
        const gatedRaf = /useReducedMotion|readReducedMotion/.test(raw);
        if (!gatedRaf)
            fails.push(
                `${rel}:${l} requestAnimationFrame with no reduced-motion read in its module`,
            );
    }
    fails.push(...findings);
}
console.log(
    `files scanned: ${files.length} · requestAnimationFrame calls: ${rafTotal} · CSS motion declarations: ${motionDecls}`,
);
if (rafTotal > 2)
    fails.push(
        `${rafTotal} requestAnimationFrame calls (the law: ≤2, both gated, or 0)`,
    );

if (fails.length) {
    console.error(
        "GATE e2 (PRM idiom) — RED\n" + fails.map((f) => "  " + f).join("\n"),
    );
    process.exit(1);
}
console.log("GATE e2 (PRM idiom) — GREEN");
