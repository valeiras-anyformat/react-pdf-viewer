import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const ClickDrag: React.FC<{
    canvasLayerRef: React.RefObject<HTMLCanvasElement>;
    canvasLayerRendered: boolean;
    pageIndex: number;
    store: Store<StoreProps>;
    textLayerRef: React.RefObject<HTMLDivElement>;
    textLayerRendered: boolean;
}>;
