import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const CheckPrintPermission: React.FC<{
    doc: PdfJs.PdfDocument;
    store: Store<StoreProps>;
}>;
