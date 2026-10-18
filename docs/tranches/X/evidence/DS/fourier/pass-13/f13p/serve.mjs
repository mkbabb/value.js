import { createServer } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/vite/dist/node/index.js";
const s = await createServer({ root: "/Users/mkbabb/Programming/fourier-analysis/web", configFile: "/Users/mkbabb/Programming/fourier-analysis/web/vite.config.ts", cacheDir: process.env.HOME + "/.cache/fourier-f13p/vitecache", server: { port: 3242, strictPort: true }, optimizeDeps: { force: true } });
await s.listen(); console.log("up");
const stop = async () => { await s.close(); process.exit(0); }; process.on("SIGTERM", stop); process.on("SIGINT", stop);
