import { ViewMode, type Store } from '@react-pdf-viewer/core';
import { type StoreProps } from './types/StoreProps';
export declare const useViewMode: (store: Store<StoreProps>) => {
    viewMode: ViewMode;
};
