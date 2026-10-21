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

/**
 * X.W11.p4b · N3 (COHESION §0gm.3 / §0gn.2(c)) — under the shell, the entry's
 * modulepreloads are post-paint: the first view is the prerendered markup and
 * the stylesheet, and the chunks only hydrate it. Vite emits them at High
 * priority, where they contend with the render-blocking sheet and the two
 * preloaded Fraunces faces (the italic one stays, §0gl.6), so they are
 * demoted to `fetchpriority="low"`. They stay static links the preload
 * scanner finds, so they still load in parallel, never as a waterfall.
 *
 * The demotion is not keyed on `data-first-view`: the boot script can only
 * reach links it writes itself, and Chrome fetched document-written
 * modulepreloads at High whatever their hint (measured, the p4b receipt). A
 * client first view needs the sheet and the faces too, so the low hint only
 * orders the chunks after them there as well.
 */
const MODULEPRELOAD = '<link rel="modulepreload" crossorigin href=';

export function demoteModulepreloads(html: string): string {
    const parts = html.split(MODULEPRELOAD);
    if (parts.length === 1) throw new Error("[prerender-shell] the entry carries no modulepreload");
    return parts.join('<link rel="modulepreload" fetchpriority="low" crossorigin href=');
}

export function prerenderShell(): Plugin {
    let config: ResolvedConfig;
    return {
        name: "vjs:prerender-shell",
        apply: (userConfig, env) => env.command === "build" && !userConfig.build?.ssr,
        configResolved(resolved) {
            config = resolved;
        },
        transformIndexHtml: {
            order: "post",
            handler: demoteModulepreloads,
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
                    index
                        .replace(
                            MOUNT,
                            `<div id="app" data-prerendered>${rendered.html}</div>`,
                        )
                        .replace(BODY_END, `${body}${BODY_END}`),
                );
            } finally {
                rmSync(WORK_DIR, { recursive: true, force: true });
            }
        },
    };
}
