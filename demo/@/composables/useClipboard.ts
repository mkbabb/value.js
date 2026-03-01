import { toast } from "vue-sonner";

/**
 * Fallback clipboard copy using a temporary textarea.
 * Works on iOS Safari where navigator.clipboard may not be available.
 */
function copyViaTextarea(text: string): boolean {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.setSelectionRange(0, text.length);
    let ok = false;
    try {
        ok = document.execCommand("copy");
    } catch {
        ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
}

/**
 * Copy text to clipboard with toast feedback.
 * Uses navigator.clipboard.writeText with textarea fallback for mobile.
 */
export async function copyToClipboard(text: string, label?: string): Promise<boolean> {
    const display = label ?? text;
    if (!text) {
        toast.error("Nothing to copy");
        return false;
    }

    try {
        if (navigator.clipboard?.writeText) {
            await navigator.clipboard.writeText(text);
        } else if (!copyViaTextarea(text)) {
            throw new Error("execCommand failed");
        }
        toast.success(`Copied ${display}`);
        return true;
    } catch {
        if (copyViaTextarea(text)) {
            toast.success(`Copied ${display}`);
            return true;
        }
        toast.error("Failed to copy to clipboard");
        return false;
    }
}
