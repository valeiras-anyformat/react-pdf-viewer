import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';
export declare const BookmarkListRoot: React.FC<{
    bookmarks: PdfJs.Outline[];
    doc: PdfJs.PdfDocument;
    isBookmarkExpanded?: IsBookmarkExpanded;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
}>;
