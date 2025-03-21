import { type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const ThumbnailItem: React.FC<{
    page: PdfJs.Page;
    pageHeight: number;
    pageIndex: number;
    pageWidth: number;
    rotation: number;
    thumbnailHeight: number;
    thumbnailWidth: number;
    onRenderCompleted: (pageIndex: number) => void;
}>;
