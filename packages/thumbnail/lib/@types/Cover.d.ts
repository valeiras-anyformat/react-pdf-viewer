import { type Store } from '@react-pdf-viewer/core';
import * as React from 'react';
import { StoreProps } from './types/StoreProps';
export declare const Cover: React.FC<{
    getPageIndex?({ numPages }: {
        numPages: number;
    }): number;
    renderSpinner?: () => React.ReactElement;
    store: Store<StoreProps>;
    width?: number;
}>;
