import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const ShowSearchPopoverButton: React.FC<{
    enableShortcuts: boolean;
    store: Store<StoreProps>;
    onClick(): void;
}>;
