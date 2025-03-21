import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderZoomOutProps } from './types/RenderZoomOutProps';
import { type StoreProps } from './types/StoreProps';
type RenderZoomOut = (props: RenderZoomOutProps) => React.ReactElement;
export interface ZoomOutProps {
    children?: RenderZoomOut;
}
export declare const ZoomOut: React.FC<{
    children?: RenderZoomOut;
    enableShortcuts: boolean;
    store: Store<StoreProps>;
}>;
export {};
