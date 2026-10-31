import type { Plugin, ResolvedConfig } from "vite";
import { build } from "vite";
import { execFileSync } from "node:child_process";
import { readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Vite plugin: prerender the static first-view shell (X.W11.p3 · COHESION
 * §0ge.1(iii), OD-W11-1(a) LCP-STRUCTURAL).
 *
 * WHY — the LCP element of `/` is the picker plate, and it was a JS-mounted
 * node: it could not paint until the entry chunk, the render-blocking sheet and
 * the boot task had all landed (CI lhr phases: load delay 3,984 ms, render
 * delay 1,945 ms). The plate's HTML is now in the document, so it paints with
 * the stylesheet alone; the client then HYDRATES that markup in place
 * (`createSSRApp`, demo/app/main.ts) — the same tree, adopted, not replaced.
 *
 * HOW — after the gh-pages client build closes, this plugin runs a second,
 * SSR build of the same config over `entry-server.ts`, renders `/` at the
 * default seed in a child process (`render-shell.mjs`, which owns the DOM
 * globals the browser-only modules read at import), and writes the markup into
 * `#app` of the emitted `index.html`, marked `data-prerendered`. The SSR bundle
 * is scratch and is deleted. Teleports into `body` (the closed popovers'
 * anchors) are written at the end of the body, where hydration finds them; a
 * teleport to any other target is refused, since the shell cannot place it.
 */

const ROOT = path.resolve(import.meta.dirname, "../..");
const ENTRY = path.resolve(import.meta.dirname, "entry-server.ts");
const RENDERER = path.resolve(import.meta.dirname, "render-shell.mjs");
const WORK_DIR = path.resolve(ROOT, "node_modules/.vjs-prerender");
const MOUNT = '<div id="app"></div>';
const BODY_END = "</body>";
const HEAD_END = "</head>";

/**
 * Vite's emitted entry and modulepreload tags (the client module graph), and
 * every tag a plugin marks `data-after-paint` (the glass font corpus, L2).
 */
const GRAPH_TAG =
    /[ \t]*(?:<script type="module" crossorigin src="[^"]+"><\/script>|<link rel="modulepreload" crossorigin href="[^"]+">|<link [^>]*\bdata-after-paint\b[^>]*>)\n?/g;

/**
 * X.W11.p4d L1 (COHESION §0gs.4): the module graph leaves the first paint's
 * fetch set. Vite's tags move, byte-unchanged, into one inert template that
 * ends the head; the body's first script (demo/app/index.html) writes them
 * back at once on a client first view, and after first paint on the shell.
 */
function afterPaintGraph(index: string): string {
    const tags = index.match(GRAPH_TAG) ?? [];
    if (tags.filter((tag) => tag.includes("<script")).length !== 1) {
        throw new Error(
            "[prerender-shell] index.html must carry exactly one entry module script",
        );
    }
    const template = `<template id="vjs-after-paint">\n${tags.join("")}</template>\n`;
    return index.replace(GRAPH_TAG, "").replace(HEAD_END, `${template}${HEAD_END}`);
}

/** The SSR bundle renders markup only: every stylesheet is the client build's. */
function stylelessSsr(): Plugin {
    return {
        name: "vjs:prerender-styleless",
        enforce: "pre",
        load(id) {
            if (/\.css(\?|$)/.test(id) || /[?&]type=style(&|$)/.test(id)) return "";
        },
    };
}

export function prerenderShell(): Plugin {
    let config: ResolvedConfig;
    return {
        name: "vjs:prerender-shell",
        apply: (userConfig, env) => env.command === "build" && !userConfig.build?.ssr,
        configResolved(resolved) {
            config = resolved;
        },
        async closeBundle(error) {
            // A failed client build has no index.html to write into; rendering
            // anyway replaced the build's own error with this plugin's ENOENT.
            if (error) return;
            await build({
                configFile: path.resolve(ROOT, "vite.config.ts"),
                mode: config.mode,
                logLevel: "warn",
                build: {
                    ssr: ENTRY,
                    outDir: WORK_DIR,
                    emptyOutDir: true,
                    copyPublicDir: false,
                    minify: false,
                },
                plugins: [stylelessSsr()],
            });
            try {
                const bundle = path.join(WORK_DIR, "entry-server.js");
                const rendered = JSON.parse(
                    execFileSync(process.execPath, [RENDERER, bundle], {
                        encoding: "utf8",
                        maxBuffer: 64 * 1024 * 1024,
                    }),
                ) as { html: string; teleports: Record<string, string> };

                const targets = Object.keys(rendered.teleports);
                const foreign = targets.filter((target) => target !== "body");
                if (foreign.length > 0) {
                    throw new Error(
                        `[prerender-shell] the first view teleports into ${foreign.join(", ")}; only body is carried`,
                    );
                }
                if (!rendered.html.trim()) {
                    throw new Error("[prerender-shell] the first view rendered empty");
                }

                const indexPath = path.resolve(config.build.outDir, "index.html");
                const index = readFileSync(indexPath, "utf8");
                if (index.split(MOUNT).length !== 2) {
                    throw new Error(
                        `[prerender-shell] index.html must carry exactly one ${MOUNT}`,
                    );
                }
                // A body teleport hydrates from the anchors it rendered, scanning
                // the body's children in order; they sit last, after the scripts.
                const body = rendered.teleports.body ?? "";
                if (index.split(BODY_END).length !== 2) {
                    throw new Error(
                        `[prerender-shell] index.html must carry exactly one ${BODY_END}`,
                    );
                }
                writeFileSync(
                    indexPath,
                    afterPaintGraph(
                        index
                            .replace(
                                MOUNT,
                                `<div id="app" data-prerendered>${rendered.html}</div>`,
                            )
                            .replace(BODY_END, `${body}${BODY_END}`),
                    ),
                );
            } finally {
                rmSync(WORK_DIR, { recursive: true, force: true });
            }
        },
    };
}
