import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';
export declare const BookmarkItem: React.FC<{
    bookmark: PdfJs.Outline;
    depth: number;
    doc: PdfJs.PdfDocument;
    index: number;
    isBookmarkExpanded?: IsBookmarkExpanded;
    numberOfSiblings: number;
    pathFromRoot: string;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
}>;
