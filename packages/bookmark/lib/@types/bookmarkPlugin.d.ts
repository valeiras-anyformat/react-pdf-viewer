import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type IsBookmarkExpanded } from './types/IsBookmarkExpanded';
import { type RenderBookmarkItem } from './types/RenderBookmarkItemProps';
export interface BookmarksProps {
    isBookmarkExpanded?: IsBookmarkExpanded;
    renderBookmarkItem?: RenderBookmarkItem;
}
export interface BookmarkPlugin extends Plugin {
    Bookmarks: (props?: BookmarksProps) => React.ReactElement;
}
export declare const bookmarkPlugin: () => BookmarkPlugin;
