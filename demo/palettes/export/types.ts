// V.W51 (F5) — the closed export atom/union grammar.
// Byte authority: docs/tranches/V/PALETTE-CONTRACT.md Appendix W51 §1.
//
// The five serializers consume ONE immutable `ExportSnapshot`; these are its
// closed shapes. No serializer re-derives them and none looks past them (no
// network read, no Workspace merge, no server export).

export type ExportFormat = "json" | "css" | "tailwind" | "svg" | "png";

/** Appendix §1: an integer-encoded OKLCH colour + optional human name. */
export interface CanonicalNamedColor {
    /** Escaped data/metadata — never a CSS/Tailwind/XML identifier (§2). */
    readonly name: string | null;
    /** Lightness in thousandths of a percent (`l/1000`%). */
    readonly l: number;
    /** Chroma in millionths (`c/1000000`). */
    readonly c: number;
    /** Hue in thousandths of a degree (`h/1000`). */
    readonly h: number;
    /** Alpha in millionths (`a/1000000`). */
    readonly a: number;
}

/** Appendix §1: zero..ten unique ResourceId tags, sorted ascending by ASCII. */
export interface ExportTag {
    readonly tagId: string;
    readonly label: string;
}

export type SnapshotSource =
    | {
          readonly sourceKind: "device-draft";
          readonly deviceDraftId: string;
          readonly deviceDraftRevision: number;
      }
    | {
          readonly sourceKind: "workspace";
          readonly paletteId: string;
          readonly slug: string;
          readonly workspaceId: string;
          readonly workspaceRevision: number;
          readonly basedOnReleaseId?: string;
      }
    | {
          readonly sourceKind: "release";
          readonly paletteId: string;
          readonly slug: string;
          readonly releaseId: string;
          readonly releaseNo: number;
      };

export interface ExportSnapshot {
    readonly schema: "value.export-snapshot/v1";
    readonly source: SnapshotSource;
    readonly displayName: string;
    /** 1..50 atoms, in semantic order. */
    readonly orderedNamedColors: readonly CanonicalNamedColor[];
    /** 0..10 tags. */
    readonly canonicalTags: readonly ExportTag[];
    /** Exactly 64 lowercase hex. */
    readonly contentDigest: string;
}
