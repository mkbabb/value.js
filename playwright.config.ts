import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    retries: process.env.CI ? 2 : 0,
    timeout: 15000,
    expect: { timeout: 5000 },
    webServer: {
        command: "npx vite --port 8090",
        port: 8090,
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: "desktop",
            use: {
                baseURL: "http://localhost:8090",
                browserName: "chromium",
                headless: true,
                viewport: { width: 1280, height: 720 },
            },
        },
        {
            name: "mobile",
            use: {
                baseURL: "http://localhost:8090",
                ...devices["Pixel 7"],
                headless: true,
            },
        },
    ],
});
