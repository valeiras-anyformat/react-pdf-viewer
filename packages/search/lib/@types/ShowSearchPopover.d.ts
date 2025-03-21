import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderShowSearchPopoverProps } from './types/RenderShowSearchPopoverProps';
import { type StoreProps } from './types/StoreProps';
type RenderShowSearchPopover = (props: RenderShowSearchPopoverProps) => React.ReactElement;
export interface ShowSearchPopoverProps {
    children?: RenderShowSearchPopover;
}
export declare const ShowSearchPopover: React.FC<{
    children?: RenderShowSearchPopover;
    enableShortcuts: boolean;
    store: Store<StoreProps>;
}>;
export {};
