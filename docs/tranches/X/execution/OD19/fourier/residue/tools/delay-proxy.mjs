// ESC-FREL-ci-1 falsifier harness: reproduce CI 39595581721's condition locally.
// A reverse proxy in front of the dev API (:8000) that holds
// /api/equations/compute for DELAY_MS (default 3052, CI's measured wait) before
// forwarding. Everything else passes through. Usage:
//   PORT=8091 DELAY_MS=3052 node delay-proxy.mjs
import http from "node:http";
const PORT = Number(process.env.PORT ?? 8091);
const DELAY = Number(process.env.DELAY_MS ?? 3052);
const UP = new URL(process.env.UPSTREAM ?? "http://localhost:8000");
const server = http.createServer((req, res) => {
    const hold = req.url?.startsWith("/api/equations/compute") ? DELAY : 0;
    setTimeout(() => {
        const up = http.request(
            { host: UP.hostname, port: UP.port, path: req.url, method: req.method, headers: { ...req.headers, host: UP.host } },
            (r) => { res.writeHead(r.statusCode ?? 502, r.headers); r.pipe(res); },
        );
        up.on("error", () => { res.writeHead(502); res.end(); });
        req.pipe(up);
    }, hold);
});
server.listen(PORT, () => console.log(`delay-proxy :${PORT} -> ${UP.host}, compute held ${DELAY} ms`));
for (const s of ["SIGINT", "SIGTERM"]) process.on(s, () => server.close(() => process.exit(0)));
