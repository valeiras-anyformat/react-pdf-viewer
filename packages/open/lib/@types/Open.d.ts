import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderOpenProps } from './types/RenderOpenProps';
import { type StoreProps } from './types/StoreProps';
type RenderOpen = (props: RenderOpenProps) => React.ReactElement;
export interface OpenProps {
    children?: RenderOpen;
}
export declare const Open: React.FC<{
    children?: RenderOpen;
    enableShortcuts: boolean;
    store: Store<StoreProps>;
}>;
export {};
