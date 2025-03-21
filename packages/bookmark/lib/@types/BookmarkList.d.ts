import { type PdfJs, type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
import { type StoreProps } from './types/StoreProps';
type BookmarkListProps = {
    bookmarks: PdfJs.Outline[];
    depth: number;
    doc: PdfJs.PdfDocument;
    isBookmarkExpanded?: IsBookmarkExpanded;
    isRoot: boolean;
    pathFromRoot: string;
    renderBookmarkItem?: RenderBookmarkItem;
    store: Store<StoreProps>;
};
declare const BookmarkList: React.ForwardRefExoticComponent<BookmarkListProps & React.RefAttributes<HTMLUListElement>>;
export { BookmarkList };
