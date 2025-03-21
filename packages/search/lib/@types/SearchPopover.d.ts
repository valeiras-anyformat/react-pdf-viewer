import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { type StoreProps } from './types/StoreProps';
export declare const SearchPopover: React.FC<{
    store: Store<StoreProps>;
    onToggle(): void;
}>;
