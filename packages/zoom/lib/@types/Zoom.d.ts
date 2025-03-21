import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type RenderZoomProps } from './types/RenderZoomProps';
import { type StoreProps } from './types/StoreProps';
type RenderZoom = (props: RenderZoomProps) => React.ReactElement;
export interface ZoomProps {
    children?: RenderZoom;
    levels?: number[];
}
export declare const Zoom: React.FC<{
    children?: RenderZoom;
    levels?: number[];
    store: Store<StoreProps>;
}>;
export {};
