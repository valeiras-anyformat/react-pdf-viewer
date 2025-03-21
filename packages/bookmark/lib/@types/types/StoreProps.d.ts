import { type Destination, type PdfJs } from '@react-pdf-viewer/core';
export interface StoreProps {
    bookmarkExpandedMap: Map<string, boolean>;
    doc?: PdfJs.PdfDocument;
    jumpToDestination?(destination: Destination): void;
}
