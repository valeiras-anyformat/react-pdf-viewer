import { type PageSize, type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const PrintContainer: React.FC<{
    doc: PdfJs.PdfDocument;
    pagesRotation: Map<number, number>;
    pageSizes: PageSize[];
    renderProgressBar?(numLoadedPages: number, numPages: number, onCancel: () => void): React.ReactElement;
    rotation: number;
    setPages: (doc: PdfJs.PdfDocument) => number[];
    store: Store<StoreProps>;
}>;
