import { type Plugin } from '@react-pdf-viewer/core';
import * as React from 'react';
import { ThumbnailDirection } from './structs/ThumbnailDirection';
import { type CoverProps } from './types/CoverProps';
import { type RenderCurrentPageLabel } from './types/RenderCurrentPageLabelProps';
import { type RenderThumbnailItem } from './types/RenderThumbnailItemProps';
export interface ThumbnailsProps {
    renderThumbnailItem?: RenderThumbnailItem;
    thumbnailDirection?: ThumbnailDirection;
}
export interface ThumbnailPlugin extends Plugin {
    Cover: (props: CoverProps) => React.ReactElement;
    Thumbnails(props?: ThumbnailsProps): React.ReactElement;
}
export interface ThumbnailPluginProps {
    renderCurrentPageLabel?: RenderCurrentPageLabel;
    renderSpinner?: () => React.ReactElement;
    thumbnailWidth?: number;
}
export declare const thumbnailPlugin: (pluginProps?: ThumbnailPluginProps) => ThumbnailPlugin;
