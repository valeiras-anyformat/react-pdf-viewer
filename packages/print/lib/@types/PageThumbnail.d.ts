import { type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const PageThumbnail: React.FC<{
    canvas: HTMLCanvasElement;
    page: PdfJs.Page;
    pageHeight: number;
    pageIndex: number;
    pageWidth: number;
    rotation: number;
    onLoad(): void;
}>;
