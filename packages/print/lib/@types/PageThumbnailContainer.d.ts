import { type PageSize, type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const PageThumbnailContainer: React.FC<{
    canvas: HTMLCanvasElement;
    doc: PdfJs.PdfDocument;
    pageIndex: number;
    pageRotation: number;
    pageSize: PageSize;
    rotation: number;
    shouldRender: boolean;
    onLoad(): void;
}>;
