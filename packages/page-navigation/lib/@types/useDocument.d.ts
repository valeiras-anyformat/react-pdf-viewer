import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import { type StoreProps } from './types/StoreProps';
export declare const useDocument: (store: Store<StoreProps>) => PdfJs.PdfDocument;
