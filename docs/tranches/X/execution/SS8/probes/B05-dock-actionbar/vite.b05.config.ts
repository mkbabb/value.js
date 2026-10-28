// SERVED MODEL: claude-opus-5-5 — SS-8 B05 CURE: a quiet dev server for the o33 oracle. The shared
// :9000 server stalled for minutes per request under concurrent seats' HMR churn, so this wraps the
// repo's own dev config UNCHANGED except: no file watch / HMR (the page cannot be re-transformed
// mid-run), its own optimized-deps cache (VC3-01: never share node_modules/.vite), and, with
// B05_RED=1, the four cured files served from HEAD (the pre-cure source) so RED and GREEN read the
// same working tree around them.
import { execFileSync } from "node:child_process";
import path from "node:path";
import repo from "../../../../../../../vite.config";

const ROOT = path.resolve(import.meta.dirname, "../../../../../../..");
const FILES = [
    "demo/shell/dock/Dock.vue",
    "demo/shell/dock/ActionBarToggle.vue",
    "demo/shell/dock/layers/ActionBarLayer.vue",
    "demo/shell/dock/layers/GenericActionBar.vue",
];
const RED = process.env.B05_RED === "1";

export default async (env: { mode: string; command: string }) => {
    const base = await (repo as unknown as (e: typeof env) => Promise<Record<string, any>>)(env);
    const head = {
        name: "b05-serve-head",
        enforce: "pre" as const,
        load(id: string) {
            if (!RED) return null;
            const file = id.split("?")[0]!;
            const rel = path.relative(ROOT, file);
            if (!FILES.includes(rel) || id.includes("?")) return null;
            return execFileSync("git", ["show", `HEAD:${rel}`], { cwd: ROOT, encoding: "utf8" });
        },
    };
    return {
        ...base,
        root: path.join(ROOT, "demo/app"),
        cacheDir: path.join(ROOT, `demo/app/node_modules/.cache/ss8-b05-vite-${RED ? "red" : "green"}`),
        server: { ...base.server, watch: { ignored: ["**/*"] }, hmr: false },
        plugins: [head, ...base.plugins],
    };
};
