// SS-8 · Z4 — library-band W.L8 (AB-1) witness against the LIVE api on :3000.
// Creates one owner palette, makes it private, reads it as anon and as a stranger, then
// deletes everything it created (palette, any fork, both sessions) in finally.
// Writes are paced (the api allows 10 writes / 3 registrations per IP per window, shared
// with every other seat on this machine). Session tokens are redacted from the log.
//   ~/.claude/guard/guarded --light --timeout 10 -- node api.mjs > out.json
//   CLEAN_SLUG=<slug> CLEAN_TOKEN=<token> node api.mjs   # delete a leftover from a failed run
const API = process.env.API ?? "http://localhost:3000";
const PACE = +(process.env.PACE_MS ?? 7000);
const log = [];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const redact = (s) => s.replace(/"(token|sessionToken)":"[^"]+"/g, '"$1":"<redacted>"');
async function req(method, path, { token, body, ifMatch } = {}) {
    if (method !== "GET") await wait(PACE);
    const headers = { "Content-Type": "application/json" };
    if (token) headers["X-Session-Token"] = token;
    if (ifMatch) headers["If-Match"] = ifMatch;
    if (method === "POST" || method === "PUT") headers["Idempotency-Key"] = crypto.randomUUID();
    const r = await fetch(API + path, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) });
    let j = null; const t = await r.text(); try { j = JSON.parse(t); } catch { j = t.slice(0, 200); }
    log.push({ method, path, as: token ? "session" : "anon", status: r.status, body: redact(typeof j === "object" ? JSON.stringify(j) : String(j)).slice(0, 220) });
    return { status: r.status, etag: r.headers.get("ETag"), json: j };
}
async function del(slug, tok) {
    const g = await req("GET", `/palettes/${slug}`, { token: tok });
    return (await req("DELETE", `/palettes/${slug}`, { token: tok, ifMatch: g.etag ?? undefined })).status;
}
const out = { api: API, steps: log };
if (process.env.CLEAN_SLUG) {
    out.cleanLeftover = { slug: process.env.CLEAN_SLUG, status: await del(process.env.CLEAN_SLUG, process.env.CLEAN_TOKEN) };
    await req("DELETE", "/sessions", { token: process.env.CLEAN_TOKEN });
    console.log(JSON.stringify(out, null, 2));
    process.exit(0);
}
let owner, stranger, slug, forkSlug;
try {
    const a = await req("POST", "/sessions");
    owner = a.json?.token;
    const b = await req("POST", "/sessions");
    stranger = b.json?.token;
    out.sessions = { owner: !!owner, stranger: !!stranger };
    if (!owner || !stranger) throw new Error("session registration refused (rate limit) — no cell run");
    const c = await req("POST", "/palettes", { token: owner, body: { slug: `ss8-z4-priv-${Date.now().toString(36)}`, name: "SS8 Z4 private probe", colors: [{ css: "#123456", position: 0 }, { css: "#abcdef", position: 1 }] } });
    slug = c.json?.slug;
    const g0 = await req("GET", `/palettes/${slug}`, { token: owner });
    out.visibilityAtCreate = g0.json?.visibility;
    const un = await req("POST", `/palettes/${slug}/unpublish`, { token: owner, ifMatch: g0.etag });
    out.unpublish = { status: un.status, visibility: un.json?.visibility };
    if (un.json?.visibility !== "private") throw new Error("unpublish did not take — private cells not run");
    const hash = un.json?.currentHash ?? g0.json?.currentHash;
    out.private = {
        anonGet: (await req("GET", `/palettes/${slug}`)).status,
        anonVersions: (await req("GET", `/palettes/${slug}/versions`)).status,
        anonVersionHash: (await req("GET", `/palettes/${slug}/versions/${hash}`)).status,
        anonForksList: (await req("GET", `/palettes/${slug}/forks`)).status,
        anonProvenance: (await req("GET", `/palettes/${slug}/provenance`)).status,
        strangerGet: (await req("GET", `/palettes/${slug}`, { token: stranger })).status,
        strangerFork: await (async () => { const f = await req("POST", `/palettes/${slug}/forks`, { token: stranger, body: {} }); forkSlug = f.status < 300 ? f.json?.slug : undefined; return { status: f.status, forkVisibility: f.json?.visibility ?? null }; })(),
        ownerGet: (await req("GET", `/palettes/${slug}`, { token: owner })).status,
        ownerVersions: (await req("GET", `/palettes/${slug}/versions`, { token: owner })).status,
    };
    const pub = await req("GET", "/palettes?limit=1");
    const pubSlug = pub.json?.data?.find((p) => p.slug !== slug)?.slug;
    if (pubSlug) out.foreignHash = { pubSlug, status: (await req("GET", `/palettes/${pubSlug}/versions/${hash}`)).status };
} catch (e) {
    out.error = String(e).slice(0, 300);
} finally {
    const cleanup = {};
    if (forkSlug) cleanup[forkSlug] = await del(forkSlug, stranger).catch((e) => String(e));
    if (slug) cleanup[slug] = await del(slug, owner).catch((e) => String(e));
    for (const tok of [owner, stranger]) if (tok) await req("DELETE", "/sessions", { token: tok }).catch(() => {});
    out.cleanup = cleanup;
    console.log(JSON.stringify(out, null, 2));
}
