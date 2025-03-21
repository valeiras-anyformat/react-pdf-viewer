import { type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const FetchLabels: React.FC<{
    children: (labels: string[]) => React.ReactElement;
    doc: PdfJs.PdfDocument;
}>;
