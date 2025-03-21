import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const CoverInner: React.FC<{
    doc: PdfJs.PdfDocument;
    getPageIndex?({ numPages }: {
        numPages: number;
    }): number;
    renderSpinner?: () => React.ReactElement;
    store: Store<StoreProps>;
    width?: number;
}>;
