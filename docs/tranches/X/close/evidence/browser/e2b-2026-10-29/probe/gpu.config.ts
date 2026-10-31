// SERVED MODEL: claude-opus-5-5
// X.W11.e2b (COHESION §0gw.2): the real-GPU twin of the `smoke` project, used
// only to attribute a family-B leg (a SwiftShader-fact move needs the same leg
// GREEN on the GPU cell plus the diverging readback). The spec bytes are the
// committed ones; only the engine changes: installed Chrome, ANGLE Metal
// (`e2e/smoke/perf/real-gpu.ts` REAL_GPU_ARGS), one worker, no retries.
import { defineConfig } from "@playwright/test";
import base from "../../../../../../../../playwright.config";
import { REAL_GPU_ARGS } from "../../../../../../../../e2e/smoke/perf/real-gpu";

const smoke = base.projects!.find((p) => p.name === "smoke")!;
const root = new URL("../../../../../../../../", import.meta.url).pathname;

export default defineConfig({
    ...base,
    testDir: `${root}e2e/smoke`,
    retries: 0,
    workers: 1,
    reporter: [["json"]],
    outputDir: `${root}test-results/e2b-gpu`,
    webServer: [{ ...(base.webServer as Array<Record<string, unknown>>)[0]!, cwd: root }],
    projects: [
        {
            name: "gpu",
            testDir: `${root}e2e/smoke`,
            testIgnore: smoke.testIgnore,
            use: { ...smoke.use, channel: "chrome", headless: true, launchOptions: { args: REAL_GPU_ARGS } },
        },
        {
            name: "gpu-renderer",
            testDir: import.meta.dirname,
            testMatch: ["renderer.spec.ts"],
            use: { ...smoke.use, channel: "chrome", headless: true, launchOptions: { args: REAL_GPU_ARGS } },
        },
    ],
});
