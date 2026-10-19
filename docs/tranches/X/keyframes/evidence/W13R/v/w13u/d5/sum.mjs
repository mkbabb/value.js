// SERVED MODEL: claude-opus-5-5 — KF.W13U.d5 summary reader for report-*.json (reads the settled bytes)
import fs from 'node:fs';
for (const t of process.argv.slice(2)) { const r = JSON.parse(fs.readFileSync(new URL(`./report-${t}.json`, import.meta.url)));
  const s = r.switches; const j = (k) => s.map(x => x[k]).join('');
  console.log(t, 'width', j('widthChanges'), 'rev', j('widthReversals'), 'surf', j('surfaceSetChanges'), 'empty', s.reduce((a, x) => a + x.emptySurfaceFrames, 0), 'sceneLbl', s.map(x => x.sceneLabelAt.length - 1).join(''), 'ctlLbl', s.map(x => x.controlLabelAt.length - 1).join(''), 'errs', r.errs.length); }
