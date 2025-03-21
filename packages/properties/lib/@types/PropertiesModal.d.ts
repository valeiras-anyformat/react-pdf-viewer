import { type PdfJs } from '@react-pdf-viewer/core';
import * as React from 'react';
export declare const PropertiesModal: React.FC<{
    doc: PdfJs.PdfDocument;
    fileName: string;
    onToggle(): void;
}>;
