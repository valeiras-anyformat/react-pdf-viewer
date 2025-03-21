import { ScrollMode, type Store } from '@react-pdf-viewer/core';
import { type StoreProps } from './types/StoreProps';
export declare const useScrollMode: (store: Store<StoreProps>) => {
    scrollMode: ScrollMode;
};
