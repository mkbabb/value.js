import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    webServer: {
        command: "npx vite --port 8090",
        port: 8090,
        reuseExistingServer: !process.env.CI,
    },
    use: {
        baseURL: "http://localhost:8090",
        browserName: "chromium",
        headless: true,
    },
});
