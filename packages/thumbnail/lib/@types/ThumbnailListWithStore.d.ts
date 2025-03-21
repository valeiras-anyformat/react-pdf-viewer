import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { ThumbnailDirection } from './structs/ThumbnailDirection';
import { type RenderCurrentPageLabel } from './types/RenderCurrentPageLabelProps';
import { type RenderThumbnailItem } from './types/RenderThumbnailItemProps';
import { type StoreProps } from './types/StoreProps';
export declare const ThumbnailListWithStore: React.FC<{
    renderCurrentPageLabel?: RenderCurrentPageLabel;
    renderThumbnailItem?: RenderThumbnailItem;
    store: Store<StoreProps>;
    thumbnailDirection: ThumbnailDirection;
    thumbnailWidth: number;
}>;
