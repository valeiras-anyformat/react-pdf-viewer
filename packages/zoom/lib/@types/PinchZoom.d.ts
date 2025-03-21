import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const PinchZoom: React.FC<{
    pagesContainerRef: React.RefObject<HTMLDivElement>;
    store: Store<StoreProps>;
}>;
