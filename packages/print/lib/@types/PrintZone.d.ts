import { type PageSize, type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
import { PrintStatus } from './structs/PrintStatus';
export declare const PrintZone: React.FC<{
    doc: PdfJs.PdfDocument;
    numLoadedPages: number;
    pagesRotation: Map<number, number>;
    pageSizes: PageSize[];
    printPages: number[];
    printStatus: PrintStatus;
    rotation: number;
    onCancel(): void;
    onLoad(): void;
}>;
