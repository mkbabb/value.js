// X.W7.b — hand one export file to the browser's download. The anchor is
// attached for the click (Firefox ignores a detached anchor's `download`) and
// removed after; the object URL is leased for 60 s rather than revoked in the
// same tick as the click (Appendix W51 §2 / fold N-15: a same-tick revoke can
// cancel the navigation it just started).

import type { ExportFile } from "./file";

const URL_LEASE_MS = 60_000;

export function downloadFile(file: ExportFile): void {
    const blob = new Blob([new Uint8Array(file.bytes)], { type: file.mime });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = file.filename;
    anchor.hidden = true;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), URL_LEASE_MS);
}
