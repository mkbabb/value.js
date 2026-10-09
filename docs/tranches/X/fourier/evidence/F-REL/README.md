SERVED MODEL: claude-opus-5-5

# F.REL .d — production evidence (2026-10-09)

- `pages-smoke.log` — ⟨`bash scripts/pages-smoke.sh`⟩ (fourier) → PASS (bundle carries the API base, `/api/health` 200 json, ACAO, cert > 14 d).
- `openapi-paths-now.txt` — the 34 paths of ⟨`curl https://api.fourier.babb.dev/openapi.json`⟩; byte-identical to `~/.fourier-samples/frel-openapi-before.json` (no `/publish`, `/remix`, `/diff`): the host API was NOT redeployed (see the record's `### F-REL.d`).
- `d-verify-before/` — ⟨`node scripts/prod-verify.mjs https://fourier.babb.dev https://api.fourier.babb.dev <out> assets/portraits/daraksha.jpg ~/.fourier-samples/daraksha.jpeg`⟩ against the live (pre-F.REL, `f2fe447`) host: 10/20 GREEN. RED: extract ×2 (500 without CORS header → "Failed to fetch"), publish 404, remix 404, diff (no child), gallery (not listed), PATCH (preflight blocked; ETag not exposed), CORS console errors. The two `delete` rows of this run are a probe defect (the session token was held in the page and lost on navigation; fixed in the committed probe), not a production reading.
- The EXIF-6 original is a PRIVATE-SAMPLE: uploaded to production as the spec orders, never published, never committed; its screenshot is not taken (the preview and gallery frames show `daraksha.jpg`, a repo asset).
