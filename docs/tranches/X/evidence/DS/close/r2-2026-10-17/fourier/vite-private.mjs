// X-DS CLOSE r2: a private fourier vite (own cacheDir, forced prebundle) so the run
// never reads the shared :3100 server's stale prebundle (DS-F10C-E1).
import { createServer } from "/Users/mkbabb/Programming/fourier-analysis/web/node_modules/vite/dist/node/index.js";
const port = Number(process.env.PORT ?? 3233);
const server = await createServer({
  configFile: "/Users/mkbabb/Programming/fourier-analysis/web/vite.config.ts",
  root: "/Users/mkbabb/Programming/fourier-analysis/web",
  cacheDir: `${process.env.HOME}/.cache/fourier-ds-close-r2/vitecache`,
  optimizeDeps: { force: true },
  server: { port, strictPort: true },
});
await server.listen();
console.log(`vite :${port} up`);
const stop = async () => { await server.close(); process.exit(0); };
process.on("SIGTERM", stop); process.on("SIGINT", stop);
