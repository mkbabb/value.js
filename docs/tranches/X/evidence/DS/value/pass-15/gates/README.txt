X-DS value pass 15 (critic V15, 2026-10-16): gates, read on tranche-u.
Source change: c8132a9b1 (V15-01 the certified gold glyph + o18 census row; V15-02 the admin counts; V15-03 the verb voice + button-voice.test.ts; V15-05 "Audit log").
Born-RED first:
  V15-01 o18 row "the featured badge" (smoke, light+dark): light RED 1.26:1 (raw gold label), dark GREEN (v15-01-census-born-red.txt); after the cure GREEN 2/2 x2 (v15-01-census-green-run1/2.txt).
  V15-03 button-voice.test.ts: RED with 17 labelled Buttons carrying font-display (v15-03-born-red.txt); GREEN after (in the vitest runs).
typecheck (npm run typecheck, guarded --light): 0 errors x2 (typecheck-run1/2.txt).
vitest (npx vitest run --maxWorkers=2, guarded): 1221/1228 x2. These are the SAME 7 standing failures as passes 13-14 (vitest-fails-run1/2.txt): ink D6 x2, ink T-35 x3, spectrum-luma C-5 (born-RED), reka NG-6. The +7 passing tests are button-voice (2) and other seats' tests landed since pass 14.
e2e (headless, workers 1, own server VJS_E2E_PORT=9190):
  project smoke, specs.txt (22 specs = pass 14's 20 + o10d-display-voice-census + o10-type-locks): run 1 107/107, run 2 107/107.
  project smoke-admin, specs-admin.txt (7 specs: admin-populated, a11y-authed-user, admin-walk, route-guard, o10d-admin-title-voice, a11y-authed-admin, flows/user-status): run 1 16/16, run 2 16/16.
  STRICT x2 GREEN.
No visual golden re-baselined.
Frames/census: served by `vite --port 9011 --strictPort` (VITE_API_URL=http://localhost:9011, own VJS_VITE_CACHE_DIR), guarded, from the demo tree that c8132a9b1 commits (../tree-before.txt, ../tree-after.txt: the same 17 modified paths + 1 new test, nothing from another seat).
