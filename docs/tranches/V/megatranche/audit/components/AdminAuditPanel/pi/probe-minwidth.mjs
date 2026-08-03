async (page) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const res = await page.evaluate(() => {
        // Faithful reconstruction of the two row markups, side by side, inside
        // a 320px-wide grid track (the admin card's inner width at 390).
        const host = document.createElement("div");
        host.id = "mw-probe";
        host.style.cssText = "position:fixed;left:0;top:0;width:320px;z-index:99999;background:rgba(255,255,255,.92);padding:8px;";
        const LONG_TARGET =
            "palette:sunset-riot-9a3f/user:verdant-mole-33/flag:offensive-duplicate-report-2026";
        host.innerHTML = `
<div class="grid gap-3 pb-3" id="mw-audit">
  <!-- AdminAuditPanel.vue:62 verbatim -->
  <div class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge transition-colors duration-fast hover:bg-accent/50" data-row="audit">
    <div class="flex flex-col gap-0.5 min-w-0 flex-1">
      <div class="flex items-center gap-2">
        <span class="text-mono-caption shrink-0" data-badge>palette.feature.undo</span>
        <span class="text-small text-muted-foreground tabular-nums shrink-0">Jul 5, 04:30 AM</span>
      </div>
      <span class="text-mono-small text-muted-foreground truncate">${LONG_TARGET}</span>
    </div>
  </div>
</div>
<div class="grid gap-3 pb-3" id="mw-item">
  <!-- AdminListItem.vue root verbatim (note: min-w-0) -->
  <div class="flex items-center gap-3 px-3 py-2.5 rounded-md border border-card-edge min-w-0" data-row="listitem">
    <div class="flex-1 min-w-0 overflow-hidden flex flex-col gap-0.5">
      <div class="flex items-center gap-2">
        <span class="text-mono-caption shrink-0">palette.feature.undo</span>
        <span class="text-small text-muted-foreground tabular-nums shrink-0">Jul 5, 04:30 AM</span>
      </div>
      <span class="text-mono-small text-muted-foreground truncate">${LONG_TARGET}</span>
    </div>
  </div>
</div>`;
        document.body.appendChild(host);
        const box = (sel) => {
            const e = document.querySelector(sel);
            const r = e.getBoundingClientRect();
            return { w: +r.width.toFixed(1), scrollW: e.scrollWidth, minW: getComputedStyle(e).minWidth };
        };
        const out = {
            trackWidth: 320,
            auditRow: box('[data-row="audit"]'),
            listItemRow: box('[data-row="listitem"]'),
            auditGridScrollW: document.querySelector("#mw-audit").scrollWidth,
            itemGridScrollW: document.querySelector("#mw-item").scrollWidth,
        };
        return out;
    });
    await page.screenshot({ path: "docs/tranches/V/megatranche/audit/components/AdminAuditPanel/pi/minwidth-390.png", scale: "css" });
    await page.evaluate(() => document.getElementById("mw-probe")?.remove());
    return JSON.stringify(res, null, 2);
}
