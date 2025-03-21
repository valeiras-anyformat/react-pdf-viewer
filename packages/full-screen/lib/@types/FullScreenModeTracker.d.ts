import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
import { type Zoom } from './types/Zoom';
export declare const FullScreenModeTracker: React.FC<{
    store: Store<StoreProps>;
    onEnterFullScreen: (zoom: Zoom) => void;
    onExitFullScreen: (zoom: Zoom) => void;
}>;
