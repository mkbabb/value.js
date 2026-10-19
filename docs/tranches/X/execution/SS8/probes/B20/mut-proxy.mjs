// SS8-0576 (C-R24) mutation witness WITHOUT a source edit: a same-machine proxy in front of the
// served :9000 dev app that, when MUTATE=1, serves GradientCodeEditor.vue's compiled module with the
// onBlur gate deleted (`if (!hasError.value) render(modelValue)` -> `render(modelValue)`).
// MUTATE=0 is the control (byte-for-byte pass-through). WebSocket upgrades are piped raw (HMR).
import http from "node:http";
import net from "node:net";
const PORT = +process.env.PROXY_PORT, MUTATE = process.env.MUTATE === "1";
let hits = 0;
const srv = http.createServer((req, res) => {
    const isTarget = /\/GradientCodeEditor\.vue(\?(?!.*type=style).*)?$/.test(req.url) && !req.url.includes("type=style");
    const headers = { ...req.headers, host: "localhost:9000" };
    if (isTarget) { headers["accept-encoding"] = "identity"; delete headers["if-none-match"]; delete headers["if-modified-since"]; }
    const up = http.request({ host: "127.0.0.1", port: 9000, method: req.method, path: req.url, headers }, (ur) => {
        if (!isTarget) { res.writeHead(ur.statusCode, ur.headers); ur.pipe(res); return; }
        const chunks = []; ur.on("data", (c) => chunks.push(c)); ur.on("end", () => {
            let body = Buffer.concat(chunks).toString("utf8");
            const before = body;
            if (MUTATE) body = body.replace(/if\s*\(\s*!hasError\.value\s*\)\s*render\(/, "render(");
            if (MUTATE && body !== before) hits++;
            const h = { ...ur.headers }; delete h["content-length"]; delete h["etag"]; h["cache-control"] = "no-store";
            res.writeHead(ur.statusCode, h); res.end(body);
            console.log(`[proxy] ${req.url} mutate=${MUTATE} applied=${body !== before} hits=${hits}`);
        });
    });
    up.on("error", () => { try { res.writeHead(502); res.end(); } catch {} });
    req.pipe(up);
});
srv.on("upgrade", (req, sock, head) => {
    const up = net.connect(9000, "127.0.0.1", () => {
        up.write(`${req.method} ${req.url} HTTP/1.1\r\n` + Object.entries({ ...req.headers, host: "localhost:9000" }).map(([k, v]) => `${k}: ${v}`).join("\r\n") + "\r\n\r\n");
        if (head?.length) up.write(head);
        sock.pipe(up).pipe(sock);
    });
    up.on("error", () => sock.destroy()); sock.on("error", () => up.destroy());
});
srv.listen(PORT, () => console.log(`[proxy] :${PORT} -> :9000 mutate=${MUTATE}`));
