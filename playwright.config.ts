import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    retries: process.env.CI ? 2 : 0,
    timeout: 30000,
    expect: { timeout: 8000 },
    webServer: {
        command: "npx vite --port 8090",
        port: 8090,
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: "smoke",
            testDir: "./e2e/smoke",
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
            },
        },
    ],
});
