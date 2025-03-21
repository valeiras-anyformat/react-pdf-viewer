import { type PdfJs, type VisibilityChanged } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const ThumbnailContainer: React.FC<{
    doc: PdfJs.PdfDocument;
    pageHeight: number;
    pageIndex: number;
    pageRotation: number;
    pageWidth: number;
    rotation: number;
    shouldRender: boolean;
    thumbnailWidth: number;
    onRenderCompleted: (pageIndex: number) => void;
    onVisibilityChanged(pageIndex: number, visibility: VisibilityChanged): void;
}>;
